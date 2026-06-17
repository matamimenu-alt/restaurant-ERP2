import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import EmptyState from '@/components/shared/EmptyState'
import CurrencyDisplay from '@/components/shared/CurrencyDisplay'
import ExportButtons from '@/components/shared/ExportButtons'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Package } from 'lucide-react'

export default function InventoryReportPage() {
  const { lang } = useLang()

  const { data, isLoading } = useQuery({
    queryKey: ['inventory-report'],
    queryFn: () => api.get('/api/v1/inventory/items?limit=500').then(r => r.data),
  })

  const items = data?.data || []
  const totalValue = items.reduce((s: number, item: {currentStock: number; lastPurchasePrice: number}) => s + (item.currentStock * item.lastPurchasePrice), 0)
  const lowStockCount = items.filter((item: {currentStock: number; minStock: number}) => item.currentStock <= item.minStock).length

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'تقرير المخزون' : 'Inventory Report'}
        actions={items.length > 0 && <ExportButtons data={items} filename="inventory-report" />}
      />

      {!isLoading && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-sm text-blue-700">{lang === 'ar' ? 'إجمالي الأصناف' : 'Total Items'}</p>
            <p className="text-2xl font-bold text-blue-800">{items.length}</p>
          </Card>
          <Card className="p-4 bg-green-50 border-green-200">
            <p className="text-sm text-green-700">{lang === 'ar' ? 'قيمة المخزون' : 'Inventory Value'}</p>
            <p className="text-2xl font-bold text-green-800"><CurrencyDisplay amount={totalValue} /></p>
          </Card>
          <Card className="p-4 bg-red-50 border-red-200">
            <p className="text-sm text-red-700">{lang === 'ar' ? 'أصناف منخفضة المخزون' : 'Low Stock Items'}</p>
            <p className="text-2xl font-bold text-red-800">{lowStockCount}</p>
          </Card>
        </div>
      )}

      {isLoading ? <LoadingSpinner /> : items.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا توجد أصناف' : 'No inventory items'} icon={Package} />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{lang === 'ar' ? 'الصنف' : 'Item'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الفئة' : 'Category'}</TableHead>
                <TableHead>{lang === 'ar' ? 'المخزون الحالي' : 'Current Stock'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الحد الأدنى' : 'Min Stock'}</TableHead>
                <TableHead>{lang === 'ar' ? 'آخر سعر شراء' : 'Last Purchase Price'}</TableHead>
                <TableHead>{lang === 'ar' ? 'قيمة المخزون' : 'Stock Value'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الحالة' : 'Status'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((row: Record<string, unknown>) => {
                const isLow = (row.currentStock as number) <= (row.minStock as number)
                const value = (row.currentStock as number) * (row.lastPurchasePrice as number)
                return (
                  <TableRow key={row.id as string} className={isLow ? 'bg-red-50' : ''}>
                    <TableCell className="font-medium">{lang === 'ar' ? row.nameAr as string : row.nameEn as string}</TableCell>
                    <TableCell>{lang === 'ar' ? (row.category as {nameAr: string})?.nameAr : (row.category as {nameEn: string})?.nameEn}</TableCell>
                    <TableCell className={isLow ? 'text-red-600 font-bold' : ''}>{row.currentStock as number} {row.unit as string}</TableCell>
                    <TableCell>{row.minStock as number} {row.unit as string}</TableCell>
                    <TableCell><CurrencyDisplay amount={row.lastPurchasePrice as number} /></TableCell>
                    <TableCell><CurrencyDisplay amount={value} /></TableCell>
                    <TableCell>
                      {isLow ? (
                        <Badge variant="destructive">{lang === 'ar' ? 'منخفض' : 'Low'}</Badge>
                      ) : (
                        <Badge variant="success">{lang === 'ar' ? 'كافٍ' : 'OK'}</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}
