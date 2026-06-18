import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useLang } from '@/hooks/useLang'
import {
  LayoutDashboard, TrendingUp, DollarSign, ShoppingCart, Package,
  UtensilsCrossed, Calculator, Receipt, Users, Building2, ChevronDown,
  Store, GitBranch, Bell, BookOpen, Banknote, BarChart3, FileText,
  Warehouse, ClipboardList, ChefHat, Settings, X
} from 'lucide-react'
import { useState } from 'react'

interface NavItem {
  labelAr: string
  labelEn: string
  path?: string
  icon?: React.ComponentType<{ className?: string }>
  children?: NavItem[]
}

const navItems: NavItem[] = [
  { labelAr: 'لوحة التحكم', labelEn: 'Dashboard', path: '/', icon: LayoutDashboard },
  { labelAr: 'التحليلات التنفيذية', labelEn: 'Executive Analytics', path: '/analytics', icon: TrendingUp },
  {
    labelAr: 'الإيرادات', labelEn: 'Revenue', icon: DollarSign,
    children: [{ labelAr: 'إدخال الإيرادات', labelEn: 'Revenue Entry', path: '/revenue', icon: DollarSign }]
  },
  {
    labelAr: 'المشتريات', labelEn: 'Purchasing', icon: ShoppingCart,
    children: [
      { labelAr: 'فواتير الشراء', labelEn: 'Purchase Invoices', path: '/purchases', icon: Receipt },
      { labelAr: 'الموردون', labelEn: 'Suppliers', path: '/suppliers', icon: Store },
    ]
  },
  {
    labelAr: 'المخزون', labelEn: 'Inventory', icon: Package,
    children: [
      { labelAr: 'الأصناف', labelEn: 'Items', path: '/inventory/items', icon: Package },
      { labelAr: 'حركة المخزون', labelEn: 'Stock Movement', path: '/inventory/movements', icon: Warehouse },
      { labelAr: 'الجرد الفعلي', labelEn: 'Physical Count', path: '/inventory/physical-count', icon: ClipboardList },
    ]
  },
  {
    labelAr: 'التكلفة', labelEn: 'Costing', icon: Calculator,
    children: [
      { labelAr: 'الوصفات', labelEn: 'Recipes', path: '/recipes', icon: ChefHat },
      { labelAr: 'محرك التسعير', labelEn: 'Pricing Engine', path: '/pricing', icon: Calculator },
    ]
  },
  {
    labelAr: 'المصروفات', labelEn: 'Expenses', icon: Receipt,
    children: [{ labelAr: 'المصروفات', labelEn: 'Expenses', path: '/expenses', icon: Receipt }]
  },
  {
    labelAr: 'الموارد البشرية', labelEn: 'HR', icon: Users,
    children: [
      { labelAr: 'الموظفون', labelEn: 'Employees', path: '/employees', icon: Users },
      { labelAr: 'الرواتب', labelEn: 'Payroll', path: '/payroll', icon: Banknote },
    ]
  },
  {
    labelAr: 'المحاسبة', labelEn: 'Accounting', icon: BookOpen,
    children: [
      { labelAr: 'دليل الحسابات', labelEn: 'Chart of Accounts', path: '/accounting/accounts', icon: BookOpen },
      { labelAr: 'قيود اليومية', labelEn: 'Journal Entries', path: '/accounting/journal', icon: FileText },
      { labelAr: 'الحسابات البنكية', labelEn: 'Bank Accounts', path: '/accounting/banks', icon: Banknote },
    ]
  },
  {
    labelAr: 'التقارير', labelEn: 'Reports', icon: BarChart3,
    children: [
      { labelAr: 'الأرباح والخسائر', labelEn: 'P&L Report', path: '/reports/pl', icon: TrendingUp },
      { labelAr: 'ميزان المراجعة', labelEn: 'Trial Balance', path: '/reports/trial-balance', icon: BarChart3 },
      { labelAr: 'تقرير الإيرادات', labelEn: 'Revenue Report', path: '/reports/revenue', icon: DollarSign },
      { labelAr: 'تقرير المصروفات', labelEn: 'Expense Report', path: '/reports/expenses', icon: Receipt },
      { labelAr: 'تقرير المخزون', labelEn: 'Inventory Report', path: '/reports/inventory', icon: Package },
      { labelAr: 'تقرير الرواتب', labelEn: 'Payroll Report', path: '/reports/payroll', icon: Users },
      { labelAr: 'تقرير تكلفة الطعام', labelEn: 'Food Cost Report', path: '/reports/food-cost', icon: ChefHat },
      { labelAr: 'تقرير ضريبة القيمة المضافة', labelEn: 'VAT Report', path: '/reports/vat', icon: Calculator },
    ]
  },
  {
    labelAr: 'الإعدادات', labelEn: 'Settings', icon: Settings,
    children: [
      { labelAr: 'المطاعم', labelEn: 'Restaurants', path: '/setup/restaurants', icon: Store },
      { labelAr: 'الفروع', labelEn: 'Branches', path: '/setup/branches', icon: GitBranch },
      { labelAr: 'المستخدمون', labelEn: 'Users', path: '/users', icon: Users },
      { labelAr: 'التنبيهات', labelEn: 'Alerts', path: '/alerts', icon: Bell },
    ]
  },
]

interface SidebarProps {
  onClose?: () => void
}

export default function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation()
  const { lang } = useLang()
  const [openSections, setOpenSections] = useState<string[]>(['الإيرادات', 'المشتريات'])

  const toggleSection = (label: string) => {
    setOpenSections(prev => prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label])
  }

  const isActive = (path?: string) => path && location.pathname === path

  return (
    <aside className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg">م</div>
          <div>
            <p className="font-bold text-sm leading-tight">{lang === 'ar' ? 'مطعمي ERP' : "Mat'ami ERP"}</p>
            <p className="text-xs text-muted-foreground">{lang === 'ar' ? 'إدارة المطاعم' : 'Restaurant Management'}</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded hover:bg-sidebar-accent lg:hidden">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {navItems.map((item) => {
          if (!item.children) {
            return (
              <Link
                key={item.path}
                to={item.path!}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors mb-0.5",
                  isActive(item.path)
                    ? "bg-primary text-white font-medium"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
              </Link>
            )
          }

          const isOpen = openSections.includes(item.labelAr)
          const hasActive = item.children.some(c => isActive(c.path))

          return (
            <div key={item.labelAr} className="mb-0.5">
              <button
                onClick={() => toggleSection(item.labelAr)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  hasActive ? "text-primary font-medium" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                <span className="flex-1 text-start">{lang === 'ar' ? item.labelAr : item.labelEn}</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
              </button>
              {isOpen && (
                <div className="ms-3 border-s border-sidebar-border ps-3 mt-0.5 space-y-0.5">
                  {item.children.map(child => (
                    <Link
                      key={child.path}
                      to={child.path!}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        isActive(child.path)
                          ? "bg-primary text-white font-medium"
                          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      {child.icon && <child.icon className="h-4 w-4 shrink-0" />}
                      <span>{lang === 'ar' ? child.labelAr : child.labelEn}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-2">
        <div className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground">
          <Building2 className="h-3 w-3" />
          <span>{lang === 'ar' ? 'مطعمي ERP v1.0' : "Mat'ami ERP v1.0"}</span>
        </div>
      </div>
    </aside>
  )
}
