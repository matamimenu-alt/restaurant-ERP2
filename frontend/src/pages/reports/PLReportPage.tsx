import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import CurrencyDisplay from '@/components/shared/CurrencyDisplay'
import ExportButtons from '@/components/shared/ExportButtons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TrendingUp } from 'lucide-react'

export default function PLReportPage() {
  const { lang } = useLang()
  const today = new Date()
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]
  const [from, setFrom] = useState(firstOfMonth)
  const [to, setTo] = useState(today.toISOString().split('T')[0])
  const [restaurantId, setRestaurantId] = useState('')

  const { data: restaurants } = useQuery({ queryKey: ['restaurants'], queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data) })

  const params = new URLSearchParams({ from, to })
  if (restaurantId) params.set('restaurantId', restaurantId)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['pl-report', from, to, restaurantId],
    queryFn: () => api.get(`/api/v1/reports/pl?${params}`).then(r => r.data.data),
    enabled: !!from && !!to,
  })

  const Section = ({ titleAr, titleEn, rows, total, totalAr, totalEn, highlight }: {
    titleAr: string; titleEn: string
    rows: {labelAr: string; labelEn: string; amount: number}[]
    total: number; totalAr: string; totalEn: string
    highlight?: 'green' | 'red'
  }) => (
    <div className="space-y-1">
      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">{lang === 'ar' ? titleAr : titleEn}</h3>
      {rows.map((row, i) => (
        <div key={i} className="flex justify-between py-1 border-b border-dashed text-sm">
          <span>{lang === 'ar' ? row.labelAr : row.labelEn}</span>
          <span className="font-medium"><CurrencyDisplay amount={row.amount} /></span>
        </div>
      ))}
      <div className={`flex justify-between py-2 font-bold text-base ${highlight === 'green' ? 'text-green-700' : highlight === 'red' ? 'text-red-700' : ''}`}>
        <span>{lang === 'ar' ? totalAr : totalEn}</span>
        <CurrencyDisplay amount={total} />
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'قائمة الأرباح والخسائر' : 'Profit & Loss Statement'}
        actions={data && <ExportButtons data={[data]} filename="pl-report" />}
      />

      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-1"><Label className="text-xs">{lang === 'ar' ? 'من' : 'From'}</Label><Input type="date" value={from} onChange={e => setFrom(e.target.value)} className="w-36" /></div>
        <div className="space-y-1"><Label className="text-xs">{lang === 'ar' ? 'إلى' : 'To'}</Label><Input type="date" value={to} onChange={e => setTo(e.target.value)} className="w-36" /></div>
        <div className="space-y-1">
          <Label className="text-xs">{lang === 'ar' ? 'المطعم' : 'Restaurant'}</Label>
          <Select value={restaurantId} onValueChange={setRestaurantId}>
            <SelectTrigger className="w-44"><SelectValue placeholder={lang === 'ar' ? 'الكل' : 'All'} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">{lang === 'ar' ? 'الكل' : 'All'}</SelectItem>
              {Array.isArray(restaurants) && restaurants.map((r: {id: string; nameAr: string; nameEn: string}) => <SelectItem key={r.id} value={r.id}>{lang === 'ar' ? r.nameAr : r.nameEn}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => refetch()}><TrendingUp className="h-4 w-4 me-2" />{lang === 'ar' ? 'عرض' : 'Generate'}</Button>
      </div>

      {isLoading ? <LoadingSpinner /> : data && (
        <Card>
          <CardHeader><CardTitle className="text-center">{lang === 'ar' ? 'قائمة الأرباح والخسائر' : 'Profit & Loss Statement'}</CardTitle>
            <p className="text-center text-sm text-muted-foreground">{from} — {to}</p>
          </CardHeader>
          <CardContent className="space-y-6 max-w-2xl mx-auto">
            <Section
              titleAr="الإيرادات" titleEn="Revenue"
              rows={(data.revenueBySource || []).map((s: {sourceAr: string; sourceEn: string; amount: number}) => ({ labelAr: s.sourceAr, labelEn: s.sourceEn, amount: s.amount }))}
              total={data.totalRevenue} totalAr="إجمالي الإيرادات" totalEn="Total Revenue" highlight="green"
            />
            <Section
              titleAr="تكلفة البضاعة المباعة" titleEn="Cost of Goods Sold"
              rows={[{ labelAr: 'المشتريات', labelEn: 'Purchases', amount: data.totalPurchases || 0 }]}
              total={data.totalCOGS} totalAr="إجمالي التكلفة" totalEn="Total COGS" highlight="red"
            />
            <div className="bg-blue-50 rounded-lg p-4 flex justify-between items-center">
              <span className="font-bold">{lang === 'ar' ? 'مجمل الربح' : 'Gross Profit'}</span>
              <span className="text-xl font-bold text-blue-700"><CurrencyDisplay amount={data.grossProfit} /></span>
            </div>
            <Section
              titleAr="المصروفات التشغيلية" titleEn="Operating Expenses"
              rows={(data.expensesByCategory || []).map((e: {categoryAr: string; categoryEn: string; amount: number}) => ({ labelAr: e.categoryAr, labelEn: e.categoryEn, amount: e.amount }))}
              total={data.totalExpenses} totalAr="إجمالي المصروفات" totalEn="Total Expenses" highlight="red"
            />
            <Section
              titleAr="مصروفات الرواتب" titleEn="Payroll Expenses"
              rows={[{ labelAr: 'رواتب الموظفين', labelEn: 'Employee Salaries', amount: data.totalPayroll || 0 }]}
              total={data.totalPayroll || 0} totalAr="إجمالي الرواتب" totalEn="Total Payroll" highlight="red"
            />
            <div className={`rounded-lg p-4 flex justify-between items-center ${data.netProfit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <span className="font-bold text-lg">{lang === 'ar' ? 'صافي الربح' : 'Net Profit'}</span>
              <div className="text-end">
                <span className={`text-2xl font-bold ${data.netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}><CurrencyDisplay amount={data.netProfit} /></span>
                <p className="text-sm text-muted-foreground">{data.netMargin?.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
