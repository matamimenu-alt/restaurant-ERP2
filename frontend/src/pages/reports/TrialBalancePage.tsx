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
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Scale } from 'lucide-react'

const TYPE_LABELS_AR: Record<string, string> = {
  ASSET: 'أصول', LIABILITY: 'خصوم', EQUITY: 'حقوق ملكية', REVENUE: 'إيرادات', EXPENSE: 'مصروفات'
}

export default function TrialBalancePage() {
  const { lang } = useLang()
  const [asOf, setAsOf] = useState(new Date().toISOString().split('T')[0])

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['trial-balance', asOf],
    queryFn: () => api.get(`/api/v1/reports/trial-balance?asOf=${asOf}`).then(r => r.data.data),
    enabled: !!asOf,
  })

  const accounts = data?.accounts || []
  const totalDebit = accounts.filter((a: {normalBalance: string; balance: number}) => a.normalBalance === 'DEBIT').reduce((s: number, a: {balance: number}) => s + a.balance, 0)
  const totalCredit = accounts.filter((a: {normalBalance: string; balance: number}) => a.normalBalance === 'CREDIT').reduce((s: number, a: {balance: number}) => s + a.balance, 0)
  const isBalanced = Math.abs(totalDebit - totalCredit) < 1

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'ميزان المراجعة' : 'Trial Balance'}
        actions={data && <ExportButtons data={accounts} filename="trial-balance" />}
      />

      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-1"><Label className="text-xs">{lang === 'ar' ? 'بتاريخ' : 'As of'}</Label><Input type="date" value={asOf} onChange={e => setAsOf(e.target.value)} className="w-36" /></div>
        <Button onClick={() => refetch()}><Scale className="h-4 w-4 me-2" />{lang === 'ar' ? 'عرض' : 'Generate'}</Button>
      </div>

      {isLoading ? <LoadingSpinner /> : data && (
        <>
          {isBalanced ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-800 text-sm font-medium">
              ✓ {lang === 'ar' ? 'الميزان متوازن' : 'Trial balance is balanced'}
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm font-medium">
              ⚠ {lang === 'ar' ? 'تحذير: الميزان غير متوازن' : 'Warning: Trial balance is not balanced'}
            </div>
          )}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{lang === 'ar' ? 'الرمز' : 'Code'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'اسم الحساب' : 'Account Name'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'النوع' : 'Type'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'مدين' : 'Debit'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'دائن' : 'Credit'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((row: Record<string, unknown>) => (
                  <TableRow key={row.id as string}>
                    <TableCell className="font-mono text-sm">{row.code as string}</TableCell>
                    <TableCell>{lang === 'ar' ? row.nameAr as string : row.nameEn as string}</TableCell>
                    <TableCell><Badge variant="secondary">{lang === 'ar' ? TYPE_LABELS_AR[row.type as string] : row.type as string}</Badge></TableCell>
                    <TableCell>{row.normalBalance === 'DEBIT' ? <CurrencyDisplay amount={row.balance as number} /> : '-'}</TableCell>
                    <TableCell>{row.normalBalance === 'CREDIT' ? <CurrencyDisplay amount={row.balance as number} /> : '-'}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold bg-muted/50 text-base">
                  <TableCell colSpan={3}>{lang === 'ar' ? 'المجموع' : 'Total'}</TableCell>
                  <TableCell><CurrencyDisplay amount={totalDebit} /></TableCell>
                  <TableCell><CurrencyDisplay amount={totalCredit} /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </>
      )}
    </div>
  )
}
