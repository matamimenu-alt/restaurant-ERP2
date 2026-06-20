import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useRef, useMemo } from 'react'
import * as XLSX from 'xlsx'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import EmptyState from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ExportButtons from '@/components/shared/ExportButtons'
import { Plus, Trash2, Pencil, Receipt, Info, Upload, CheckCircle, XCircle, AlertCircle, ArrowRightLeft, BarChart3, Download } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { downloadPurchasesTemplate } from '@/lib/excelTemplates'

type PurchaseLine = {
  id: string
  quantity: number
  unitPrice: number
  vatAmount: number
  vatRate: number
  total: number
  item: { nameAr: string; nameEn: string; unit: string; category?: { nameAr: string; nameEn: string } }
  invoice: {
    id: string
    invoiceDate: string
    invoiceNumber: string
    invoiceType: string
    paymentMethod: string
    restaurantId: string
    supplier: { nameAr: string; nameEn: string }
    restaurant?: { nameAr: string; nameEn: string }
  }
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

type RestaurantSummary = {
  restaurantId: string
  nameAr: string
  nameEn: string
  cashTotal: number
  cardTotal: number
  creditTotal: number
  taxableNet: number
  inputVat: number
  nonTaxableTotal: number
  grandTotal: number
  invoiceCount: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormValues = Record<string, any>

type ImportRow = {
  date: string
  supplierName: string
  invoiceNumber: string
  invoiceType: string
  paymentMethod: string
  product: string
  category: string
  unit: string
  quantity: number
  unitPrice: number
  vatAmount: number
}

function StatCard({ label, value, sub, dark }: { label: string; value: number; sub?: string; dark?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${dark ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200'}`}>
      <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
      <p className={`text-xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>SAR {Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
      {sub && <p className={`text-xs mt-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{sub}</p>}
    </div>
  )
}

function parseExcelDate(val: unknown): string {
  if (!val) return ''
  if (typeof val === 'number') {
    const d = new Date(Math.round((val - 25569) * 86400 * 1000))
    return d.toISOString().split('T')[0]
  }
  const d = new Date(String(val))
  if (!isNaN(d.getTime())) return d.toISOString().split('T')[0]
  return String(val)
}

function parseImportFile(file: File): Promise<ImportRow[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const wb = XLSX.read(e.target?.result, { type: 'array' })
        const ws = wb.Sheets[wb.SheetNames[0]]
        const rows = XLSX.utils.sheet_to_json(ws) as Record<string, unknown>[]
        const parsed: ImportRow[] = rows.map(row => {
          const n = (...keys: string[]) => { for (const k of keys) { const v = Number(row[k]); if (!isNaN(v)) return v } return 0 }
          const s = (...keys: string[]) => { for (const k of keys) { const v = row[k]; if (v !== undefined && v !== null && String(v).trim()) return String(v).trim() } return '' }
          // Skip note/comment rows
          const firstVal = String(Object.values(row)[0] || '')
          if (firstVal.startsWith('---') || firstVal.startsWith('Invoice Type') || firstVal.startsWith('Payment')) return null
          const payRaw = s('Payment', 'Payment Method', 'طريقة الدفع').toLowerCase()
          const paymentMethod = payRaw.includes('credit') || payRaw === 'آجل' ? 'CREDIT'
            : payRaw.includes('bank') || payRaw.includes('card') || payRaw === 'بطاقة' ? 'BANK' : 'CASH'
          const typeRaw = s('Invoice Type', 'نوع الفاتورة').toLowerCase()
          const invoiceType = typeRaw.includes('tax') || typeRaw === 'tax' ? 'TAX' : 'SIMPLE'
          return {
            date: parseExcelDate(row['Date'] || row['تاريخ الفاتورة'] || row['التاريخ']),
            supplierName: s('Supplier', 'المورد'),
            invoiceNumber: s('Invoice ID', 'Invoice Number', 'رقم الفاتورة'),
            invoiceType,
            paymentMethod,
            product: s('Product', 'المنتج'),
            category: s('Category', 'الفئة'),
            unit: s('Unit', 'الوحدة') || 'unit',
            quantity: n('Quantity', 'الكمية'),
            unitPrice: n('Unit Price (SAR)', 'Unit Price', 'سعر الوحدة'),
            vatAmount: n('VAT (SAR)', 'VAT', 'الضريبة', 'مبلغ الضريبة'),
          }
        }).filter((r): r is ImportRow => r !== null && !!r.date && !!r.product)
        resolve(parsed)
      } catch (err) { reject(err) }
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

export default function PurchasesPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedInvoiceType, setSelectedInvoiceType] = useState('')
  const [paymentFilter, setPaymentFilter] = useState('ALL')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [priceHistory, setPriceHistory] = useState<Record<string, unknown> | null>(null)

  // Selection state (track by invoiceId)
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState<Set<string>>(new Set())
  const [selectAllDb, setSelectAllDb] = useState(false) // "all in DB" mode
  const [deleteAllOpen, setDeleteAllOpen] = useState(false)
  const [deleteAllConfirmText, setDeleteAllConfirmText] = useState('')

  // Transfer state
  const [transferOpen, setTransferOpen] = useState(false)
  const [transferTargetRestaurantId, setTransferTargetRestaurantId] = useState('')

  // Import state
  const [importOpen, setImportOpen] = useState(false)
  const [importRows, setImportRows] = useState<ImportRow[]>([])
  const [importRestaurantId, setImportRestaurantId] = useState('')
  const [importStatus, setImportStatus] = useState<'idle' | 'importing' | 'done'>('idle')
  const [importResults, setImportResults] = useState<{ success: number; errors: string[] }>({ success: 0, errors: [] })
  const importFileRef = useRef<HTMLInputElement>(null)

  // Report date filter
  const [reportFrom, setReportFrom] = useState('')
  const [reportTo, setReportTo] = useState('')

  const params = new URLSearchParams({ limit: '500' })
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

  const summaryParams = new URLSearchParams()
  if (reportFrom) summaryParams.set('from', reportFrom)
  if (reportTo) summaryParams.set('to', reportTo)

  const { data: summaryData } = useQuery({
    queryKey: ['purchases-summary', reportFrom, reportTo],
    queryFn: () => api.get(`/api/v1/purchases/summary?${summaryParams}`).then(r => r.data.data),
  })

  const { data: suppliers } = useQuery({ queryKey: ['suppliers-all'], queryFn: () => api.get('/api/v1/suppliers?limit=200').then(r => r.data.data) })
  const { data: categories } = useQuery({ queryKey: ['inventory-categories'], queryFn: () => api.get('/api/v1/inventory/categories?limit=200').then(r => r.data.data) })
  const { data: restaurants } = useQuery({ queryKey: ['restaurants'], queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data) })
  const { data: items } = useQuery({ queryKey: ['inventory-items'], queryFn: () => api.get('/api/v1/inventory/items?limit=500').then(r => r.data.data) })

  const { register, handleSubmit, control, watch, reset } = useForm<FormValues>({
    defaultValues: { supplierId: '', restaurantId: '', invoiceNumber: '', invoiceDate: new Date().toISOString().split('T')[0], paymentMethod: 'CASH', invoiceType: 'TAX', notes: '', lines: [{ itemId: '', quantity: 1, unitPrice: 0, vatRate: 15 }] }
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

  const createMutation = useMutation({
    mutationFn: (d: FormValues) => editingInvoiceId
      ? api.put(`/api/v1/purchases/invoices/${editingInvoiceId}`, { ...d, subtotal, vatAmount, total })
      : api.post('/api/v1/purchases/invoices', { ...d, subtotal, vatAmount, total }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['purchase-lines'] })
      setOpen(false); reset(); setEditingInvoiceId(null)
      toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' })
    },
    onError: () => toast({ title: 'Error', variant: 'destructive' }),
  })

  const deleteMutation = useMutation({
    mutationFn: (invoiceId: string) => api.delete(`/api/v1/purchases/invoices/${invoiceId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['purchase-lines'] })
      toast({ title: lang === 'ar' ? 'تم الحذف' : 'Deleted' })
    },
    onError: () => toast({ title: lang === 'ar' ? 'فشل الحذف' : 'Delete failed', variant: 'destructive' }),
  })

  const bulkDeleteMutation = useMutation({
    mutationFn: (ids: string[]) => api.post('/api/v1/purchases/invoices/bulk-delete', { ids }).then(r => r.data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['purchase-lines'] })
      qc.invalidateQueries({ queryKey: ['purchases-summary'] })
      setSelectedInvoiceIds(new Set()); setSelectAllDb(false)
      toast({ title: lang === 'ar' ? `تم حذف ${data.data?.deleted || 0} فاتورة` : `Deleted ${data.data?.deleted || 0} invoices`, variant: 'success' })
    },
    onError: () => toast({ title: lang === 'ar' ? 'فشل الحذف' : 'Bulk delete failed', variant: 'destructive' }),
  })

  const deleteAllMutation = useMutation({
    mutationFn: () => {
      const p = new URLSearchParams()
      // Pass current restaurant filter if set (from axios interceptor it's auto-injected, but for delete-all we call directly)
      return api.delete('/api/v1/purchases/invoices').then(r => r.data)
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['purchase-lines'] })
      qc.invalidateQueries({ queryKey: ['purchases-summary'] })
      setSelectedInvoiceIds(new Set()); setSelectAllDb(false)
      setDeleteAllOpen(false); setDeleteAllConfirmText('')
      toast({ title: lang === 'ar' ? `تم حذف ${data.data?.deleted || 0} فاتورة` : `Deleted ${data.data?.deleted || 0} invoices`, variant: 'success' })
    },
    onError: () => toast({ title: lang === 'ar' ? 'فشل حذف الكل' : 'Delete all failed', variant: 'destructive' }),
  })

  const loadAllIdsAndSelect = async () => {
    try {
      const p = new URLSearchParams()
      const r = await api.get(`/api/v1/purchases/invoices/all-ids?${p}`)
      const ids: string[] = r.data.data?.ids || []
      setSelectedInvoiceIds(new Set(ids))
      setSelectAllDb(true)
      toast({ title: lang === 'ar' ? `تم تحديد ${ids.length} فاتورة` : `Selected ${ids.length} invoices` })
    } catch {
      toast({ title: lang === 'ar' ? 'خطأ في تحميل الفواتير' : 'Failed to load invoices', variant: 'destructive' })
    }
  }

  const openEditInvoice = async (invoiceId: string) => {
    try {
      const r = await api.get(`/api/v1/purchases/invoices/${invoiceId}`)
      const inv = r.data.data
      reset({
        supplierId: inv.supplierId,
        restaurantId: inv.restaurantId,
        invoiceNumber: inv.invoiceNumber,
        invoiceDate: new Date(inv.invoiceDate).toISOString().split('T')[0],
        invoiceType: inv.invoiceType,
        paymentMethod: inv.paymentMethod,
        notes: inv.notes || '',
        lines: inv.lines.map((l: { itemId: string; quantity: number; unitPrice: number; vatRate: number }) => ({
          itemId: l.itemId,
          quantity: Number(l.quantity),
          unitPrice: Number(l.unitPrice),
          vatRate: Number(l.vatRate),
        })),
      })
      setEditingInvoiceId(invoiceId)
      setOpen(true)
    } catch {
      toast({ title: lang === 'ar' ? 'فشل تحميل الفاتورة' : 'Failed to load invoice', variant: 'destructive' })
    }
  }

  const transferMutation = useMutation({
    mutationFn: ({ ids, targetRestaurantId }: { ids: string[]; targetRestaurantId: string }) =>
      api.post('/api/v1/purchases/invoices/bulk-transfer', { ids, targetRestaurantId }).then(r => r.data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['purchase-lines'] })
      qc.invalidateQueries({ queryKey: ['purchases-summary'] })
      setSelectedInvoiceIds(new Set())
      setTransferOpen(false)
      setTransferTargetRestaurantId('')
      toast({ title: lang === 'ar' ? `تم تحويل ${data.data?.transferred || 0} فاتورة` : `Transferred ${data.data?.transferred || 0} invoices`, variant: 'success' })
    },
    onError: () => toast({ title: lang === 'ar' ? 'فشل التحويل' : 'Transfer failed', variant: 'destructive' }),
  })

  const lines: PurchaseLine[] = linesData?.data || []
  const summary: Summary = linesData?.summary || { taxableNet: 0, inputVat: 0, nonTaxableTotal: 0, taxableWithVat: 0, cashTotal: 0, cardTotal: 0, creditTotal: 0, totalPurchases: 0 }

  // Unique invoice IDs in displayed order
  const invoiceOrder = useMemo(() => {
    const seen = new Set<string>()
    const order: string[] = []
    for (const l of lines) {
      if (!seen.has(l.invoice.id)) { seen.add(l.invoice.id); order.push(l.invoice.id) }
    }
    return order
  }, [lines])

  const allSelected = invoiceOrder.length > 0 && invoiceOrder.every(id => selectedInvoiceIds.has(id))
  const someSelected = selectedInvoiceIds.size > 0

  const toggleAll = () => {
    if (allSelected) setSelectedInvoiceIds(new Set())
    else setSelectedInvoiceIds(new Set(invoiceOrder))
  }

  const toggleInvoice = (id: string) => {
    setSelectAllDb(false)
    setSelectedInvoiceIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const paymentBadge = (method: string) => {
    const map: Record<string, { label: string; color: string }> = {
      CASH: { label: lang === 'ar' ? 'نقد' : 'Cash', color: 'bg-green-100 text-green-700' },
      BANK: { label: lang === 'ar' ? 'بطاقة' : 'Card', color: 'bg-blue-100 text-blue-700' },
      CREDIT: { label: lang === 'ar' ? 'آجل' : 'Credit', color: 'bg-purple-100 text-purple-700' },
    }
    const m = map[method] || { label: method, color: 'bg-gray-100 text-gray-700' }
    return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${m.color}`}>{m.label}</span>
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const rows = await parseImportFile(file)
      setImportRows(rows); setImportStatus('idle'); setImportResults({ success: 0, errors: [] })
    } catch { toast({ title: lang === 'ar' ? 'خطأ في قراءة الملف' : 'Error reading file', variant: 'destructive' }) }
    if (importFileRef.current) importFileRef.current.value = ''
  }

  const runImport = async () => {
    if (!importRestaurantId) { toast({ title: lang === 'ar' ? 'يرجى اختيار المطعم' : 'Please select a restaurant', variant: 'destructive' }); return }
    setImportStatus('importing')
    const errors: string[] = []
    let success = 0

    const [suppRes, itemRes, catRes] = await Promise.all([
      api.get('/api/v1/suppliers?limit=500').then(r => r.data.data as { id: string; nameAr: string }[]),
      api.get('/api/v1/inventory/items?limit=1000').then(r => r.data.data as { id: string; nameAr: string; unit: string }[]),
      api.get('/api/v1/inventory/categories?limit=200').then(r => r.data.data as { id: string; nameEn: string; nameAr: string }[]),
    ])

    const supplierMap: Record<string, string> = Object.fromEntries(suppRes.map(s => [s.nameAr, s.id]))
    const itemMap: Record<string, string> = Object.fromEntries(itemRes.map(i => [i.nameAr, i.id]))
    const catMap: Record<string, string> = Object.fromEntries([...catRes.map(c => [c.nameEn, c.id]), ...catRes.map(c => [c.nameAr, c.id])])

    const getSupplier = async (name: string): Promise<string> => {
      if (supplierMap[name]) return supplierMap[name]
      const s = await api.post('/api/v1/suppliers', { nameAr: name, nameEn: name }).then(r => r.data.data)
      supplierMap[name] = s.id; return s.id
    }
    const getItem = async (name: string, categoryId: string | undefined, unit: string): Promise<string> => {
      if (itemMap[name]) return itemMap[name]
      const i = await api.post('/api/v1/inventory/items', { nameAr: name, nameEn: name, unit: unit || 'unit', categoryId, lastPurchasePrice: 0 }).then(r => r.data.data)
      itemMap[name] = i.id; return i.id
    }

    const groups: Record<string, ImportRow[]> = {}
    for (const row of importRows) {
      const key = `${row.date}__${row.supplierName}__${row.invoiceNumber}`
      if (!groups[key]) groups[key] = []
      groups[key].push(row)
    }

    for (const groupRows of Object.values(groups)) {
      try {
        const first = groupRows[0]
        const supplierId = await getSupplier(first.supplierName)
        const invoiceLines = []
        let subtotalAmt = 0, vatAmt = 0
        for (const row of groupRows) {
          const catId = catMap[row.category] || undefined
          const itemId = await getItem(row.product, catId, row.unit)
          const net = row.quantity * row.unitPrice
          subtotalAmt += net; vatAmt += row.vatAmount
          invoiceLines.push({ itemId, quantity: row.quantity, unitPrice: row.unitPrice, vatRate: net > 0 ? Math.round((row.vatAmount / net) * 100) : 0, vatAmount: row.vatAmount, total: net + row.vatAmount })
        }
        await api.post('/api/v1/purchases/invoices', {
          restaurantId: importRestaurantId, supplierId,
          invoiceNumber: first.invoiceNumber || `IMP-${Date.now()}`,
          invoiceDate: first.date, invoiceType: first.invoiceType, paymentMethod: first.paymentMethod,
          subtotal: subtotalAmt, vatAmount: vatAmt, total: subtotalAmt + vatAmt, lines: invoiceLines,
        })
        success++
      } catch (err: unknown) {
        const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || String(err)
        errors.push(`${groupRows[0].date} ${groupRows[0].supplierName}: ${msg}`)
      }
    }
    setImportResults({ success, errors }); setImportStatus('done')
    if (success > 0) qc.invalidateQueries({ queryKey: ['purchase-lines'] })
  }

  const invoiceSeenInTable = new Set<string>()

  const byRestaurant: RestaurantSummary[] = summaryData?.byRestaurant || []
  const totals = summaryData?.totals || { cashTotal: 0, cardTotal: 0, creditTotal: 0, taxableNet: 0, inputVat: 0, nonTaxableTotal: 0, grandTotal: 0, invoiceCount: 0 }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{lang === 'ar' ? 'المشتريات والمصروفات' : 'Purchases & Expenses'}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{lang === 'ar' ? 'تتبع جميع سجلات الشراء والمصروفات مع ضريبة القيمة المضافة.' : 'Track all purchasing and expense records with VAT.'}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <ExportButtons
            data={lines.map(l => ({
              'التاريخ': new Date(l.invoice.invoiceDate).toLocaleDateString('en-CA'),
              'المطعم': l.invoice.restaurant?.nameAr || '',
              'نوع الفاتورة': l.invoice.invoiceType === 'TAX' ? 'ضريبية' : 'بسيطة',
              'رقم الفاتورة': l.invoice.invoiceNumber,
              'المنتج': l.item.nameAr,
              'الفئة': l.item.category ? l.item.category.nameAr : '',
              'المورد': l.invoice.supplier.nameAr,
              'طريقة الدفع': l.invoice.paymentMethod === 'CASH' ? 'نقد' : l.invoice.paymentMethod === 'BANK' ? 'بطاقة' : 'آجل',
              'الكمية': Number(l.quantity),
              'الوحدة': l.item.unit,
              'سعر الوحدة': Number(l.unitPrice),
              'المبلغ الصافي': Number((Number(l.quantity) * Number(l.unitPrice)).toFixed(2)),
              'الضريبة': Number(l.vatAmount),
              'الإجمالي': Number(l.total),
            }))}
            filename="purchases"
          />
          <Button variant="outline" onClick={() => { setImportRows([]); setImportStatus('idle'); setImportResults({ success: 0, errors: [] }); setImportOpen(true) }} className="gap-2 border-green-200 text-green-700 hover:bg-green-50">
            <Upload className="h-4 w-4" />{lang === 'ar' ? 'استيراد Excel' : 'Import Excel'}
          </Button>
          <Button onClick={() => { setEditingInvoiceId(null); reset({ supplierId: '', restaurantId: '', invoiceNumber: '', invoiceDate: new Date().toISOString().split('T')[0], paymentMethod: 'CASH', invoiceType: 'TAX', lines: [{ itemId: '', quantity: 1, unitPrice: 0, vatRate: 15 }] }); setOpen(true) }} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
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

      <Tabs defaultValue="records">
        <TabsList className="bg-white border rounded-lg p-1 gap-1">
          <TabsTrigger value="records" className="gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <Receipt className="h-4 w-4" />{lang === 'ar' ? 'الفواتير' : 'Invoices'}
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
            <BarChart3 className="h-4 w-4" />{lang === 'ar' ? 'التقارير التجميعية' : 'Summary Reports'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="mt-4 space-y-4">
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
                    <SelectItem key={c.id} value={c.id}>{lang === 'ar' ? c.nameAr : c.nameEn}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedInvoiceType} onValueChange={setSelectedInvoiceType}>
                <SelectTrigger className="w-44 text-sm"><SelectValue placeholder={lang === 'ar' ? 'نوع الفاتورة' : 'All Invoice Types'} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">{lang === 'ar' ? 'كل الأنواع' : 'All Types'}</SelectItem>
                  <SelectItem value="TAX">{lang === 'ar' ? 'فاتورة ضريبية' : 'Tax Invoice'}</SelectItem>
                  <SelectItem value="SIMPLE">{lang === 'ar' ? 'فاتورة بسيطة' : 'Simple Invoice'}</SelectItem>
                </SelectContent>
              </Select>
              {(from || to || search || selectedSupplier || selectedCategory || selectedInvoiceType || paymentFilter !== 'ALL') && (
                <Button variant="ghost" size="sm" className="text-red-500" onClick={() => { setFrom(''); setTo(''); setSearch(''); setSelectedSupplier(''); setSelectedCategory(''); setSelectedInvoiceType(''); setPaymentFilter('ALL') }}>
                  ✕ {lang === 'ar' ? 'مسح الكل' : 'Clear all'}
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              {[{ key: 'ALL', en: 'All', ar: 'الكل' }, { key: 'CASH', en: 'Cash', ar: 'نقد' }, { key: 'CARD', en: 'Card', ar: 'بطاقة' }, { key: 'CREDIT', en: 'Credit', ar: 'آجل' }].map(({ key, en, ar }) => (
                <button key={key} onClick={() => setPaymentFilter(key)}
                  className={`px-4 py-1.5 text-xs rounded-full font-medium transition-colors ${paymentFilter === key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {key === 'CASH' && <span className="mr-1 text-green-600">■</span>}
                  {key === 'CARD' && <span className="mr-1 text-blue-600">■</span>}
                  {key === 'CREDIT' && <span className="mr-1 text-purple-400">■</span>}
                  {lang === 'ar' ? ar : en}
                </button>
              ))}
            </div>
          </div>

          {/* VAT Summary Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white border rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">{lang === 'ar' ? 'الصافي الخاضع للضريبة' : 'Taxable Net'}</p>
              <p className="font-bold text-sm">SAR {summary.taxableNet.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl p-3">
              <p className="text-xs text-green-600 mb-1">{lang === 'ar' ? 'ضريبة المدخلات' : 'Input VAT (Reclaimable)'}</p>
              <p className="font-bold text-sm text-green-700">SAR {summary.inputVat.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3">
              <p className="text-xs text-yellow-600 mb-1">{lang === 'ar' ? 'غير خاضعة للضريبة' : 'Non-Taxable Total'}</p>
              <p className="font-bold text-sm text-yellow-700">SAR {summary.nonTaxableTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white border rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">{lang === 'ar' ? 'الإجمالي شامل الضريبة' : 'Taxable Total (incl. VAT)'}</p>
              <p className="font-bold text-sm">SAR {summary.taxableWithVat.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>

          {/* Quick actions toolbar — always visible */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button size="sm" variant="outline" onClick={loadAllIdsAndSelect} className="gap-1.5 text-blue-600 border-blue-200 hover:bg-blue-50 text-xs">
              ☑ {lang === 'ar' ? 'تحديد كل الفواتير في قاعدة البيانات' : 'Select ALL invoices in DB'}
            </Button>
            <Button size="sm" variant="outline" onClick={() => { setDeleteAllOpen(true); setDeleteAllConfirmText('') }} className="gap-1.5 border-red-300 text-red-600 hover:bg-red-50 text-xs">
              <Trash2 className="h-3.5 w-3.5" />
              {lang === 'ar' ? 'حذف كل الفواتير' : 'Delete ALL Invoices'}
            </Button>
          </div>

          {/* Bulk actions bar */}
          {someSelected && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-blue-700">
                {selectAllDb
                  ? (lang === 'ar' ? `✓ تم تحديد كل ${selectedInvoiceIds.size} فاتورة في قاعدة البيانات` : `✓ All ${selectedInvoiceIds.size} invoices in DB selected`)
                  : (lang === 'ar' ? `تم تحديد ${selectedInvoiceIds.size} فاتورة` : `${selectedInvoiceIds.size} invoices selected`)}
              </span>
              <Button size="sm" variant="outline" className="gap-1.5 border-purple-300 text-purple-700 hover:bg-purple-50"
                onClick={() => { setTransferTargetRestaurantId(''); setTransferOpen(true) }}>
                <ArrowRightLeft className="h-3.5 w-3.5" />
                {lang === 'ar' ? 'تحويل إلى مطعم آخر' : 'Transfer to Restaurant'}
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5 border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => {
                  if (confirm(lang === 'ar' ? `حذف ${selectedInvoiceIds.size} فاتورة؟` : `Delete ${selectedInvoiceIds.size} invoices?`))
                    bulkDeleteMutation.mutate([...selectedInvoiceIds])
                }}>
                <Trash2 className="h-3.5 w-3.5" />
                {lang === 'ar' ? 'حذف المحدد' : 'Delete Selected'}
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-500" onClick={() => setSelectedInvoiceIds(new Set())}>
                {lang === 'ar' ? 'إلغاء التحديد' : 'Deselect All'}
              </Button>
            </div>
          )}

          {/* Table */}
          {isLoading ? <LoadingSpinner /> : lines.length === 0 ? (
            <EmptyState title={lang === 'ar' ? 'لا توجد مشتريات' : 'No purchase records'} action={{ label: lang === 'ar' ? 'إضافة فاتورة' : 'Add Invoice', onClick: () => setOpen(true) }} icon={Receipt} />
          ) : (
            <div className="bg-white border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-10">
                      <input type="checkbox" checked={allSelected} onChange={toggleAll}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 cursor-pointer" />
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'الفاتورة' : 'Invoice'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'المنتج' : 'Product'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'الفئة' : 'Category'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'المورد' : 'Supplier'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'المطعم' : 'Restaurant'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'الدفع' : 'Payment'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'الكمية' : 'Qty'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'سعر الوحدة' : 'Unit Price'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'الصافي' : 'Net'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500 text-green-600">{lang === 'ar' ? 'الضريبة' : 'VAT'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'الإجمالي' : 'Total'}</TableHead>
                    <TableHead className="w-20"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lines.map((line) => {
                    const netAmount = Number(line.quantity) * Number(line.unitPrice)
                    const dateStr = new Date(line.invoice.invoiceDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
                    const isTax = line.invoice.invoiceType === 'TAX'
                    const invoiceId = line.invoice.id
                    const isFirst = !invoiceSeenInTable.has(invoiceId)
                    if (isFirst) invoiceSeenInTable.add(invoiceId)
                    const isSelected = selectedInvoiceIds.has(invoiceId)
                    return (
                      <TableRow key={line.id} className={isSelected ? 'bg-blue-50' : undefined}
                        onClick={() => isFirst && toggleInvoice(invoiceId)} style={{ cursor: isFirst ? 'pointer' : undefined }}>
                        <TableCell onClick={e => e.stopPropagation()}>
                          {isFirst && (
                            <input type="checkbox" checked={isSelected} onChange={() => toggleInvoice(invoiceId)}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 cursor-pointer" />
                          )}
                        </TableCell>
                        <TableCell className="text-sm">{dateStr}</TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-0.5 rounded font-medium ${isTax ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                            {isTax ? 'Tax' : 'Simple'}
                          </span>
                          {line.invoice.invoiceNumber && <div className="text-xs text-gray-400 mt-0.5 truncate max-w-[90px]">{line.invoice.invoiceNumber}</div>}
                        </TableCell>
                        <TableCell><div className="text-sm font-medium">{lang === 'ar' ? line.item.nameAr : line.item.nameEn}</div></TableCell>
                        <TableCell>
                          {line.item.category ? (
                            <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                              {lang === 'ar' ? line.item.category.nameAr : line.item.category.nameEn}
                            </span>
                          ) : '—'}
                        </TableCell>
                        <TableCell className="text-sm">{lang === 'ar' ? line.invoice.supplier.nameAr : line.invoice.supplier.nameEn}</TableCell>
                        <TableCell className="text-xs text-gray-500">{line.invoice.restaurant ? (lang === 'ar' ? line.invoice.restaurant.nameAr : line.invoice.restaurant.nameEn) : '—'}</TableCell>
                        <TableCell>{paymentBadge(line.invoice.paymentMethod)}</TableCell>
                        <TableCell className="text-sm">{Number(line.quantity).toLocaleString()}</TableCell>
                        <TableCell className="text-sm">SAR {Number(line.unitPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-sm font-medium">SAR {netAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-sm text-green-600 font-medium">SAR {Number(line.vatAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-sm font-bold">SAR {Number(line.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell onClick={e => e.stopPropagation()}>
                          {isFirst && (
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7"
                                onClick={() => openEditInvoice(invoiceId)}>
                                <Pencil className="h-3.5 w-3.5 text-blue-500" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7"
                                onClick={() => { if (confirm(lang === 'ar' ? 'حذف هذه الفاتورة؟' : 'Delete this invoice?')) deleteMutation.mutate(invoiceId) }}>
                                <Trash2 className="h-3.5 w-3.5 text-red-500" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* Summary Reports Tab */}
        <TabsContent value="reports" className="mt-4 space-y-4">
          <div className="bg-white border rounded-xl p-4">
            <div className="flex flex-wrap gap-3 items-end">
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">{lang === 'ar' ? 'من' : 'From'}</Label>
                <Input type="date" value={reportFrom} onChange={e => setReportFrom(e.target.value)} className="w-36 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">{lang === 'ar' ? 'إلى' : 'To'}</Label>
                <Input type="date" value={reportTo} onChange={e => setReportTo(e.target.value)} className="w-36 text-sm" />
              </div>
              <ExportButtons
                data={[
                  ...byRestaurant.map(r => ({
                    [lang === 'ar' ? 'المطعم' : 'Restaurant']: lang === 'ar' ? r.nameAr : r.nameEn,
                    [lang === 'ar' ? 'عدد الفواتير' : 'Invoices']: r.invoiceCount,
                    [lang === 'ar' ? 'نقد' : 'Cash']: Number(r.cashTotal.toFixed(2)),
                    [lang === 'ar' ? 'بطاقة' : 'Card']: Number(r.cardTotal.toFixed(2)),
                    [lang === 'ar' ? 'آجل' : 'Credit']: Number(r.creditTotal.toFixed(2)),
                    [lang === 'ar' ? 'الصافي الخاضع للضريبة' : 'Taxable Net']: Number(r.taxableNet.toFixed(2)),
                    [lang === 'ar' ? 'ضريبة المدخلات' : 'Input VAT']: Number(r.inputVat.toFixed(2)),
                    [lang === 'ar' ? 'غير خاضعة' : 'Non-Taxable']: Number(r.nonTaxableTotal.toFixed(2)),
                    [lang === 'ar' ? 'الإجمالي' : 'Grand Total']: Number(r.grandTotal.toFixed(2)),
                  })),
                  {
                    [lang === 'ar' ? 'المطعم' : 'Restaurant']: lang === 'ar' ? 'الإجمالي الكلي' : 'GRAND TOTAL',
                    [lang === 'ar' ? 'عدد الفواتير' : 'Invoices']: totals.invoiceCount,
                    [lang === 'ar' ? 'نقد' : 'Cash']: Number(totals.cashTotal.toFixed(2)),
                    [lang === 'ar' ? 'بطاقة' : 'Card']: Number(totals.cardTotal.toFixed(2)),
                    [lang === 'ar' ? 'آجل' : 'Credit']: Number(totals.creditTotal.toFixed(2)),
                    [lang === 'ar' ? 'الصافي الخاضع للضريبة' : 'Taxable Net']: Number(totals.taxableNet.toFixed(2)),
                    [lang === 'ar' ? 'ضريبة المدخلات' : 'Input VAT']: Number(totals.inputVat.toFixed(2)),
                    [lang === 'ar' ? 'غير خاضعة' : 'Non-Taxable']: Number(totals.nonTaxableTotal.toFixed(2)),
                    [lang === 'ar' ? 'الإجمالي' : 'Grand Total']: Number(totals.grandTotal.toFixed(2)),
                  }
                ]}
                filename="purchases-summary"
              />
            </div>
          </div>

          {/* Per restaurant cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {byRestaurant.map(r => (
              <div key={r.restaurantId} className="bg-white border rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base">{lang === 'ar' ? r.nameAr : r.nameEn}</h3>
                  <span className="text-xs text-gray-400">{r.invoiceCount} {lang === 'ar' ? 'فاتورة' : 'invoices'}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">SAR {r.grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <div className="text-green-600 font-medium">{lang === 'ar' ? 'نقد' : 'Cash'}</div>
                    <div className="font-bold text-gray-800">{r.cashTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2 text-center">
                    <div className="text-blue-600 font-medium">{lang === 'ar' ? 'بطاقة' : 'Card'}</div>
                    <div className="font-bold text-gray-800">{r.cardTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-2 text-center">
                    <div className="text-purple-600 font-medium">{lang === 'ar' ? 'آجل' : 'Credit'}</div>
                    <div className="font-bold text-gray-800">{r.creditTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs border-t pt-2">
                  <div>
                    <span className="text-gray-500">{lang === 'ar' ? 'الصافي الخاضع للضريبة: ' : 'Taxable Net: '}</span>
                    <span className="font-medium">SAR {r.taxableNet.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div>
                    <span className="text-green-600">{lang === 'ar' ? 'ضريبة المدخلات: ' : 'Input VAT: '}</span>
                    <span className="font-medium text-green-700">SAR {r.inputVat.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Grand total row */}
          {byRestaurant.length > 1 && (
            <div className="bg-gray-900 text-white rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base">{lang === 'ar' ? 'الإجمالي الكلي — جميع المطاعم' : 'GRAND TOTAL — All Restaurants'}</h3>
                <span className="text-gray-400 text-xs">{totals.invoiceCount} {lang === 'ar' ? 'فاتورة' : 'invoices'}</span>
              </div>
              <div className="text-3xl font-bold mb-3">SAR {Number(totals.grandTotal).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div><span className="text-gray-400">{lang === 'ar' ? 'نقد' : 'Cash'}: </span><span className="text-green-400 font-bold">SAR {Number(totals.cashTotal).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></div>
                <div><span className="text-gray-400">{lang === 'ar' ? 'بطاقة' : 'Card'}: </span><span className="text-blue-400 font-bold">SAR {Number(totals.cardTotal).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></div>
                <div><span className="text-gray-400">{lang === 'ar' ? 'آجل' : 'Credit'}: </span><span className="text-purple-400 font-bold">SAR {Number(totals.creditTotal).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></div>
                <div><span className="text-gray-400">{lang === 'ar' ? 'الصافي الخاضع للضريبة' : 'Taxable Net'}: </span><span className="font-bold">SAR {Number(totals.taxableNet).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></div>
                <div><span className="text-gray-400">{lang === 'ar' ? 'ضريبة المدخلات' : 'Input VAT'}: </span><span className="text-green-400 font-bold">SAR {Number(totals.inputVat).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></div>
                <div><span className="text-gray-400">{lang === 'ar' ? 'غير خاضعة' : 'Non-Taxable'}: </span><span className="font-bold">SAR {Number(totals.nonTaxableTotal).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></div>
              </div>
            </div>
          )}

          {byRestaurant.length === 0 && (
            <div className="bg-white border rounded-xl p-12 text-center text-gray-400">
              <BarChart3 className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p>{lang === 'ar' ? 'لا توجد بيانات' : 'No data'}</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Delete All Confirmation Dialog */}
      <Dialog open={deleteAllOpen} onOpenChange={setDeleteAllOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              {lang === 'ar' ? 'حذف كل الفواتير' : 'Delete ALL Invoices'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700 space-y-2">
              <p className="font-bold text-base">⚠️ {lang === 'ar' ? 'تحذير: هذا الإجراء لا يمكن التراجع عنه!' : 'Warning: This action cannot be undone!'}</p>
              <p>{lang === 'ar'
                ? 'سيتم حذف جميع فواتير الشراء وأصنافها للمطعم الحالي نهائياً من قاعدة البيانات.'
                : 'All purchase invoices and their lines for the current restaurant will be permanently deleted.'}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {lang === 'ar' ? 'اكتب "احذف كل الفواتير" للتأكيد:' : 'Type "DELETE ALL" to confirm:'}
              </Label>
              <Input
                value={deleteAllConfirmText}
                onChange={e => setDeleteAllConfirmText(e.target.value)}
                placeholder={lang === 'ar' ? 'احذف كل الفواتير' : 'DELETE ALL'}
                className="border-red-300 focus:border-red-500"
                autoComplete="off"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setDeleteAllOpen(false); setDeleteAllConfirmText('') }}>
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button
                variant="destructive"
                disabled={
                  deleteAllMutation.isPending ||
                  (lang === 'ar' ? deleteAllConfirmText !== 'احذف كل الفواتير' : deleteAllConfirmText !== 'DELETE ALL')
                }
                onClick={() => deleteAllMutation.mutate()}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                {deleteAllMutation.isPending
                  ? (lang === 'ar' ? 'جارٍ الحذف...' : 'Deleting...')
                  : (lang === 'ar' ? 'حذف كل الفواتير نهائياً' : 'Delete All Permanently')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transfer Dialog */}
      <Dialog open={transferOpen} onOpenChange={setTransferOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4 text-purple-600" />
              {lang === 'ar' ? 'تحويل الفواتير إلى مطعم آخر' : 'Transfer Invoices to Another Restaurant'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700">
              {lang === 'ar'
                ? `سيتم تحويل ${selectedInvoiceIds.size} فاتورة إلى المطعم المحدد. لن تظهر هذه الفواتير في تقارير المطعم الأصلي الشهرية.`
                : `${selectedInvoiceIds.size} invoices will be moved to the selected restaurant and removed from the source restaurant's monthly reports.`}
            </div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'المطعم المستهدف' : 'Target Restaurant'} <span className="text-red-500">*</span></Label>
              <Select value={transferTargetRestaurantId} onValueChange={setTransferTargetRestaurantId}>
                <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'اختر المطعم' : 'Select restaurant'} /></SelectTrigger>
                <SelectContent>
                  {Array.isArray(restaurants) && (restaurants as { id: string; nameAr: string; nameEn: string }[]).map(r => (
                    <SelectItem key={r.id} value={r.id}>{lang === 'ar' ? r.nameAr : r.nameEn}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setTransferOpen(false)}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
              <Button
                disabled={!transferTargetRestaurantId || transferMutation.isPending}
                onClick={() => transferMutation.mutate({ ids: [...selectedInvoiceIds], targetRestaurantId: transferTargetRestaurantId })}
                className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
                <ArrowRightLeft className="h-4 w-4" />
                {lang === 'ar' ? `تحويل ${selectedInvoiceIds.size} فاتورة` : `Transfer ${selectedInvoiceIds.size} invoices`}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <input ref={importFileRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileSelect} />
      <Dialog open={importOpen} onOpenChange={setImportOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold flex items-center gap-2">
              <Upload className="h-4 w-4 text-green-600" />
              {lang === 'ar' ? 'استيراد فواتير المشتريات من Excel' : 'Import Purchase Invoices from Excel'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start justify-between gap-3">
              <div className="text-xs text-blue-700">
                <p className="font-semibold mb-1">{lang === 'ar' ? 'أعمدة النموذج:' : 'Template columns:'}</p>
                <p className="text-blue-600 font-mono text-[11px] leading-5">
                  Date | Supplier | Invoice ID | Invoice Type | Payment | Product | Category | Unit | Quantity | Unit Price (SAR) | VAT (SAR)
                </p>
                <p className="text-blue-500 mt-1">{lang === 'ar' ? 'نفس Invoice ID = نفس الفاتورة (أصناف متعددة)' : 'Same Invoice ID = same invoice (multiple lines)'}</p>
              </div>
              <Button variant="outline" size="sm" onClick={downloadPurchasesTemplate} className="shrink-0 gap-1.5 text-blue-600 border-blue-200 hover:bg-blue-100 text-xs">
                <Download className="h-3.5 w-3.5" />{lang === 'ar' ? 'تحميل النموذج' : 'Download Template'}
              </Button>
            </div>
            {Array.isArray(restaurants) && restaurants.length > 0 && (
              <div className="space-y-1">
                <Label className="text-xs font-medium">{lang === 'ar' ? 'المطعم' : 'Restaurant'} <span className="text-red-500">*</span></Label>
                <Select value={importRestaurantId} onValueChange={setImportRestaurantId}>
                  <SelectTrigger className="w-64"><SelectValue placeholder={lang === 'ar' ? 'اختر المطعم' : 'Select restaurant'} /></SelectTrigger>
                  <SelectContent>
                    {(restaurants as { id: string; nameAr: string; nameEn: string }[]).map(r => (
                      <SelectItem key={r.id} value={r.id}>{lang === 'ar' ? r.nameAr : r.nameEn}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => importFileRef.current?.click()} className="gap-2">
                <Upload className="h-4 w-4" />{lang === 'ar' ? 'اختر ملف Excel' : 'Choose Excel File'}
              </Button>
              {importRows.length > 0 && (
                <span className="flex items-center text-sm text-green-600 font-medium">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {importRows.length} {lang === 'ar' ? 'صنف جاهز' : 'lines ready'}
                </span>
              )}
            </div>
            {importRows.length > 0 && importStatus !== 'done' && (
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-600">{lang === 'ar' ? 'معاينة' : 'Preview'} ({importRows.length})</div>
                <div className="overflow-x-auto max-h-52">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="text-xs">{lang === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                        <TableHead className="text-xs">{lang === 'ar' ? 'المورد' : 'Supplier'}</TableHead>
                        <TableHead className="text-xs">{lang === 'ar' ? 'المنتج' : 'Product'}</TableHead>
                        <TableHead className="text-xs">{lang === 'ar' ? 'الكمية' : 'Qty'}</TableHead>
                        <TableHead className="text-xs">{lang === 'ar' ? 'السعر' : 'Price'}</TableHead>
                        <TableHead className="text-xs">{lang === 'ar' ? 'الضريبة' : 'VAT'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {importRows.slice(0, 15).map((row, i) => (
                        <TableRow key={i}>
                          <TableCell className="text-xs">{row.date}</TableCell>
                          <TableCell className="text-xs">{row.supplierName}</TableCell>
                          <TableCell className="text-xs">{row.product}</TableCell>
                          <TableCell className="text-xs">{row.quantity}</TableCell>
                          <TableCell className="text-xs">{row.unitPrice.toFixed(2)}</TableCell>
                          <TableCell className="text-xs text-green-600">{row.vatAmount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      {importRows.length > 15 && <TableRow><TableCell colSpan={6} className="text-center text-xs text-gray-400">+{importRows.length - 15} {lang === 'ar' ? 'أصناف' : 'more'}</TableCell></TableRow>}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
            {importStatus === 'done' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <CheckCircle className="h-5 w-5" />
                  {lang === 'ar' ? `تم استيراد ${importResults.success} فاتورة` : `Imported ${importResults.success} invoices`}
                </div>
                {importResults.errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 space-y-1 max-h-32 overflow-y-auto">
                    <p className="text-xs font-semibold text-red-600 flex items-center gap-1"><XCircle className="h-4 w-4" />{importResults.errors.length} {lang === 'ar' ? 'أخطاء' : 'errors'}</p>
                    {importResults.errors.map((e, i) => <p key={i} className="text-xs text-red-500 flex items-start gap-1"><AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />{e}</p>)}
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setImportOpen(false)}>{lang === 'ar' ? 'إغلاق' : 'Close'}</Button>
              {importRows.length > 0 && importStatus !== 'done' && (
                <Button disabled={importStatus === 'importing' || !importRestaurantId} onClick={runImport} className="bg-green-600 hover:bg-green-700 text-white gap-2">
                  {importStatus === 'importing' ? <><LoadingSpinner />{lang === 'ar' ? 'جارٍ الاستيراد...' : 'Importing...'}</> : <><Upload className="h-4 w-4" />{lang === 'ar' ? `استيراد ${importRows.length} صنف` : `Import ${importRows.length} lines`}</>}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New/Edit Invoice Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingInvoiceId ? (lang === 'ar' ? 'تعديل فاتورة' : 'Edit Invoice') : (lang === 'ar' ? 'فاتورة شراء جديدة' : 'New Purchase Invoice')}</DialogTitle>
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
                      <Label className="text-xs">{lang === 'ar' ? 'السعر' : 'Unit Price'}</Label>
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
