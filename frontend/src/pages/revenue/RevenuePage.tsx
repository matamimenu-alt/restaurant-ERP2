import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import EmptyState from '@/components/shared/EmptyState'
import CurrencyDisplay from '@/components/shared/CurrencyDisplay'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Pencil, Trash2, Download, FileSpreadsheet, BarChart3, Calendar, Settings } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, Controller } from 'react-hook-form'

type DailyRecord = {
  id: string
  date: string
  vatMode: string
  vatRate: number
  cashSales: number
  cardSales: number
  hungerStation: number
  jahez: number
  noonFood: number
  talabat: number
  app5: number
  app6: number
  openingBalance: number
  cashExpenses: number
  closingBalance: number
  notes?: string
  restaurant?: { nameAr: string; nameEn: string }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormValues = Record<string, any>

function SummaryCard({ label, value, sub, dark }: { label: string; value: number; sub?: string; dark?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${dark ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200'}`}>
      <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
      <p className={`text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>
        SAR <CurrencyDisplay amount={value} />
      </p>
      {sub && <p className={`text-xs mt-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{sub}</p>}
    </div>
  )
}

function ChannelInput({ label, icon, registerName, register }: { label: string; icon?: string; registerName: string; register: ReturnType<typeof useForm<FormValues>>['register'] }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-gray-600">{icon && <span className="mr-1">{icon}</span>}{label}</Label>
      <div className="flex items-center border rounded-lg overflow-hidden bg-white">
        <span className="px-3 py-2 text-xs text-gray-500 bg-gray-50 border-r">SAR</span>
        <Input
          type="number"
          step="0.01"
          defaultValue={0}
          className="border-0 rounded-none focus-visible:ring-0 text-sm"
          {...register(registerName, { valueAsNumber: true })}
        />
      </div>
    </div>
  )
}

export default function RevenuePage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<DailyRecord | null>(null)
  const [monthFilter, setMonthFilter] = useState(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  })

  const [from, to] = (() => {
    const [y, m] = monthFilter.split('-').map(Number)
    const start = new Date(y, m - 1, 1)
    const end = new Date(y, m, 0)
    return [start.toISOString().split('T')[0], end.toISOString().split('T')[0]]
  })()

  const { data, isLoading } = useQuery({
    queryKey: ['daily-sales', from, to],
    queryFn: () => api.get(`/api/v1/daily-sales?from=${from}&to=${to}&limit=200`).then(r => r.data),
  })

  const { data: restaurants } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data),
  })

  const { register, handleSubmit, control, reset, watch } = useForm<FormValues>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      vatMode: 'INCLUSIVE',
      cashSales: 0, cardSales: 0,
      hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 0, app6: 0,
      openingBalance: 0, cashExpenses: 0,
    }
  })

  const watchedValues = watch()
  const totalRevenue = ['cashSales', 'cardSales', 'hungerStation', 'jahez', 'noonFood', 'talabat', 'app5', 'app6']
    .reduce((s, k) => s + (Number(watchedValues[k]) || 0), 0)

  const vatRate = 15
  const vatAmount = watchedValues.vatMode === 'EXCLUSIVE'
    ? (totalRevenue * vatRate) / 100
    : (totalRevenue * vatRate) / (100 + vatRate)

  const saveMutation = useMutation({
    mutationFn: (d: FormValues) => editing
      ? api.put(`/api/v1/daily-sales/${editing.id}`, d)
      : api.post('/api/v1/daily-sales', d),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['daily-sales'] })
      setOpen(false); reset()
      toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' })
    },
    onError: () => toast({ title: 'Error saving record', variant: 'destructive' }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/daily-sales/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['daily-sales'] })
      toast({ title: lang === 'ar' ? 'تم الحذف' : 'Deleted' })
    },
  })

  const openAdd = () => {
    setEditing(null)
    reset({
      date: new Date().toISOString().split('T')[0],
      vatMode: 'EXCLUSIVE',
      cashSales: 0, cardSales: 0,
      hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 0, app6: 0,
      openingBalance: 0, cashExpenses: 0,
    })
    setOpen(true)
  }

  const openEdit = (row: DailyRecord) => {
    setEditing(row)
    reset({
      ...row,
      date: new Date(row.date).toISOString().split('T')[0],
    })
    setOpen(true)
  }

  const records: DailyRecord[] = data?.data || []

  // Compute summary from records
  const summary = records.reduce((acc, r) => {
    const apps = Number(r.hungerStation) + Number(r.jahez) + Number(r.noonFood) + Number(r.talabat) + Number(r.app5) + Number(r.app6)
    const total = Number(r.cashSales) + Number(r.cardSales) + apps
    const vat = r.vatMode === 'EXCLUSIVE'
      ? (total * Number(r.vatRate)) / 100
      : (total * Number(r.vatRate)) / (100 + Number(r.vatRate))
    acc.totalRevenue += total
    acc.netSales += total - (r.vatMode === 'EXCLUSIVE' ? 0 : vat)
    acc.outputVat += vat
    acc.cashTotal += Number(r.cashSales)
    acc.cardTotal += Number(r.cardSales)
    acc.deliveryApps += apps
    return acc
  }, { totalRevenue: 0, netSales: 0, outputVat: 0, cashTotal: 0, cardTotal: 0, deliveryApps: 0 })

  const vatModeLabel = (mode: string) => mode === 'EXCLUSIVE'
    ? (lang === 'ar' ? 'حصري (أضف 15% ضريبة)' : 'Exclusive (Add 15% VAT)')
    : (lang === 'ar' ? 'شامل الضريبة' : 'VAT Inclusive')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{lang === 'ar' ? 'المبيعات وإدارة النقد' : 'Sales & Cash Management'}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{lang === 'ar' ? 'تتبع الإيرادات اليومية حسب قناة الدفع مع إدارة ضريبة القيمة المضافة' : 'Daily revenue tracking by payment channel with VAT handling.'}</p>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <input type="month" value={monthFilter} onChange={e => setMonthFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <Button variant="outline" size="sm" className="gap-2 text-green-700 border-green-300 hover:bg-green-50">
            <Download className="h-4 w-4" />{lang === 'ar' ? 'تصدير' : 'Export'}
          </Button>
          <Button onClick={openAdd} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4" />{lang === 'ar' ? 'إضافة سجل يومي' : 'Add Daily Record'}
          </Button>
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <SummaryCard dark label={lang === 'ar' ? 'إجمالي الإيرادات' : 'TOTAL REVENUE'} value={summary.totalRevenue} sub={lang === 'ar' ? 'كما أُدخل' : 'as entered'} />
        <SummaryCard label={lang === 'ar' ? 'صافي المبيعات (بدون ضريبة)' : 'NET SALES (EXCL. VAT)'} value={summary.netSales} sub={lang === 'ar' ? 'الوعاء الخاضع للضريبة' : 'taxable base'} />
        <SummaryCard label={lang === 'ar' ? 'ضريبة القيمة المضافة (15%)' : 'OUTPUT VAT (15%)'} value={summary.outputVat} sub="ZATCA" />
        <SummaryCard label={lang === 'ar' ? 'إجمالي النقد' : 'CASH TOTAL'} value={summary.cashTotal} sub={lang === 'ar' ? 'قناة النقد' : 'cash channel'} />
        <SummaryCard label={lang === 'ar' ? 'إجمالي البطاقة' : 'CARD TOTAL'} value={summary.cardTotal} sub="POS / Visa" />
        <SummaryCard label={lang === 'ar' ? 'تطبيقات التوصيل' : 'DELIVERY APPS'} value={summary.deliveryApps} sub={lang === 'ar' ? 'جميع التطبيقات' : 'all apps combined'} />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="records">
        <TabsList className="bg-white border rounded-lg p-1 gap-1">
          <TabsTrigger value="records" className="gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <Calendar className="h-4 w-4" />{lang === 'ar' ? 'السجلات اليومية' : 'Daily Records'}
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <BarChart3 className="h-4 w-4" />{lang === 'ar' ? 'التقارير' : 'Reports'}
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />{lang === 'ar' ? 'الإعدادات' : 'Settings'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="mt-4">
          {isLoading ? <LoadingSpinner /> : records.length === 0 ? (
            <EmptyState title={lang === 'ar' ? 'لا توجد سجلات' : 'No daily records'} action={{ label: lang === 'ar' ? 'إضافة سجل' : 'Add Daily Record', onClick: openAdd }} />
          ) : (
            <div className="bg-white border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'التاريخ' : 'DATE'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'نقد' : 'CASH'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'بطاقة' : 'CARD'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500 text-purple-600">{lang === 'ar' ? 'إجمالي التطبيقات' : 'APPS TOTAL'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'إجمالي الإيرادات' : 'TOTAL REVENUE'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'الضريبة' : 'VAT'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500 text-blue-600">{lang === 'ar' ? 'صافي المبيعات' : 'NET SALES'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'رصيد الافتتاح' : 'OPENING BAL'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'رصيد الختام' : 'CLOSING BAL'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'ملاحظات' : 'NOTES'}</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((row) => {
                    const apps = Number(row.hungerStation) + Number(row.jahez) + Number(row.noonFood) + Number(row.talabat) + Number(row.app5) + Number(row.app6)
                    const total = Number(row.cashSales) + Number(row.cardSales) + apps
                    const vat = row.vatMode === 'EXCLUSIVE'
                      ? (total * Number(row.vatRate)) / 100
                      : (total * Number(row.vatRate)) / (100 + Number(row.vatRate))
                    const netSales = row.vatMode === 'EXCLUSIVE' ? total : total - vat
                    const dateStr = new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
                    return (
                      <TableRow key={row.id}>
                        <TableCell>
                          <div className="font-medium text-sm">{dateStr}</div>
                          <div className="text-xs text-gray-400">{row.vatMode === 'EXCLUSIVE' ? 'VAT Excl.' : 'VAT Incl.'}</div>
                        </TableCell>
                        <TableCell className="text-sm">SAR {Number(row.cashSales).toFixed(2)}</TableCell>
                        <TableCell className="text-sm">SAR {Number(row.cardSales).toFixed(2)}</TableCell>
                        <TableCell className="text-sm text-purple-600 font-medium">SAR {apps.toFixed(2)}</TableCell>
                        <TableCell className="font-bold text-sm">SAR {total.toFixed(2)}</TableCell>
                        <TableCell className="text-sm text-gray-600">SAR {vat.toFixed(2)}</TableCell>
                        <TableCell className="text-sm text-blue-600 font-semibold">SAR {netSales.toFixed(2)}</TableCell>
                        <TableCell className="text-sm">SAR {Number(row.openingBalance).toFixed(2)}</TableCell>
                        <TableCell className="text-sm">SAR {Number(row.closingBalance).toFixed(2)}</TableCell>
                        <TableCell className="text-sm text-gray-500">{row.notes || '—'}</TableCell>
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
        </TabsContent>

        <TabsContent value="reports" className="mt-4">
          <div className="bg-white border rounded-xl p-8 text-center text-gray-400">
            <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>{lang === 'ar' ? 'قريباً - تقارير المبيعات التفصيلية' : 'Coming soon — detailed sales reports'}</p>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <div className="bg-white border rounded-xl p-8 text-center text-gray-400">
            <Settings className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>{lang === 'ar' ? 'إعدادات نظام المبيعات' : 'Sales system settings'}</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">
              {editing ? (lang === 'ar' ? 'تعديل سجل يومي' : 'Edit Daily Sales Record') : (lang === 'ar' ? 'إضافة سجل مبيعات يومي' : 'Add Daily Sales Record')}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(d => saveMutation.mutate(d))} className="space-y-5">
            {/* Date + VAT Mode */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs">{lang === 'ar' ? 'التاريخ' : 'Date'} <span className="text-red-500">*</span></Label>
                <Input type="date" {...register('date', { required: true })} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">{lang === 'ar' ? 'وضع الضريبة' : 'VAT Mode'}</Label>
                <Controller name="vatMode" control={control} render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EXCLUSIVE">{lang === 'ar' ? 'حصري (أضف 15%)' : 'Exclusive (Add 15% VAT)'}</SelectItem>
                      <SelectItem value="INCLUSIVE">{lang === 'ar' ? 'شامل الضريبة' : 'VAT Inclusive'}</SelectItem>
                    </SelectContent>
                  </Select>
                )} />
                {watchedValues.vatMode === 'EXCLUSIVE' && (
                  <p className="text-xs text-gray-400">{lang === 'ar' ? 'أدخل المبالغ بدون ضريبة — النظام يضيف 15%' : 'Enter amounts without VAT — system adds 15%'}</p>
                )}
              </div>
            </div>

            {/* Restaurant */}
            {Array.isArray(restaurants) && restaurants.length > 0 && (
              <div className="space-y-1">
                <Label className="text-xs">{lang === 'ar' ? 'المطعم' : 'Restaurant'}</Label>
                <Controller name="restaurantId" control={control} render={({ field }) => (
                  <Select value={field.value || ''} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'اختر المطعم' : 'Select restaurant'} /></SelectTrigger>
                    <SelectContent>
                      {restaurants.map((r: { id: string; nameAr: string; nameEn: string }) => (
                        <SelectItem key={r.id} value={r.id}>{lang === 'ar' ? r.nameAr : r.nameEn}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )} />
              </div>
            )}

            {/* Revenue by Payment Channel */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/30 p-4 space-y-3">
              <p className="text-xs font-semibold text-blue-700 flex items-center gap-1.5">
                <BarChart3 className="h-3.5 w-3.5" />{lang === 'ar' ? 'الإيرادات حسب قناة الدفع' : 'Revenue by Payment Channel'}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <ChannelInput label={lang === 'ar' ? 'مبيعات نقدية (ر.س)' : 'Cash Sales (SAR)'} icon="💵" registerName="cashSales" register={register} />
                <ChannelInput label={lang === 'ar' ? 'بطاقة / POS / فيزا (ر.س)' : 'Card / POS / Visa (SAR)'} icon="💳" registerName="cardSales" register={register} />
              </div>
            </div>

            {/* Delivery Apps */}
            <div className="rounded-xl border border-purple-100 bg-purple-50/30 p-4 space-y-3">
              <p className="text-xs font-semibold text-purple-700 flex items-center gap-1.5">
                □ {lang === 'ar' ? 'تطبيقات التوصيل' : 'Delivery Apps'}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <ChannelInput label="HungerStation" registerName="hungerStation" register={register} />
                <ChannelInput label="Jahez" registerName="jahez" register={register} />
                <ChannelInput label="Noon Food" registerName="noonFood" register={register} />
                <ChannelInput label="Talabat" registerName="talabat" register={register} />
                <ChannelInput label="App 5" registerName="app5" register={register} />
                <ChannelInput label="App 6" registerName="app6" register={register} />
              </div>
            </div>

            {/* Cash Management */}
            <div className="rounded-xl border border-yellow-100 bg-yellow-50/30 p-4 space-y-3">
              <p className="text-xs font-semibold text-yellow-700 flex items-center gap-1.5">
                🗃 {lang === 'ar' ? 'إدارة النقد' : 'Cash Management'}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <ChannelInput label={lang === 'ar' ? 'رصيد الافتتاح (ر.س)' : 'Opening Balance (SAR)'} registerName="openingBalance" register={register} />
                <ChannelInput label={lang === 'ar' ? 'مصاريف نقدية (ر.س)' : 'Cash Expenses (SAR)'} registerName="cashExpenses" register={register} />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <Label className="text-xs">{lang === 'ar' ? 'ملاحظات' : 'Notes'}</Label>
              <Input {...register('notes')} placeholder={lang === 'ar' ? 'اختياري' : 'Optional'} />
            </div>

            {/* VAT Preview */}
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 flex justify-between">
              <span>{lang === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}: <strong>SAR {totalRevenue.toFixed(2)}</strong></span>
              <span>{lang === 'ar' ? 'الضريبة المحسوبة' : 'Computed VAT'}: <strong>SAR {vatAmount.toFixed(2)}</strong></span>
              <span>{lang === 'ar' ? 'الوضع' : 'Mode'}: <strong>{vatModeLabel(watchedValues.vatMode)}</strong></span>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
              <Button type="submit" disabled={saveMutation.isPending} className="bg-blue-600 hover:bg-blue-700 text-white">
                {lang === 'ar' ? 'حفظ السجل' : 'Save Record'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
