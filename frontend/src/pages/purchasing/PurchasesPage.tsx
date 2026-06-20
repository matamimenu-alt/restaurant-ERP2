import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useRef } from 'react'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import EmptyState from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import ExportButtons from '@/components/shared/ExportButtons'
import { Plus, Trash2, Receipt, Info } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, useFieldArray, Controller } from 'react-hook-form'

type PurchaseLine = {
  id: string
  quantity: number
  unitPrice: number
  vatAmount: number
  vatRate: number
  total: number
  item: { nameAr: string; nameEn: string; unit: string; category?: { nameAr: string; nameEn: string } }
  invoice: { invoiceDate: string; invoiceNumber: string; invoiceType: string; paymentMethod: string; supplier: { nameAr: string; nameEn: string } }
}

type Summary = {
  taxableNet: number
  inputVat: number
  nonTaxableTotal: number
  taxableWithVat: number
  cashTotal: number
  cardTotal: number
  creditTotal: number
  totalPurchases: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormValues = Record<string, any>

function StatCard({ label, value, sub, dark }: { label: string; value: number; sub?: string; dark?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${dark ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200'}`}>
      <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
      <p className={`text-xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>SAR {Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
      {sub && <p className={`text-xs mt-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{sub}</p>}
    </div>
  )
}

export default function PurchasesPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedInvoiceType, setSelectedInvoiceType] = useState('')
  const [paymentFilter, setPaymentFilter] = useState('ALL')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [priceHistory, setPriceHistory] = useState<Record<string, unknown> | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const params = new URLSearchParams({ limit: '200' })
  if (search) params.set('search', search)
  if (selectedSupplier) params.set('supplierId', selectedSupplier)
  if (selectedCategory) params.set('categoryId', selectedCategory)
  if (selectedInvoiceType) params.set('invoiceType', selectedInvoiceType)
  if (paymentFilter !== 'ALL') params.set('paymentMethod', paymentFilter === 'CARD' ? 'BANK' : paymentFilter)
  if (from) params.set('from', from)
  if (to) params.set('to', to)

  const { data: linesData, isLoading } = useQuery({
    queryKey: ['purchase-lines', search, selectedSupplier, selectedCategory, selectedInvoiceType, paymentFilter, from, to],
    queryFn: () => api.get(`/api/v1/purchases/lines?${params}`).then(r => r.data),
  })
  const { data: suppliers } = useQuery({ queryKey: ['suppliers-all'], queryFn: () => api.get('/api/v1/suppliers?limit=200').then(r => r.data.data) })
  const { data: categories } = useQuery({ queryKey: ['inventory-categories'], queryFn: () => api.get('/api/v1/inventory/categories?limit=200').then(r => r.data.data) })
  const { data: restaurants } = useQuery({ queryKey: ['restaurants'], queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data) })
  const { data: items } = useQuery({ queryKey: ['inventory-items'], queryFn: () => api.get('/api/v1/inventory/items?limit=500').then(r => r.data.data) })

  const { register, handleSubmit, control, watch, setValue, reset } = useForm<FormValues>({
    defaultValues: { supplierId: '', restaurantId: '', invoiceNumber: '', invoiceDate: new Date().toISOString().split('T')[0], paymentMethod: 'CASH', notes: '', lines: [{ itemId: '', quantity: 1, unitPrice: 0, vatRate: 15 }] }
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'lines' })
  const watchLines = watch('lines')
  const supplierForHistory = watch('supplierId')

  const subtotal = watchLines.reduce((s: number, l: FormValues) => s + (Number(l.quantity) * Number(l.unitPrice)), 0)
  const vatAmount = watchLines.reduce((s: number, l: FormValues) => s + (Number(l.quantity) * Number(l.unitPrice) * Number(l.vatRate) / 100), 0)
  const total = subtotal + vatAmount

  const fetchPriceHistory = async (itemId: string) => {
    if (!supplierForHistory || !itemId) return
    try {
      const r = await api.get(`/api/v1/suppliers/price-history?supplierId=${supplierForHistory}&itemId=${itemId}`)
      setPriceHistory(r.data.data)
    } catch { /* ignore */ }
  }

  const importMutation = useMutation({
    mutationFn: (file: File) => {
      const fd = new FormData(); fd.append('file', file)
      return api.post('/api/v1/import/purchases', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data.data)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['purchase-lines'] })
      toast({ title: lang === 'ar' ? 'تم الاستيراد' : 'Imported', variant: 'success' })
    },
    onError: () => toast({ title: lang === 'ar' ? 'فشل الاستيراد' : 'Import failed', variant: 'destructive' }),
  })

  const createMutation = useMutation({
    mutationFn: (d: FormValues) => api.post('/api/v1/purchases/invoices', { ...d, subtotal, vatAmount, total }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['purchase-lines'] })
      setOpen(false); reset()
      toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' })
    },
    onError: () => toast({ title: 'Error', variant: 'destructive' }),
  })

  const lines: PurchaseLine[] = linesData?.data || []
  const summary: Summary = linesData?.summary || { taxableNet: 0, inputVat: 0, nonTaxableTotal: 0, taxableWithVat: 0, cashTotal: 0, cardTotal: 0, creditTotal: 0, totalPurchases: 0 }

  const paymentBadge = (method: string) => {
    const map: Record<string, { label: string; color: string }> = {
      CASH: { label: lang === 'ar' ? 'نقد' : 'Cash', color: 'bg-green-100 text-green-700' },
      BANK: { label: lang === 'ar' ? 'بطاقة' : 'Card', color: 'bg-blue-100 text-blue-700' },
      CREDIT: { label: lang === 'ar' ? 'آجل' : 'Credit', color: 'bg-purple-100 text-purple-700' },
    }
    const m = map[method] || { label: method, color: 'bg-gray-100 text-gray-700' }
    return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${m.color}`}>{m.label}</span>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{lang === 'ar' ? 'المشتريات والمصروفات' : 'Purchases & Expenses'}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{lang === 'ar' ? 'تتبع جميع سجلات الشراء والمصروفات مع ضريبة القيمة المضافة.' : 'Track all purchasing and expense records with VAT.'}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <ExportButtons data={lines as unknown as Record<string, unknown>[]} filename="purchases" />
          <Button onClick={() => { reset(); setOpen(true) }} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4" />{lang === 'ar' ? 'إضافة فاتورة' : 'Add Invoice'}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={lang === 'ar' ? 'مشتريات نقدية' : 'CASH PURCHASES'} value={summary.cashTotal} sub={`${lines.filter(l => l.invoice.paymentMethod === 'CASH').length} ${lang === 'ar' ? 'سجل' : 'records'}`} />
        <StatCard label={lang === 'ar' ? 'بطاقة / POS' : 'CARD / POS'} value={summary.cardTotal} sub={`${lines.filter(l => l.invoice.paymentMethod === 'BANK').length} ${lang === 'ar' ? 'سجل' : 'records'}`} />
        <StatCard label={lang === 'ar' ? 'آجل (ح/د)' : 'CREDIT (A/P)'} value={summary.creditTotal} sub={`${lines.filter(l => l.invoice.paymentMethod === 'CREDIT').length} ${lang === 'ar' ? 'سجل' : 'records'}`} />
        <StatCard dark label={lang === 'ar' ? 'إجمالي المشتريات' : 'TOTAL PURCHASES'} value={summary.totalPurchases} sub={`${lines.length} ${lang === 'ar' ? 'سجل' : 'records'}`} />
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="space-y-1">
            <Label className="text-xs text-gray-500">{lang === 'ar' ? 'من' : 'From'}</Label>
            <Input type="date" value={from} onChange={e => setFrom(e.target.value)} className="w-36 text-sm" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-gray-500">{lang === 'ar' ? 'إلى' : 'To'}</Label>
            <Input type="date" value={to} onChange={e => setTo(e.target.value)} className="w-36 text-sm" />
          </div>
          <div className="relative flex-1 min-w-48">
            <Input placeholder={lang === 'ar' ? 'بحث عن منتج / صنف...' : 'Search product / item...'} value={search} onChange={e => setSearch(e.target.value)} className="pl-9 text-sm" />
            <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
          </div>
          <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
            <SelectTrigger className="w-44 text-sm"><SelectValue placeholder={lang === 'ar' ? 'كل الموردين' : 'All Suppliers'} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">{lang === 'ar' ? 'كل الموردين' : 'All Suppliers'}</SelectItem>
              {Array.isArray(suppliers) && suppliers.map((s: { id: string; nameAr: string; nameEn: string }) => (
                <SelectItem key={s.id} value={s.id}>{lang === 'ar' ? s.nameAr : s.nameEn}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-52 text-sm"><SelectValue placeholder={lang === 'ar' ? 'كل الفئات' : 'All Categories'} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">{lang === 'ar' ? 'كل الفئات' : 'All Categories'}</SelectItem>
              {Array.isArray(categories) && categories.map((c: { id: string; nameAr: string; nameEn: string }) => (
                <SelectItem key={c.id} value={c.id}>{lang === 'ar' ? c.nameAr : c.nameEn} — {lang === 'ar' ? c.nameEn : c.nameAr}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedInvoiceType} onValueChange={setSelectedInvoiceType}>
            <SelectTrigger className="w-44 text-sm"><SelectValue placeholder={lang === 'ar' ? 'نوع الفاتورة' : 'All Invoice Types'} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">{lang === 'ar' ? 'كل الأنواع' : 'All Invoice Types'}</SelectItem>
              <SelectItem value="TAX">{lang === 'ar' ? 'فاتورة ضريبية' : 'Tax Invoice'}</SelectItem>
              <SelectItem value="SIMPLE">{lang === 'ar' ? 'فاتورة بسيطة' : 'Simple Invoice'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payment filter chips */}
        <div className="flex gap-2">
          {[
            { key: 'ALL', labelEn: 'All', labelAr: 'الكل' },
            { key: 'CASH', labelEn: 'Cash', labelAr: 'نقد' },
            { key: 'CARD', labelEn: 'Card', labelAr: 'بطاقة' },
            { key: 'CREDIT', labelEn: 'Credit', labelAr: 'آجل' },
          ].map(({ key, labelEn, labelAr }) => (
            <button
              key={key}
              onClick={() => setPaymentFilter(key)}
              className={`px-4 py-1.5 text-xs rounded-full font-medium transition-colors ${paymentFilter === key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {key === 'CASH' && <span className="mr-1 text-green-600">■</span>}
              {key === 'CARD' && <span className="mr-1 text-blue-600">■</span>}
              {key === 'CREDIT' && <span className="mr-1 text-purple-400">■</span>}
              {lang === 'ar' ? labelAr : labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* VAT Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white border rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">{lang === 'ar' ? 'الصافي الخاضع للضريبة' : 'Taxable Net'}</p>
          <p className="font-bold text-sm">SAR {summary.taxableNet.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="text-xs text-gray-400">{lines.filter(l => l.invoice.invoiceType === 'TAX').length} {lang === 'ar' ? 'صنف ضريبي' : 'tax items'}</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-3">
          <p className="text-xs text-green-600 mb-1">{lang === 'ar' ? 'ضريبة المدخلات (قابلة الاسترداد)' : 'Input VAT (Reclaimable)'}</p>
          <p className="font-bold text-sm text-green-700">SAR {summary.inputVat.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="text-xs text-green-500">{lang === 'ar' ? 'من الفواتير الضريبية' : 'from tax invoices'}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3">
          <p className="text-xs text-yellow-600 mb-1">{lang === 'ar' ? 'إجمالي غير الخاضعة للضريبة' : 'Non-Taxable Total'}</p>
          <p className="font-bold text-sm text-yellow-700">SAR {summary.nonTaxableTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="text-xs text-yellow-500">{lines.filter(l => l.invoice.invoiceType !== 'TAX').length} {lang === 'ar' ? 'صنف غير ضريبي' : 'non-tax items'}</p>
        </div>
        <div className="bg-white border rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">{lang === 'ar' ? 'الإجمالي الخاضع للضريبة (شامل ضريبة القيمة المضافة)' : 'Taxable Total (incl. VAT)'}</p>
          <p className="font-bold text-sm">SAR {summary.taxableWithVat.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="text-xs text-gray-400">{lang === 'ar' ? 'المبلغ الإجمالي' : 'gross amount'}</p>
        </div>
      </div>

      {/* Table */}
      {isLoading ? <LoadingSpinner /> : lines.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا توجد مشتريات' : 'No purchase records'} action={{ label: lang === 'ar' ? 'إضافة فاتورة' : 'Add Invoice', onClick: () => setOpen(true) }} icon={Receipt} />
      ) : (
        <div className="bg-white border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'الفاتورة' : 'Invoice'}</TableHead>
                <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'المنتج' : 'Product'}</TableHead>
                <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'الفئة' : 'Category'}</TableHead>
                <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'المورد' : 'Supplier'}</TableHead>
                <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'الدفع' : 'Payment'}</TableHead>
                <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'الكمية' : 'Qty'}</TableHead>
                <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'سعر الوحدة' : 'Unit Price'}</TableHead>
                <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'المبلغ الصافي' : 'Net Amount'}</TableHead>
                <TableHead className="text-xs font-semibold uppercase text-gray-500 text-green-600">{lang === 'ar' ? 'الضريبة' : 'VAT'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map((line) => {
                const netAmount = Number(line.quantity) * Number(line.unitPrice)
                const dateStr = new Date(line.invoice.invoiceDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
                const isTax = line.invoice.invoiceType === 'TAX'
                return (
                  <TableRow key={line.id}>
                    <TableCell className="text-sm">{dateStr}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${isTax ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                        {isTax ? 'Tax' : 'Simple'}
                      </span>
                      {line.invoice.invoiceNumber && (
                        <div className="text-xs text-gray-400 mt-0.5">{line.invoice.invoiceNumber}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{lang === 'ar' ? line.item.nameAr : line.item.nameEn}</div>
                    </TableCell>
                    <TableCell>
                      {line.item.category ? (
                        <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                          {lang === 'ar' ? line.item.category.nameAr : line.item.category.nameEn}
                        </span>
                      ) : '—'}
                    </TableCell>
                    <TableCell className="text-sm">{lang === 'ar' ? line.invoice.supplier.nameAr : line.invoice.supplier.nameEn}</TableCell>
                    <TableCell>{paymentBadge(line.invoice.paymentMethod)}</TableCell>
                    <TableCell className="text-sm">{Number(line.quantity).toLocaleString()}</TableCell>
                    <TableCell className="text-sm">SAR {Number(line.unitPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-sm font-medium">SAR {netAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-sm text-green-600 font-medium">SAR {Number(line.vatAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* New Invoice Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{lang === 'ar' ? 'فاتورة شراء جديدة' : 'New Purchase Invoice'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(d => createMutation.mutate(d))} className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'المورد' : 'Supplier'}</Label>
                <Controller name="supplierId" control={control} rules={{ required: true }} render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'اختر المورد' : 'Select supplier'} /></SelectTrigger>
                    <SelectContent>
                      {Array.isArray(suppliers) && suppliers.map((s: { id: string; nameAr: string; nameEn: string }) => (
                        <SelectItem key={s.id} value={s.id}>{lang === 'ar' ? s.nameAr : s.nameEn}</SelectItem>
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
                    <SelectContent>
                      {Array.isArray(restaurants) && restaurants.map((r: { id: string; nameAr: string; nameEn: string }) => (
                        <SelectItem key={r.id} value={r.id}>{lang === 'ar' ? r.nameAr : r.nameEn}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'رقم الفاتورة' : 'Invoice Number'}</Label>
                <Input {...register('invoiceNumber', { required: true })} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'تاريخ الفاتورة' : 'Invoice Date'}</Label>
                <Input type="date" {...register('invoiceDate', { required: true })} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'نوع الفاتورة' : 'Invoice Type'}</Label>
                <Controller name="invoiceType" control={control} render={({ field }) => (
                  <Select value={field.value || 'TAX'} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TAX">{lang === 'ar' ? 'فاتورة ضريبية' : 'Tax Invoice'}</SelectItem>
                      <SelectItem value="SIMPLE">{lang === 'ar' ? 'فاتورة بسيطة' : 'Simple Invoice'}</SelectItem>
                    </SelectContent>
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
                      <SelectItem value="BANK">{lang === 'ar' ? 'بطاقة / POS' : 'Card / POS'}</SelectItem>
                      <SelectItem value="CREDIT">{lang === 'ar' ? 'آجل' : 'Credit'}</SelectItem>
                    </SelectContent>
                  </Select>
                )} />
              </div>
            </div>

            {/* Lines */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-base font-semibold">{lang === 'ar' ? 'أصناف الفاتورة' : 'Invoice Lines'}</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => append({ itemId: '', quantity: 1, unitPrice: 0, vatRate: 15 })}>
                  <Plus className="h-4 w-4 me-1" />{lang === 'ar' ? 'إضافة صنف' : 'Add Line'}
                </Button>
              </div>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-5 gap-2 items-end p-3 bg-gray-50 rounded-lg">
                    <div className="space-y-1 col-span-2">
                      <Label className="text-xs">{lang === 'ar' ? 'الصنف' : 'Item'}</Label>
                      <Controller name={`lines.${index}.itemId`} control={control} render={({ field: f }) => (
                        <Select value={f.value} onValueChange={v => { f.onChange(v); fetchPriceHistory(v) }}>
                          <SelectTrigger className="h-8 text-xs"><SelectValue placeholder={lang === 'ar' ? 'اختر صنف' : 'Select item'} /></SelectTrigger>
                          <SelectContent>
                            {Array.isArray(items) && items.map((i: { id: string; nameAr: string; nameEn: string; unit: string }) => (
                              <SelectItem key={i.id} value={i.id}>{lang === 'ar' ? i.nameAr : i.nameEn} ({i.unit})</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">{lang === 'ar' ? 'الكمية' : 'Qty'}</Label>
                      <Input type="number" step="0.001" className="h-8 text-xs" {...register(`lines.${index}.quantity`, { valueAsNumber: true })} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">{lang === 'ar' ? 'السعر (قبل الضريبة)' : 'Unit Price (ex-VAT)'}</Label>
                      <Input type="number" step="0.01" className="h-8 text-xs" {...register(`lines.${index}.unitPrice`, { valueAsNumber: true })} />
                    </div>
                    <div className="flex items-end gap-1">
                      <div className="flex-1 space-y-1">
                        <Label className="text-xs">{lang === 'ar' ? 'الضريبة %' : 'VAT %'}</Label>
                        <Input type="number" className="h-8 text-xs" defaultValue={15} {...register(`lines.${index}.vatRate`, { valueAsNumber: true })} />
                      </div>
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => remove(index)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {priceHistory && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">{lang === 'ar' ? 'سجل الأسعار' : 'Price History'}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3 text-xs">
                    <div><span className="text-muted-foreground">{lang === 'ar' ? 'آخر سعر' : 'Last'}: </span><strong>{(priceHistory as { lastPrice?: number }).lastPrice?.toFixed(2) || '-'}</strong></div>
                    <div><span className="text-muted-foreground">{lang === 'ar' ? 'متوسط' : 'Avg'}: </span><strong>{(priceHistory as { averagePrice?: number }).averagePrice?.toFixed(2) || '-'}</strong></div>
                    <div><span className="text-muted-foreground">{lang === 'ar' ? 'الأعلى' : 'High'}: </span><strong>{(priceHistory as { highestPrice?: number }).highestPrice?.toFixed(2) || '-'}</strong></div>
                    <div><span className="text-muted-foreground">{lang === 'ar' ? 'الأدنى' : 'Low'}: </span><strong>{(priceHistory as { lowestPrice?: number }).lowestPrice?.toFixed(2) || '-'}</strong></div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end">
              <div className="space-y-1 w-64 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">{lang === 'ar' ? 'المجموع' : 'Subtotal'}:</span><span>SAR {subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{lang === 'ar' ? 'ضريبة القيمة المضافة' : 'VAT'}:</span><span>SAR {vatAmount.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-base border-t pt-1"><span>{lang === 'ar' ? 'الإجمالي' : 'Total'}:</span><span>SAR {total.toFixed(2)}</span></div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
              <Button type="submit" disabled={createMutation.isPending} className="bg-blue-600 hover:bg-blue-700 text-white">{lang === 'ar' ? 'حفظ الفاتورة' : 'Save Invoice'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
