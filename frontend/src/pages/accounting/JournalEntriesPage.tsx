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
import { Plus, Eye, Trash2, BookOpen } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, useFieldArray, Controller } from 'react-hook-form'

export default function JournalEntriesPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [detailEntry, setDetailEntry] = useState<Record<string, unknown> | null>(null)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const params = new URLSearchParams()
  if (from) params.set('from', from)
  if (to) params.set('to', to)

  const { data, isLoading } = useQuery({
    queryKey: ['journal-entries', from, to],
    queryFn: () => api.get(`/api/v1/accounting/journal-entries?${params}&limit=100`).then(r => r.data),
  })
  const { data: accounts } = useQuery({ queryKey: ['accounts'], queryFn: () => api.get('/api/v1/accounting/accounts?limit=500').then(r => r.data.data) })

  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: { date: new Date().toISOString().split('T')[0], description: '', reference: '', lines: [{ accountId: '', debit: 0, credit: 0, description: '' }, { accountId: '', debit: 0, credit: 0, description: '' }] }
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'lines' })
  const lines = watch('lines')
  const totalDebit = lines?.reduce((s: number, l: {debit: number}) => s + (Number(l.debit) || 0), 0)
  const totalCredit = lines?.reduce((s: number, l: {credit: number}) => s + (Number(l.credit) || 0), 0)
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01

  const saveMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => api.post('/api/v1/accounting/journal-entries', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['journal-entries'] }); qc.invalidateQueries({ queryKey: ['accounts'] }); setOpen(false); reset(); toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' }) },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/accounting/journal-entries/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['journal-entries'] }); qc.invalidateQueries({ queryKey: ['accounts'] }) },
  })

  const entries = data?.data || []

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'قيود اليومية' : 'Journal Entries'}
        actions={
          <Button onClick={() => { reset(); setOpen(true) }} className="gap-2">
            <Plus className="h-4 w-4" />{lang === 'ar' ? 'قيد جديد' : 'New Entry'}
          </Button>
        }
      />

      <div className="flex flex-wrap gap-3">
        <div className="space-y-1"><Label className="text-xs">{lang === 'ar' ? 'من' : 'From'}</Label><Input type="date" value={from} onChange={e => setFrom(e.target.value)} className="w-36" /></div>
        <div className="space-y-1"><Label className="text-xs">{lang === 'ar' ? 'إلى' : 'To'}</Label><Input type="date" value={to} onChange={e => setTo(e.target.value)} className="w-36" /></div>
      </div>

      {isLoading ? <LoadingSpinner /> : entries.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا توجد قيود' : 'No journal entries'} action={{ label: lang === 'ar' ? 'قيد جديد' : 'New Entry', onClick: () => setOpen(true) }} icon={BookOpen} />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{lang === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                <TableHead>{lang === 'ar' ? 'المرجع' : 'Reference'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الوصف' : 'Description'}</TableHead>
                <TableHead>{lang === 'ar' ? 'المدين' : 'Debit'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الدائن' : 'Credit'}</TableHead>
                <TableHead>{lang === 'ar' ? 'النوع' : 'Type'}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((row: Record<string, unknown>) => (
                <TableRow key={row.id as string}>
                  <TableCell>{new Date(row.date as string).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}</TableCell>
                  <TableCell className="font-mono text-sm">{row.reference as string || '-'}</TableCell>
                  <TableCell>{row.description as string}</TableCell>
                  <TableCell><CurrencyDisplay amount={row.totalDebit as number} /></TableCell>
                  <TableCell><CurrencyDisplay amount={row.totalCredit as number} /></TableCell>
                  <TableCell><Badge variant="secondary">{row.type as string}</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => setDetailEntry(row)}><Eye className="h-4 w-4" /></Button>
                      {row.type === 'MANUAL' && <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(row.id as string)}><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Create Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{lang === 'ar' ? 'قيد يومية جديد' : 'New Journal Entry'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(d => saveMutation.mutate(d as Record<string, unknown>))} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'التاريخ' : 'Date'}</Label><Input type="date" {...register('date', { required: true })} /></div>
              <div className="space-y-1.5"><Label>{lang === 'ar' ? 'المرجع' : 'Reference'}</Label><Input {...register('reference')} /></div>
              <div className="space-y-1.5 col-span-1"><Label>{lang === 'ar' ? 'الوصف' : 'Description'}</Label><Input {...register('description', { required: true })} /></div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-base font-semibold">{lang === 'ar' ? 'السطور' : 'Lines'}</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => append({ accountId: '', debit: 0, credit: 0, description: '' })}>
                  <Plus className="h-4 w-4 me-1" />{lang === 'ar' ? 'إضافة سطر' : 'Add Line'}
                </Button>
              </div>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-12 gap-2 items-end bg-muted/30 p-3 rounded-lg">
                    <div className="col-span-4 space-y-1">
                      <Label className="text-xs">{lang === 'ar' ? 'الحساب' : 'Account'}</Label>
                      <Controller name={`lines.${index}.accountId`} control={control} render={({ field: f }) => (
                        <Select value={f.value} onValueChange={f.onChange}>
                          <SelectTrigger className="h-8 text-xs"><SelectValue placeholder={lang === 'ar' ? 'اختر' : 'Select'} /></SelectTrigger>
                          <SelectContent>{Array.isArray(accounts) && accounts.map((a: {id: string; code: string; nameAr: string; nameEn: string}) => <SelectItem key={a.id} value={a.id}>{a.code} — {lang === 'ar' ? a.nameAr : a.nameEn}</SelectItem>)}</SelectContent>
                        </Select>
                      )} />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <Label className="text-xs">{lang === 'ar' ? 'مدين' : 'Debit'}</Label>
                      <Input type="number" step="0.01" className="h-8 text-xs" {...register(`lines.${index}.debit`, { valueAsNumber: true })} />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <Label className="text-xs">{lang === 'ar' ? 'دائن' : 'Credit'}</Label>
                      <Input type="number" step="0.01" className="h-8 text-xs" {...register(`lines.${index}.credit`, { valueAsNumber: true })} />
                    </div>
                    <div className="col-span-3 space-y-1">
                      <Label className="text-xs">{lang === 'ar' ? 'بيان' : 'Note'}</Label>
                      <Input className="h-8 text-xs" {...register(`lines.${index}.description`)} />
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => remove(index)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-8 mt-3 text-sm font-semibold">
                <span className={totalDebit > 0 ? 'text-blue-700' : ''}>{lang === 'ar' ? 'مجموع المدين:' : 'Total Debit:'} <CurrencyDisplay amount={totalDebit} /></span>
                <span className={totalCredit > 0 ? 'text-green-700' : ''}>{lang === 'ar' ? 'مجموع الدائن:' : 'Total Credit:'} <CurrencyDisplay amount={totalCredit} /></span>
                {!isBalanced && <span className="text-red-600">{lang === 'ar' ? '⚠ القيد غير متوازن' : '⚠ Entry not balanced'}</span>}
                {isBalanced && totalDebit > 0 && <span className="text-green-600">{lang === 'ar' ? '✓ متوازن' : '✓ Balanced'}</span>}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
              <Button type="submit" disabled={saveMutation.isPending || !isBalanced}>{lang === 'ar' ? 'حفظ' : 'Save'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={!!detailEntry} onOpenChange={() => setDetailEntry(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{lang === 'ar' ? 'تفاصيل القيد' : 'Entry Details'} — {detailEntry?.reference as string || detailEntry?.id as string}</DialogTitle></DialogHeader>
          {detailEntry && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{lang === 'ar' ? 'الحساب' : 'Account'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'بيان' : 'Note'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'مدين' : 'Debit'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'دائن' : 'Credit'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {((detailEntry.lines as Record<string, unknown>[]) || []).map((line) => (
                  <TableRow key={line.id as string}>
                    <TableCell>{(line.account as {code: string})?.code} — {lang === 'ar' ? (line.account as {nameAr: string})?.nameAr : (line.account as {nameEn: string})?.nameEn}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{line.description as string}</TableCell>
                    <TableCell>{Number(line.debit) > 0 ? <CurrencyDisplay amount={line.debit as number} /> : '-'}</TableCell>
                    <TableCell>{Number(line.credit) > 0 ? <CurrencyDisplay amount={line.credit as number} /> : '-'}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold bg-muted/50">
                  <TableCell colSpan={2}>{lang === 'ar' ? 'المجموع' : 'Total'}</TableCell>
                  <TableCell><CurrencyDisplay amount={detailEntry.totalDebit as number} /></TableCell>
                  <TableCell><CurrencyDisplay amount={detailEntry.totalCredit as number} /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
