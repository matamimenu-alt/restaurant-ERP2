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

  // Seed chart of accounts — complete restaurant COA
  const accountDefs: { code: string; nameAr: string; nameEn: string; type: AccountType }[] = [
    // ── ASSETS ──────────────────────────────────────────────────
    { code: '1000', nameAr: 'الأصول',                          nameEn: 'Assets',                     type: AccountType.ASSET },
    { code: '1100', nameAr: 'الأصول المتداولة',                nameEn: 'Current Assets',             type: AccountType.ASSET },
    { code: '1110', nameAr: 'الصندوق - نقد بالمطاعم',         nameEn: 'Cash on Hand',               type: AccountType.ASSET },
    { code: '1120', nameAr: 'البنوك - الحسابات الجارية',       nameEn: 'Bank Accounts',              type: AccountType.ASSET },
    { code: '1130', nameAr: 'المدينون - حسابات القبض',         nameEn: 'Accounts Receivable',        type: AccountType.ASSET },
    { code: '1140', nameAr: 'ذمم تطبيقات التوصيل',            nameEn: 'Delivery Apps Receivable',   type: AccountType.ASSET },
    { code: '1150', nameAr: 'ضريبة القيمة المضافة المدخلات', nameEn: 'Input VAT Recoverable',      type: AccountType.ASSET },
    { code: '1160', nameAr: 'مصروفات مدفوعة مقدماً',          nameEn: 'Prepaid Expenses',           type: AccountType.ASSET },
    { code: '1200', nameAr: 'المخزون',                         nameEn: 'Inventory',                  type: AccountType.ASSET },
    { code: '1210', nameAr: 'مخزون المواد الغذائية',           nameEn: 'Food Inventory',             type: AccountType.ASSET },
    { code: '1220', nameAr: 'مخزون المشروبات',                 nameEn: 'Beverage Inventory',         type: AccountType.ASSET },
    { code: '1230', nameAr: 'مخزون مواد التغليف',              nameEn: 'Packaging Inventory',        type: AccountType.ASSET },
    { code: '1240', nameAr: 'مخزون مستلزمات التشغيل',         nameEn: 'Operating Supplies',         type: AccountType.ASSET },
    { code: '1300', nameAr: 'الأصول الثابتة',                  nameEn: 'Fixed Assets',               type: AccountType.ASSET },
    { code: '1310', nameAr: 'معدات المطبخ والأجهزة',           nameEn: 'Kitchen Equipment',          type: AccountType.ASSET },
    { code: '1320', nameAr: 'أثاث وتجهيزات المطعم',            nameEn: 'Furniture & Fixtures',       type: AccountType.ASSET },
    { code: '1330', nameAr: 'أجهزة وتقنية الكاشير',            nameEn: 'POS & Technology',           type: AccountType.ASSET },
    { code: '1340', nameAr: 'تحسينات المباني المستأجرة',       nameEn: 'Leasehold Improvements',     type: AccountType.ASSET },
    { code: '1390', nameAr: 'مجمع إهلاك الأصول الثابتة',       nameEn: 'Accumulated Depreciation',   type: AccountType.ASSET },

    // ── LIABILITIES ─────────────────────────────────────────────
    { code: '2000', nameAr: 'الخصوم',                          nameEn: 'Liabilities',                type: AccountType.LIABILITY },
    { code: '2100', nameAr: 'الخصوم المتداولة',                nameEn: 'Current Liabilities',        type: AccountType.LIABILITY },
    { code: '2110', nameAr: 'الدائنون - الموردون',             nameEn: 'Accounts Payable',           type: AccountType.LIABILITY },
    { code: '2120', nameAr: 'ضريبة القيمة المضافة المستحقة', nameEn: 'VAT Payable',                type: AccountType.LIABILITY },
    { code: '2130', nameAr: 'رواتب وأجور مستحقة',             nameEn: 'Accrued Salaries & Wages',   type: AccountType.LIABILITY },
    { code: '2140', nameAr: 'مستحقات الضمان الاجتماعي',       nameEn: 'GOSI Payable',               type: AccountType.LIABILITY },
    { code: '2150', nameAr: 'إيجارات مستحقة',                  nameEn: 'Rent Payable',               type: AccountType.LIABILITY },
    { code: '2160', nameAr: 'ذمم دائنة أخرى',                  nameEn: 'Other Payables',             type: AccountType.LIABILITY },
    { code: '2200', nameAr: 'الخصوم غير المتداولة',            nameEn: 'Non-Current Liabilities',    type: AccountType.LIABILITY },
    { code: '2210', nameAr: 'قروض طويلة الأجل',                nameEn: 'Long-term Loans',            type: AccountType.LIABILITY },

    // ── EQUITY ──────────────────────────────────────────────────
    { code: '3000', nameAr: 'حقوق الملكية',                    nameEn: 'Equity',                     type: AccountType.EQUITY },
    { code: '3100', nameAr: 'رأس المال المدفوع',               nameEn: 'Paid-in Capital',            type: AccountType.EQUITY },
    { code: '3200', nameAr: 'الأرباح المحتجزة',                nameEn: 'Retained Earnings',          type: AccountType.EQUITY },
    { code: '3300', nameAr: 'أرباح / خسائر العام الحالي',      nameEn: 'Current Year Profit/Loss',   type: AccountType.EQUITY },

    // ── REVENUE ─────────────────────────────────────────────────
    { code: '4000', nameAr: 'الإيرادات',                       nameEn: 'Revenue',                    type: AccountType.REVENUE },
    { code: '4100', nameAr: 'إيرادات المبيعات - نقد',          nameEn: 'Sales Revenue - Cash',       type: AccountType.REVENUE },
    { code: '4110', nameAr: 'إيرادات المبيعات - بطاقة',        nameEn: 'Sales Revenue - Card',       type: AccountType.REVENUE },
    { code: '4120', nameAr: 'إيرادات الجلوس',                  nameEn: 'Dine-in Revenue',            type: AccountType.REVENUE },
    { code: '4200', nameAr: 'إيرادات تطبيقات التوصيل',         nameEn: 'Delivery Apps Revenue',      type: AccountType.REVENUE },
    { code: '4210', nameAr: 'إيرادات هنقرستيشن',               nameEn: 'HungerStation Revenue',      type: AccountType.REVENUE },
    { code: '4220', nameAr: 'إيرادات جاهز',                    nameEn: 'Jahez Revenue',              type: AccountType.REVENUE },
    { code: '4230', nameAr: 'إيرادات نون فود',                 nameEn: 'Noon Food Revenue',          type: AccountType.REVENUE },
    { code: '4240', nameAr: 'إيرادات طلبات',                   nameEn: 'Talabat Revenue',            type: AccountType.REVENUE },
    { code: '4300', nameAr: 'إيرادات الكاتيرنج',               nameEn: 'Catering Revenue',           type: AccountType.REVENUE },
    { code: '4900', nameAr: 'إيرادات أخرى',                    nameEn: 'Other Revenue',              type: AccountType.REVENUE },

    // ── COGS ────────────────────────────────────────────────────
    { code: '5000', nameAr: 'تكلفة المبيعات',                  nameEn: 'Cost of Sales',              type: AccountType.EXPENSE },
    { code: '5100', nameAr: 'تكلفة المواد الغذائية',           nameEn: 'Food Cost',                  type: AccountType.EXPENSE },
    { code: '5110', nameAr: 'تكلفة اللحوم والدواجن',           nameEn: 'Meat & Poultry Cost',        type: AccountType.EXPENSE },
    { code: '5120', nameAr: 'تكلفة الخضروات والفواكه',         nameEn: 'Vegetables & Fruits Cost',   type: AccountType.EXPENSE },
    { code: '5130', nameAr: 'تكلفة البقاليات والمواد الجافة',  nameEn: 'Dry Goods Cost',             type: AccountType.EXPENSE },
    { code: '5140', nameAr: 'تكلفة الزيوت والدهون',            nameEn: 'Oils & Fats Cost',           type: AccountType.EXPENSE },
    { code: '5150', nameAr: 'تكلفة التوابل والبهارات',         nameEn: 'Spices & Seasonings Cost',   type: AccountType.EXPENSE },
    { code: '5200', nameAr: 'تكلفة المشروبات',                 nameEn: 'Beverage Cost',              type: AccountType.EXPENSE },
    { code: '5300', nameAr: 'تكلفة مواد التغليف',              nameEn: 'Packaging Cost',             type: AccountType.EXPENSE },

    // ── OPERATING EXPENSES ──────────────────────────────────────
    { code: '6000', nameAr: 'مصروفات التشغيل',                 nameEn: 'Operating Expenses',         type: AccountType.EXPENSE },
    { code: '6100', nameAr: 'مصروفات الرواتب والأجور',         nameEn: 'Salaries & Wages',           type: AccountType.EXPENSE },
    { code: '6110', nameAr: 'رواتب العمالة الأساسية',          nameEn: 'Basic Salaries',             type: AccountType.EXPENSE },
    { code: '6120', nameAr: 'بدلات السكن والنقل',              nameEn: 'Housing & Transport Allowances', type: AccountType.EXPENSE },
    { code: '6130', nameAr: 'الضمان الاجتماعي (GOSI)',          nameEn: 'GOSI Contributions',         type: AccountType.EXPENSE },
    { code: '6140', nameAr: 'تكلفة الإقامات والتأشيرات',       nameEn: 'Iqama & Visa Costs',         type: AccountType.EXPENSE },
    { code: '6150', nameAr: 'التأمين الصحي للموظفين',          nameEn: 'Employee Medical Insurance', type: AccountType.EXPENSE },
    { code: '6200', nameAr: 'مصروفات الإيجار',                 nameEn: 'Rent Expense',               type: AccountType.EXPENSE },
    { code: '6210', nameAr: 'إيجار المحلات',                   nameEn: 'Shop Rent',                  type: AccountType.EXPENSE },
    { code: '6220', nameAr: 'إيجار المخازن',                   nameEn: 'Storage Rent',               type: AccountType.EXPENSE },
    { code: '6300', nameAr: 'المرافق والخدمات',                nameEn: 'Utilities',                  type: AccountType.EXPENSE },
    { code: '6310', nameAr: 'فواتير الكهرباء',                 nameEn: 'Electricity',                type: AccountType.EXPENSE },
    { code: '6320', nameAr: 'فواتير الماء',                    nameEn: 'Water',                      type: AccountType.EXPENSE },
    { code: '6330', nameAr: 'فواتير الغاز',                    nameEn: 'Gas',                        type: AccountType.EXPENSE },
    { code: '6340', nameAr: 'الإنترنت والاتصالات',             nameEn: 'Internet & Communications',  type: AccountType.EXPENSE },
    { code: '6400', nameAr: 'مصروفات التسويق والإعلان',        nameEn: 'Marketing & Advertising',    type: AccountType.EXPENSE },
    { code: '6410', nameAr: 'تسويق رقمي ووسائل التواصل',       nameEn: 'Digital & Social Marketing', type: AccountType.EXPENSE },
    { code: '6420', nameAr: 'عمولات تطبيقات التوصيل',          nameEn: 'Delivery Apps Commissions',  type: AccountType.EXPENSE },
    { code: '6500', nameAr: 'مصروفات الصيانة والإصلاح',        nameEn: 'Maintenance & Repairs',      type: AccountType.EXPENSE },
    { code: '6510', nameAr: 'صيانة المعدات والأجهزة',          nameEn: 'Equipment Maintenance',      type: AccountType.EXPENSE },
    { code: '6520', nameAr: 'صيانة مباني ومنشآت',              nameEn: 'Building Maintenance',       type: AccountType.EXPENSE },
    { code: '6600', nameAr: 'مصروفات إدارية وعمومية',          nameEn: 'General & Admin Expenses',   type: AccountType.EXPENSE },
    { code: '6610', nameAr: 'مصروفات المكتب والقرطاسية',       nameEn: 'Office & Stationery',        type: AccountType.EXPENSE },
    { code: '6620', nameAr: 'رسوم التراخيص والبلديات',         nameEn: 'Licenses & Municipality Fees', type: AccountType.EXPENSE },
    { code: '6630', nameAr: 'مصروفات التأمين',                 nameEn: 'Insurance',                  type: AccountType.EXPENSE },
    { code: '6640', nameAr: 'مصروفات قانونية ومحاسبية',        nameEn: 'Legal & Accounting Fees',    type: AccountType.EXPENSE },
    { code: '6650', nameAr: 'مصروفات النقل والتوصيل الداخلي',  nameEn: 'Internal Logistics',         type: AccountType.EXPENSE },
    { code: '6700', nameAr: 'الإهلاك والاستهلاك',              nameEn: 'Depreciation & Amortization',type: AccountType.EXPENSE },
    { code: '6800', nameAr: 'مصروفات تمويلية وفوائد',          nameEn: 'Finance Charges & Interest', type: AccountType.EXPENSE },
    { code: '6900', nameAr: 'مصروفات متنوعة أخرى',             nameEn: 'Miscellaneous Expenses',     type: AccountType.EXPENSE },
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
