import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import CurrencyDisplay from '@/components/shared/CurrencyDisplay'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, TrendingDown, Calculator } from 'lucide-react'

const MONTH_NAMES_AR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']
const MONTH_NAMES_EN = ['January','February','March','April','May','June','July','August','September','October','November','December']

export default function VatReportPage() {
  const { lang } = useLang()
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(String(currentYear))
  const [quarter, setQuarter] = useState<string>('annual')
  const [restaurantId, setRestaurantId] = useState('all')

  const { data: restaurants } = useQuery({ queryKey: ['restaurants'], queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data) })

  const vatParams = new URLSearchParams({ year, ...(restaurantId !== 'all' ? { restaurantId } : {}) })
  const { data: vatData, isLoading } = useQuery({
    queryKey: ['vat-report', year, restaurantId],
    queryFn: () => api.get(`/api/v1/reports/vat?${vatParams}`).then(r => r.data.data),
  })

  const declParams = new URLSearchParams({ year, ...(quarter !== 'annual' ? { quarter } : {}), ...(restaurantId !== 'all' ? { restaurantId } : {}) })
  const { data: declData, isLoading: declLoading } = useQuery({
    queryKey: ['vat-declaration', year, quarter, restaurantId],
    queryFn: () => api.get(`/api/v1/reports/vat-declaration?${declParams}`).then(r => r.data.data),
  })

  const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i))
  const monthNames = lang === 'ar' ? MONTH_NAMES_AR : MONTH_NAMES_EN

  return (
    <div className="space-y-6">
      <PageHeader title={lang === 'ar' ? 'تقرير ضريبة القيمة المضافة' : 'VAT Report'} />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-1">
          <Label className="text-xs">{lang === 'ar' ? 'السنة' : 'Year'}</Label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
            <SelectContent>{years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">{lang === 'ar' ? 'المطعم' : 'Restaurant'}</Label>
          <Select value={restaurantId} onValueChange={setRestaurantId}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{lang === 'ar' ? 'كل المطاعم' : 'All'}</SelectItem>
              {Array.isArray(restaurants) && restaurants.map((r: {id: string; nameAr: string; nameEn: string}) => (
                <SelectItem key={r.id} value={r.id}>{lang === 'ar' ? r.nameAr : r.nameEn}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="monthly">
        <TabsList>
          <TabsTrigger value="monthly">{lang === 'ar' ? 'التقرير الشهري' : 'Monthly Report'}</TabsTrigger>
          <TabsTrigger value="declaration">{lang === 'ar' ? 'إقرار الضريبة (ZATCA)' : 'VAT Declaration (ZATCA)'}</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-4">
          {isLoading ? <LoadingSpinner /> : vatData && (
            <>
              {/* Annual Totals */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1"><TrendingUp className="h-4 w-4 text-green-600" /><p className="text-xs text-green-700">{lang === 'ar' ? 'ضريبة المبيعات المحصّلة' : 'Output VAT Collected'}</p></div>
                    <p className="text-2xl font-bold text-green-800"><CurrencyDisplay amount={vatData.totals?.vatCollected || 0} /></p>
                  </CardContent>
                </Card>
                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1"><TrendingDown className="h-4 w-4 text-red-600" /><p className="text-xs text-red-700">{lang === 'ar' ? 'ضريبة المشتريات المدفوعة' : 'Input VAT Paid'}</p></div>
                    <p className="text-2xl font-bold text-red-800"><CurrencyDisplay amount={vatData.totals?.vatPaid || 0} /></p>
                  </CardContent>
                </Card>
                <Card className={`${(vatData.totals?.netVatPayable || 0) >= 0 ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1"><Calculator className="h-4 w-4 text-orange-600" /><p className="text-xs text-orange-700">{lang === 'ar' ? 'صافي الضريبة المستحقة' : 'Net VAT Payable'}</p></div>
                    <p className="text-2xl font-bold text-orange-800"><CurrencyDisplay amount={vatData.totals?.netVatPayable || 0} /></p>
                  </CardContent>
                </Card>
              </div>

              {/* Monthly Table */}
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{lang === 'ar' ? 'الشهر' : 'Month'}</TableHead>
                      <TableHead>{lang === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}</TableHead>
                      <TableHead>{lang === 'ar' ? 'الإيرادات بدون ضريبة' : 'Revenue ex-VAT'}</TableHead>
                      <TableHead>{lang === 'ar' ? 'ضريبة المبيعات' : 'Output VAT'}</TableHead>
                      <TableHead>{lang === 'ar' ? 'ضريبة المشتريات' : 'Input VAT'}</TableHead>
                      <TableHead>{lang === 'ar' ? 'صافي الضريبة' : 'Net VAT'}</TableHead>
                      <TableHead>{lang === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vatData.monthly?.map((m: Record<string, unknown>) => (
                      <TableRow key={m.month as number}>
                        <TableCell className="font-medium">{monthNames[(m.month as number) - 1]}</TableCell>
                        <TableCell><CurrencyDisplay amount={(m.revenue as {total: number})?.total || 0} /></TableCell>
                        <TableCell><CurrencyDisplay amount={(m.revenue as {exVat: number})?.exVat || 0} /></TableCell>
                        <TableCell className="text-green-700"><CurrencyDisplay amount={m.vatCollected as number} /></TableCell>
                        <TableCell className="text-red-700"><CurrencyDisplay amount={m.vatPaid as number} /></TableCell>
                        <TableCell className="font-medium"><CurrencyDisplay amount={m.netVatPayable as number} /></TableCell>
                        <TableCell>
                          <Badge variant={(m.netVatPayable as number) > 0 ? 'destructive' : (m.netVatPayable as number) < 0 ? 'success' : 'secondary'}>
                            {(m.netVatPayable as number) > 0 ? (lang === 'ar' ? 'مستحق' : 'Payable') : (m.netVatPayable as number) < 0 ? (lang === 'ar' ? 'استرداد' : 'Refund') : (lang === 'ar' ? 'لا شيء' : 'None')}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="declaration" className="space-y-4">
          <div className="flex gap-3 items-end">
            <div className="space-y-1">
              <Label className="text-xs">{lang === 'ar' ? 'الفترة' : 'Period'}</Label>
              <Select value={quarter} onValueChange={setQuarter}>
                <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">{lang === 'ar' ? 'سنوي' : 'Annual'}</SelectItem>
                  <SelectItem value="1">{lang === 'ar' ? 'الربع الأول (Q1)' : 'Q1 (Jan-Mar)'}</SelectItem>
                  <SelectItem value="2">{lang === 'ar' ? 'الربع الثاني (Q2)' : 'Q2 (Apr-Jun)'}</SelectItem>
                  <SelectItem value="3">{lang === 'ar' ? 'الربع الثالث (Q3)' : 'Q3 (Jul-Sep)'}</SelectItem>
                  <SelectItem value="4">{lang === 'ar' ? 'الربع الرابع (Q4)' : 'Q4 (Oct-Dec)'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {declLoading ? <LoadingSpinner /> : declData?.declaration && (
            <div className="space-y-4">
              {/* Header */}
              <Card>
                <CardHeader><CardTitle className="text-base">{lang === 'ar' ? 'معلومات المكلف' : 'Taxpayer Information'}</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">{lang === 'ar' ? 'اسم المنشأة:' : 'Name:'}</span> <span className="font-medium">{lang === 'ar' ? declData.declaration.taxPayer?.nameAr : declData.declaration.taxPayer?.name}</span></div>
                  <div><span className="text-muted-foreground">{lang === 'ar' ? 'الرقم الضريبي:' : 'VAT No:'}</span> <span className="font-mono font-medium">{declData.declaration.taxPayer?.vatNumber || '-'}</span></div>
                  <div><span className="text-muted-foreground">{lang === 'ar' ? 'الفترة:' : 'Period:'}</span> <span className="font-medium">{year} {quarter !== 'annual' ? `Q${quarter}` : ''}</span></div>
                  <div>
                    <Badge variant={declData.declaration.status === 'PAYABLE' ? 'destructive' : 'success'} className="text-sm px-3 py-1">
                      {declData.declaration.status === 'PAYABLE' ? (lang === 'ar' ? 'ضريبة مستحقة' : 'Tax Payable') : (lang === 'ar' ? 'استرداد ضريبي' : 'Tax Refund')}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Output VAT */}
              <Card>
                <CardHeader><CardTitle className="text-base text-green-700">{lang === 'ar' ? 'ضريبة المخرجات (المبيعات)' : 'Output VAT (Sales)'}</CardTitle></CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>{lang === 'ar' ? 'المبيعات الخاضعة للضريبة (بدون ضريبة)' : 'Standard Rated Sales (ex-VAT)'}</TableCell>
                        <TableCell className="text-end font-medium"><CurrencyDisplay amount={declData.declaration.outputVat?.standardRatedSales || 0} /></TableCell>
                      </TableRow>
                      <TableRow className="bg-green-50">
                        <TableCell className="font-bold">{lang === 'ar' ? 'ضريبة القيمة المضافة على المبيعات (15%)' : 'VAT on Sales (15%)'}</TableCell>
                        <TableCell className="text-end font-bold text-green-700"><CurrencyDisplay amount={declData.declaration.outputVat?.vatOnSales || 0} /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Input VAT */}
              <Card>
                <CardHeader><CardTitle className="text-base text-red-700">{lang === 'ar' ? 'ضريبة المدخلات (المشتريات والمصروفات)' : 'Input VAT (Purchases & Expenses)'}</CardTitle></CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>{lang === 'ar' ? 'المشتريات الخاضعة للضريبة' : 'Standard Rated Purchases'}</TableCell>
                        <TableCell className="text-end"><CurrencyDisplay amount={declData.declaration.inputVat?.standardRatedPurchases || 0} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{lang === 'ar' ? 'ضريبة القيمة المضافة على المشتريات' : 'VAT on Purchases'}</TableCell>
                        <TableCell className="text-end"><CurrencyDisplay amount={declData.declaration.inputVat?.vatOnPurchases || 0} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{lang === 'ar' ? 'المصروفات الخاضعة للضريبة' : 'Vatable Expenses'}</TableCell>
                        <TableCell className="text-end"><CurrencyDisplay amount={declData.declaration.inputVat?.vatableExpenses || 0} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{lang === 'ar' ? 'ضريبة القيمة المضافة على المصروفات' : 'VAT on Expenses'}</TableCell>
                        <TableCell className="text-end"><CurrencyDisplay amount={declData.declaration.inputVat?.vatOnExpenses || 0} /></TableCell>
                      </TableRow>
                      <TableRow className="bg-red-50">
                        <TableCell className="font-bold">{lang === 'ar' ? 'إجمالي ضريبة المدخلات' : 'Total Input VAT'}</TableCell>
                        <TableCell className="text-end font-bold text-red-700"><CurrencyDisplay amount={declData.declaration.inputVat?.totalInputVat || 0} /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Net */}
              <Card className={`border-2 ${declData.declaration.status === 'PAYABLE' ? 'border-orange-400 bg-orange-50' : 'border-green-400 bg-green-50'}`}>
                <CardContent className="flex items-center justify-between p-6">
                  <p className="text-lg font-bold">{lang === 'ar' ? 'صافي الضريبة المستحقة / المستردة' : 'Net VAT Payable / Refundable'}</p>
                  <p className={`text-3xl font-bold ${declData.declaration.status === 'PAYABLE' ? 'text-orange-700' : 'text-green-700'}`}>
                    <CurrencyDisplay amount={declData.declaration.netVatPayable || 0} />
                  </p>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button variant="outline" onClick={() => window.print()}>{lang === 'ar' ? 'طباعة الإقرار' : 'Print Declaration'}</Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
