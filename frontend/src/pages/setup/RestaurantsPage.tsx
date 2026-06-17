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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, Store } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm } from 'react-hook-form'

export default function RestaurantsPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)

  const { data, isLoading } = useQuery({ queryKey: ['restaurants'], queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data) })

  const { register, handleSubmit, reset } = useForm()

  const saveMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => editing
      ? api.put(`/api/v1/restaurants/${(editing as {id: string}).id}`, d)
      : api.post('/api/v1/restaurants', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['restaurants'] }); setOpen(false); reset(); toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' }) },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/restaurants/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['restaurants'] }) },
  })

  const openAdd = () => { setEditing(null); reset(); setOpen(true) }
  const openEdit = (row: Record<string, unknown>) => { setEditing(row); reset(row); setOpen(true) }

  const restaurants = data?.data || []

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'المطاعم' : 'Restaurants'}
        actions={<Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" />{lang === 'ar' ? 'إضافة مطعم' : 'Add Restaurant'}</Button>}
      />

      {isLoading ? <LoadingSpinner /> : restaurants.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا توجد مطاعم' : 'No restaurants'} action={{ label: lang === 'ar' ? 'إضافة مطعم' : 'Add Restaurant', onClick: openAdd }} icon={Store} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurants.map((row: Record<string, unknown>) => (
            <Card key={row.id as string} className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{lang === 'ar' ? row.nameAr as string : row.nameEn as string}</p>
                  <p className="text-sm text-muted-foreground">{lang === 'ar' ? row.nameEn as string : row.nameAr as string}</p>
                </div>
                <Badge variant={row.isActive ? 'success' : 'secondary'}>{row.isActive ? (lang === 'ar' ? 'نشط' : 'Active') : (lang === 'ar' ? 'غير نشط' : 'Inactive')}</Badge>
              </div>
              {!!row.phone && <p className="text-sm text-muted-foreground">{row.phone as string}</p>}
              {!!row.address && <p className="text-sm text-muted-foreground">{row.address as string}</p>}
              {!!row.vatNumber && <p className="text-xs font-mono text-muted-foreground">{lang === 'ar' ? 'ضريبي: ' : 'VAT: '}{row.vatNumber as string}</p>}
              <div className="flex gap-1 justify-end pt-2 border-t">
                <Button variant="ghost" size="icon" onClick={() => openEdit(row)}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(row.id as string)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? (lang === 'ar' ? 'تعديل مطعم' : 'Edit Restaurant') : (lang === 'ar' ? 'إضافة مطعم' : 'Add Restaurant')}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(d => saveMutation.mutate(d as Record<string, unknown>))} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الاسم بالعربي' : 'Name (Arabic)'}</Label><Input {...register('nameAr', { required: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الاسم بالإنجليزي' : 'Name (English)'}</Label><Input {...register('nameEn', { required: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الهاتف' : 'Phone'}</Label><Input {...register('phone')} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label><Input type="email" {...register('email')} /></div>
              <div className="space-y-1.5 col-span-2"><Label>{lang === 'ar' ? 'العنوان' : 'Address'}</Label><Input {...register('address')} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الرقم الضريبي' : 'VAT Number'}</Label><Input {...register('vatNumber')} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'السجل التجاري' : 'CR Number'}</Label><Input {...register('crNumber')} /></div>
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
