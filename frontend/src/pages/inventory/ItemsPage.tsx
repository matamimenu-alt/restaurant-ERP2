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
import { Plus, Pencil, Trash2, Search, Package, AlertTriangle } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, Controller } from 'react-hook-form'

const ITEM_TYPES = ['FOOD','BEVERAGE','PACKAGING','CLEANING','CONSUMABLES']
const ITEM_TYPE_AR: Record<string, string> = { FOOD: 'أغذية', BEVERAGE: 'مشروبات', PACKAGING: 'تغليف', CLEANING: 'منظفات', CONSUMABLES: 'مستهلكات' }

export default function ItemsPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)
  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['inventory-items', search],
    queryFn: () => api.get(`/api/v1/inventory/items?search=${search}&limit=200`).then(r => r.data),
  })
  const { data: categories } = useQuery({ queryKey: ['inventory-categories'], queryFn: () => api.get('/api/v1/inventory/categories').then(r => r.data.data) })

  const { register, handleSubmit, control, reset } = useForm()

  const saveMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => editing
      ? api.put(`/api/v1/inventory/items/${(editing as {id: string}).id}`, d)
      : api.post('/api/v1/inventory/items', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['inventory-items'] }); setOpen(false); reset(); toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' }) },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/inventory/items/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['inventory-items'] }) },
  })

  const openAdd = () => { setEditing(null); reset(); setOpen(true) }
  const openEdit = (row: Record<string, unknown>) => { setEditing(row); reset(row); setOpen(true) }

  const items = data?.data || []

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'الأصناف' : 'Inventory Items'}
        actions={
          <div className="flex gap-2">
            <ExportButtons data={items} filename="items" />
            <Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" />{lang === 'ar' ? 'إضافة صنف' : 'Add Item'}</Button>
          </div>
        }
      />

      <div className="relative max-w-xs">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="ps-9" placeholder={lang === 'ar' ? 'بحث...' : 'Search...'} value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {isLoading ? <LoadingSpinner /> : items.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا توجد أصناف' : 'No items'} action={{ label: lang === 'ar' ? 'إضافة صنف' : 'Add Item', onClick: openAdd }} icon={Package} />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{lang === 'ar' ? 'الكود' : 'Code'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الفئة' : 'Category'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الوحدة' : 'Unit'}</TableHead>
                <TableHead>{lang === 'ar' ? 'آخر سعر شراء' : 'Last Price'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الحد الأدنى' : 'Min Stock'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((row: Record<string, unknown>) => (
                <TableRow key={row.id as string}>
                  <TableCell className="font-mono text-xs">{row.code as string}</TableCell>
                  <TableCell className="font-medium">{lang === 'ar' ? row.nameAr as string : row.nameEn as string}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{lang === 'ar' ? ITEM_TYPE_AR[(row.category as {type?: string})?.type || ''] : (row.category as {type?: string})?.type}</Badge>
                  </TableCell>
                  <TableCell>{row.unit as string}</TableCell>
                  <TableCell><CurrencyDisplay amount={row.lastPurchasePrice as number} /></TableCell>
                  <TableCell>
                    <span className={Number(row.minStock) > 0 ? 'text-muted-foreground' : 'text-muted-foreground'}>
                      {row.minStock as string}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={row.isActive ? 'success' : 'secondary'}>
                      {row.isActive ? (lang === 'ar' ? 'نشط' : 'Active') : (lang === 'ar' ? 'غير نشط' : 'Inactive')}
                    </Badge>
                  </TableCell>
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? (lang === 'ar' ? 'تعديل صنف' : 'Edit Item') : (lang === 'ar' ? 'إضافة صنف' : 'Add Item')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(d => saveMutation.mutate(d as Record<string, unknown>))} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'الاسم بالعربي' : 'Name (Arabic)'}</Label>
                <Input {...register('nameAr', { required: true })} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'الاسم بالإنجليزي' : 'Name (English)'}</Label>
                <Input {...register('nameEn', { required: true })} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'الكود' : 'Code'}</Label>
                <Input {...register('code')} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'الوحدة' : 'Unit'}</Label>
                <Input defaultValue="كجم" {...register('unit')} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'الفئة' : 'Category'}</Label>
                <Controller name="categoryId" control={control} render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'اختر الفئة' : 'Select category'} /></SelectTrigger>
                    <SelectContent>
                      {Array.isArray(categories) && categories.map((c: {id: string; nameAr: string; nameEn: string}) => (
                        <SelectItem key={c.id} value={c.id}>{lang === 'ar' ? c.nameAr : c.nameEn}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'الحد الأدنى' : 'Min Stock'}</Label>
                <Input type="number" step="0.001" defaultValue={0} {...register('minStock', { valueAsNumber: true })} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'الحد الأقصى' : 'Max Stock'}</Label>
                <Input type="number" step="0.001" defaultValue={0} {...register('maxStock', { valueAsNumber: true })} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'تنبيه الانتهاء (أيام)' : 'Expiry Alert (days)'}</Label>
                <Input type="number" defaultValue={7} {...register('expiryAlertDays', { valueAsNumber: true })} />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
              <Button type="submit" disabled={saveMutation.isPending}>{lang === 'ar' ? 'حفظ' : 'Save'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
