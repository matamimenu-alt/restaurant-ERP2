export interface Company {
  id: string
  nameAr: string
  nameEn: string
  logo?: string
  address?: string
  city?: string
  country: string
  currency: string
  taxNumber?: string
  fiscalYearStart: number
  createdAt: string
  updatedAt: string
}

export interface Restaurant {
  id: string
  companyId: string
  nameAr: string
  nameEn: string
  logo?: string
  type: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Branch {
  id: string
  restaurantId: string
  restaurant?: Restaurant
  nameAr: string
  nameEn: string
  address?: string
  phone?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'MANAGER' | 'ACCOUNTANT' | 'VIEWER'
  restaurantId?: string
  branchId?: string
  restaurant?: Restaurant
  branch?: Branch
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Supplier {
  id: string
  companyId: string
  code: string
  nameAr: string
  nameEn: string
  contactPerson?: string
  phone?: string
  email?: string
  address?: string
  vatNumber?: string
  paymentTerms?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  companyId: string
  nameAr: string
  nameEn: string
  type: 'ITEM' | 'EXPENSE' | 'RECIPE'
  parentId?: string
  createdAt: string
}

export interface InventoryItem {
  id: string
  companyId: string
  code: string
  nameAr: string
  nameEn: string
  categoryId?: string
  category?: Category
  unit: string
  unitCost: number
  currentStock: number
  minStock: number
  maxStock?: number
  reorderPoint: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface RevenueEntry {
  id: string
  branchId: string
  branch?: Branch
  date: string
  source: 'DINE_IN' | 'TAKEAWAY' | 'DELIVERY' | 'AGGREGATORS' | 'CATERING' | 'ONLINE' | 'OTHER'
  grossAmount: number
  discount: number
  netAmount: number
  vatAmount: number
  totalAmount: number
  transactionCount?: number
  notes?: string
  createdBy: string
  createdAt: string
}

export interface PurchaseInvoice {
  id: string
  branchId: string
  branch?: Branch
  supplierId: string
  supplier?: Supplier
  invoiceNumber: string
  invoiceDate: string
  dueDate?: string
  subtotal: number
  vatAmount: number
  totalAmount: number
  paymentMethod?: string
  paymentStatus: 'UNPAID' | 'PAID' | 'PARTIALLY_PAID'
  notes?: string
  items: PurchaseInvoiceItem[]
  createdAt: string
}

export interface PurchaseInvoiceItem {
  id: string
  invoiceId: string
  itemId: string
  item?: InventoryItem
  quantity: number
  unitPrice: number
  vatRate: number
  vatAmount: number
  totalPrice: number
}

export interface StockMovement {
  id: string
  itemId: string
  item?: InventoryItem
  branchId: string
  branch?: Branch
  type: 'IN' | 'OUT' | 'ADJUSTMENT' | 'TRANSFER'
  quantity: number
  unitCost: number
  totalCost: number
  referenceType?: string
  referenceId?: string
  notes?: string
  date: string
  createdAt: string
}

export interface PhysicalCount {
  id: string
  branchId: string
  branch?: Branch
  countDate: string
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED'
  items: PhysicalCountItem[]
  createdBy: string
  createdAt: string
}

export interface PhysicalCountItem {
  id: string
  countId: string
  itemId: string
  item?: InventoryItem
  systemQty: number
  actualQty: number
  variance: number
  unitCost: number
  varianceCost: number
  notes?: string
}

export interface Recipe {
  id: string
  companyId: string
  code: string
  nameAr: string
  nameEn: string
  categoryId?: string
  portionSize: number
  portionUnit: string
  costPerPortion: number
  sellingPrice: number
  foodCostPercentage: number
  isActive: boolean
  ingredients: RecipeIngredient[]
  createdAt: string
}

export interface RecipeIngredient {
  id: string
  recipeId: string
  itemId: string
  item?: InventoryItem
  quantity: number
  unit: string
  yieldPercentage: number
  wastagePercentage: number
  unitCost: number
  totalCost: number
}

export interface Expense {
  id: string
  branchId: string
  branch?: Branch
  categoryId: string
  category?: Category
  date: string
  amount: number
  vatAmount: number
  totalAmount: number
  payee?: string
  paymentMethod?: string
  description?: string
  notes?: string
  createdBy: string
  createdAt: string
}

export interface Employee {
  id: string
  branchId: string
  branch?: Branch
  employeeId: string
  nameAr: string
  nameEn: string
  position: string
  department?: string
  hireDate: string
  baseSalary: number
  housingAllowance: number
  transportAllowance: number
  foodAllowance: number
  otherAllowances: number
  isActive: boolean
  phone?: string
  email?: string
  createdAt: string
}

export interface PayrollRun {
  id: string
  branchId: string
  branch?: Branch
  month: number
  year: number
  status: 'DRAFT' | 'APPROVED' | 'PAID'
  totalBaseSalary: number
  totalAllowances: number
  totalOvertime: number
  totalDeductions: number
  totalNetSalary: number
  items: PayrollItem[]
  createdAt: string
}

export interface PayrollItem {
  id: string
  payrollRunId: string
  employeeId: string
  employee?: Employee
  baseSalary: number
  housingAllowance: number
  transportAllowance: number
  foodAllowance: number
  otherAllowances: number
  overtime: number
  deductions: number
  netSalary: number
}

export interface Account {
  id: string
  companyId: string
  code: string
  nameAr: string
  nameEn: string
  type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE'
  parentId?: string
  balance: number
  isActive: boolean
  children?: Account[]
}

export interface JournalEntry {
  id: string
  companyId: string
  entryDate: string
  reference?: string
  description: string
  status: 'DRAFT' | 'POSTED'
  lines: JournalEntryLine[]
  totalDebit: number
  totalCredit: number
  createdAt: string
}

export interface JournalEntryLine {
  id: string
  entryId: string
  accountId: string
  account?: Account
  debit: number
  credit: number
  description?: string
}

export interface BankAccount {
  id: string
  companyId: string
  bankName: string
  accountName: string
  accountNumber: string
  iban?: string
  currency: string
  balance: number
  isActive: boolean
}

export interface Alert {
  id: string
  companyId: string
  type: string
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  title: string
  message: string
  isRead: boolean
  relatedId?: string
  relatedType?: string
  createdAt: string
}

export interface DashboardData {
  todaySales: number
  yesterdaySales: number
  mtdSales: number
  lastWeekSameDay: number
  lastMonthSameDay: number
  revenueBySource: { source: string; amount: number; percentage: number }[]
  todayExpenses: number
  mtdExpenses: number
  foodCost: number
  foodCostPercentage: number
  laborCost: number
  laborCostPercentage: number
  primeCost: number
  primeCostPercentage: number
  inventoryValue: number
  lowStockCount: number
  expiringCount: number
  grossProfit: number
  netProfit: number
  profitMargin: number
  salesTrend: { date: string; amount: number }[]
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  message: string
  code?: string
  field?: string
}
