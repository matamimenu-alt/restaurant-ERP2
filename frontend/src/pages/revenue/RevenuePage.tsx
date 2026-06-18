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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Pencil, Trash2, DollarSign, Upload, Download, CheckCircle, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, Controller } from 'react-hook-form'

const SOURCES = ['CASH','CARD','BANK_TRANSFER','HUNGER_STATION','JAHEZ','TOYOU','NOON','CAREEM','OTHER']
const SOURCE_AR: Record<string, string> = {
  CASH: 'نقدي', CARD: 'بطاقة', BANK_TRANSFER: 'تحويل بنكي',
  HUNGER_STATION: 'هنقرستيشن', JAHEZ: 'جاهز', TOYOU: 'توصيل',
  NOON: 'نون', CAREEM: 'كريم', OTHER: 'أخرى',
}

export default function RevenuePage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [restaurantFilter, setRestaurantFilter] = useState('all')
  const [importResult, setImportResult] = useState<{created: number; errors: string[]; total: number} | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const params = new URLSearchParams()
  if (from) params.set('from', from)
  if (to) params.set('to', to)
  if (restaurantFilter && restaurantFilter !== 'all') params.set('restaurantId', restaurantFilter)
  params.set('limit', '500')

  const { data, isLoading } = useQuery({
    queryKey: ['revenue', from, to, restaurantFilter],
    queryFn: () => api.get(`/api/v1/revenue?${params}`).then(r => r.data),
  })
  const { data: restaurants } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data),
  })
  const { data: summary } = useQuery({
    queryKey: ['revenue-summary', from, to, restaurantFilter],
    queryFn: () => api.get(`/api/v1/revenue/summary?${params}`).then(r => r.data.data),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { register, handleSubmit, control, reset, watch, setValue } = useForm<any>({
    defaultValues: { isVatInclusive: true, vatRate: 15, amount: 0 }
  })

  const watchAmount = watch('amount')
  const watchVatRate = watch('vatRate', 15)
  const watchInclusive = watch('isVatInclusive', true)

  const calcVat = (amount: number, rate: number, inclusive: boolean) => {
    if (!amount || !rate) return { vatAmount: 0, exVat: amount || 0 }
    if (inclusive) {
      const vatAmount = (amount * rate) / (100 + rate)
      return { vatAmount, exVat: amount - vatAmount }
    }
    return { vatAmount: (amount * rate) / 100, exVat: amount }
  }

  const { vatAmount, exVat } = calcVat(Number(watchAmount), Number(watchVatRate), Boolean(watchInclusive))

  const createMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => {
      const amt = Number(d.amount)
      const rate = Number(d.vatRate || 15)
      const inclusive = Boolean(d.isVatInclusive)
      const { vatAmount, exVat } = calcVat(amt, rate, inclusive)
      return editing
        ? api.put(`/api/v1/revenue/${(editing as {id: string}).id}`, { ...d, vatAmount, amountExVat: exVat })
        : api.post('/api/v1/revenue', { ...d, vatAmount, amountExVat: exVat })
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['revenue'] })
      qc.invalidateQueries({ queryKey: ['revenue-summary'] })
      setOpen(false); reset()
      toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' })
    },
    onError: (e: unknown) => toast({ title: (e as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error', variant: 'destructive' }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/revenue/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['revenue'] }); toast({ title: lang === 'ar' ? 'تم الحذف' : 'Deleted' }) },
  })

  const importMutation = useMutation({
    mutationFn: (file: File) => {
      const fd = new FormData(); fd.append('file', file)
      return api.post('/api/v1/import/revenue', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data.data)
    },
    onSuccess: (result) => {
      setImportResult(result)
      qc.invalidateQueries({ queryKey: ['revenue'] })
      toast({ title: lang === 'ar' ? `تم استيراد ${result.created} إيراد` : `Imported ${result.created} entries`, variant: 'success' })
    },
    onError: () => toast({ title: lang === 'ar' ? 'فشل الاستيراد' : 'Import failed', variant: 'destructive' }),
  })

  const openAdd = () => { setEditing(null); reset({ date: new Date().toISOString().split('T')[0], isVatInclusive: true, vatRate: 15 }); setOpen(true) }
  const openEdit = (row: Record<string, unknown>) => {
    setEditing(row)
    reset({ ...row, date: new Date(row.date as string).toISOString().split('T')[0] })
    setOpen(true)
  }

  const entries = data?.data?.entries || []
  const totalAmount = data?.data?.totalAmount || 0
  const totalVat = entries.reduce((s: number, e: Record<string, unknown>) => s + Number(e.vatAmount || 0), 0)

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'الإيرادات' : 'Revenue'}
        actions={
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => api.get('/api/v1/import/templates/revenue', { responseType: 'blob' }).then(r => { const url = URL.createObjectURL(r.data); const a = document.createElement('a'); a.href = url; a.download = 'revenue_template.xlsx'; a.click() })} className="gap-2">
              <Download className="h-4 w-4" />{lang === 'ar' ? 'تنزيل نموذج' : 'Template'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={importMutation.isPending} className="gap-2">
              <Upload className="h-4 w-4" />{lang === 'ar' ? 'استيراد Excel' : 'Import Excel'}
            </Button>
            <input ref={fileRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={e => { if (e.target.files?.[0]) { importMutation.mutate(e.target.files[0]); e.target.value = '' } }} />
            <ExportButtons data={entries} filename="revenue" />
            <Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" />{lang === 'ar' ? 'إضافة إيراد' : 'Add Revenue'}</Button>
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
            {importResult.errors.length > 0 && (
              <div className="space-y-1">
                {importResult.errors.slice(0, 5).map((e, i) => <p key={i} className="text-xs text-red-600 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{e}</p>)}
                {importResult.errors.length > 5 && <p className="text-xs text-muted-foreground">+{importResult.errors.length - 5} more errors</p>}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">{lang === 'ar' ? 'السجلات' : 'Entries'}</TabsTrigger>
          <TabsTrigger value="bySource">{lang === 'ar' ? 'حسب المصدر' : 'By Source'}</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-end">
            <div className="space-y-1"><Label className="text-xs">{lang === 'ar' ? 'من' : 'From'}</Label><Input type="date" value={from} onChange={e => setFrom(e.target.value)} className="w-36" /></div>
            <div className="space-y-1"><Label className="text-xs">{lang === 'ar' ? 'إلى' : 'To'}</Label><Input type="date" value={to} onChange={e => setTo(e.target.value)} className="w-36" /></div>
            <div className="space-y-1">
              <Label className="text-xs">{lang === 'ar' ? 'المطعم' : 'Restaurant'}</Label>
              <Select value={restaurantFilter} onValueChange={setRestaurantFilter}>
                <SelectTrigger className="w-48"><SelectValue placeholder={lang === 'ar' ? 'كل المطاعم' : 'All'} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{lang === 'ar' ? 'كل المطاعم' : 'All'}</SelectItem>
                  {Array.isArray(restaurants) && restaurants.map((r: {id: string; nameAr: string; nameEn: string}) => (
                    <SelectItem key={r.id} value={r.id}>{lang === 'ar' ? r.nameAr : r.nameEn}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="flex items-center gap-3 p-4">
                <DollarSign className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs text-green-700">{lang === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}</p>
                  <p className="text-xl font-bold text-green-800"><CurrencyDisplay amount={totalAmount} /></p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="flex items-center gap-3 p-4">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs text-blue-700">{lang === 'ar' ? 'ضريبة القيمة المضافة' : 'VAT Collected'}</p>
                  <p className="text-xl font-bold text-blue-800"><CurrencyDisplay amount={totalVat} /></p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="flex items-center gap-3 p-4">
                <DollarSign className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-xs text-purple-700">{lang === 'ar' ? 'الإيرادات بدون ضريبة' : 'Revenue ex-VAT'}</p>
                  <p className="text-xl font-bold text-purple-800"><CurrencyDisplay amount={totalAmount - totalVat} /></p>
                </div>
              </CardContent>
            </Card>
          </div>

          {isLoading ? <LoadingSpinner /> : entries.length === 0 ? (
            <EmptyState title={lang === 'ar' ? 'لا توجد إيرادات' : 'No revenue entries'} action={{ label: lang === 'ar' ? 'إضافة إيراد' : 'Add Revenue', onClick: openAdd }} />
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{lang === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                    <TableHead>{lang === 'ar' ? 'المطعم' : 'Restaurant'}</TableHead>
                    <TableHead>{lang === 'ar' ? 'المصدر' : 'Source'}</TableHead>
                    <TableHead>{lang === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
                    <TableHead>{lang === 'ar' ? 'الضريبة' : 'VAT'}</TableHead>
                    <TableHead>{lang === 'ar' ? 'بدون ضريبة' : 'Ex-VAT'}</TableHead>
                    <TableHead>{lang === 'ar' ? 'ملاحظات' : 'Notes'}</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((row: Record<string, unknown>) => (
                    <TableRow key={row.id as string}>
                      <TableCell>{new Date(row.date as string).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}</TableCell>
                      <TableCell>{lang === 'ar' ? (row.restaurant as {nameAr: string})?.nameAr : (row.restaurant as {nameEn: string})?.nameEn}</TableCell>
                      <TableCell><Badge variant="secondary">{lang === 'ar' ? SOURCE_AR[row.source as string] : row.source as string}</Badge></TableCell>
                      <TableCell className="font-medium"><CurrencyDisplay amount={row.amount as number} /></TableCell>
                      <TableCell className="text-blue-600 text-sm"><CurrencyDisplay amount={row.vatAmount as number} /></TableCell>
                      <TableCell className="text-sm"><CurrencyDisplay amount={row.amountExVat as number} /></TableCell>
                      <TableCell className="text-muted-foreground text-sm">{row.notes as string}</TableCell>
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

        <TabsContent value="bySource">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SOURCES.map(source => {
              const sourceData = summary?.bySource?.find((s: {source: string}) => s.source === source)
              const amount = sourceData ? Number(sourceData._sum?.amount || 0) : 0
              if (amount === 0) return null
              return (
                <Card key={source}>
                  <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{lang === 'ar' ? SOURCE_AR[source] : source}</CardTitle></CardHeader>
                  <CardContent><p className="text-2xl font-bold"><CurrencyDisplay amount={amount} /></p></CardContent>
                </Card>
              )
            }).filter(Boolean)}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? (lang === 'ar' ? 'تعديل إيراد' : 'Edit Revenue') : (lang === 'ar' ? 'إضافة إيراد' : 'Add Revenue')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(d => createMutation.mutate(d as Record<string, unknown>))} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'التاريخ' : 'Date'}</Label>
                <Input type="date" {...register('date', { required: true })} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'المبلغ' : 'Amount (SAR)'}</Label>
                <Input type="number" step="0.01" placeholder="0.00" {...register('amount', { required: true, valueAsNumber: true })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'المطعم' : 'Restaurant'}</Label>
              <Controller name="restaurantId" control={control} rules={{ required: true }} render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'اختر المطعم' : 'Select restaurant'} /></SelectTrigger>
                  <SelectContent>
                    {Array.isArray(restaurants) && restaurants.map((r: {id: string; nameAr: string; nameEn: string}) => (
                      <SelectItem key={r.id} value={r.id}>{lang === 'ar' ? r.nameAr : r.nameEn}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} />
            </div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'المصدر' : 'Source'}</Label>
              <Controller name="source" control={control} rules={{ required: true }} render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'اختر المصدر' : 'Select source'} /></SelectTrigger>
                  <SelectContent>
                    {SOURCES.map(s => <SelectItem key={s} value={s}>{lang === 'ar' ? SOURCE_AR[s] : s}</SelectItem>)}
                  </SelectContent>
                </Select>
              )} />
            </div>

            {/* VAT Section */}
            <div className="rounded-lg border p-4 space-y-3 bg-muted/30">
              <p className="text-sm font-medium">{lang === 'ar' ? 'إعدادات ضريبة القيمة المضافة' : 'VAT Settings'}</p>
              <div className="flex items-center justify-between">
                <Label className="text-sm">{lang === 'ar' ? 'المبلغ شامل الضريبة' : 'Amount includes VAT'}</Label>
                <Controller name="isVatInclusive" control={control} render={({ field }) => (
                  <Switch checked={Boolean(field.value)} onCheckedChange={field.onChange} />
                )} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">{lang === 'ar' ? 'نسبة الضريبة %' : 'VAT Rate %'}</Label>
                  <Input type="number" step="0.01" {...register('vatRate', { valueAsNumber: true })} onChange={e => setValue('vatRate', parseFloat(e.target.value))} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{lang === 'ar' ? 'مبلغ الضريبة' : 'VAT Amount'}</Label>
                  <Input value={vatAmount.toFixed(2)} readOnly className="bg-muted" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{lang === 'ar' ? 'بدون ضريبة' : 'Ex-VAT'}</Label>
                  <Input value={exVat.toFixed(2)} readOnly className="bg-muted" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'ملاحظات' : 'Notes'}</Label>
              <Input {...register('notes')} placeholder={lang === 'ar' ? 'ملاحظات اختيارية' : 'Optional'} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
              <Button type="submit" disabled={createMutation.isPending}>{lang === 'ar' ? 'حفظ' : 'Save'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
