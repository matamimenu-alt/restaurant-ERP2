import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
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
import { Plus } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, Controller } from 'react-hook-form'

const TYPES = ['IN','OUT','TRANSFER_IN','TRANSFER_OUT','ADJUSTMENT','WASTE']
const TYPE_AR: Record<string, string> = { IN: 'وارد', OUT: 'صادر', TRANSFER_IN: 'نقل وارد', TRANSFER_OUT: 'نقل صادر', ADJUSTMENT: 'تسوية', WASTE: 'هالك' }

export default function StockMovementPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['stock-movements'],
    queryFn: () => api.get('/api/v1/inventory/movements?limit=200').then(r => r.data),
  })
  const { data: items } = useQuery({ queryKey: ['inventory-items'], queryFn: () => api.get('/api/v1/inventory/items?limit=500').then(r => r.data.data) })
  const { data: branches } = useQuery({ queryKey: ['branches'], queryFn: () => api.get('/api/v1/branches?limit=100').then(r => r.data.data) })

  const { register, handleSubmit, control, reset } = useForm()

  const createMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => api.post('/api/v1/inventory/movements', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['stock-movements'] }); setOpen(false); reset(); toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' }) },
  })

  const movements = data?.data || []

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'حركة المخزون' : 'Stock Movements'}
        actions={<div className="flex gap-2"><ExportButtons data={movements} filename="stock-movements" /><Button onClick={() => { reset(); setOpen(true) }} className="gap-2"><Plus className="h-4 w-4" />{lang === 'ar' ? 'حركة جديدة' : 'New Movement'}</Button></div>}
      />

      {isLoading ? <LoadingSpinner /> : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{lang === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الصنف' : 'Item'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الفرع' : 'Branch'}</TableHead>
                <TableHead>{lang === 'ar' ? 'النوع' : 'Type'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الكمية' : 'Qty'}</TableHead>
                <TableHead>{lang === 'ar' ? 'سعر الوحدة' : 'Unit Cost'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الإجمالي' : 'Total'}</TableHead>
                <TableHead>{lang === 'ar' ? 'المرجع' : 'Reference'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movements.map((row: Record<string, unknown>) => (
                <TableRow key={row.id as string}>
                  <TableCell>{new Date(row.createdAt as string).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}</TableCell>
                  <TableCell>{lang === 'ar' ? (row.item as {nameAr: string})?.nameAr : (row.item as {nameEn: string})?.nameEn}</TableCell>
                  <TableCell>{lang === 'ar' ? (row.branch as {nameAr: string})?.nameAr : (row.branch as {nameAr: string})?.nameAr}</TableCell>
                  <TableCell>
                    <Badge variant={['IN','TRANSFER_IN'].includes(row.type as string) ? 'success' : row.type === 'WASTE' ? 'destructive' : 'secondary'}>
                      {lang === 'ar' ? TYPE_AR[row.type as string] : row.type as string}
                    </Badge>
                  </TableCell>
                  <TableCell>{Number(row.quantity).toFixed(3)}</TableCell>
                  <TableCell><CurrencyDisplay amount={row.unitCost as number} /></TableCell>
                  <TableCell><CurrencyDisplay amount={row.totalCost as number} /></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{row.reference as string}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{lang === 'ar' ? 'حركة مخزون جديدة' : 'New Stock Movement'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(d => createMutation.mutate(d as Record<string, unknown>))} className="space-y-4">
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'الفرع' : 'Branch'}</Label>
              <Controller name="branchId" control={control} rules={{ required: true }} render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'اختر الفرع' : 'Select branch'} /></SelectTrigger>
                  <SelectContent>{Array.isArray(branches) && branches.map((b: {id: string; nameAr: string; nameEn: string}) => <SelectItem key={b.id} value={b.id}>{lang === 'ar' ? b.nameAr : b.nameEn}</SelectItem>)}</SelectContent>
                </Select>
              )} />
            </div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'الصنف' : 'Item'}</Label>
              <Controller name="itemId" control={control} rules={{ required: true }} render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'اختر الصنف' : 'Select item'} /></SelectTrigger>
                  <SelectContent>{Array.isArray(items) && items.map((i: {id: string; nameAr: string; nameEn: string}) => <SelectItem key={i.id} value={i.id}>{lang === 'ar' ? i.nameAr : i.nameEn}</SelectItem>)}</SelectContent>
                </Select>
              )} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'النوع' : 'Type'}</Label>
                <Controller name="type" control={control} rules={{ required: true }} render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{TYPES.map(t => <SelectItem key={t} value={t}>{lang === 'ar' ? TYPE_AR[t] : t}</SelectItem>)}</SelectContent>
                  </Select>
                )} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'الكمية' : 'Quantity'}</Label>
                <Input type="number" step="0.001" {...register('quantity', { required: true, valueAsNumber: true })} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'سعر الوحدة' : 'Unit Cost'}</Label>
                <Input type="number" step="0.01" defaultValue={0} {...register('unitCost', { valueAsNumber: true })} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'المرجع' : 'Reference'}</Label>
                <Input {...register('reference')} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'ملاحظات' : 'Notes'}</Label>
              <Input {...register('notes')} />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
              <Button type="submit" disabled={createMutation.isPending}>{lang === 'ar' ? 'حفظ' : 'Save'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
