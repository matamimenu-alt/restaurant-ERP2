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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, CreditCard } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm } from 'react-hook-form'

export default function BankAccountsPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['bank-accounts'],
    queryFn: () => api.get('/api/v1/accounting/bank-accounts').then(r => r.data),
  })

  const { register, handleSubmit, reset } = useForm()

  const saveMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => editing
      ? api.put(`/api/v1/accounting/bank-accounts/${(editing as {id: string}).id}`, d)
      : api.post('/api/v1/accounting/bank-accounts', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['bank-accounts'] }); setOpen(false); reset(); toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' }) },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/accounting/bank-accounts/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['bank-accounts'] }) },
  })

  const openAdd = () => { setEditing(null); reset(); setOpen(true) }
  const openEdit = (row: Record<string, unknown>) => { setEditing(row); reset(row); setOpen(true) }

  const accounts = data?.data || []
  const totalBalance = accounts.reduce((s: number, a: Record<string, unknown>) => s + (a.currentBalance as number || 0), 0)

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'الحسابات البنكية' : 'Bank Accounts'}
        actions={<Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" />{lang === 'ar' ? 'حساب جديد' : 'New Account'}</Button>}
      />

      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-blue-700">{lang === 'ar' ? 'إجمالي الأرصدة' : 'Total Balances'}</p>
            <p className="text-2xl font-bold text-blue-800"><CurrencyDisplay amount={totalBalance} /></p>
          </div>
        </div>
      </Card>

      {isLoading ? <LoadingSpinner /> : accounts.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا توجد حسابات بنكية' : 'No bank accounts'} action={{ label: lang === 'ar' ? 'إضافة حساب' : 'Add Account', onClick: openAdd }} icon={CreditCard} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((row: Record<string, unknown>) => (
            <Card key={row.id as string} className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{row.name as string}</p>
                  <p className="text-sm text-muted-foreground">{row.bankName as string}</p>
                </div>
                <Badge variant={row.isActive ? 'success' : 'secondary'}>{row.isActive ? (lang === 'ar' ? 'نشط' : 'Active') : (lang === 'ar' ? 'غير نشط' : 'Inactive')}</Badge>
              </div>
              {row.accountNumber && <p className="font-mono text-sm text-muted-foreground">{row.accountNumber as string}</p>}
              {row.iban && <p className="font-mono text-xs text-muted-foreground">{lang === 'ar' ? 'آيبان: ' : 'IBAN: '}{row.iban as string}</p>}
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">{lang === 'ar' ? 'الرصيد الحالي' : 'Current Balance'}</p>
                <p className="text-xl font-bold text-blue-700"><CurrencyDisplay amount={row.currentBalance as number} /></p>
              </div>
              <div className="flex gap-1 justify-end">
                <Button variant="ghost" size="icon" onClick={() => openEdit(row)}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(row.id as string)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editing ? (lang === 'ar' ? 'تعديل حساب' : 'Edit Account') : (lang === 'ar' ? 'حساب بنكي جديد' : 'New Bank Account')}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(d => saveMutation.mutate(d as Record<string, unknown>))} className="space-y-4">
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الاسم' : 'Name'}</Label><Input {...register('name', { required: true })} placeholder={lang === 'ar' ? 'مثال: الحساب الرئيسي' : 'e.g. Main Account'} /></div>
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'اسم البنك' : 'Bank Name'}</Label><Input {...register('bankName', { required: true })} placeholder={lang === 'ar' ? 'مثال: البنك الأهلي' : 'e.g. NCB'} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'رقم الحساب' : 'Account Number'}</Label><Input {...register('accountNumber')} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الرصيد الافتتاحي' : 'Opening Balance'}</Label><Input type="number" step="0.01" defaultValue={0} {...register('openingBalance', { valueAsNumber: true })} /></div>
            </div>
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الآيبان (اختياري)' : 'IBAN (optional)'}</Label><Input {...register('iban')} /></div>
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'العملة' : 'Currency'}</Label><Input {...register('currency')} defaultValue="SAR" /></div>
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
