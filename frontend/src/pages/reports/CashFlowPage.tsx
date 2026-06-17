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
import { Waves } from 'lucide-react'

export default function CashFlowPage() {
  const { lang } = useLang()
  const today = new Date()
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]
  const [from, setFrom] = useState(firstOfMonth)
  const [to, setTo] = useState(today.toISOString().split('T')[0])

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cash-flow', from, to],
    queryFn: () => api.get(`/api/v1/reports/cash-flow?from=${from}&to=${to}`).then(r => r.data.data),
    enabled: !!from && !!to,
  })

  const FlowSection = ({ titleAr, titleEn, items, total, totalAr, totalEn, color }: {
    titleAr: string; titleEn: string
    items: {labelAr: string; labelEn: string; amount: number}[]
    total: number; totalAr: string; totalEn: string; color: string
  }) => (
    <Card>
      <CardHeader><CardTitle className={`text-sm ${color}`}>{lang === 'ar' ? titleAr : titleEn}</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm py-1 border-b border-dashed">
            <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
            <span className={`font-medium ${item.amount < 0 ? 'text-red-600' : ''}`}><CurrencyDisplay amount={item.amount} /></span>
          </div>
        ))}
        <div className={`flex justify-between font-bold mt-2 pt-2 border-t ${color}`}>
          <span>{lang === 'ar' ? totalAr : totalEn}</span>
          <CurrencyDisplay amount={total} />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'قائمة التدفقات النقدية' : 'Cash Flow Statement'}
        actions={data && <ExportButtons data={[data]} filename="cash-flow" />}
      />

      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-1"><Label className="text-xs">{lang === 'ar' ? 'من' : 'From'}</Label><Input type="date" value={from} onChange={e => setFrom(e.target.value)} className="w-36" /></div>
        <div className="space-y-1"><Label className="text-xs">{lang === 'ar' ? 'إلى' : 'To'}</Label><Input type="date" value={to} onChange={e => setTo(e.target.value)} className="w-36" /></div>
        <Button onClick={() => refetch()}><Waves className="h-4 w-4 me-2" />{lang === 'ar' ? 'عرض' : 'Generate'}</Button>
      </div>

      {isLoading ? <LoadingSpinner /> : data && (
        <div className="space-y-4">
          <FlowSection
            titleAr="التدفقات من الأنشطة التشغيلية" titleEn="Operating Activities"
            items={[
              { labelAr: 'إيرادات المبيعات', labelEn: 'Sales Revenue', amount: data.cashFromRevenue || 0 },
              { labelAr: 'مدفوعات المشتريات', labelEn: 'Purchases Paid', amount: -(data.cashForPurchases || 0) },
              { labelAr: 'مدفوعات المصروفات', labelEn: 'Expenses Paid', amount: -(data.cashForExpenses || 0) },
              { labelAr: 'مدفوعات الرواتب', labelEn: 'Payroll Paid', amount: -(data.cashForPayroll || 0) },
            ]}
            total={data.netOperating || 0} totalAr="صافي التشغيل" totalEn="Net Operating" color="text-blue-700"
          />
          <div className={`rounded-lg p-4 flex justify-between items-center font-bold text-lg ${(data.netCashFlow || 0) >= 0 ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <span>{lang === 'ar' ? 'صافي التدفق النقدي' : 'Net Cash Flow'}</span>
            <CurrencyDisplay amount={data.netCashFlow || 0} />
          </div>
        </div>
      )}
    </div>
  )
}
