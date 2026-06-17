import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { getPagination } from '../utils/pagination';

export const getAccounts = async (req: AuthRequest, res: Response) => {
  try {
    const accounts = await prisma.account.findMany({
      where: { companyId: req.user!.companyId, isActive: true },
      include: { children: { where: { isActive: true } } },
      orderBy: { code: 'asc' },
    });
    sendSuccess(res, accounts);
  } catch { sendError(res, 'Failed to fetch accounts', 500); }
};

export const createAccount = async (req: AuthRequest, res: Response) => {
  try {
    const account = await prisma.account.create({ data: { ...req.body, companyId: req.user!.companyId } });
    sendSuccess(res, account, 'Account created', 201);
  } catch { sendError(res, 'Failed to create account', 500); }
};

export const updateAccount = async (req: AuthRequest, res: Response) => {
  try {
    const account = await prisma.account.update({ where: { id: req.params.id }, data: req.body });
    sendSuccess(res, account);
  } catch { sendError(res, 'Failed to update account', 500); }
};

export const getJournalEntries = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const [data, total] = await Promise.all([
      prisma.journalEntry.findMany({
        where: { companyId: req.user!.companyId },
        include: { lines: { include: { account: { select: { code: true, nameAr: true } } } } },
        skip, take: limit, orderBy: { entryDate: 'desc' },
      }),
      prisma.journalEntry.count({ where: { companyId: req.user!.companyId } }),
    ]);
    sendPaginated(res, data, total, page, limit);
  } catch { sendError(res, 'Failed to fetch journal entries', 500); }
};

export const createJournalEntry = async (req: AuthRequest, res: Response) => {
  try {
    const { entryDate, reference, description, lines } = req.body;
    const totalDebit = lines.reduce((s: number, l: { debit: number }) => s + l.debit, 0);
    const totalCredit = lines.reduce((s: number, l: { credit: number }) => s + l.credit, 0);
    if (Math.abs(totalDebit - totalCredit) > 0.01) return sendError(res, 'Journal entry is not balanced', 400);

    const entry = await prisma.$transaction(async (tx) => {
      const e = await tx.journalEntry.create({
        data: {
          companyId: req.user!.companyId, entryDate: new Date(entryDate),
          reference, description, status: 'POSTED', createdBy: req.user!.userId,
          lines: { create: lines },
        },
        include: { lines: { include: { account: true } } },
      });
      // Update account balances
      for (const line of lines) {
        const account = await tx.account.findUnique({ where: { id: line.accountId } });
        if (!account) continue;
        const isDebitNormal = ['ASSET', 'EXPENSE'].includes(account.type);
        const balanceChange = isDebitNormal ? (line.debit - line.credit) : (line.credit - line.debit);
        await tx.account.update({ where: { id: line.accountId }, data: { balance: { increment: balanceChange } } });
      }
      return e;
    });
    sendSuccess(res, entry, 'Journal entry posted', 201);
  } catch (err) { console.error(err); sendError(res, 'Failed to create journal entry', 500); }
};

export const getBankAccounts = async (req: AuthRequest, res: Response) => {
  try {
    const accounts = await prisma.bankAccount.findMany({
      where: { companyId: req.user!.companyId, isActive: true },
      include: { restaurant: { select: { nameAr: true } } },
    });
    sendSuccess(res, accounts);
  } catch { sendError(res, 'Failed to fetch bank accounts', 500); }
};

export const createBankAccount = async (req: AuthRequest, res: Response) => {
  try {
    const account = await prisma.bankAccount.create({ data: { ...req.body, companyId: req.user!.companyId } });
    sendSuccess(res, account, 'Bank account created', 201);
  } catch { sendError(res, 'Failed to create bank account', 500); }
};

export const updateBankAccount = async (req: AuthRequest, res: Response) => {
  try {
    const account = await prisma.bankAccount.update({ where: { id: req.params.id }, data: req.body });
    sendSuccess(res, account);
  } catch { sendError(res, 'Failed to update bank account', 500); }
};

export const getTrialBalance = async (req: AuthRequest, res: Response) => {
  try {
    const accounts = await prisma.account.findMany({
      where: { companyId: req.user!.companyId, isActive: true },
      orderBy: { code: 'asc' },
    });

    const rows = accounts.map(acc => {
      const isDebitNormal = ['ASSET', 'EXPENSE'].includes(acc.type);
      const balance = Number(acc.balance);
      return {
        ...acc,
        debitBalance: isDebitNormal && balance > 0 ? balance : 0,
        creditBalance: !isDebitNormal && balance > 0 ? balance : (isDebitNormal && balance < 0 ? Math.abs(balance) : 0),
      };
    });

    const totalDebit = rows.reduce((s, r) => s + r.debitBalance, 0);
    const totalCredit = rows.reduce((s, r) => s + r.creditBalance, 0);
    sendSuccess(res, { rows, totalDebit, totalCredit, isBalanced: Math.abs(totalDebit - totalCredit) < 0.01 });
  } catch { sendError(res, 'Failed to generate trial balance', 500); }
};
