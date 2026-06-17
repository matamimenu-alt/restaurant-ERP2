import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import StatCard from '@/components/shared/StatCard'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { DollarSign, TrendingUp, TrendingDown, Package, Users, AlertTriangle, ShoppingCart } from 'lucide-react'
import CurrencyDisplay from '@/components/shared/CurrencyDisplay'

const SOURCE_LABELS: Record<string, { ar: string; en: string; color: string }> = {
  CASH: { ar: 'نقدي', en: 'Cash', color: '#16a34a' },
  CARD: { ar: 'بطاقة', en: 'Card', color: '#2563eb' },
  BANK_TRANSFER: { ar: 'تحويل بنكي', en: 'Bank Transfer', color: '#7c3aed' },
  HUNGER_STATION: { ar: 'هنقرستيشن', en: 'HungerStation', color: '#ea580c' },
  JAHEZ: { ar: 'جاهز', en: 'Jahez', color: '#d97706' },
  TOYOU: { ar: 'توصيل', en: 'ToYou', color: '#0891b2' },
  NOON: { ar: 'نون', en: 'Noon', color: '#be185d' },
  CAREEM: { ar: 'كريم', en: 'Careem', color: '#65a30d' },
  OTHER: { ar: 'أخرى', en: 'Other', color: '#64748b' },
}

export default function DashboardPage() {
  const { lang } = useLang()
  const [selectedDate] = useState(new Date().toISOString().split('T')[0])

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-flash', selectedDate],
    queryFn: () => api.get(`/api/v1/dashboard/flash?date=${selectedDate}`).then(r => r.data.data),
    refetchInterval: 300000,
  })

  if (isLoading) return <LoadingSpinner />

  const flash = data || {}
  const sales = flash.sales || {}
  const expenses = flash.expenses || {}
  const foodCost = flash.foodCost || {}
  const laborCost = flash.laborCost || {}
  const primeCost = flash.primeCost || {}
  const inventory = flash.inventory || {}
  const profitability = flash.profitability || {}
  const salesBySource = flash.salesBySource || []

  const pieData = salesBySource
    .filter((s: { amount: number }) => s.amount > 0)
    .map((s: { source: string; amount: number }) => ({
      name: lang === 'ar' ? (SOURCE_LABELS[s.source]?.ar || s.source) : (SOURCE_LABELS[s.source]?.en || s.source),
      value: s.amount,
      color: SOURCE_LABELS[s.source]?.color || '#64748b',
    }))

  const salesComparisonData = [
    { name: lang === 'ar' ? 'اليوم' : 'Today', value: sales.today || 0 },
    { name: lang === 'ar' ? 'أمس' : 'Yesterday', value: sales.yesterday || 0 },
    { name: lang === 'ar' ? 'نفس يوم الأسبوع الماضي' : 'Last Week', value: sales.sameLastWeek || 0 },
    { name: lang === 'ar' ? 'نفس يوم الشهر الماضي' : 'Last Month', value: sales.sameLastMonth || 0 },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'لوحة التحكم - التقرير اليومي' : 'Dashboard - Daily Flash Report'}
        subtitle={lang === 'ar' ? `تقرير يوم ${new Date().toLocaleDateString('ar-SA')}` : `Report for ${new Date().toLocaleDateString()}`}
      />

      {/* Sales KPIs */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
          {lang === 'ar' ? 'المبيعات' : 'Sales'}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title={lang === 'ar' ? 'مبيعات اليوم' : "Today's Sales"}
            value={<CurrencyDisplay amount={sales.today || 0} />}
            icon={DollarSign} color="green"
          />
          <StatCard
            title={lang === 'ar' ? 'مبيعات أمس' : "Yesterday's Sales"}
            value={<CurrencyDisplay amount={sales.yesterday || 0} />}
            icon={DollarSign}
          />
          <StatCard
            title={lang === 'ar' ? 'نفس اليوم الأسبوع الماضي' : 'Same Day Last Week'}
            value={<CurrencyDisplay amount={sales.sameLastWeek || 0} />}
            icon={DollarSign}
          />
          <StatCard
            title={lang === 'ar' ? 'نفس اليوم الشهر الماضي' : 'Same Day Last Month'}
            value={<CurrencyDisplay amount={sales.sameLastMonth || 0} />}
            icon={DollarSign}
          />
          <StatCard
            title={lang === 'ar' ? 'مبيعات الشهر حتى اليوم' : 'Month-To-Date Sales'}
            value={<CurrencyDisplay amount={sales.mtd || 0} />}
            icon={TrendingUp} color="blue"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{lang === 'ar' ? 'مقارنة المبيعات' : 'Sales Comparison'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={salesComparisonData}>
                <XAxis dataKey="name" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip formatter={(v: number) => `${v.toLocaleString()} SAR`} />
                <Bar dataKey="value" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{lang === 'ar' ? 'توزيع الإيرادات حسب المصدر' : 'Revenue by Source'}</CardTitle>
          </CardHeader>
          <CardContent>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} fontSize={11}>
                    {pieData.map((entry: { color: string }, index: number) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v.toLocaleString()} SAR`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[220px] text-muted-foreground text-sm">
                {lang === 'ar' ? 'لا توجد بيانات' : 'No data'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Source Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{lang === 'ar' ? 'تفصيل الإيرادات' : 'Revenue Breakdown'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {Object.entries(SOURCE_LABELS).map(([key, labels]) => {
              const src = salesBySource.find((s: { source: string }) => s.source === key)
              const amount = src?.amount || 0
              const total = sales.today || 1
              const pct = total > 0 ? ((amount / total) * 100).toFixed(1) : '0.0'
              return (
                <div key={key} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: labels.color }} />
                    <span className="text-sm">{lang === 'ar' ? labels.ar : labels.en}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{pct}%</span>
                    <span className="text-sm font-medium w-32 text-end"><CurrencyDisplay amount={amount} /></span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Cost & Profitability */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
          {lang === 'ar' ? 'التكاليف والربحية' : 'Costs & Profitability'}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={lang === 'ar' ? 'تكلفة الطعام' : 'Food Cost'}
            value={<CurrencyDisplay amount={foodCost.amount || 0} />}
            subtitle={`${foodCost.percent || 0}%`}
            icon={ShoppingCart}
            color={foodCost.percent > 35 ? 'red' : 'green'}
          />
          <StatCard
            title={lang === 'ar' ? 'تكلفة العمالة' : 'Labor Cost'}
            value={<CurrencyDisplay amount={laborCost.amount || 0} />}
            subtitle={`${laborCost.percent || 0}%`}
            icon={Users}
            color={laborCost.percent > 30 ? 'red' : 'yellow'}
          />
          <StatCard
            title={lang === 'ar' ? 'التكلفة الأولية' : 'Prime Cost'}
            value={<CurrencyDisplay amount={primeCost.amount || 0} />}
            subtitle={`${primeCost.percent || 0}%`}
            icon={Package}
            color={primeCost.percent > 65 ? 'red' : 'blue'}
          />
          <StatCard
            title={lang === 'ar' ? 'مصروفات اليوم' : "Today's Expenses"}
            value={<CurrencyDisplay amount={expenses.today || 0} />}
            subtitle={lang === 'ar' ? `شهري: ${(expenses.mtd || 0).toLocaleString()}` : `MTD: ${(expenses.mtd || 0).toLocaleString()}`}
            icon={TrendingDown} color="red"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <StatCard
          title={lang === 'ar' ? 'إجمالي الربح' : 'Gross Profit'}
          value={<CurrencyDisplay amount={profitability.grossProfit || 0} />}
          icon={TrendingUp}
          color={profitability.grossProfit >= 0 ? 'green' : 'red'}
        />
        <StatCard
          title={lang === 'ar' ? 'صافي الربح' : 'Net Profit'}
          value={<CurrencyDisplay amount={profitability.netProfit || 0} />}
          icon={TrendingUp}
          color={profitability.netProfit >= 0 ? 'green' : 'red'}
        />
        <StatCard
          title={lang === 'ar' ? 'هامش الربح' : 'Profit Margin'}
          value={`${profitability.profitMargin || 0}%`}
          icon={TrendingUp}
          color={profitability.profitMargin >= 10 ? 'green' : profitability.profitMargin >= 0 ? 'yellow' : 'red'}
        />
      </div>

      {/* Inventory Alert */}
      {(inventory.lowStockCount || 0) > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="flex items-center gap-3 p-4">
            <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0" />
            <div>
              <p className="font-medium text-yellow-800">
                {lang === 'ar'
                  ? `تحذير: ${inventory.lowStockCount} صنف تحت الحد الأدنى للمخزون`
                  : `Warning: ${inventory.lowStockCount} items below minimum stock level`}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
