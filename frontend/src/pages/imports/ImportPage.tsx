import { useState, useRef } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/hooks/useToast'
import { Download, Upload, CheckCircle, XCircle, AlertTriangle, Clock, FileSpreadsheet, ChevronDown, ChevronUp } from 'lucide-react'

type ImportType = 'purchases' | 'expense' | 'revenue' | 'recipes' | 'inventory'

interface PreviewRow extends Record<string, unknown> {
  _rowNum: number
  _valid: boolean
  _errors: string[]
}

interface PreviewData {
  rows: PreviewRow[]
  summary: { total: number; valid: number; invalid: number }
}

interface ImportResult {
  created?: number
  createdInvoices?: number
  createdReturns?: number
  createdRecipes?: number
  updatedRecipes?: number
  updated?: number
  errors: string[]
  total: number
}

interface HistoryRecord {
  id: string
  importType: string
  fileName: string
  totalRows: number
  successRows: number
  failedRows: number
  status: string
  createdAt: string
  errorLog?: string[]
}

const IMPORT_TYPES: { key: ImportType; labelAr: string; labelEn: string; templateKey: string; endpoint: string }[] = [
  { key: 'purchases', labelAr: 'فواتير الشراء', labelEn: 'Purchase Invoices', templateKey: 'purchase', endpoint: '/api/v1/import/purchases' },
  { key: 'expense', labelAr: 'المصروفات', labelEn: 'Expenses', templateKey: 'expense', endpoint: '/api/v1/import/expenses' },
  { key: 'revenue', labelAr: 'الإيرادات', labelEn: 'Revenue', templateKey: 'revenue', endpoint: '/api/v1/import/revenue' },
  { key: 'recipes', labelAr: 'الوصفات', labelEn: 'Recipes', templateKey: 'recipes', endpoint: '/api/v1/import/recipes' },
  { key: 'inventory', labelAr: 'أصناف المخزون', labelEn: 'Inventory Items', templateKey: 'inventory', endpoint: '/api/v1/import/inventory' },
]

function PreviewTable({ data, lang }: { data: PreviewData; lang: string }) {
  const [showOnlyInvalid, setShowOnlyInvalid] = useState(false)
  const displayRows = showOnlyInvalid ? data.rows.filter(r => !r._valid) : data.rows
  const cols = data.rows.length > 0 ? Object.keys(data.rows[0]).filter(k => !k.startsWith('_')) : []

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-green-700 font-medium">{lang === 'ar' ? 'صالح' : 'Valid'}: {data.summary.valid}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <XCircle className="h-4 w-4 text-red-600" />
          <span className="text-red-700 font-medium">{lang === 'ar' ? 'خطأ' : 'Invalid'}: {data.summary.invalid}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{lang === 'ar' ? 'الإجمالي' : 'Total'}: {data.summary.total}</span>
        </div>
        {data.summary.invalid > 0 && (
          <Button variant="outline" size="sm" onClick={() => setShowOnlyInvalid(!showOnlyInvalid)}>
            {showOnlyInvalid ? (lang === 'ar' ? 'عرض الكل' : 'Show all') : (lang === 'ar' ? 'عرض الأخطاء فقط' : 'Show errors only')}
          </Button>
        )}
      </div>
      <div className="max-h-96 overflow-auto rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead className="w-16">{lang === 'ar' ? 'حالة' : 'Status'}</TableHead>
              {cols.slice(0, 7).map(c => <TableHead key={c} className="whitespace-nowrap text-xs">{c}</TableHead>)}
              {cols.length > 7 && <TableHead className="text-xs">...</TableHead>}
              <TableHead>{lang === 'ar' ? 'الأخطاء' : 'Errors'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayRows.map((row) => (
              <TableRow key={row._rowNum} className={row._valid ? '' : 'bg-red-50'}>
                <TableCell className="text-xs text-muted-foreground">{row._rowNum}</TableCell>
                <TableCell>
                  {row._valid
                    ? <CheckCircle className="h-4 w-4 text-green-600" />
                    : <XCircle className="h-4 w-4 text-red-500" />}
                </TableCell>
                {cols.slice(0, 7).map(c => (
                  <TableCell key={c} className="text-xs max-w-24 truncate" title={String(row[c] ?? '')}>
                    {String(row[c] ?? '')}
                  </TableCell>
                ))}
                {cols.length > 7 && <TableCell className="text-xs text-muted-foreground">...</TableCell>}
                <TableCell className="text-xs text-red-600 max-w-48">
                  {row._errors.join(' | ')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function ImportTab({ type, lang }: { type: typeof IMPORT_TYPES[0]; lang: string }) {
  const { toast } = useToast()
  const fileRef = useRef<HTMLInputElement>(null)
  const confirmRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<PreviewData | null>(null)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [expanded, setExpanded] = useState(false)

  const previewMutation = useMutation({
    mutationFn: (file: File) => {
      const fd = new FormData(); fd.append('file', file)
      return api.post(`/api/v1/import/preview/${type.key}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data.data as PreviewData)
    },
    onSuccess: (data) => { setPreview(data); setResult(null) },
    onError: () => toast({ title: lang === 'ar' ? 'فشل تحليل الملف' : 'Failed to parse file', variant: 'destructive' }),
  })

  const importMutation = useMutation({
    mutationFn: (file: File) => {
      const fd = new FormData(); fd.append('file', file)
      return api.post(type.endpoint, fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data.data as ImportResult)
    },
    onSuccess: (data) => { setResult(data); setPreview(null); toast({ title: lang === 'ar' ? 'تم الاستيراد بنجاح' : 'Import successful' }) },
    onError: () => toast({ title: lang === 'ar' ? 'فشل الاستيراد' : 'Import failed', variant: 'destructive' }),
  })

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (file) previewMutation.mutate(file); e.target.value = ''
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (file) importMutation.mutate(file); e.target.value = ''
  }

  const successCount = result
    ? (result.created ?? 0) + (result.createdInvoices ?? 0) + (result.createdRecipes ?? 0) + (result.updated ?? 0) + (result.createdReturns ?? 0) + (result.updatedRecipes ?? 0)
    : 0

  return (
    <div className="space-y-4">
      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 items-center">
        <Button variant="outline" size="sm" className="gap-2" onClick={() => window.open(`/api/v1/import/templates/${type.templateKey}`, '_blank')}>
          <Download className="h-4 w-4" />
          {lang === 'ar' ? 'تحميل النموذج' : 'Download Template'}
        </Button>
        <div className="h-5 border-l" />
        <Button variant="outline" size="sm" className="gap-2" onClick={() => fileRef.current?.click()} disabled={previewMutation.isPending}>
          <FileSpreadsheet className="h-4 w-4" />
          {previewMutation.isPending ? (lang === 'ar' ? 'جاري التحليل...' : 'Analyzing...') : (lang === 'ar' ? 'معاينة الملف' : 'Preview File')}
        </Button>
        <input ref={fileRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={handlePreview} />
        <Button size="sm" className="gap-2" onClick={() => confirmRef.current?.click()} disabled={importMutation.isPending}>
          <Upload className="h-4 w-4" />
          {importMutation.isPending ? (lang === 'ar' ? 'جاري الاستيراد...' : 'Importing...') : (lang === 'ar' ? 'استيراد مباشر' : 'Import Now')}
        </Button>
        <input ref={confirmRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={handleImport} />
      </div>

      {/* Instructions */}
      <Card className="border-blue-100 bg-blue-50">
        <CardContent className="pt-3 pb-3">
          <p className="text-xs text-blue-700">
            {lang === 'ar'
              ? '1. حمّل النموذج وأدخل البيانات. 2. اضغط "معاينة الملف" للتحقق من الأخطاء قبل الحفظ. 3. اضغط "استيراد مباشر" لاستيراد البيانات مباشرة.'
              : '1. Download template and fill data. 2. Click "Preview File" to validate before saving. 3. Click "Import Now" to import directly.'}
          </p>
        </CardContent>
      </Card>

      {/* Preview results */}
      {preview && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              {lang === 'ar' ? 'معاينة البيانات' : 'Data Preview'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PreviewTable data={preview} lang={lang} />
            {preview.summary.valid > 0 && (
              <div className="mt-4 pt-4 border-t flex justify-end">
                <Button
                  onClick={() => confirmRef.current?.click()}
                  className="gap-2"
                  disabled={importMutation.isPending}
                >
                  <Upload className="h-4 w-4" />
                  {lang === 'ar' ? `استيراد ${preview.summary.valid} صف صالح` : `Import ${preview.summary.valid} valid rows`}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Import result */}
      {result && (
        <Card className={result.errors.length === 0 ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}>
          <CardContent className="pt-4 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-sm font-medium text-green-800">
                {lang === 'ar' ? `تم الاستيراد: ${successCount} سجل` : `Imported: ${successCount} records`}
                {result.createdInvoices !== undefined && lang === 'ar' && ` (${result.createdInvoices} فاتورة، ${result.createdReturns ?? 0} استرداد)`}
                {result.createdRecipes !== undefined && lang === 'ar' && ` (${result.createdRecipes} جديد، ${result.updatedRecipes ?? 0} محدث)`}
              </p>
            </div>
            {result.errors.length > 0 && (
              <div>
                <button
                  className="text-xs text-amber-700 font-medium flex items-center gap-1"
                  onClick={() => setExpanded(!expanded)}
                >
                  <AlertTriangle className="h-3 w-3" />
                  {result.errors.length} {lang === 'ar' ? 'صف يحتوي أخطاء' : 'rows with errors'}
                  {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
                {expanded && (
                  <ul className="mt-2 space-y-0.5 text-xs text-amber-800 list-disc list-inside max-h-40 overflow-y-auto">
                    {result.errors.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function HistoryTab({ lang }: { lang: string }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { data, isLoading } = useQuery({
    queryKey: ['import-history'],
    queryFn: () => api.get('/api/v1/import/history').then(r => r.data.data as HistoryRecord[]),
  })

  const TYPE_LABELS: Record<string, string> = {
    PURCHASE: 'فواتير الشراء', EXPENSE: 'المصروفات', REVENUE: 'الإيرادات',
    RECIPE: 'الوصفات', INVENTORY: 'المخزون', EMPLOYEE: 'الموظفون',
  }

  const STATUS_COLORS: Record<string, string> = {
    COMPLETED: 'bg-green-100 text-green-800',
    PARTIAL: 'bg-amber-100 text-amber-800',
    FAILED: 'bg-red-100 text-red-800',
  }

  if (isLoading) return <div className="py-8 text-center text-muted-foreground text-sm">{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</div>
  if (!data?.length) return <div className="py-8 text-center text-muted-foreground text-sm">{lang === 'ar' ? 'لا يوجد سجل استيراد' : 'No import history'}</div>

  return (
    <div className="rounded border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{lang === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
            <TableHead>{lang === 'ar' ? 'النوع' : 'Type'}</TableHead>
            <TableHead>{lang === 'ar' ? 'اسم الملف' : 'File Name'}</TableHead>
            <TableHead>{lang === 'ar' ? 'الإجمالي' : 'Total'}</TableHead>
            <TableHead>{lang === 'ar' ? 'ناجح' : 'Success'}</TableHead>
            <TableHead>{lang === 'ar' ? 'فاشل' : 'Failed'}</TableHead>
            <TableHead>{lang === 'ar' ? 'الحالة' : 'Status'}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((h) => (
            <>
              <TableRow
                key={h.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setExpandedId(expandedId === h.id ? null : h.id)}
              >
                <TableCell className="text-sm">{new Date(h.createdAt).toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US')}</TableCell>
                <TableCell className="text-sm">{lang === 'ar' ? (TYPE_LABELS[h.importType] || h.importType) : h.importType}</TableCell>
                <TableCell className="text-sm max-w-48 truncate" title={h.fileName}>{h.fileName}</TableCell>
                <TableCell className="text-sm">{h.totalRows}</TableCell>
                <TableCell className="text-sm text-green-700 font-medium">{h.successRows}</TableCell>
                <TableCell className="text-sm text-red-700">{h.failedRows}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[h.status] || 'bg-gray-100 text-gray-700'}`}>
                    {h.status === 'COMPLETED' ? (lang === 'ar' ? 'مكتمل' : 'Completed') : h.status === 'PARTIAL' ? (lang === 'ar' ? 'جزئي' : 'Partial') : (lang === 'ar' ? 'فاشل' : 'Failed')}
                  </span>
                </TableCell>
              </TableRow>
              {expandedId === h.id && h.errorLog && h.errorLog.length > 0 && (
                <TableRow key={`${h.id}-errors`}>
                  <TableCell colSpan={7} className="bg-red-50 py-2 px-4">
                    <p className="text-xs font-medium text-red-700 mb-1">{lang === 'ar' ? 'الأخطاء:' : 'Errors:'}</p>
                    <ul className="text-xs text-red-600 list-disc list-inside space-y-0.5 max-h-32 overflow-y-auto">
                      {(h.errorLog as string[]).map((e, i) => <li key={i}>{e}</li>)}
                    </ul>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default function ImportPage() {
  const { lang } = useLang()
  const [activeTab, setActiveTab] = useState<ImportType | 'history'>('purchases')

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'استيراد البيانات التاريخية' : 'Historical Data Import'}
        subtitle={lang === 'ar' ? 'استيراد البيانات السابقة عبر ملفات Excel' : 'Import historical data via Excel files'}
      />

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b pb-0">
        {IMPORT_TYPES.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`whitespace-nowrap px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === t.key ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            {lang === 'ar' ? t.labelAr : t.labelEn}
          </button>
        ))}
        <button
          onClick={() => setActiveTab('history')}
          className={`whitespace-nowrap px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-1 ${activeTab === 'history' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          <Clock className="h-3.5 w-3.5" />
          {lang === 'ar' ? 'سجل الاستيراد' : 'History'}
        </button>
      </div>

      {/* Tab content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {activeTab === 'history'
              ? (lang === 'ar' ? 'سجل عمليات الاستيراد' : 'Import History')
              : (lang === 'ar' ? IMPORT_TYPES.find(t => t.key === activeTab)?.labelAr : IMPORT_TYPES.find(t => t.key === activeTab)?.labelEn)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeTab === 'history'
            ? <HistoryTab lang={lang} />
            : <ImportTab type={IMPORT_TYPES.find(t => t.key === activeTab)!} lang={lang} />
          }
        </CardContent>
      </Card>
    </div>
  )
}
