import { PrismaClient, AccountType, ExpenseType, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const passwordHash = await bcrypt.hash('admin123', 10)

  const company = await prisma.company.upsert({
    where: { email: 'admin@matami.sa' },
    update: {},
    create: {
      name: 'Matami Company',
      nameAr: 'شركة مطامي',
      email: 'admin@matami.sa',
    },
  })

  await prisma.user.upsert({
    where: { companyId_email: { companyId: company.id, email: 'admin@matami.sa' } },
    update: {},
    create: {
      companyId: company.id,
      nameAr: 'مدير النظام',
      nameEn: 'System Admin',
      email: 'admin@matami.sa',
      password: passwordHash,
      role: UserRole.COMPANY_ADMIN,
    },
  })

  // Seed chart of accounts
  const accountDefs: { code: string; nameAr: string; nameEn: string; type: AccountType }[] = [
    { code: '1000', nameAr: 'الأصول المتداولة', nameEn: 'Current Assets', type: AccountType.ASSET },
    { code: '1100', nameAr: 'النقدية والبنوك', nameEn: 'Cash & Banks', type: AccountType.ASSET },
    { code: '1200', nameAr: 'المدينون', nameEn: 'Accounts Receivable', type: AccountType.ASSET },
    { code: '1300', nameAr: 'المخزون', nameEn: 'Inventory', type: AccountType.ASSET },
    { code: '1500', nameAr: 'الأصول الثابتة', nameEn: 'Fixed Assets', type: AccountType.ASSET },
    { code: '2000', nameAr: 'الخصوم المتداولة', nameEn: 'Current Liabilities', type: AccountType.LIABILITY },
    { code: '2100', nameAr: 'الدائنون', nameEn: 'Accounts Payable', type: AccountType.LIABILITY },
    { code: '2200', nameAr: 'ضريبة القيمة المضافة المستحقة', nameEn: 'VAT Payable', type: AccountType.LIABILITY },
    { code: '2300', nameAr: 'رواتب مستحقة', nameEn: 'Accrued Salaries', type: AccountType.LIABILITY },
    { code: '3000', nameAr: 'رأس المال', nameEn: 'Capital', type: AccountType.EQUITY },
    { code: '3100', nameAr: 'الأرباح المحتجزة', nameEn: 'Retained Earnings', type: AccountType.EQUITY },
    { code: '4000', nameAr: 'إيرادات المبيعات', nameEn: 'Sales Revenue', type: AccountType.REVENUE },
    { code: '4100', nameAr: 'إيرادات الجلوس', nameEn: 'Dine-in Revenue', type: AccountType.REVENUE },
    { code: '4200', nameAr: 'إيرادات التوصيل', nameEn: 'Delivery Revenue', type: AccountType.REVENUE },
    { code: '4300', nameAr: 'إيرادات الكاتيرنج', nameEn: 'Catering Revenue', type: AccountType.REVENUE },
    { code: '5000', nameAr: 'تكلفة البضاعة المباعة', nameEn: 'Cost of Goods Sold', type: AccountType.EXPENSE },
    { code: '5100', nameAr: 'تكلفة المواد الخام', nameEn: 'Raw Materials Cost', type: AccountType.EXPENSE },
    { code: '6000', nameAr: 'مصروفات التشغيل', nameEn: 'Operating Expenses', type: AccountType.EXPENSE },
    { code: '6100', nameAr: 'الإيجار', nameEn: 'Rent', type: AccountType.EXPENSE },
    { code: '6200', nameAr: 'مصروفات الرواتب', nameEn: 'Salary Expense', type: AccountType.EXPENSE },
    { code: '6300', nameAr: 'مصروفات المرافق', nameEn: 'Utilities', type: AccountType.EXPENSE },
    { code: '6400', nameAr: 'مصروفات التسويق', nameEn: 'Marketing', type: AccountType.EXPENSE },
  ]

  for (const acct of accountDefs) {
    await prisma.account.upsert({
      where: { companyId_code: { companyId: company.id, code: acct.code } },
      update: {},
      create: { companyId: company.id, ...acct },
    })
  }

  // Seed expense categories
  const expenseCategories: { nameAr: string; nameEn: string; type: ExpenseType }[] = [
    { nameAr: 'إيجار', nameEn: 'Rent', type: ExpenseType.FIXED },
    { nameAr: 'كهرباء وماء', nameEn: 'Utilities', type: ExpenseType.FIXED },
    { nameAr: 'صيانة', nameEn: 'Maintenance', type: ExpenseType.VARIABLE },
    { nameAr: 'تسويق وإعلان', nameEn: 'Marketing', type: ExpenseType.VARIABLE },
    { nameAr: 'عمولات تطبيقات التوصيل', nameEn: 'Delivery App Commission', type: ExpenseType.VARIABLE },
    { nameAr: 'مواد تنظيف', nameEn: 'Cleaning Supplies', type: ExpenseType.VARIABLE },
    { nameAr: 'ملابس موحدة', nameEn: 'Uniforms', type: ExpenseType.VARIABLE },
    { nameAr: 'تأمين', nameEn: 'Insurance', type: ExpenseType.FIXED },
    { nameAr: 'محاسبة وقانون', nameEn: 'Accounting & Legal', type: ExpenseType.FIXED },
    { nameAr: 'اتصالات وإنترنت', nameEn: 'Communications', type: ExpenseType.FIXED },
    { nameAr: 'وقود ومواصلات', nameEn: 'Fuel & Transport', type: ExpenseType.VARIABLE },
    { nameAr: 'مصروفات أخرى', nameEn: 'Miscellaneous', type: ExpenseType.VARIABLE },
    { nameAr: 'مصروفات إدارية', nameEn: 'Administrative', type: ExpenseType.FIXED },
  ]

  for (const cat of expenseCategories) {
    const existing = await prisma.expenseCategory.findFirst({ where: { companyId: company.id, nameEn: cat.nameEn } })
    if (!existing) {
      await prisma.expenseCategory.create({ data: { companyId: company.id, ...cat } })
    }
  }

  // Seed inventory categories
  const inventoryCategories = [
    { nameAr: 'لحوم ودواجن', nameEn: 'Meat & Poultry' },
    { nameAr: 'خضروات وفواكه', nameEn: 'Vegetables & Fruits' },
    { nameAr: 'بهارات وتوابل', nameEn: 'Spices & Seasonings' },
    { nameAr: 'مواد جافة', nameEn: 'Dry Goods' },
    { nameAr: 'مشروبات', nameEn: 'Beverages' },
  ]

  for (const cat of inventoryCategories) {
    const existing = await prisma.inventoryCategory.findFirst({ where: { companyId: company.id, nameEn: cat.nameEn } })
    if (!existing) {
      await prisma.inventoryCategory.create({ data: { companyId: company.id, ...cat } })
    }
  }

  console.log('Seed completed successfully')
  console.log(`Company: ${company.name} (${company.id})`)
  console.log('Admin credentials: admin@matami.sa / admin123')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
