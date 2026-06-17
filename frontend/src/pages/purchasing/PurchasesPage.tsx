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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Trash2, Receipt, Info } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, useFieldArray, Controller } from 'react-hook-form'

function Tabs2({ children, ...props }: React.ComponentProps<'div'>) { return <div {...props}>{children}</div> }

export default function PurchasesPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('invoices')
  const [priceHistory, setPriceHistory] = useState<Record<string, unknown> | null>(null)
  const [selectedSupplier, setSelectedSupplier] = useState('')

  const { data: invoicesData, isLoading } = useQuery({
    queryKey: ['purchase-invoices'],
    queryFn: () => api.get('/api/v1/purchases/invoices?limit=100').then(r => r.data),
  })
  const { data: returnsData } = useQuery({
    queryKey: ['purchase-returns'],
    queryFn: () => api.get('/api/v1/purchases/returns?limit=100').then(r => r.data),
  })
  const { data: suppliers } = useQuery({ queryKey: ['suppliers-all'], queryFn: () => api.get('/api/v1/suppliers?limit=200').then(r => r.data.data) })
  const { data: restaurants } = useQuery({ queryKey: ['restaurants'], queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data) })
  const { data: items } = useQuery({ queryKey: ['inventory-items'], queryFn: () => api.get('/api/v1/inventory/items?limit=500').then(r => r.data.data) })

  const { register, handleSubmit, control, watch, setValue, reset } = useForm({
    defaultValues: { supplierId: '', restaurantId: '', invoiceNumber: '', invoiceDate: new Date().toISOString().split('T')[0], paymentMethod: 'CASH', notes: '', lines: [{ itemId: '', quantity: 1, unitPrice: 0, vatRate: 15 }] }
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'lines' })
  const watchLines = watch('lines')

  const subtotal = watchLines.reduce((s, l) => s + (Number(l.quantity) * Number(l.unitPrice)), 0)
  const vatAmount = watchLines.reduce((s, l) => s + (Number(l.quantity) * Number(l.unitPrice) * Number(l.vatRate) / 100), 0)
  const total = subtotal + vatAmount

  const fetchPriceHistory = async (itemId: string) => {
    if (!selectedSupplier || !itemId) return
    const r = await api.get(`/api/v1/suppliers/price-history?supplierId=${selectedSupplier}&itemId=${itemId}`)
    setPriceHistory(r.data.data)
  }

  const createMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => api.post('/api/v1/purchases/invoices', { ...d, subtotal, vatAmount, total }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['purchase-invoices'] }); setOpen(false); reset(); toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' }) },
  })

  const invoices = invoicesData?.data || []
  const returns = returnsData?.data || []

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'المشتريات' : 'Purchasing'}
        actions={
          <div className="flex gap-2">
            <ExportButtons data={invoices} filename="purchases" />
            <Button onClick={() => { reset(); setOpen(true) }} className="gap-2"><Plus className="h-4 w-4" />{lang === 'ar' ? 'فاتورة جديدة' : 'New Invoice'}</Button>
          </div>
        }
      />

      <div className="flex gap-2 border-b pb-0">
        <button onClick={() => setTab('invoices')} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === 'invoices' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}>
          {lang === 'ar' ? 'فواتير الشراء' : 'Purchase Invoices'}
        </button>
        <button onClick={() => setTab('returns')} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === 'returns' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}>
          {lang === 'ar' ? 'المرتجعات' : 'Returns'}
        </button>
      </div>

      {isLoading ? <LoadingSpinner /> : tab === 'invoices' ? (
        invoices.length === 0 ? <EmptyState title={lang === 'ar' ? 'لا توجد فواتير' : 'No invoices'} action={{ label: lang === 'ar' ? 'فاتورة جديدة' : 'New Invoice', onClick: () => setOpen(true) }} icon={Receipt} /> : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{lang === 'ar' ? 'رقم الفاتورة' : 'Invoice #'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'المورد' : 'Supplier'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'المطعم' : 'Restaurant'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'المجموع قبل الضريبة' : 'Subtotal'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'الضريبة' : 'VAT'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'الإجمالي' : 'Total'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'طريقة الدفع' : 'Payment'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((row: Record<string, unknown>) => (
                  <TableRow key={row.id as string}>
                    <TableCell className="font-medium">{row.invoiceNumber as string}</TableCell>
                    <TableCell>{new Date(row.invoiceDate as string).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}</TableCell>
                    <TableCell>{lang === 'ar' ? (row.supplier as {nameAr: string})?.nameAr : (row.supplier as {nameEn: string})?.nameEn}</TableCell>
                    <TableCell>{lang === 'ar' ? (row.restaurant as {nameAr: string})?.nameAr : (row.restaurant as {nameEn: string})?.nameEn}</TableCell>
                    <TableCell><CurrencyDisplay amount={row.subtotal as number} /></TableCell>
                    <TableCell><CurrencyDisplay amount={row.vatAmount as number} /></TableCell>
                    <TableCell className="font-bold"><CurrencyDisplay amount={row.total as number} /></TableCell>
                    <TableCell><Badge variant="secondary">{row.paymentMethod as string}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )
      ) : (
        returns.length === 0 ? <EmptyState title={lang === 'ar' ? 'لا توجد مرتجعات' : 'No returns'} /> : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{lang === 'ar' ? 'تاريخ الإرجاع' : 'Return Date'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'رقم الفاتورة' : 'Invoice #'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'النوع' : 'Type'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'الإجمالي' : 'Total'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'السبب' : 'Reason'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {returns.map((row: Record<string, unknown>) => (
                  <TableRow key={row.id as string}>
                    <TableCell>{new Date(row.returnDate as string).toLocaleDateString()}</TableCell>
                    <TableCell>{(row.invoice as {invoiceNumber: string})?.invoiceNumber}</TableCell>
                    <TableCell><Badge variant="warning">{row.returnType as string}</Badge></TableCell>
                    <TableCell><CurrencyDisplay amount={row.total as number} /></TableCell>
                    <TableCell>{row.reason as string}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )
      )}

      {/* New Invoice Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{lang === 'ar' ? 'فاتورة شراء جديدة' : 'New Purchase Invoice'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(d => createMutation.mutate(d as Record<string, unknown>))} className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'المورد' : 'Supplier'}</Label>
                <Controller name="supplierId" control={control} rules={{ required: true }} render={({ field }) => (
                  <Select value={field.value} onValueChange={v => { field.onChange(v); setSelectedSupplier(v) }}>
                    <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'اختر المورد' : 'Select supplier'} /></SelectTrigger>
                    <SelectContent>
                      {Array.isArray(suppliers) && suppliers.map((s: {id: string; nameAr: string; nameEn: string}) => (
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
                      {Array.isArray(restaurants) && restaurants.map((r: {id: string; nameAr: string; nameEn: string}) => (
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
            </div>

            {/* Lines */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-base font-semibold">{lang === 'ar' ? 'أصناف الفاتورة' : 'Invoice Lines'}</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => append({ itemId: '', quantity: 1, unitPrice: 0, vatRate: 15 })}>
                  <Plus className="h-4 w-4 me-1" /> {lang === 'ar' ? 'إضافة صنف' : 'Add Line'}
                </Button>
              </div>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-5 gap-2 items-end p-3 bg-muted/30 rounded-lg">
                    <div className="space-y-1 col-span-2">
                      <Label className="text-xs">{lang === 'ar' ? 'الصنف' : 'Item'}</Label>
                      <Controller name={`lines.${index}.itemId`} control={control} render={({ field: f }) => (
                        <Select value={f.value} onValueChange={v => { f.onChange(v); fetchPriceHistory(v) }}>
                          <SelectTrigger className="h-8 text-xs"><SelectValue placeholder={lang === 'ar' ? 'اختر صنف' : 'Select item'} /></SelectTrigger>
                          <SelectContent>
                            {Array.isArray(items) && items.map((i: {id: string; nameAr: string; nameEn: string; unit: string}) => (
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

            {/* Price History */}
            {priceHistory && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">{lang === 'ar' ? 'سجل الأسعار' : 'Price History'}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3 text-xs">
                    <div><span className="text-muted-foreground">{lang === 'ar' ? 'آخر سعر' : 'Last Price'}: </span><strong>{(priceHistory as {lastPrice?: number}).lastPrice?.toFixed(2) || '-'}</strong></div>
                    <div><span className="text-muted-foreground">{lang === 'ar' ? 'متوسط' : 'Average'}: </span><strong>{(priceHistory as {averagePrice?: number}).averagePrice?.toFixed(2) || '-'}</strong></div>
                    <div><span className="text-muted-foreground">{lang === 'ar' ? 'الأعلى' : 'Highest'}: </span><strong>{(priceHistory as {highestPrice?: number}).highestPrice?.toFixed(2) || '-'}</strong></div>
                    <div><span className="text-muted-foreground">{lang === 'ar' ? 'الأدنى' : 'Lowest'}: </span><strong>{(priceHistory as {lowestPrice?: number}).lowestPrice?.toFixed(2) || '-'}</strong></div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Totals */}
            <div className="flex justify-end">
              <div className="space-y-1 w-64 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">{lang === 'ar' ? 'المجموع' : 'Subtotal'}:</span><CurrencyDisplay amount={subtotal} /></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{lang === 'ar' ? 'ضريبة القيمة المضافة' : 'VAT'}:</span><CurrencyDisplay amount={vatAmount} /></div>
                <div className="flex justify-between font-bold text-base border-t pt-1"><span>{lang === 'ar' ? 'الإجمالي' : 'Total'}:</span><CurrencyDisplay amount={total} /></div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
              <Button type="submit" disabled={createMutation.isPending}>{lang === 'ar' ? 'حفظ الفاتورة' : 'Save Invoice'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
