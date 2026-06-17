import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import EmptyState from '@/components/shared/EmptyState'
import ExportButtons from '@/components/shared/ExportButtons'
import CurrencyDisplay from '@/components/shared/CurrencyDisplay'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, Users, AlertTriangle } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, Controller } from 'react-hook-form'

export default function EmployeesPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)

  const { data, isLoading } = useQuery({ queryKey: ['employees'], queryFn: () => api.get('/api/v1/employees?limit=200').then(r => r.data) })
  const { data: restaurants } = useQuery({ queryKey: ['restaurants'], queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data) })
  const { data: iqamaAlerts } = useQuery({ queryKey: ['iqama-alerts'], queryFn: () => api.get('/api/v1/employees/iqama-alerts').then(r => r.data.data) })

  const { register, handleSubmit, control, reset } = useForm()

  const saveMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => editing
      ? api.put(`/api/v1/employees/${(editing as {id: string}).id}`, d)
      : api.post('/api/v1/employees', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['employees'] }); setOpen(false); reset(); toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' }) },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/employees/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['employees'] }) },
  })

  const openAdd = () => { setEditing(null); reset({ joiningDate: new Date().toISOString().split('T')[0] }); setOpen(true) }
  const openEdit = (row: Record<string, unknown>) => {
    setEditing(row)
    reset({ ...row, joiningDate: row.joiningDate ? new Date(row.joiningDate as string).toISOString().split('T')[0] : '', iqamaExpiryDate: row.iqamaExpiryDate ? new Date(row.iqamaExpiryDate as string).toISOString().split('T')[0] : '' })
    setOpen(true)
  }

  const employees = data?.data || []
  const iqamaCount = Array.isArray(iqamaAlerts) ? iqamaAlerts.length : 0

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'الموظفون' : 'Employees'}
        actions={
          <div className="flex gap-2">
            <ExportButtons data={employees} filename="employees" />
            <Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" />{lang === 'ar' ? 'إضافة موظف' : 'Add Employee'}</Button>
          </div>
        }
      />

      {iqamaCount > 0 && (
        <Card className="border-red-200 bg-red-50">
          <div className="flex items-center gap-3 p-4">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <p className="text-sm font-medium text-red-800">
              {lang === 'ar' ? `${iqamaCount} موظف إقامتهم تنتهي خلال 30 يوم` : `${iqamaCount} employees' Iqama expiring within 30 days`}
            </p>
          </div>
        </Card>
      )}

      {isLoading ? <LoadingSpinner /> : employees.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا يوجد موظفون' : 'No employees'} action={{ label: lang === 'ar' ? 'إضافة موظف' : 'Add Employee', onClick: openAdd }} icon={Users} />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{lang === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                <TableHead>{lang === 'ar' ? 'المنصب' : 'Position'}</TableHead>
                <TableHead>{lang === 'ar' ? 'المطعم' : 'Restaurant'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الراتب الأساسي' : 'Basic Salary'}</TableHead>
                <TableHead>{lang === 'ar' ? 'السكن' : 'Housing'}</TableHead>
                <TableHead>{lang === 'ar' ? 'النقل' : 'Transport'}</TableHead>
                <TableHead>{lang === 'ar' ? 'انتهاء الإقامة' : 'Iqama Expiry'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((row: Record<string, unknown>) => {
                const iqamaDate = row.iqamaExpiryDate ? new Date(row.iqamaExpiryDate as string) : null
                const isExpiringSoon = iqamaDate && iqamaDate <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                return (
                  <TableRow key={row.id as string}>
                    <TableCell className="font-medium">{lang === 'ar' ? row.nameAr as string : row.nameEn as string}</TableCell>
                    <TableCell>{row.position as string}</TableCell>
                    <TableCell>{lang === 'ar' ? (row.restaurant as {nameAr: string})?.nameAr : (row.restaurant as {nameEn: string})?.nameEn}</TableCell>
                    <TableCell><CurrencyDisplay amount={row.basicSalary as number} /></TableCell>
                    <TableCell><CurrencyDisplay amount={row.housingAllowance as number} /></TableCell>
                    <TableCell><CurrencyDisplay amount={row.transportAllowance as number} /></TableCell>
                    <TableCell>
                      <span className={isExpiringSoon ? 'text-red-600 font-medium' : ''}>
                        {iqamaDate ? iqamaDate.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US') : '-'}
                        {isExpiringSoon && ' ⚠️'}
                      </span>
                    </TableCell>
                    <TableCell><Badge variant={row.isActive ? 'success' : 'secondary'}>{row.isActive ? (lang === 'ar' ? 'نشط' : 'Active') : (lang === 'ar' ? 'غير نشط' : 'Inactive')}</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(row)}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(row.id as string)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Card>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? (lang === 'ar' ? 'تعديل موظف' : 'Edit Employee') : (lang === 'ar' ? 'إضافة موظف' : 'Add Employee')}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(d => saveMutation.mutate(d as Record<string, unknown>))} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الاسم بالعربي' : 'Name (Arabic)'}</Label><Input {...register('nameAr', { required: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الاسم بالإنجليزي' : 'Name (English)'}</Label><Input {...register('nameEn', { required: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'المنصب' : 'Position'}</Label><Input {...register('position', { required: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الجنسية' : 'Nationality'}</Label><Input {...register('nationality')} /></div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'المطعم' : 'Restaurant'}</Label>
                <Controller name="restaurantId" control={control} rules={{ required: true }} render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'اختر المطعم' : 'Select restaurant'} /></SelectTrigger>
                    <SelectContent>{Array.isArray(restaurants) && restaurants.map((r: {id: string; nameAr: string; nameEn: string}) => <SelectItem key={r.id} value={r.id}>{lang === 'ar' ? r.nameAr : r.nameEn}</SelectItem>)}</SelectContent>
                  </Select>
                )} />
              </div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'تاريخ الالتحاق' : 'Joining Date'}</Label><Input type="date" {...register('joiningDate', { required: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الراتب الأساسي' : 'Basic Salary'}</Label><Input type="number" step="0.01" {...register('basicSalary', { required: true, valueAsNumber: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'بدل السكن' : 'Housing Allowance'}</Label><Input type="number" step="0.01" defaultValue={0} {...register('housingAllowance', { valueAsNumber: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'بدل النقل' : 'Transport Allowance'}</Label><Input type="number" step="0.01" defaultValue={0} {...register('transportAllowance', { valueAsNumber: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'تكلفة الإقامة' : 'Iqama Cost'}</Label><Input type="number" step="0.01" defaultValue={0} {...register('iqamaCost', { valueAsNumber: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'التأمين الطبي' : 'Medical Insurance'}</Label><Input type="number" step="0.01" defaultValue={0} {...register('medicalInsurance', { valueAsNumber: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'رقم الإقامة' : 'Iqama Number'}</Label><Input {...register('iqamaNumber')} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'تاريخ انتهاء الإقامة' : 'Iqama Expiry'}</Label><Input type="date" {...register('iqamaExpiryDate')} /></div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
              <Button type="submit" disabled={saveMutation.isPending}>{lang === 'ar' ? 'حفظ' : 'Save'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
