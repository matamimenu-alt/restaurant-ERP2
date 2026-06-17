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
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, Receipt, TrendingDown } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, Controller } from 'react-hook-form'

export default function ExpensesPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const params = new URLSearchParams()
  if (from) params.set('from', from)
  if (to) params.set('to', to)

  const { data, isLoading } = useQuery({
    queryKey: ['expenses', from, to],
    queryFn: () => api.get(`/api/v1/expenses?${params}&limit=200`).then(r => r.data),
  })
  const { data: categories } = useQuery({ queryKey: ['expense-categories'], queryFn: () => api.get('/api/v1/expenses/categories').then(r => r.data.data) })
  const { data: restaurants } = useQuery({ queryKey: ['restaurants'], queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data) })

  const { register, handleSubmit, control, reset } = useForm()

  const saveMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => editing
      ? api.put(`/api/v1/expenses/${(editing as {id: string}).id}`, d)
      : api.post('/api/v1/expenses', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['expenses'] }); setOpen(false); reset(); toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' }) },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/expenses/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['expenses'] }) },
  })

  const openAdd = () => { setEditing(null); reset({ date: new Date().toISOString().split('T')[0], paymentMethod: 'CASH' }); setOpen(true) }
  const openEdit = (row: Record<string, unknown>) => {
    setEditing(row)
    reset({ ...row, date: new Date(row.date as string).toISOString().split('T')[0] })
    setOpen(true)
  }

  const expenses = data?.data?.expenses || []
  const totalAmount = data?.data?.totalAmount || 0

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'المصروفات' : 'Expenses'}
        actions={
          <div className="flex gap-2">
            <ExportButtons data={expenses} filename="expenses" />
            <Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" />{lang === 'ar' ? 'إضافة مصروف' : 'Add Expense'}</Button>
          </div>
        }
      />

      <div className="flex flex-wrap gap-3">
        <div className="space-y-1"><Label className="text-xs">{lang === 'ar' ? 'من' : 'From'}</Label><Input type="date" value={from} onChange={e => setFrom(e.target.value)} className="w-36" /></div>
        <div className="space-y-1"><Label className="text-xs">{lang === 'ar' ? 'إلى' : 'To'}</Label><Input type="date" value={to} onChange={e => setTo(e.target.value)} className="w-36" /></div>
      </div>

      <Card className="bg-red-50 border-red-200">
        <CardContent className="flex items-center gap-3 p-4">
          <TrendingDown className="h-5 w-5 text-red-600" />
          <div>
            <p className="text-sm text-red-700">{lang === 'ar' ? 'إجمالي المصروفات' : 'Total Expenses'}</p>
            <p className="text-2xl font-bold text-red-800"><CurrencyDisplay amount={totalAmount} /></p>
          </div>
        </CardContent>
      </Card>

      {isLoading ? <LoadingSpinner /> : expenses.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا توجد مصروفات' : 'No expenses'} action={{ label: lang === 'ar' ? 'إضافة مصروف' : 'Add Expense', onClick: openAdd }} icon={Receipt} />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{lang === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الفئة' : 'Category'}</TableHead>
                <TableHead>{lang === 'ar' ? 'المطعم' : 'Restaurant'}</TableHead>
                <TableHead>{lang === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
                <TableHead>{lang === 'ar' ? 'طريقة الدفع' : 'Payment'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الوصف' : 'Description'}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((row: Record<string, unknown>) => (
                <TableRow key={row.id as string}>
                  <TableCell>{new Date(row.date as string).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}</TableCell>
                  <TableCell>
                    <div>
                      <span className="font-medium">{lang === 'ar' ? (row.category as {nameAr: string})?.nameAr : (row.category as {nameEn: string})?.nameEn}</span>
                      <Badge variant={(row.category as {type: string})?.type === 'FIXED' ? 'info' : 'secondary'} className="ms-2 text-xs">
                        {lang === 'ar' ? ((row.category as {type: string})?.type === 'FIXED' ? 'ثابت' : 'متغير') : (row.category as {type: string})?.type}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{lang === 'ar' ? (row.restaurant as {nameAr: string})?.nameAr : (row.restaurant as {nameEn: string})?.nameEn}</TableCell>
                  <TableCell className="font-medium"><CurrencyDisplay amount={row.amount as number} /></TableCell>
                  <TableCell><Badge variant="secondary">{row.paymentMethod as string}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{row.description as string}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(row)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(row.id as string)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editing ? (lang === 'ar' ? 'تعديل مصروف' : 'Edit Expense') : (lang === 'ar' ? 'إضافة مصروف' : 'Add Expense')}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(d => saveMutation.mutate(d as Record<string, unknown>))} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'التاريخ' : 'Date'}</Label>
                <Input type="date" {...register('date', { required: true })} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'المبلغ' : 'Amount'}</Label>
                <Input type="number" step="0.01" {...register('amount', { required: true, valueAsNumber: true })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'الفئة' : 'Category'}</Label>
              <Controller name="categoryId" control={control} rules={{ required: true }} render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'اختر الفئة' : 'Select category'} /></SelectTrigger>
                  <SelectContent>
                    {Array.isArray(categories) && categories.map((c: {id: string; nameAr: string; nameEn: string; type: string}) => (
                      <SelectItem key={c.id} value={c.id}>{lang === 'ar' ? c.nameAr : c.nameEn} ({c.type === 'FIXED' ? (lang === 'ar' ? 'ثابت' : 'Fixed') : (lang === 'ar' ? 'متغير' : 'Variable')})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} />
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
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'طريقة الدفع' : 'Payment Method'}</Label>
              <Controller name="paymentMethod" control={control} render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CASH">{lang === 'ar' ? 'نقدي' : 'Cash'}</SelectItem>
                    <SelectItem value="BANK">{lang === 'ar' ? 'بنكي' : 'Bank'}</SelectItem>
                    <SelectItem value="CREDIT">{lang === 'ar' ? 'آجل' : 'Credit'}</SelectItem>
                  </SelectContent>
                </Select>
              )} />
            </div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'الوصف' : 'Description'}</Label>
              <Input {...register('description')} />
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
