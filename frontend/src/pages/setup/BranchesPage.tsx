import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import EmptyState from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, Controller } from 'react-hook-form'

export default function BranchesPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)

  const { data, isLoading } = useQuery({ queryKey: ['branches'], queryFn: () => api.get('/api/v1/branches?limit=200').then(r => r.data) })
  const { data: restaurants } = useQuery({ queryKey: ['restaurants'], queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data) })

  const { register, handleSubmit, control, reset } = useForm()

  const saveMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => editing
      ? api.put(`/api/v1/branches/${(editing as {id: string}).id}`, d)
      : api.post('/api/v1/branches', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['branches'] }); setOpen(false); reset(); toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' }) },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/branches/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['branches'] }) },
  })

  const openAdd = () => { setEditing(null); reset(); setOpen(true) }
  const openEdit = (row: Record<string, unknown>) => { setEditing(row); reset({ ...row, restaurantId: (row.restaurant as {id: string})?.id }); setOpen(true) }

  const branches = data?.data || []

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'الفروع' : 'Branches'}
        actions={<Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" />{lang === 'ar' ? 'إضافة فرع' : 'Add Branch'}</Button>}
      />

      {isLoading ? <LoadingSpinner /> : branches.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا توجد فروع' : 'No branches'} action={{ label: lang === 'ar' ? 'إضافة فرع' : 'Add Branch', onClick: openAdd }} icon={MapPin} />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{lang === 'ar' ? 'اسم الفرع' : 'Branch Name'}</TableHead>
                <TableHead>{lang === 'ar' ? 'المطعم' : 'Restaurant'}</TableHead>
                <TableHead>{lang === 'ar' ? 'العنوان' : 'Address'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الهاتف' : 'Phone'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((row: Record<string, unknown>) => (
                <TableRow key={row.id as string}>
                  <TableCell className="font-medium">{lang === 'ar' ? row.nameAr as string : row.nameEn as string}</TableCell>
                  <TableCell>{lang === 'ar' ? (row.restaurant as {nameAr: string})?.nameAr : (row.restaurant as {nameEn: string})?.nameEn}</TableCell>
                  <TableCell>{row.address as string || '-'}</TableCell>
                  <TableCell>{row.phone as string || '-'}</TableCell>
                  <TableCell><Badge variant={row.isActive ? 'success' : 'secondary'}>{row.isActive ? (lang === 'ar' ? 'نشط' : 'Active') : (lang === 'ar' ? 'غير نشط' : 'Inactive')}</Badge></TableCell>
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
          <DialogHeader><DialogTitle>{editing ? (lang === 'ar' ? 'تعديل فرع' : 'Edit Branch') : (lang === 'ar' ? 'إضافة فرع' : 'Add Branch')}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(d => saveMutation.mutate(d as Record<string, unknown>))} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الاسم بالعربي' : 'Name (Arabic)'}</Label><Input {...register('nameAr', { required: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الاسم بالإنجليزي' : 'Name (English)'}</Label><Input {...register('nameEn', { required: true })} /></div>
            </div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'المطعم' : 'Restaurant'}</Label>
              <Controller name="restaurantId" control={control} rules={{ required: true }} render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'اختر المطعم' : 'Select restaurant'} /></SelectTrigger>
                  <SelectContent>{Array.isArray(restaurants) && restaurants.map((r: {id: string; nameAr: string; nameEn: string}) => <SelectItem key={r.id} value={r.id}>{lang === 'ar' ? r.nameAr : r.nameEn}</SelectItem>)}</SelectContent>
                </Select>
              )} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الهاتف' : 'Phone'}</Label><Input {...register('phone')} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label><Input type="email" {...register('email')} /></div>
            </div>
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'العنوان' : 'Address'}</Label><Input {...register('address')} /></div>
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
