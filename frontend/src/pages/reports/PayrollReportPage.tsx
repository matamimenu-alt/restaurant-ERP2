import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import EmptyState from '@/components/shared/EmptyState'
import CurrencyDisplay from '@/components/shared/CurrencyDisplay'
import ExportButtons from '@/components/shared/ExportButtons'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DollarSign } from 'lucide-react'

export default function PayrollReportPage() {
  const { lang } = useLang()
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(String(currentYear))
  const [restaurantId, setRestaurantId] = useState('')

  const { data: restaurants } = useQuery({ queryKey: ['restaurants'], queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data) })

  const params = new URLSearchParams({ year })
  if (restaurantId) params.set('restaurantId', restaurantId)

  const { data, isLoading } = useQuery({
    queryKey: ['payroll-report', year, restaurantId],
    queryFn: () => api.get(`/api/v1/payroll?${params}&limit=100`).then(r => r.data),
  })

  const runs = data?.data || []
  const totalNet = runs.reduce((s: number, r: {totalNet: number}) => s + r.totalNet, 0)

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const monthsAr = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'تقرير الرواتب' : 'Payroll Report'}
        actions={runs.length > 0 && <ExportButtons data={runs} filename="payroll-report" />}
      />

      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-1">
          <Label className="text-xs">{lang === 'ar' ? 'السنة' : 'Year'}</Label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
            <SelectContent>
              {[currentYear, currentYear - 1, currentYear - 2].map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
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
      </div>

      {!isLoading && runs.length > 0 && (
        <Card className="p-4 bg-purple-50 border-purple-200">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm text-purple-700">{lang === 'ar' ? `إجمالي الرواتب ${year}` : `Total Payroll ${year}`}</p>
              <p className="text-2xl font-bold text-purple-800"><CurrencyDisplay amount={totalNet} /></p>
            </div>
          </div>
        </Card>
      )}

      {isLoading ? <LoadingSpinner /> : runs.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا توجد بيانات رواتب' : 'No payroll data'} icon={DollarSign} />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{lang === 'ar' ? 'الشهر' : 'Month'}</TableHead>
                <TableHead>{lang === 'ar' ? 'المطعم' : 'Restaurant'}</TableHead>
                <TableHead>{lang === 'ar' ? 'عدد الموظفين' : 'Employees'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الراتب الأساسي' : 'Basic Salary'}</TableHead>
                <TableHead>{lang === 'ar' ? 'البدلات' : 'Allowances'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الاستقطاعات' : 'Deductions'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الصافي' : 'Net'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {runs.map((row: Record<string, unknown>) => (
                <TableRow key={row.id as string}>
                  <TableCell>{lang === 'ar' ? monthsAr[(row.month as number) - 1] : months[(row.month as number) - 1]}</TableCell>
                  <TableCell>{lang === 'ar' ? (row.restaurant as {nameAr: string})?.nameAr : (row.restaurant as {nameEn: string})?.nameEn}</TableCell>
                  <TableCell>{(row.lines as unknown[])?.length || 0}</TableCell>
                  <TableCell><CurrencyDisplay amount={row.totalBasicSalary as number} /></TableCell>
                  <TableCell><CurrencyDisplay amount={row.totalAllowances as number} /></TableCell>
                  <TableCell className="text-red-600"><CurrencyDisplay amount={row.totalDeductions as number} /></TableCell>
                  <TableCell className="font-bold"><CurrencyDisplay amount={row.totalNet as number} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}
