import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import EmptyState from '@/components/shared/EmptyState'
import CurrencyDisplay from '@/components/shared/CurrencyDisplay'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, BookOpen } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, Controller } from 'react-hook-form'

const ACCOUNT_TYPES = ['ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE']
const TYPE_COLORS: Record<string, 'info' | 'destructive' | 'warning' | 'success' | 'secondary'> = {
  ASSET: 'info', LIABILITY: 'destructive', EQUITY: 'warning', REVENUE: 'success', EXPENSE: 'secondary'
}
const TYPE_LABELS_AR: Record<string, string> = {
  ASSET: 'أصول', LIABILITY: 'خصوم', EQUITY: 'حقوق ملكية', REVENUE: 'إيرادات', EXPENSE: 'مصروفات'
}

export default function AccountsPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)
  const [typeFilter, setTypeFilter] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => api.get('/api/v1/accounting/accounts?limit=500').then(r => r.data),
  })

  const { register, handleSubmit, control, reset } = useForm()

  const saveMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => editing
      ? api.put(`/api/v1/accounting/accounts/${(editing as {id: string}).id}`, d)
      : api.post('/api/v1/accounting/accounts', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['accounts'] }); setOpen(false); reset(); toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' }) },
  })

  const openAdd = () => { setEditing(null); reset(); setOpen(true) }
  const openEdit = (row: Record<string, unknown>) => { setEditing(row); reset(row); setOpen(true) }

  const accounts = (data?.data || []).filter((a: Record<string, unknown>) => !typeFilter || a.type === typeFilter)

  const totals = (data?.data || []).reduce((acc: Record<string, number>, a: Record<string, unknown>) => {
    const t = a.type as string
    acc[t] = (acc[t] || 0) + (a.balance as number || 0)
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'دليل الحسابات' : 'Chart of Accounts'}
        actions={<Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" />{lang === 'ar' ? 'حساب جديد' : 'New Account'}</Button>}
      />

      <div className="flex flex-wrap gap-2">
        <Button variant={!typeFilter ? 'default' : 'outline'} size="sm" onClick={() => setTypeFilter('')}>{lang === 'ar' ? 'الكل' : 'All'}</Button>
        {ACCOUNT_TYPES.map(t => (
          <Button key={t} variant={typeFilter === t ? 'default' : 'outline'} size="sm" onClick={() => setTypeFilter(t)}>
            {lang === 'ar' ? TYPE_LABELS_AR[t] : t}
          </Button>
        ))}
      </div>

      {!typeFilter && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {ACCOUNT_TYPES.map(t => (
            <Card key={t} className="p-3 text-center">
              <p className="text-xs text-muted-foreground">{lang === 'ar' ? TYPE_LABELS_AR[t] : t}</p>
              <p className="font-bold mt-1"><CurrencyDisplay amount={totals[t] || 0} /></p>
            </Card>
          ))}
        </div>
      )}

      {isLoading ? <LoadingSpinner /> : accounts.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا توجد حسابات' : 'No accounts'} action={{ label: lang === 'ar' ? 'إضافة حساب' : 'Add Account', onClick: openAdd }} icon={BookOpen} />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{lang === 'ar' ? 'الرمز' : 'Code'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                <TableHead>{lang === 'ar' ? 'النوع' : 'Type'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الرصيد' : 'Balance'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((row: Record<string, unknown>) => (
                <TableRow key={row.id as string}>
                  <TableCell className="font-mono text-sm">{row.code as string}</TableCell>
                  <TableCell className="font-medium">{lang === 'ar' ? row.nameAr as string : row.nameEn as string}</TableCell>
                  <TableCell><Badge variant={TYPE_COLORS[row.type as string] || 'secondary'}>{lang === 'ar' ? TYPE_LABELS_AR[row.type as string] : row.type as string}</Badge></TableCell>
                  <TableCell><CurrencyDisplay amount={row.balance as number} /></TableCell>
                  <TableCell><Badge variant={row.isActive ? 'success' : 'secondary'}>{row.isActive ? (lang === 'ar' ? 'نشط' : 'Active') : (lang === 'ar' ? 'غير نشط' : 'Inactive')}</Badge></TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => openEdit(row)}><Pencil className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editing ? (lang === 'ar' ? 'تعديل حساب' : 'Edit Account') : (lang === 'ar' ? 'حساب جديد' : 'New Account')}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(d => saveMutation.mutate(d as Record<string, unknown>))} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الرمز' : 'Code'}</Label><Input {...register('code', { required: true })} /></div>
              <div className="space-y-1.5">
                <Label>{lang === 'ar' ? 'النوع' : 'Type'}</Label>
                <Controller name="type" control={control} rules={{ required: true }} render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'اختر' : 'Select'} /></SelectTrigger>
                    <SelectContent>{ACCOUNT_TYPES.map(t => <SelectItem key={t} value={t}>{lang === 'ar' ? TYPE_LABELS_AR[t] : t}</SelectItem>)}</SelectContent>
                  </Select>
                )} />
              </div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الاسم بالعربي' : 'Name (Arabic)'}</Label><Input {...register('nameAr', { required: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الاسم بالإنجليزي' : 'Name (English)'}</Label><Input {...register('nameEn', { required: true })} /></div>
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
