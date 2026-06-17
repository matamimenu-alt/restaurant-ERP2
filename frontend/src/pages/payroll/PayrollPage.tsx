import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import EmptyState from '@/components/shared/EmptyState'
import CurrencyDisplay from '@/components/shared/CurrencyDisplay'
import ExportButtons from '@/components/shared/ExportButtons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Eye, Trash2, DollarSign, Users } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, Controller } from 'react-hook-form'

export default function PayrollPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [detailRun, setDetailRun] = useState<Record<string, unknown> | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['payroll-runs'],
    queryFn: () => api.get('/api/v1/payroll?limit=50').then(r => r.data),
  })
  const { data: restaurants } = useQuery({ queryKey: ['restaurants'], queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data) })

  const { register, handleSubmit, control, reset } = useForm()

  const createMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => api.post('/api/v1/payroll', d),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['payroll-runs'] })
      setOpen(false)
      reset()
      toast({ title: lang === 'ar' ? 'تم إنشاء مسير الرواتب' : 'Payroll run created', variant: 'success' })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/payroll/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['payroll-runs'] }) },
  })

  const runs = data?.data || []

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1).padStart(2, '0'),
    labelAr: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'][i],
    labelEn: ['January','February','March','April','May','June','July','August','September','October','November','December'][i],
  }))

  const currentYear = new Date().getFullYear()
  const years = [currentYear, currentYear - 1, currentYear - 2].map(y => String(y))

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'الرواتب' : 'Payroll'}
        actions={
          <div className="flex gap-2">
            <ExportButtons data={runs} filename="payroll" />
            <Button onClick={() => { reset({ month: String(new Date().getMonth() + 1).padStart(2,'0'), year: String(currentYear) }); setOpen(true) }} className="gap-2">
              <Plus className="h-4 w-4" />{lang === 'ar' ? 'إنشاء مسير' : 'New Payroll Run'}
            </Button>
          </div>
        }
      />

      {isLoading ? <LoadingSpinner /> : runs.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا توجد مسيرات رواتب' : 'No payroll runs'} action={{ label: lang === 'ar' ? 'إنشاء مسير' : 'New Payroll Run', onClick: () => setOpen(true) }} icon={DollarSign} />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{lang === 'ar' ? 'الشهر' : 'Month'}</TableHead>
                <TableHead>{lang === 'ar' ? 'السنة' : 'Year'}</TableHead>
                <TableHead>{lang === 'ar' ? 'المطعم' : 'Restaurant'}</TableHead>
                <TableHead>{lang === 'ar' ? 'عدد الموظفين' : 'Employees'}</TableHead>
                <TableHead>{lang === 'ar' ? 'إجمالي الرواتب' : 'Total Salaries'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الإجمالي الكامل' : 'Grand Total'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {runs.map((row: Record<string, unknown>) => (
                <TableRow key={row.id as string}>
                  <TableCell>{months[(row.month as number) - 1]?.[lang === 'ar' ? 'labelAr' : 'labelEn']}</TableCell>
                  <TableCell>{row.year as number}</TableCell>
                  <TableCell>{lang === 'ar' ? (row.restaurant as {nameAr: string})?.nameAr : (row.restaurant as {nameEn: string})?.nameEn}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      {(row.lines as unknown[])?.length || 0}
                    </div>
                  </TableCell>
                  <TableCell><CurrencyDisplay amount={row.totalBasicSalary as number} /></TableCell>
                  <TableCell className="font-bold"><CurrencyDisplay amount={row.totalNet as number} /></TableCell>
                  <TableCell><Badge variant={row.status === 'PAID' ? 'success' : 'warning'}>{row.status === 'PAID' ? (lang === 'ar' ? 'مدفوع' : 'Paid') : (lang === 'ar' ? 'مسودة' : 'Draft')}</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => setDetailRun(row)}><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(row.id as string)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Create Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{lang === 'ar' ? 'إنشاء مسير رواتب' : 'Create Payroll Run'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(d => createMutation.mutate(d as Record<string, unknown>))} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'الشهر' : 'Month'}</Label>
                <Controller name="month" control={control} rules={{ required: true }} render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'الشهر' : 'Month'} /></SelectTrigger>
                    <SelectContent>{months.map(m => <SelectItem key={m.value} value={m.value}>{lang === 'ar' ? m.labelAr : m.labelEn}</SelectItem>)}</SelectContent>
                  </Select>
                )} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'السنة' : 'Year'}</Label>
                <Controller name="year" control={control} rules={{ required: true }} render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'السنة' : 'Year'} /></SelectTrigger>
                    <SelectContent>{years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
                  </Select>
                )} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'المطعم' : 'Restaurant'}</Label>
              <Controller name="restaurantId" control={control} rules={{ required: true }} render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'اختر المطعم' : 'Select restaurant'} /></SelectTrigger>
                  <SelectContent>{Array.isArray(restaurants) && restaurants.map((r: {id: string; nameAr: string; nameEn: string}) => <SelectItem key={r.id} value={r.id}>{lang === 'ar' ? r.nameAr : r.nameEn}</SelectItem>)}</SelectContent>
                </Select>
              )} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'أيام العمل' : 'Working Days'}</Label>
                <Input type="number" defaultValue={30} {...register('workingDays', { valueAsNumber: true })} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'تاريخ الدفع' : 'Payment Date'}</Label>
                <Input type="date" {...register('paymentDate')} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{lang === 'ar' ? 'سيتم احتساب رواتب جميع الموظفين النشطين في المطعم المحدد تلقائياً' : 'All active employees in the selected restaurant will be included automatically'}</p>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
              <Button type="submit" disabled={createMutation.isPending}>{lang === 'ar' ? 'إنشاء' : 'Create'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={!!detailRun} onOpenChange={() => setDetailRun(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {lang === 'ar' ? 'تفاصيل مسير الرواتب' : 'Payroll Run Details'} —{' '}
              {detailRun && `${months[(detailRun.month as number) - 1]?.[lang === 'ar' ? 'labelAr' : 'labelEn']} ${detailRun.year as number}`}
            </DialogTitle>
          </DialogHeader>
          {detailRun && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-blue-700">{lang === 'ar' ? 'الراتب الأساسي' : 'Basic Salaries'}</p>
                    <p className="text-xl font-bold text-blue-800"><CurrencyDisplay amount={detailRun.totalBasicSalary as number} /></p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-green-700">{lang === 'ar' ? 'إجمالي البدلات' : 'Total Allowances'}</p>
                    <p className="text-xl font-bold text-green-800"><CurrencyDisplay amount={detailRun.totalAllowances as number} /></p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-purple-700">{lang === 'ar' ? 'الصافي الإجمالي' : 'Grand Total Net'}</p>
                    <p className="text-xl font-bold text-purple-800"><CurrencyDisplay amount={detailRun.totalNet as number} /></p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader><CardTitle className="text-sm">{lang === 'ar' ? 'تفاصيل الموظفين' : 'Employee Details'}</CardTitle></CardHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{lang === 'ar' ? 'الموظف' : 'Employee'}</TableHead>
                      <TableHead>{lang === 'ar' ? 'الراتب الأساسي' : 'Basic'}</TableHead>
                      <TableHead>{lang === 'ar' ? 'السكن' : 'Housing'}</TableHead>
                      <TableHead>{lang === 'ar' ? 'النقل' : 'Transport'}</TableHead>
                      <TableHead>{lang === 'ar' ? 'الإقامة' : 'Iqama'}</TableHead>
                      <TableHead>{lang === 'ar' ? 'التأمين' : 'Insurance'}</TableHead>
                      <TableHead>{lang === 'ar' ? 'الاستقطاعات' : 'Deductions'}</TableHead>
                      <TableHead>{lang === 'ar' ? 'الصافي' : 'Net'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {((detailRun.lines as Record<string, unknown>[]) || []).map((line) => (
                      <TableRow key={line.id as string}>
                        <TableCell className="font-medium">{lang === 'ar' ? (line.employee as {nameAr: string})?.nameAr : (line.employee as {nameEn: string})?.nameEn}</TableCell>
                        <TableCell><CurrencyDisplay amount={line.basicSalary as number} /></TableCell>
                        <TableCell><CurrencyDisplay amount={line.housingAllowance as number} /></TableCell>
                        <TableCell><CurrencyDisplay amount={line.transportAllowance as number} /></TableCell>
                        <TableCell><CurrencyDisplay amount={line.iqamaCost as number} /></TableCell>
                        <TableCell><CurrencyDisplay amount={line.medicalInsurance as number} /></TableCell>
                        <TableCell className="text-red-600"><CurrencyDisplay amount={line.deductions as number} /></TableCell>
                        <TableCell className="font-bold text-green-700"><CurrencyDisplay amount={line.netSalary as number} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
