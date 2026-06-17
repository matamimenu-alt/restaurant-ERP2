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
import { Plus, Pencil, Trash2, Users } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, Controller } from 'react-hook-form'

const ROLES = ['ADMIN', 'MANAGER', 'ACCOUNTANT', 'VIEWER']
const ROLE_LABELS_AR: Record<string, string> = { ADMIN: 'مدير النظام', MANAGER: 'مدير', ACCOUNTANT: 'محاسب', VIEWER: 'مشاهد' }

export default function UsersPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)

  const { data, isLoading } = useQuery({ queryKey: ['users'], queryFn: () => api.get('/api/v1/users?limit=100').then(r => r.data) })

  const { register, handleSubmit, control, reset } = useForm()

  const saveMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => editing
      ? api.put(`/api/v1/users/${(editing as {id: string}).id}`, d)
      : api.post('/api/v1/users', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['users'] }); setOpen(false); reset(); toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' }) },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/users/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['users'] }) },
  })

  const openAdd = () => { setEditing(null); reset({ role: 'VIEWER' }); setOpen(true) }
  const openEdit = (row: Record<string, unknown>) => { setEditing(row); reset({ ...row, password: '' }); setOpen(true) }

  const users = data?.data || []

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'المستخدمون' : 'Users'}
        actions={<Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" />{lang === 'ar' ? 'إضافة مستخدم' : 'Add User'}</Button>}
      />

      {isLoading ? <LoadingSpinner /> : users.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا يوجد مستخدمون' : 'No users'} action={{ label: lang === 'ar' ? 'إضافة مستخدم' : 'Add User', onClick: openAdd }} icon={Users} />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{lang === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                <TableHead>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الدور' : 'Role'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead>{lang === 'ar' ? 'آخر دخول' : 'Last Login'}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((row: Record<string, unknown>) => (
                <TableRow key={row.id as string}>
                  <TableCell className="font-medium">{row.name as string}</TableCell>
                  <TableCell>{row.email as string}</TableCell>
                  <TableCell><Badge variant="info">{lang === 'ar' ? ROLE_LABELS_AR[row.role as string] : row.role as string}</Badge></TableCell>
                  <TableCell><Badge variant={row.isActive ? 'success' : 'secondary'}>{row.isActive ? (lang === 'ar' ? 'نشط' : 'Active') : (lang === 'ar' ? 'غير نشط' : 'Inactive')}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{row.lastLoginAt ? new Date(row.lastLoginAt as string).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US') : '-'}</TableCell>
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
          <DialogHeader><DialogTitle>{editing ? (lang === 'ar' ? 'تعديل مستخدم' : 'Edit User') : (lang === 'ar' ? 'إضافة مستخدم' : 'Add User')}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(d => saveMutation.mutate(d as Record<string, unknown>))} className="space-y-4">
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الاسم' : 'Name'}</Label><Input {...register('name', { required: true })} /></div>
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label><Input type="email" {...register('email', { required: true })} /></div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? (editing ? 'كلمة المرور الجديدة (اتركها فارغة للإبقاء)' : 'كلمة المرور') : (editing ? 'New Password (leave blank to keep)' : 'Password')}</Label>
              <Input type="password" {...register('password', { required: !editing })} />
            </div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'الدور' : 'Role'}</Label>
              <Controller name="role" control={control} rules={{ required: true }} render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'اختر' : 'Select'} /></SelectTrigger>
                  <SelectContent>{ROLES.map(r => <SelectItem key={r} value={r}>{lang === 'ar' ? ROLE_LABELS_AR[r] : r}</SelectItem>)}</SelectContent>
                </Select>
              )} />
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
