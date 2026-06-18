import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import AnalyticsPage from '@/pages/analytics/AnalyticsPage'
import RevenuePage from '@/pages/revenue/RevenuePage'
import PurchasesPage from '@/pages/purchasing/PurchasesPage'
import SuppliersPage from '@/pages/suppliers/SuppliersPage'
import InventoryPage from '@/pages/inventory/InventoryPage'
import ItemsPage from '@/pages/inventory/ItemsPage'
import StockMovementPage from '@/pages/inventory/StockMovementPage'
import PhysicalCountPage from '@/pages/inventory/PhysicalCountPage'
import RecipesPage from '@/pages/recipes/RecipesPage'
import PricingPage from '@/pages/pricing/PricingPage'
import ExpensesPage from '@/pages/expenses/ExpensesPage'
import EmployeesPage from '@/pages/employees/EmployeesPage'
import PayrollPage from '@/pages/payroll/PayrollPage'
import AccountsPage from '@/pages/accounting/AccountsPage'
import JournalEntriesPage from '@/pages/accounting/JournalEntriesPage'
import BankAccountsPage from '@/pages/accounting/BankAccountsPage'
import PLReportPage from '@/pages/reports/PLReportPage'
import BalanceSheetPage from '@/pages/reports/BalanceSheetPage'
import CashFlowPage from '@/pages/reports/CashFlowPage'
import TrialBalancePage from '@/pages/reports/TrialBalancePage'
import RevenueReportPage from '@/pages/reports/RevenueReportPage'
import ExpenseReportPage from '@/pages/reports/ExpenseReportPage'
import InventoryReportPage from '@/pages/reports/InventoryReportPage'
import PayrollReportPage from '@/pages/reports/PayrollReportPage'
import FoodCostReportPage from '@/pages/reports/FoodCostReportPage'
import VatReportPage from '@/pages/reports/VatReportPage'
import CompanyPage from '@/pages/setup/CompanyPage'
import RestaurantsPage from '@/pages/setup/RestaurantsPage'
import BranchesPage from '@/pages/setup/BranchesPage'
import UsersPage from '@/pages/users/UsersPage'
import AlertsPage from '@/pages/alerts/AlertsPage'
import ImportPage from '@/pages/imports/ImportPage'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route
        path="/"
        element={<AppLayout />}
      >
        <Route index element={<DashboardPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="revenue" element={<RevenuePage />} />
        <Route path="purchases" element={<PurchasesPage />} />
        <Route path="suppliers" element={<SuppliersPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="inventory/items" element={<ItemsPage />} />
        <Route path="inventory/movements" element={<StockMovementPage />} />
        <Route path="inventory/physical-count" element={<PhysicalCountPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="expenses" element={<ExpensesPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="payroll" element={<PayrollPage />} />
        <Route path="accounting/accounts" element={<AccountsPage />} />
        <Route path="accounting/journal" element={<JournalEntriesPage />} />
        <Route path="accounting/banks" element={<BankAccountsPage />} />
        <Route path="reports/pl" element={<PLReportPage />} />
        <Route path="reports/balance-sheet" element={<BalanceSheetPage />} />
        <Route path="reports/cash-flow" element={<CashFlowPage />} />
        <Route path="reports/trial-balance" element={<TrialBalancePage />} />
        <Route path="reports/revenue" element={<RevenueReportPage />} />
        <Route path="reports/expenses" element={<ExpenseReportPage />} />
        <Route path="reports/inventory" element={<InventoryReportPage />} />
        <Route path="reports/payroll" element={<PayrollReportPage />} />
        <Route path="reports/food-cost" element={<FoodCostReportPage />} />
        <Route path="reports/vat" element={<VatReportPage />} />
        <Route path="setup/company" element={<CompanyPage />} />
        <Route path="setup/restaurants" element={<RestaurantsPage />} />
        <Route path="setup/branches" element={<BranchesPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="imports" element={<ImportPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
