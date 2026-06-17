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
import { BarChart3 } from 'lucide-react'

export default function BalanceSheetPage() {
  const { lang } = useLang()
  const [asOf, setAsOf] = useState(new Date().toISOString().split('T')[0])

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['balance-sheet', asOf],
    queryFn: () => api.get(`/api/v1/reports/balance-sheet?asOf=${asOf}`).then(r => r.data.data),
    enabled: !!asOf,
  })

  const Section = ({ titleAr, titleEn, accounts, total, totalAr, totalEn, color }: {
    titleAr: string; titleEn: string
    accounts: {code: string; nameAr: string; nameEn: string; balance: number}[]
    total: number; totalAr: string; totalEn: string; color: string
  }) => (
    <div>
      <h3 className={`font-bold text-base mb-2 ${color}`}>{lang === 'ar' ? titleAr : titleEn}</h3>
      <div className="space-y-1 ps-4">
        {accounts.map((a, i) => (
          <div key={i} className="flex justify-between text-sm py-1 border-b border-dashed">
            <span>{a.code} — {lang === 'ar' ? a.nameAr : a.nameEn}</span>
            <span className="font-medium"><CurrencyDisplay amount={a.balance} /></span>
          </div>
        ))}
      </div>
      <div className={`flex justify-between font-bold mt-2 py-2 border-t-2 ${color}`}>
        <span>{lang === 'ar' ? totalAr : totalEn}</span>
        <CurrencyDisplay amount={total} />
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'الميزانية العمومية' : 'Balance Sheet'}
        actions={data && <ExportButtons data={[data]} filename="balance-sheet" />}
      />

      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-1"><Label className="text-xs">{lang === 'ar' ? 'بتاريخ' : 'As of'}</Label><Input type="date" value={asOf} onChange={e => setAsOf(e.target.value)} className="w-36" /></div>
        <Button onClick={() => refetch()}><BarChart3 className="h-4 w-4 me-2" />{lang === 'ar' ? 'عرض' : 'Generate'}</Button>
      </div>

      {isLoading ? <LoadingSpinner /> : data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="text-blue-700">{lang === 'ar' ? 'الأصول' : 'Assets'}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Section titleAr="الأصول المتداولة" titleEn="Current Assets" accounts={data.currentAssets || []} total={data.totalCurrentAssets || 0} totalAr="إجمالي الأصول المتداولة" totalEn="Total Current Assets" color="text-blue-600" />
              <Section titleAr="الأصول الثابتة" titleEn="Non-Current Assets" accounts={data.nonCurrentAssets || []} total={data.totalNonCurrentAssets || 0} totalAr="إجمالي الأصول الثابتة" totalEn="Total Non-Current Assets" color="text-blue-600" />
              <div className="bg-blue-50 rounded-lg p-3 flex justify-between font-bold text-blue-800">
                <span>{lang === 'ar' ? 'إجمالي الأصول' : 'Total Assets'}</span>
                <CurrencyDisplay amount={data.totalAssets || 0} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-red-700">{lang === 'ar' ? 'الخصوم وحقوق الملكية' : 'Liabilities & Equity'}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Section titleAr="الخصوم المتداولة" titleEn="Current Liabilities" accounts={data.currentLiabilities || []} total={data.totalCurrentLiabilities || 0} totalAr="إجمالي الخصوم المتداولة" totalEn="Total Current Liabilities" color="text-red-600" />
              <Section titleAr="حقوق الملكية" titleEn="Equity" accounts={data.equity || []} total={data.totalEquity || 0} totalAr="إجمالي حقوق الملكية" totalEn="Total Equity" color="text-purple-600" />
              <div className="bg-red-50 rounded-lg p-3 flex justify-between font-bold text-red-800">
                <span>{lang === 'ar' ? 'إجمالي الخصوم وحقوق الملكية' : 'Total L & E'}</span>
                <CurrencyDisplay amount={(data.totalCurrentLiabilities || 0) + (data.totalEquity || 0)} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
