import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import EmptyState from '@/components/shared/EmptyState'
import CurrencyDisplay from '@/components/shared/CurrencyDisplay'
import ExportButtons from '@/components/shared/ExportButtons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, ChefHat } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, useFieldArray, Controller } from 'react-hook-form'

export default function RecipesPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => api.get('/api/v1/recipes?limit=100').then(r => r.data),
  })
  const { data: restaurants } = useQuery({ queryKey: ['restaurants'], queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data) })
  const { data: items } = useQuery({ queryKey: ['inventory-items'], queryFn: () => api.get('/api/v1/inventory/items?limit=500').then(r => r.data.data) })

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: { nameAr: '', nameEn: '', restaurantId: '', servings: 1, localPrice: 0, deliveryPrice: 0, targetMargin: 70, lines: [{ itemId: '', quantity: 0, unit: 'جم' }] }
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'lines' })

  const saveMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => editing
      ? api.put(`/api/v1/recipes/${(editing as {id: string}).id}`, d)
      : api.post('/api/v1/recipes', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['recipes'] }); setOpen(false); reset(); toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' }) },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/recipes/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['recipes'] }) },
  })

  const openAdd = () => { setEditing(null); reset(); setOpen(true) }
  const openEdit = (row: Record<string, unknown>) => {
    setEditing(row)
    reset({ ...row, lines: (row.lines as {itemId: string; quantity: number; unit: string}[]) || [] })
    setOpen(true)
  }

  const recipes = data?.data || []

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'الوصفات' : 'Recipes'}
        actions={<div className="flex gap-2"><ExportButtons data={recipes} filename="recipes" /><Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" />{lang === 'ar' ? 'وصفة جديدة' : 'New Recipe'}</Button></div>}
      />

      {isLoading ? <LoadingSpinner /> : recipes.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا توجد وصفات' : 'No recipes'} action={{ label: lang === 'ar' ? 'إضافة وصفة' : 'Add Recipe', onClick: openAdd }} icon={ChefHat} />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{lang === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                <TableHead>{lang === 'ar' ? 'المطعم' : 'Restaurant'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الحصص' : 'Servings'}</TableHead>
                <TableHead>{lang === 'ar' ? 'تكلفة الطعام' : 'Food Cost'}</TableHead>
                <TableHead>{lang === 'ar' ? 'تكلفة الحصة' : 'Cost/Portion'}</TableHead>
                <TableHead>{lang === 'ar' ? 'سعر المحل' : 'Local Price'}</TableHead>
                <TableHead>{lang === 'ar' ? 'سعر التوصيل' : 'Delivery Price'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الهامش' : 'Margin'}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipes.map((row: Record<string, unknown>) => (
                <TableRow key={row.id as string}>
                  <TableCell className="font-medium">{lang === 'ar' ? row.nameAr as string : row.nameEn as string}</TableCell>
                  <TableCell>{lang === 'ar' ? (row.restaurant as {nameAr: string})?.nameAr : (row.restaurant as {nameEn: string})?.nameEn}</TableCell>
                  <TableCell>{row.servings as number}</TableCell>
                  <TableCell><CurrencyDisplay amount={row.foodCost as number} /></TableCell>
                  <TableCell><CurrencyDisplay amount={row.costPerPortion as number} /></TableCell>
                  <TableCell><CurrencyDisplay amount={row.localPrice as number} /></TableCell>
                  <TableCell><CurrencyDisplay amount={row.deliveryPrice as number} /></TableCell>
                  <TableCell>
                    <Badge variant={Number(row.grossMargin) >= 60 ? 'success' : Number(row.grossMargin) >= 40 ? 'warning' : 'destructive'}>
                      {Number(row.grossMargin).toFixed(1)}%
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? (lang === 'ar' ? 'تعديل وصفة' : 'Edit Recipe') : (lang === 'ar' ? 'وصفة جديدة' : 'New Recipe')}</DialogTitle></DialogHeader>
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
                <Label>{lang === 'ar' ? 'المطعم' : 'Restaurant'}</Label>
                <Controller name="restaurantId" control={control} rules={{ required: true }} render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'اختر' : 'Select'} /></SelectTrigger>
                    <SelectContent>{Array.isArray(restaurants) && restaurants.map((r: {id: string; nameAr: string; nameEn: string}) => <SelectItem key={r.id} value={r.id}>{lang === 'ar' ? r.nameAr : r.nameEn}</SelectItem>)}</SelectContent>
                  </Select>
                )} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'عدد الحصص' : 'Servings'}</Label>
                <Input type="number" step="0.01" {...register('servings', { valueAsNumber: true })} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'سعر المحل (ريال)' : 'Local Price (SAR)'}</Label>
                <Input type="number" step="0.01" {...register('localPrice', { valueAsNumber: true })} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'سعر التطبيقات (ريال)' : 'Delivery App Price (SAR)'}</Label>
                <Input type="number" step="0.01" {...register('deliveryPrice', { valueAsNumber: true })} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-base font-semibold">{lang === 'ar' ? 'المكونات' : 'Ingredients'}</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => append({ itemId: '', quantity: 0, unit: 'جم' })}>
                  <Plus className="h-4 w-4 me-1" />{lang === 'ar' ? 'إضافة مكون' : 'Add Ingredient'}
                </Button>
              </div>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-4 gap-2 items-end bg-muted/30 p-3 rounded-lg">
                    <div className="col-span-2 space-y-1">
                      <Label className="text-xs">{lang === 'ar' ? 'الصنف' : 'Item'}</Label>
                      <Controller name={`lines.${index}.itemId`} control={control} render={({ field: f }) => (
                        <Select value={f.value} onValueChange={f.onChange}>
                          <SelectTrigger className="h-8 text-xs"><SelectValue placeholder={lang === 'ar' ? 'اختر' : 'Select'} /></SelectTrigger>
                          <SelectContent>{Array.isArray(items) && items.map((i: {id: string; nameAr: string; nameEn: string}) => <SelectItem key={i.id} value={i.id}>{lang === 'ar' ? i.nameAr : i.nameEn}</SelectItem>)}</SelectContent>
                        </Select>
                      )} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">{lang === 'ar' ? 'الكمية' : 'Qty'}</Label>
                      <Input type="number" step="0.001" className="h-8 text-xs" {...register(`lines.${index}.quantity`, { valueAsNumber: true })} />
                    </div>
                    <div className="flex items-end gap-1">
                      <div className="flex-1 space-y-1">
                        <Label className="text-xs">{lang === 'ar' ? 'الوحدة' : 'Unit'}</Label>
                        <Input className="h-8 text-xs" {...register(`lines.${index}.unit`)} />
                      </div>
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => remove(index)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                ))}
              </div>
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
