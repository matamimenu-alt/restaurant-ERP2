import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useRef } from 'react'
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
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Pencil, Trash2, Receipt, TrendingDown, Upload, Download, AlertCircle, CheckCircle, Settings } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, Controller } from 'react-hook-form'

export default function ExpensesPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)
  const [catOpen, setCatOpen] = useState(false)
  const [editingCat, setEditingCat] = useState<Record<string, unknown> | null>(null)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [importResult, setImportResult] = useState<{created: number; errors: string[]; total: number} | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const params = new URLSearchParams()
  if (from) params.set('from', from)
  if (to) params.set('to', to)
  params.set('limit', '500')

  const { data, isLoading } = useQuery({
    queryKey: ['expenses', from, to],
    queryFn: () => api.get(`/api/v1/expenses?${params}`).then(r => r.data),
  })
  const { data: categories } = useQuery({ queryKey: ['expense-categories'], queryFn: () => api.get('/api/v1/expenses/categories').then(r => r.data.data) })
  const { data: restaurants } = useQuery({ queryKey: ['restaurants'], queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data) })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { register, handleSubmit, control, reset, watch, setValue } = useForm<any>({ defaultValues: { isVatable: false, vatRate: 15, paymentMethod: 'CASH' } })
  const { register: regCat, handleSubmit: handleCat, reset: resetCat } = useForm()

  const watchAmount = watch('amount')
  const watchVatable = watch('isVatable')
  const watchVatRate = watch('vatRate', 15)
  const vatAmount = watchVatable ? (Number(watchAmount) * Number(watchVatRate)) / 100 : 0

  const saveMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => {
      const amt = Number(d.amount)
      const vatAmt = d.isVatable ? (amt * Number(d.vatRate || 15)) / 100 : 0
      return editing
        ? api.put(`/api/v1/expenses/${(editing as {id: string}).id}`, { ...d, vatAmount: vatAmt })
        : api.post('/api/v1/expenses', { ...d, vatAmount: vatAmt })
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['expenses'] }); setOpen(false); reset(); toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' }) },
    onError: (e: unknown) => toast({ title: (e as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error', variant: 'destructive' }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/expenses/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['expenses'] }) },
  })

  const saveCatMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => editingCat
      ? api.put(`/api/v1/expenses/categories/${(editingCat as {id: string}).id}`, d)
      : api.post('/api/v1/expenses/categories', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['expense-categories'] }); setCatOpen(false); resetCat(); toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' }) },
  })

  const deleteCatMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/expenses/categories/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['expense-categories'] }) },
    onError: (e: unknown) => toast({ title: (e as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Cannot delete', variant: 'destructive' }),
  })

  const importMutation = useMutation({
    mutationFn: (file: File) => {
      const fd = new FormData(); fd.append('file', file)
      return api.post('/api/v1/import/expenses', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data.data)
    },
    onSuccess: (result) => {
      setImportResult(result)
      qc.invalidateQueries({ queryKey: ['expenses'] })
      toast({ title: lang === 'ar' ? `تم استيراد ${result.created} مصروف` : `Imported ${result.created} expenses`, variant: 'success' })
    },
    onError: () => toast({ title: lang === 'ar' ? 'فشل الاستيراد' : 'Import failed', variant: 'destructive' }),
  })

  const openAdd = () => { setEditing(null); reset({ date: new Date().toISOString().split('T')[0], isVatable: false, vatRate: 15, paymentMethod: 'CASH' }); setOpen(true) }
  const openEdit = (row: Record<string, unknown>) => {
    setEditing(row)
    reset({ ...row, date: new Date(row.date as string).toISOString().split('T')[0], categoryId: (row.category as {id?: string} | undefined)?.id || row.categoryId })
    setOpen(true)
  }
  const openAddCat = () => { setEditingCat(null); resetCat({ type: 'VARIABLE' }); setCatOpen(true) }
  const openEditCat = (cat: Record<string, unknown>) => { setEditingCat(cat); resetCat(cat); setCatOpen(true) }

  const expenses = data?.data?.expenses || []
  const totalAmount = data?.data?.totalAmount || 0
  const totalVat = expenses.reduce((s: number, e: Record<string, unknown>) => s + Number(e.vatAmount || 0), 0)

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'المصروفات' : 'Expenses'}
        actions={
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => api.get('/api/v1/import/templates/expense', { responseType: 'blob' }).then(r => { const url = URL.createObjectURL(r.data); const a = document.createElement('a'); a.href = url; a.download = 'expense_template.xlsx'; a.click() })} className="gap-2">
              <Download className="h-4 w-4" />{lang === 'ar' ? 'تنزيل نموذج' : 'Template'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={importMutation.isPending} className="gap-2">
              <Upload className="h-4 w-4" />{lang === 'ar' ? 'استيراد Excel' : 'Import Excel'}
            </Button>
            <input ref={fileRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={e => { if (e.target.files?.[0]) { importMutation.mutate(e.target.files[0]); e.target.value = '' } }} />
            <ExportButtons
              data={expenses.map((e: Record<string, unknown>) => ({
                'التاريخ': new Date(e.date as string).toLocaleDateString('en-CA'),
                'الوصف': e.description || '',
                'التصنيف': (e.category as {nameAr?: string} | undefined)?.nameAr || '',
                'المبلغ': Number(e.amount),
                'ضريبة القيمة المضافة': Number(e.vatAmount || 0),
                'الإجمالي': Number(e.amount) + Number(e.vatAmount || 0),
                'طريقة الدفع': e.paymentMethod === 'CASH' ? 'نقد' : e.paymentMethod === 'BANK' ? 'بطاقة' : 'آجل',
                'خاضع للضريبة': e.isVatable ? 'نعم' : 'لا',
                'ملاحظات': e.notes || '',
              }))}
              filename="expenses"
            />
            <Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" />{lang === 'ar' ? 'إضافة مصروف' : 'Add Expense'}</Button>
          </div>
        }
      />

      {importResult && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="font-medium text-sm">{lang === 'ar' ? `تم استيراد ${importResult.created} من ${importResult.total}` : `Imported ${importResult.created} of ${importResult.total}`}</span>
              <Button variant="ghost" size="sm" className="ms-auto h-6 text-xs" onClick={() => setImportResult(null)}>✕</Button>
            </div>
            {importResult.errors.slice(0, 5).map((e, i) => <p key={i} className="text-xs text-red-600 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{e}</p>)}
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">{lang === 'ar' ? 'المصروفات' : 'Expenses'}</TabsTrigger>
          <TabsTrigger value="categories">{lang === 'ar' ? 'التصنيفات' : 'Categories'}</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="space-y-1"><Label className="text-xs">{lang === 'ar' ? 'من' : 'From'}</Label><Input type="date" value={from} onChange={e => setFrom(e.target.value)} className="w-36" /></div>
            <div className="space-y-1"><Label className="text-xs">{lang === 'ar' ? 'إلى' : 'To'}</Label><Input type="date" value={to} onChange={e => setTo(e.target.value)} className="w-36" /></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="flex items-center gap-3 p-4">
                <TrendingDown className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-xs text-red-700">{lang === 'ar' ? 'إجمالي المصروفات' : 'Total Expenses'}</p>
                  <p className="text-xl font-bold text-red-800"><CurrencyDisplay amount={totalAmount} /></p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="flex items-center gap-3 p-4">
                <Receipt className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-xs text-orange-700">{lang === 'ar' ? 'ضريبة المشتريات' : 'Input VAT'}</p>
                  <p className="text-xl font-bold text-orange-800"><CurrencyDisplay amount={totalVat} /></p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="flex items-center gap-3 p-4">
                <Receipt className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-xs text-yellow-700">{lang === 'ar' ? 'بدون ضريبة' : 'Net Expenses'}</p>
                  <p className="text-xl font-bold text-yellow-800"><CurrencyDisplay amount={totalAmount - totalVat} /></p>
                </div>
              </CardContent>
            </Card>
          </div>

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
                    <TableHead>{lang === 'ar' ? 'الضريبة' : 'VAT'}</TableHead>
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
                      <TableCell className="text-orange-600 text-sm">{Number(row.vatAmount || 0) > 0 ? <CurrencyDisplay amount={row.vatAmount as number} /> : '-'}</TableCell>
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
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={openAddCat} className="gap-2"><Plus className="h-4 w-4" />{lang === 'ar' ? 'إضافة تصنيف' : 'Add Category'}</Button>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{lang === 'ar' ? 'الاسم بالعربي' : 'Name (AR)'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'الاسم بالإنجليزي' : 'Name (EN)'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'النوع' : 'Type'}</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(categories) && categories.map((cat: Record<string, unknown>) => (
                  <TableRow key={cat.id as string}>
                    <TableCell className="font-medium">{cat.nameAr as string}</TableCell>
                    <TableCell>{cat.nameEn as string}</TableCell>
                    <TableCell><Badge variant={cat.type === 'FIXED' ? 'info' : 'secondary'}>{lang === 'ar' ? (cat.type === 'FIXED' ? 'ثابت' : 'متغير') : cat.type as string}</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEditCat(cat)}><Settings className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteCatMutation.mutate(cat.id as string)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Expense Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? (lang === 'ar' ? 'تعديل مصروف' : 'Edit Expense') : (lang === 'ar' ? 'إضافة مصروف' : 'Add Expense')}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(d => saveMutation.mutate(d as Record<string, unknown>))} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'التاريخ' : 'Date'}</Label><Input type="date" {...register('date', { required: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'المبلغ' : 'Amount'}</Label><Input type="number" step="0.01" {...register('amount', { required: true, valueAsNumber: true })} /></div>
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

            {/* VAT Section */}
            <div className="rounded-lg border p-3 space-y-3 bg-muted/30">
              <div className="flex items-center justify-between">
                <Label className="text-sm">{lang === 'ar' ? 'خاضع لضريبة القيمة المضافة' : 'Subject to VAT'}</Label>
                <Controller name="isVatable" control={control} render={({ field }) => (
                  <Switch checked={Boolean(field.value)} onCheckedChange={field.onChange} />
                )} />
              </div>
              {watchVatable && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">{lang === 'ar' ? 'نسبة الضريبة %' : 'VAT Rate %'}</Label>
                    <Input type="number" step="0.01" {...register('vatRate', { valueAsNumber: true })} onChange={e => setValue('vatRate', parseFloat(e.target.value))} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{lang === 'ar' ? 'مبلغ الضريبة' : 'VAT Amount'}</Label>
                    <Input value={vatAmount.toFixed(2)} readOnly className="bg-muted" />
                  </div>
                </div>
              )}
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
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الوصف' : 'Description'}</Label><Input {...register('description')} /></div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
              <Button type="submit" disabled={saveMutation.isPending}>{lang === 'ar' ? 'حفظ' : 'Save'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Category Dialog */}
      <Dialog open={catOpen} onOpenChange={setCatOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>{editingCat ? (lang === 'ar' ? 'تعديل تصنيف' : 'Edit Category') : (lang === 'ar' ? 'إضافة تصنيف' : 'Add Category')}</DialogTitle></DialogHeader>
          <form onSubmit={handleCat(d => saveCatMutation.mutate(d as Record<string, unknown>))} className="space-y-4">
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الاسم بالعربي' : 'Name (Arabic)'}</Label><Input {...regCat('nameAr', { required: true })} /></div>
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الاسم بالإنجليزي' : 'Name (English)'}</Label><Input {...regCat('nameEn', { required: true })} /></div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'النوع' : 'Type'}</Label>
              <select {...regCat('type')} className="w-full border rounded-md px-3 py-2 text-sm">
                <option value="FIXED">{lang === 'ar' ? 'ثابت' : 'Fixed'}</option>
                <option value="VARIABLE">{lang === 'ar' ? 'متغير' : 'Variable'}</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setCatOpen(false)}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
              <Button type="submit" disabled={saveCatMutation.isPending}>{lang === 'ar' ? 'حفظ' : 'Save'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
