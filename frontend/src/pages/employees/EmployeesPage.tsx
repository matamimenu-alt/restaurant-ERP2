import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useRef } from 'react'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import EmptyState from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Pencil, Trash2, Users, AlertTriangle, Upload, Download, CheckCircle, AlertCircle, FileSpreadsheet, Printer } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, Controller } from 'react-hook-form'

type Employee = {
  id: string
  employeeId?: string
  nameAr: string
  nameEn: string
  position: string
  department?: string
  nationality?: string
  basicSalary: number
  housingAllowance: number
  transportAllowance: number
  otherAllowances: number
  iqamaCost: number
  medicalInsurance: number
  joiningDate: string
  iqamaExpiryDate?: string
  iqamaNumber?: string
  isActive: boolean
  restaurant?: { nameAr: string; nameEn: string }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormValues = Record<string, any>

function SummaryCard({ label, value, icon, dark, sub }: { label: string; value: string | number; icon?: React.ReactNode; dark?: boolean; sub?: string }) {
  return (
    <div className={`rounded-xl p-4 ${dark ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200'}`}>
      <div className="flex items-start justify-between">
        <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
        {icon && <span className={`${dark ? 'text-gray-600' : 'text-gray-300'}`}>{icon}</span>}
      </div>
      <p className={`text-2xl font-bold mt-1 ${dark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
      {sub && <p className={`text-xs mt-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{sub}</p>}
    </div>
  )
}

export default function EmployeesPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Employee | null>(null)
  const [importResult, setImportResult] = useState<{ created: number; updated: number; errors: string[]; total: number } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const { data, isLoading } = useQuery({ queryKey: ['employees'], queryFn: () => api.get('/api/v1/employees?limit=200').then(r => r.data) })
  const { data: restaurants } = useQuery({ queryKey: ['restaurants'], queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data) })
  const { data: iqamaAlerts } = useQuery({ queryKey: ['iqama-alerts'], queryFn: () => api.get('/api/v1/employees/iqama-alerts').then(r => r.data.data) })

  const { register, handleSubmit, control, reset } = useForm<FormValues>()

  const importMutation = useMutation({
    mutationFn: (file: File) => {
      const fd = new FormData(); fd.append('file', file)
      return api.post('/api/v1/import/employees', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data.data)
    },
    onSuccess: (result) => {
      setImportResult(result)
      qc.invalidateQueries({ queryKey: ['employees'] })
      toast({ title: lang === 'ar' ? `تم استيراد ${result.created} موظف` : `Imported ${result.created} employees`, variant: 'success' })
    },
    onError: () => toast({ title: lang === 'ar' ? 'فشل الاستيراد' : 'Import failed', variant: 'destructive' }),
  })

  const saveMutation = useMutation({
    mutationFn: (d: FormValues) => editing
      ? api.put(`/api/v1/employees/${editing.id}`, d)
      : api.post('/api/v1/employees', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['employees'] }); setOpen(false); reset(); toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' }) },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/employees/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['employees'] }) },
  })

  const openAdd = () => { setEditing(null); reset({ joiningDate: new Date().toISOString().split('T')[0] }); setOpen(true) }
  const openEdit = (row: Employee) => {
    setEditing(row)
    reset({
      ...row,
      joiningDate: row.joiningDate ? new Date(row.joiningDate).toISOString().split('T')[0] : '',
      iqamaExpiryDate: row.iqamaExpiryDate ? new Date(row.iqamaExpiryDate).toISOString().split('T')[0] : '',
    })
    setOpen(true)
  }

  const employees: Employee[] = data?.data || []
  const iqamaCount = Array.isArray(iqamaAlerts) ? iqamaAlerts.length : 0

  const totalBasic = employees.reduce((s, e) => s + Number(e.basicSalary), 0)
  const totalAllowances = employees.reduce((s, e) => s + Number(e.housingAllowance) + Number(e.transportAllowance) + Number(e.otherAllowances), 0)
  const totalNet = employees.reduce((s, e) => s + Number(e.basicSalary) + Number(e.housingAllowance) + Number(e.transportAllowance) + Number(e.otherAllowances), 0)

  const fmt = (n: number) => `SAR ${n.toLocaleString('en-US', { minimumFractionDigits: 2 })}`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{lang === 'ar' ? 'الموارد البشرية والرواتب' : 'HR & Payroll'}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {lang === 'ar' ? 'صافي الراتب = الأساسي + العلاوات - الخصومات - الغيابات' : 'Employee payroll — Net Salary = Basic + Overtime – Deductions – Absences.'}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="gap-2 text-green-700 border-green-300 hover:bg-green-50"
            onClick={() => api.get('/api/v1/import/templates/employee', { responseType: 'blob' }).then(r => { const url = URL.createObjectURL(r.data); const a = document.createElement('a'); a.href = url; a.download = 'employee_template.xlsx'; a.click() })}>
            <FileSpreadsheet className="h-4 w-4" />{lang === 'ar' ? 'تصدير Excel' : 'Export Excel'}
          </Button>
          <Button onClick={openAdd} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4" />{lang === 'ar' ? 'إضافة موظف' : 'Add Employee'}
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={importMutation.isPending} className="gap-2">
            <Upload className="h-4 w-4" />{lang === 'ar' ? 'استيراد' : 'Import'}
          </Button>
          <input ref={fileRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={e => { if (e.target.files?.[0]) { importMutation.mutate(e.target.files[0]); e.target.value = '' } }} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          label={lang === 'ar' ? 'إجمالي الموظفين' : 'TOTAL EMPLOYEES'}
          value={employees.length}
          icon={<Users className="h-5 w-5" />}
          sub={`${employees.filter(e => e.isActive).length} ${lang === 'ar' ? 'دوام كامل' : 'full time'}`}
        />
        <SummaryCard
          label={lang === 'ar' ? 'إجمالي الرواتب الأساسية' : 'TOTAL BASIC SALARIES'}
          value={fmt(totalBasic)}
          icon={<span className="text-lg">☐</span>}
          sub={lang === 'ar' ? 'الإجمالي الشهري' : 'Monthly gross'}
        />
        <SummaryCard
          label={lang === 'ar' ? 'إجمالي العلاوات' : 'TOTAL ALLOWANCES'}
          value={fmt(totalAllowances)}
          icon={<span className="text-lg">↗</span>}
          sub={lang === 'ar' ? 'سكن + نقل + أخرى' : 'Housing + transport + other'}
        />
        <SummaryCard
          dark
          label={lang === 'ar' ? 'إجمالي صافي الرواتب' : 'TOTAL NET PAYROLL'}
          value={fmt(totalNet)}
          icon={<span className="text-lg">☐</span>}
          sub={lang === 'ar' ? 'بعد SAR 0.00 خصومات' : 'After SAR 0.00 deductions'}
        />
      </div>

      {/* Import result */}
      {importResult && (
        <div className="border border-blue-200 bg-blue-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="font-medium text-sm">{lang === 'ar' ? `تم: استيراد ${importResult.created}، تحديث ${importResult.updated} من ${importResult.total}` : `Created ${importResult.created}, updated ${importResult.updated} of ${importResult.total}`}</span>
            <Button variant="ghost" size="sm" className="ms-auto h-6 text-xs" onClick={() => setImportResult(null)}>✕</Button>
          </div>
          {importResult.errors.slice(0, 5).map((e, i) => <p key={i} className="text-xs text-red-600 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{e}</p>)}
        </div>
      )}

      {/* Iqama Alert */}
      {iqamaCount > 0 && (
        <div className="border border-red-200 bg-red-50 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
          <p className="text-sm font-medium text-red-800">
            {lang === 'ar' ? `${iqamaCount} موظف إقامتهم تنتهي خلال 30 يوم` : `${iqamaCount} employees' Iqama expiring within 30 days`}
          </p>
        </div>
      )}

      {/* Note */}
      <div className="border border-yellow-200 bg-yellow-50 rounded-xl p-4 text-sm text-yellow-800">
        ⓘ {lang === 'ar'
          ? 'ملاحظة: التكاليف المتعلقة بالموظفين مثل تجديد الإقامة ورسوم التأشيرة والتأمين الصحي تُسجل ضمن المصاريف الثابتة ← مصاريف الموظفين — وليس هنا.'
          : 'Note: Employee-related costs such as Iqama renewal, visa fees, medical insurance, and travel tickets are recorded under '}
        {lang !== 'ar' && <strong>Fixed Expenses → Staff Expenses</strong>}
        {lang !== 'ar' && ' — not in payroll.'}
      </div>

      {/* Table */}
      {isLoading ? <LoadingSpinner /> : employees.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا يوجد موظفون' : 'No employees'} action={{ label: lang === 'ar' ? 'إضافة موظف' : 'Add Employee', onClick: openAdd }} icon={Users} />
      ) : (
        <div className="bg-white border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead colSpan={5} className="text-xs font-semibold text-center uppercase text-gray-500 border-b border-gray-200 bg-gray-100">
                  {lang === 'ar' ? 'معلومات الموظف' : 'EMPLOYEE INFO'}
                </TableHead>
                <TableHead colSpan={4} className="text-xs font-semibold text-center uppercase text-gray-500 border-b border-blue-100 bg-blue-50">
                  {lang === 'ar' ? 'الرواتب' : 'PAYROLL'}
                </TableHead>
                <TableHead colSpan={2} className="text-xs font-semibold text-center uppercase text-gray-500 border-b border-gray-200 bg-gray-100">
                  {lang === 'ar' ? 'الصافي' : 'NET'}
                </TableHead>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableHead className="text-xs text-gray-500">{lang === 'ar' ? 'المسمى الوظيفي' : 'Designation'}</TableHead>
                <TableHead className="text-xs text-gray-500">{lang === 'ar' ? 'النوع' : 'Type'}</TableHead>
                <TableHead className="text-xs text-gray-500">{lang === 'ar' ? 'اسم الموظف' : 'Employee Name'}</TableHead>
                <TableHead className="text-xs text-gray-500">{lang === 'ar' ? 'الجنسية' : 'Nationality'}</TableHead>
                <TableHead className="text-xs text-gray-500">{lang === 'ar' ? 'عدد الأشهر' : '# Months'}</TableHead>
                <TableHead className="text-xs text-gray-500 bg-blue-50/50">{lang === 'ar' ? 'الراتب الأساسي' : 'Basic Salary'}</TableHead>
                <TableHead className="text-xs text-gray-500 bg-blue-50/50">{lang === 'ar' ? 'ساعات إضافية' : 'Overtime'}</TableHead>
                <TableHead className="text-xs text-gray-500 bg-blue-50/50">{lang === 'ar' ? 'الخصومات' : 'Deductions'}</TableHead>
                <TableHead className="text-xs text-gray-500 bg-blue-50/50">{lang === 'ar' ? 'الغيابات' : 'Absences'}</TableHead>
                <TableHead className="text-xs text-gray-500">{lang === 'ar' ? 'صافي الراتب' : 'Net Salary'}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((row) => {
                const netSalary = Number(row.basicSalary) + Number(row.housingAllowance) + Number(row.transportAllowance) + Number(row.otherAllowances)
                return (
                  <TableRow key={row.id}>
                    <TableCell className="text-sm text-gray-600">{row.position}</TableCell>
                    <TableCell>
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">
                        {row.isActive ? (lang === 'ar' ? 'دوام كامل' : 'Full') : (lang === 'ar' ? 'جزئي' : 'Part')}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium text-sm">{lang === 'ar' ? row.nameAr : row.nameEn}</TableCell>
                    <TableCell className="text-sm text-gray-600">{row.nationality || '—'}</TableCell>
                    <TableCell className="text-sm text-gray-400">—</TableCell>
                    <TableCell className="text-sm font-semibold text-blue-700">{fmt(Number(row.basicSalary))}</TableCell>
                    <TableCell className="text-sm text-gray-500">{fmt(0)}</TableCell>
                    <TableCell className="text-sm text-gray-500">{fmt(0)}</TableCell>
                    <TableCell className="text-sm text-gray-500">{fmt(0)}</TableCell>
                    <TableCell className="text-sm font-bold text-blue-700">{fmt(netSalary)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(row)}>
                          <Pencil className="h-3.5 w-3.5 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteMutation.mutate(row.id)}>
                          <Trash2 className="h-3.5 w-3.5 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? (lang === 'ar' ? 'تعديل موظف' : 'Edit Employee') : (lang === 'ar' ? 'إضافة موظف' : 'Add Employee')}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(d => saveMutation.mutate(d))} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'رقم الموظف' : 'Employee ID'}</Label><Input {...register('employeeId')} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الجنسية' : 'Nationality'}</Label><Input {...register('nationality')} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الاسم بالعربي' : 'Name (Arabic)'}</Label><Input {...register('nameAr', { required: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الاسم بالإنجليزي' : 'Name (English)'}</Label><Input {...register('nameEn', { required: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'المسمى الوظيفي' : 'Position'}</Label><Input {...register('position', { required: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'القسم' : 'Department'}</Label><Input {...register('department')} /></div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'المطعم' : 'Restaurant'}</Label>
                <Controller name="restaurantId" control={control} rules={{ required: true }} render={({ field }) => (
                  <Select value={field.value || ''} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'اختر المطعم' : 'Select restaurant'} /></SelectTrigger>
                    <SelectContent>{Array.isArray(restaurants) && restaurants.map((r: { id: string; nameAr: string; nameEn: string }) => <SelectItem key={r.id} value={r.id}>{lang === 'ar' ? r.nameAr : r.nameEn}</SelectItem>)}</SelectContent>
                  </Select>
                )} />
              </div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'تاريخ الالتحاق' : 'Joining Date'}</Label><Input type="date" {...register('joiningDate', { required: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الراتب الأساسي' : 'Basic Salary'}</Label><Input type="number" step="0.01" {...register('basicSalary', { required: true, valueAsNumber: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'بدل السكن' : 'Housing Allowance'}</Label><Input type="number" step="0.01" defaultValue={0} {...register('housingAllowance', { valueAsNumber: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'بدل النقل' : 'Transport Allowance'}</Label><Input type="number" step="0.01" defaultValue={0} {...register('transportAllowance', { valueAsNumber: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'بدلات أخرى' : 'Other Allowances'}</Label><Input type="number" step="0.01" defaultValue={0} {...register('otherAllowances', { valueAsNumber: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'رقم الإقامة' : 'Iqama Number'}</Label><Input {...register('iqamaNumber')} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'تاريخ انتهاء الإقامة' : 'Iqama Expiry'}</Label><Input type="date" {...register('iqamaExpiryDate')} /></div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
              <Button type="submit" disabled={saveMutation.isPending} className="bg-blue-600 hover:bg-blue-700 text-white">{lang === 'ar' ? 'حفظ' : 'Save'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
