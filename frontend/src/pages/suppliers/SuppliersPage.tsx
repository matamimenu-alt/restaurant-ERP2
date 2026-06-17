import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import EmptyState from '@/components/shared/EmptyState'
import ExportButtons from '@/components/shared/ExportButtons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, Search, Store } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm } from 'react-hook-form'

export default function SuppliersPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)
  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['suppliers', search],
    queryFn: () => api.get(`/api/v1/suppliers?search=${search}&limit=100`).then(r => r.data),
  })

  const { register, handleSubmit, reset } = useForm()

  const saveMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => editing
      ? api.put(`/api/v1/suppliers/${(editing as {id: string}).id}`, d)
      : api.post('/api/v1/suppliers', d),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['suppliers'] })
      setOpen(false); reset()
      toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/suppliers/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['suppliers'] }) },
  })

  const openAdd = () => { setEditing(null); reset(); setOpen(true) }
  const openEdit = (row: Record<string, unknown>) => { setEditing(row); reset(row); setOpen(true) }

  const suppliers = data?.data || []

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'الموردون' : 'Suppliers'}
        actions={
          <div className="flex gap-2">
            <ExportButtons data={suppliers} filename="suppliers" />
            <Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" />{lang === 'ar' ? 'إضافة مورد' : 'Add Supplier'}</Button>
          </div>
        }
      />

      <div className="relative max-w-xs">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="ps-9" placeholder={lang === 'ar' ? 'بحث...' : 'Search...'} value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {isLoading ? <LoadingSpinner /> : suppliers.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا يوجد موردون' : 'No suppliers'} action={{ label: lang === 'ar' ? 'إضافة مورد' : 'Add Supplier', onClick: openAdd }} icon={Store} />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{lang === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الجوال' : 'Mobile'}</TableHead>
                <TableHead>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الرقم الضريبي' : 'VAT No.'}</TableHead>
                <TableHead>{lang === 'ar' ? 'شروط الدفع' : 'Payment Terms'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((row: Record<string, unknown>) => (
                <TableRow key={row.id as string}>
                  <TableCell className="font-medium">{lang === 'ar' ? row.nameAr as string : row.nameEn as string}</TableCell>
                  <TableCell>{row.mobile as string}</TableCell>
                  <TableCell>{row.email as string}</TableCell>
                  <TableCell>{row.vatNumber as string}</TableCell>
                  <TableCell>{row.paymentTerms as number} {lang === 'ar' ? 'يوم' : 'days'}</TableCell>
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
            <DialogTitle>{editing ? (lang === 'ar' ? 'تعديل مورد' : 'Edit Supplier') : (lang === 'ar' ? 'إضافة مورد' : 'Add Supplier')}</DialogTitle>
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
                <Label>{lang === 'ar' ? 'الجوال' : 'Mobile'}</Label>
                <Input {...register('mobile')} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
                <Input type="email" {...register('email')} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'الرقم الضريبي' : 'VAT Number'}</Label>
                <Input {...register('vatNumber')} />
              </div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'شروط الدفع (أيام)' : 'Payment Terms (days)'}</Label>
                <Input type="number" defaultValue={30} {...register('paymentTerms', { valueAsNumber: true })} />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label>{lang === 'ar' ? 'حد الائتمان' : 'Credit Limit'}</Label>
                <Input type="number" step="0.01" {...register('creditLimit', { valueAsNumber: true })} />
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
