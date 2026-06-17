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
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, DollarSign } from 'lucide-react'
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

  const params = new URLSearchParams()
  if (from) params.set('from', from)
  if (to) params.set('to', to)
  if (restaurantFilter && restaurantFilter !== 'all') params.set('restaurantId', restaurantFilter)

  const { data, isLoading } = useQuery({
    queryKey: ['revenue', from, to, restaurantFilter],
    queryFn: () => api.get(`/api/v1/revenue?${params}&limit=100`).then(r => r.data),
  })

  const { data: restaurants } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data),
  })

  const { data: summary } = useQuery({
    queryKey: ['revenue-summary', from, to],
    queryFn: () => api.get(`/api/v1/revenue/summary?${params}`).then(r => r.data.data),
  })

  const { register, handleSubmit, control, reset } = useForm()

  const createMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => editing
      ? api.put(`/api/v1/revenue/${(editing as {id: string}).id}`, d)
      : api.post('/api/v1/revenue', d),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['revenue'] })
      qc.invalidateQueries({ queryKey: ['revenue-summary'] })
      setOpen(false); reset()
      toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/revenue/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['revenue'] }); toast({ title: lang === 'ar' ? 'تم الحذف' : 'Deleted' }) },
  })

  const openAdd = () => { setEditing(null); reset({ date: new Date().toISOString().split('T')[0] }); setOpen(true) }
  const openEdit = (row: Record<string, unknown>) => {
    setEditing(row)
    reset({ ...row, date: new Date(row.date as string).toISOString().split('T')[0] })
    setOpen(true)
  }

  const entries = data?.data?.entries || []
  const totalAmount = summary?.total || 0

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'الإيرادات' : 'Revenue'}
        actions={
          <div className="flex gap-2">
            <ExportButtons data={entries} filename="revenue" />
            <Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" />{lang === 'ar' ? 'إضافة إيراد' : 'Add Revenue'}</Button>
          </div>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="space-y-1">
          <Label className="text-xs">{lang === 'ar' ? 'من' : 'From'}</Label>
          <Input type="date" value={from} onChange={e => setFrom(e.target.value)} className="w-36" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">{lang === 'ar' ? 'إلى' : 'To'}</Label>
          <Input type="date" value={to} onChange={e => setTo(e.target.value)} className="w-36" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">{lang === 'ar' ? 'المطعم' : 'Restaurant'}</Label>
          <Select value={restaurantFilter} onValueChange={setRestaurantFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={lang === 'ar' ? 'كل المطاعم' : 'All restaurants'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{lang === 'ar' ? 'كل المطاعم' : 'All'}</SelectItem>
              {Array.isArray(restaurants) && restaurants.map((r: {id: string; nameAr: string; nameEn: string}) => (
                <SelectItem key={r.id} value={r.id}>{lang === 'ar' ? r.nameAr : r.nameEn}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Total */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="flex items-center gap-3 p-4">
          <DollarSign className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-sm text-green-700">{lang === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}</p>
            <p className="text-2xl font-bold text-green-800"><CurrencyDisplay amount={totalAmount} /></p>
          </div>
        </CardContent>
      </Card>

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
                <TableHead>{lang === 'ar' ? 'ملاحظات' : 'Notes'}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((row: Record<string, unknown>) => (
                <TableRow key={row.id as string}>
                  <TableCell>{new Date(row.date as string).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}</TableCell>
                  <TableCell>{lang === 'ar' ? (row.restaurant as {nameAr: string})?.nameAr : (row.restaurant as {nameEn: string})?.nameEn}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{lang === 'ar' ? SOURCE_AR[row.source as string] : row.source as string}</Badge>
                  </TableCell>
                  <TableCell className="font-medium"><CurrencyDisplay amount={row.amount as number} /></TableCell>
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
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
                <Label>{lang === 'ar' ? 'المبلغ' : 'Amount'}</Label>
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
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'ملاحظات' : 'Notes'}</Label>
              <Input {...register('notes')} placeholder={lang === 'ar' ? 'ملاحظات اختيارية' : 'Optional notes'} />
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
