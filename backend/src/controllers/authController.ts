import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { sendSuccess, sendError } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({ where: { email: email.toLowerCase() } });
    if (!user || !user.isActive) return sendError(res, 'Invalid credentials', 401);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return sendError(res, 'Invalid credentials', 401);

    const payload = { userId: user.id, companyId: user.companyId, role: user.role, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await prisma.user.update({ where: { id: user.id }, data: { refreshToken, lastLogin: new Date() } });

    const company = await prisma.company.findUnique({ where: { id: user.companyId }, select: { name: true, nameAr: true, logoUrl: true } });

    sendSuccess(res, {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, nameAr: user.nameAr, nameEn: user.nameEn, role: user.role, company },
    });
  } catch (err) {
    sendError(res, 'Login failed', 500);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return sendError(res, 'Refresh token required', 400);

    const payload = verifyRefreshToken(refreshToken);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user || user.refreshToken !== refreshToken) return sendError(res, 'Invalid refresh token', 401);

    const newPayload = { userId: user.id, companyId: user.companyId, role: user.role, email: user.email };
    const accessToken = generateAccessToken(newPayload);
    sendSuccess(res, { accessToken });
  } catch {
    sendError(res, 'Invalid refresh token', 401);
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.user.update({ where: { id: req.user!.userId }, data: { refreshToken: null } });
    sendSuccess(res, null, 'Logged out');
  } catch {
    sendError(res, 'Logout failed', 500);
  }
};

export const me = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: { id: true, email: true, nameAr: true, nameEn: true, role: true, companyId: true,
        company: { select: { name: true, nameAr: true, logoUrl: true } } },
    });
    sendSuccess(res, user);
  } catch {
    sendError(res, 'Failed to fetch user', 500);
  }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
    if (!user) return sendError(res, 'User not found', 404);

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return sendError(res, 'Current password is incorrect', 400);

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });
    sendSuccess(res, null, 'Password changed');
  } catch {
    sendError(res, 'Failed to change password', 500);
  }
};

export const registerCompany = async (req: Request, res: Response) => {
  try {
    const { companyName, companyNameAr, email, password, nameAr, nameEn } = req.body;

    const existing = await prisma.user.findFirst({ where: { email: email.toLowerCase() } });
    if (existing) return sendError(res, 'Email already in use', 400);

    const hashed = await bcrypt.hash(password, 12);
    const company = await prisma.company.create({
      data: { name: companyName, nameAr: companyNameAr, email: email.toLowerCase() },
    });

    const user = await prisma.user.create({
      data: {
        companyId: company.id,
        email: email.toLowerCase(),
        password: hashed,
        nameAr,
        nameEn,
        role: 'COMPANY_ADMIN',
      },
    });

    // Seed default chart of accounts
    await seedDefaultAccounts(company.id);
    await seedDefaultExpenseCategories(company.id);
    await seedDefaultInventoryCategories(company.id);

    const payload = { userId: user.id, companyId: company.id, role: user.role, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

    sendSuccess(res, { accessToken, refreshToken, user: { id: user.id, email: user.email, nameAr, nameEn, role: user.role, company: { name: companyName, nameAr: companyNameAr } } }, 'Company registered', 201);
  } catch (err) {
    sendError(res, 'Registration failed', 500);
  }
};

async function seedDefaultAccounts(companyId: string) {
  const accounts = [
    { code: '1000', nameAr: 'الأصول', nameEn: 'Assets', type: 'ASSET' as const },
    { code: '1100', nameAr: 'الأصول المتداولة', nameEn: 'Current Assets', type: 'ASSET' as const, parentCode: '1000' },
    { code: '1110', nameAr: 'الصندوق', nameEn: 'Cash', type: 'ASSET' as const, parentCode: '1100' },
    { code: '1120', nameAr: 'البنك', nameEn: 'Bank', type: 'ASSET' as const, parentCode: '1100' },
    { code: '1130', nameAr: 'الذمم المدينة', nameEn: 'Accounts Receivable', type: 'ASSET' as const, parentCode: '1100' },
    { code: '1140', nameAr: 'المخزون', nameEn: 'Inventory', type: 'ASSET' as const, parentCode: '1100' },
    { code: '2000', nameAr: 'الالتزامات', nameEn: 'Liabilities', type: 'LIABILITY' as const },
    { code: '2100', nameAr: 'الالتزامات المتداولة', nameEn: 'Current Liabilities', type: 'LIABILITY' as const, parentCode: '2000' },
    { code: '2110', nameAr: 'الذمم الدائنة', nameEn: 'Accounts Payable', type: 'LIABILITY' as const, parentCode: '2100' },
    { code: '2120', nameAr: 'ضريبة القيمة المضافة المستحقة', nameEn: 'VAT Payable', type: 'LIABILITY' as const, parentCode: '2100' },
    { code: '3000', nameAr: 'حقوق الملكية', nameEn: 'Equity', type: 'EQUITY' as const },
    { code: '3100', nameAr: "رأس المال", nameEn: 'Capital', type: 'EQUITY' as const, parentCode: '3000' },
    { code: '3200', nameAr: 'الأرباح المحتجزة', nameEn: 'Retained Earnings', type: 'EQUITY' as const, parentCode: '3000' },
    { code: '4000', nameAr: 'الإيرادات', nameEn: 'Revenue', type: 'REVENUE' as const },
    { code: '4100', nameAr: 'إيرادات المبيعات', nameEn: 'Sales Revenue', type: 'REVENUE' as const, parentCode: '4000' },
    { code: '5000', nameAr: 'المصروفات', nameEn: 'Expenses', type: 'EXPENSE' as const },
    { code: '5100', nameAr: 'تكلفة البضاعة المباعة', nameEn: 'Cost of Goods Sold', type: 'EXPENSE' as const, parentCode: '5000' },
    { code: '5200', nameAr: 'الرواتب والأجور', nameEn: 'Salaries & Wages', type: 'EXPENSE' as const, parentCode: '5000' },
    { code: '5300', nameAr: 'الإيجار', nameEn: 'Rent', type: 'EXPENSE' as const, parentCode: '5000' },
    { code: '5400', nameAr: 'المرافق', nameEn: 'Utilities', type: 'EXPENSE' as const, parentCode: '5000' },
    { code: '5500', nameAr: 'التسويق والإعلان', nameEn: 'Marketing', type: 'EXPENSE' as const, parentCode: '5000' },
    { code: '5600', nameAr: 'مصاريف عمومية وإدارية', nameEn: 'G&A Expenses', type: 'EXPENSE' as const, parentCode: '5000' },
  ];

  const created: Record<string, string> = {};
  for (const acc of accounts) {
    const { parentCode, ...data } = acc as typeof acc & { parentCode?: string };
    const parentId = parentCode ? created[parentCode] : undefined;
    const record = await prisma.account.create({ data: { companyId, ...data, parentId } });
    created[data.code] = record.id;
  }
}

async function seedDefaultExpenseCategories(companyId: string) {
  const categories = [
    { nameAr: 'إيجار', nameEn: 'Rent', type: 'FIXED' as const },
    { nameAr: 'إنترنت', nameEn: 'Internet', type: 'FIXED' as const },
    { nameAr: 'تأمين', nameEn: 'Insurance', type: 'FIXED' as const },
    { nameAr: 'تراخيص', nameEn: 'Licenses', type: 'FIXED' as const },
    { nameAr: 'برمجيات', nameEn: 'Software', type: 'FIXED' as const },
    { nameAr: 'كهرباء', nameEn: 'Electricity', type: 'VARIABLE' as const },
    { nameAr: 'ماء', nameEn: 'Water', type: 'VARIABLE' as const },
    { nameAr: 'غاز', nameEn: 'Gas', type: 'VARIABLE' as const },
    { nameAr: 'وقود', nameEn: 'Fuel', type: 'VARIABLE' as const },
    { nameAr: 'صيانة', nameEn: 'Maintenance', type: 'VARIABLE' as const },
    { nameAr: 'تسويق', nameEn: 'Marketing', type: 'VARIABLE' as const },
    { nameAr: 'نقل', nameEn: 'Transportation', type: 'VARIABLE' as const },
    { nameAr: 'متنوعة', nameEn: 'Miscellaneous', type: 'VARIABLE' as const },
  ];
  await prisma.expenseCategory.createMany({ data: categories.map(c => ({ ...c, companyId })) });
}

async function seedDefaultInventoryCategories(companyId: string) {
  const categories = [
    { nameAr: 'أغذية', nameEn: 'Food', type: 'FOOD' as const },
    { nameAr: 'مشروبات', nameEn: 'Beverage', type: 'BEVERAGE' as const },
    { nameAr: 'تغليف', nameEn: 'Packaging', type: 'PACKAGING' as const },
    { nameAr: 'منظفات', nameEn: 'Cleaning', type: 'CLEANING' as const },
    { nameAr: 'مستهلكات', nameEn: 'Consumables', type: 'CONSUMABLES' as const },
  ];
  await prisma.inventoryCategory.createMany({ data: categories.map(c => ({ ...c, companyId })) });
}
