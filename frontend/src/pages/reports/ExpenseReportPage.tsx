import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import CurrencyDisplay from '@/components/shared/CurrencyDisplay'
import ExportButtons from '@/components/shared/ExportButtons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { TrendingDown } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#ef4444','#f97316','#f59e0b','#10b981','#3b82f6','#8b5cf6','#ec4899','#06b6d4','#84cc16','#6366f1']

export default function ExpenseReportPage() {
  const { lang } = useLang()
  const today = new Date()
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]
  const [from, setFrom] = useState(firstOfMonth)
  const [to, setTo] = useState(today.toISOString().split('T')[0])
  const [restaurantId, setRestaurantId] = useState('')

  const { data: restaurants } = useQuery({ queryKey: ['restaurants'], queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data) })

  const params = new URLSearchParams({ from, to })
  if (restaurantId) params.set('restaurantId', restaurantId)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['expense-report', from, to, restaurantId],
    queryFn: () => api.get(`/api/v1/expenses?${params}&limit=500`).then(r => r.data),
    enabled: !!from && !!to,
  })

  const expenses = data?.data?.expenses || []
  const totalAmount = data?.data?.totalAmount || 0

  const byCategory = Object.values(
    expenses.reduce((acc: Record<string, {name: string; amount: number}>, e: Record<string, unknown>) => {
      const catId = (e.category as {id: string})?.id
      const catName = lang === 'ar' ? (e.category as {nameAr: string})?.nameAr : (e.category as {nameEn: string})?.nameEn
      if (!acc[catId]) acc[catId] = { name: catName, amount: 0 }
      acc[catId].amount += e.amount as number
      return acc
    }, {})
  ) as {name: string; amount: number}[]

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'تقرير المصروفات' : 'Expense Report'}
        actions={expenses.length > 0 && <ExportButtons data={expenses} filename="expense-report" />}
      />

      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-1"><Label className="text-xs">{lang === 'ar' ? 'من' : 'From'}</Label><Input type="date" value={from} onChange={e => setFrom(e.target.value)} className="w-36" /></div>
        <div className="space-y-1"><Label className="text-xs">{lang === 'ar' ? 'إلى' : 'To'}</Label><Input type="date" value={to} onChange={e => setTo(e.target.value)} className="w-36" /></div>
        <div className="space-y-1">
          <Label className="text-xs">{lang === 'ar' ? 'المطعم' : 'Restaurant'}</Label>
          <Select value={restaurantId} onValueChange={setRestaurantId}>
            <SelectTrigger className="w-44"><SelectValue placeholder={lang === 'ar' ? 'الكل' : 'All'} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">{lang === 'ar' ? 'الكل' : 'All'}</SelectItem>
              {Array.isArray(restaurants) && restaurants.map((r: {id: string; nameAr: string; nameEn: string}) => <SelectItem key={r.id} value={r.id}>{lang === 'ar' ? r.nameAr : r.nameEn}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => refetch()}><TrendingDown className="h-4 w-4 me-2" />{lang === 'ar' ? 'عرض' : 'Generate'}</Button>
      </div>

      {isLoading ? <LoadingSpinner /> : expenses.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="flex items-center gap-3 p-4">
                <TrendingDown className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-red-700">{lang === 'ar' ? 'إجمالي المصروفات' : 'Total Expenses'}</p>
                  <p className="text-2xl font-bold text-red-800"><CurrencyDisplay amount={totalAmount} /></p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">{lang === 'ar' ? 'توزيع حسب الفئة' : 'By Category'}</p>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={byCategory} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={50}>
                    {byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => v.toLocaleString()} />
                  <Legend iconSize={10} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{lang === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'الفئة' : 'Category'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'المطعم' : 'Restaurant'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'طريقة الدفع' : 'Payment'}</TableHead>
                  <TableHead>{lang === 'ar' ? 'الوصف' : 'Description'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((row: Record<string, unknown>) => (
                  <TableRow key={row.id as string}>
                    <TableCell>{new Date(row.date as string).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}</TableCell>
                    <TableCell>
                      <span>{lang === 'ar' ? (row.category as {nameAr: string})?.nameAr : (row.category as {nameEn: string})?.nameEn}</span>
                      <Badge variant={(row.category as {type: string})?.type === 'FIXED' ? 'info' : 'secondary'} className="ms-2 text-xs">
                        {(row.category as {type: string})?.type === 'FIXED' ? (lang === 'ar' ? 'ثابت' : 'Fixed') : (lang === 'ar' ? 'متغير' : 'Variable')}
                      </Badge>
                    </TableCell>
                    <TableCell>{lang === 'ar' ? (row.restaurant as {nameAr: string})?.nameAr : (row.restaurant as {nameEn: string})?.nameEn}</TableCell>
                    <TableCell className="font-medium"><CurrencyDisplay amount={row.amount as number} /></TableCell>
                    <TableCell><Badge variant="secondary">{row.paymentMethod as string}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{row.description as string}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </>
      )}
    </div>
  )
}
