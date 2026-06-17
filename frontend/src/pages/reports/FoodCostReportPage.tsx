import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import EmptyState from '@/components/shared/EmptyState'
import CurrencyDisplay from '@/components/shared/CurrencyDisplay'
import ExportButtons from '@/components/shared/ExportButtons'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { ChefHat } from 'lucide-react'

export default function FoodCostReportPage() {
  const { lang } = useLang()
  const [restaurantId, setRestaurantId] = useState('')

  const { data: restaurants } = useQuery({ queryKey: ['restaurants'], queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data.data) })

  const params = new URLSearchParams()
  if (restaurantId) params.set('restaurantId', restaurantId)

  const { data, isLoading } = useQuery({
    queryKey: ['food-cost-report', restaurantId],
    queryFn: () => api.get(`/api/v1/recipes?${params}&limit=200`).then(r => r.data),
  })

  const recipes = data?.data || []
  const avgMargin = recipes.length > 0 ? recipes.reduce((s: number, r: {grossMargin: number}) => s + r.grossMargin, 0) / recipes.length : 0
  const highMarginCount = recipes.filter((r: {grossMargin: number}) => r.grossMargin >= 60).length
  const lowMarginCount = recipes.filter((r: {grossMargin: number}) => r.grossMargin < 40).length

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'تقرير تكلفة الطعام' : 'Food Cost Report'}
        actions={recipes.length > 0 && <ExportButtons data={recipes} filename="food-cost-report" />}
      />

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

      {!isLoading && recipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-sm text-blue-700">{lang === 'ar' ? 'متوسط هامش الربح' : 'Avg Gross Margin'}</p>
            <p className="text-2xl font-bold text-blue-800">{avgMargin.toFixed(1)}%</p>
          </Card>
          <Card className="p-4 bg-green-50 border-green-200">
            <p className="text-sm text-green-700">{lang === 'ar' ? 'وصفات بهامش ≥ 60%' : 'Recipes with ≥ 60% margin'}</p>
            <p className="text-2xl font-bold text-green-800">{highMarginCount}</p>
          </Card>
          <Card className="p-4 bg-red-50 border-red-200">
            <p className="text-sm text-red-700">{lang === 'ar' ? 'وصفات بهامش < 40%' : 'Recipes with < 40% margin'}</p>
            <p className="text-2xl font-bold text-red-800">{lowMarginCount}</p>
          </Card>
        </div>
      )}

      {isLoading ? <LoadingSpinner /> : recipes.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا توجد وصفات' : 'No recipes'} icon={ChefHat} />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{lang === 'ar' ? 'الوصفة' : 'Recipe'}</TableHead>
                <TableHead>{lang === 'ar' ? 'المطعم' : 'Restaurant'}</TableHead>
                <TableHead>{lang === 'ar' ? 'تكلفة الطعام' : 'Food Cost'}</TableHead>
                <TableHead>{lang === 'ar' ? 'تكلفة الحصة' : 'Cost/Portion'}</TableHead>
                <TableHead>{lang === 'ar' ? 'سعر المحل' : 'Local Price'}</TableHead>
                <TableHead>{lang === 'ar' ? 'سعر التطبيق' : 'App Price'}</TableHead>
                <TableHead>{lang === 'ar' ? 'هامش الربح' : 'Margin'}</TableHead>
                <TableHead>{lang === 'ar' ? 'التقييم' : 'Rating'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...recipes].sort((a: {grossMargin: number}, b: {grossMargin: number}) => b.grossMargin - a.grossMargin).map((row: Record<string, unknown>) => {
                const margin = Number(row.grossMargin)
                return (
                  <TableRow key={row.id as string}>
                    <TableCell className="font-medium">{lang === 'ar' ? row.nameAr as string : row.nameEn as string}</TableCell>
                    <TableCell>{lang === 'ar' ? (row.restaurant as {nameAr: string})?.nameAr : (row.restaurant as {nameEn: string})?.nameEn}</TableCell>
                    <TableCell><CurrencyDisplay amount={row.foodCost as number} /></TableCell>
                    <TableCell><CurrencyDisplay amount={row.costPerPortion as number} /></TableCell>
                    <TableCell><CurrencyDisplay amount={row.localPrice as number} /></TableCell>
                    <TableCell><CurrencyDisplay amount={row.deliveryPrice as number} /></TableCell>
                    <TableCell>
                      <span className={`font-bold ${margin >= 60 ? 'text-green-600' : margin >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {margin.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={margin >= 60 ? 'success' : margin >= 40 ? 'warning' : 'destructive'}>
                        {margin >= 60 ? (lang === 'ar' ? 'ممتاز' : 'Excellent') : margin >= 40 ? (lang === 'ar' ? 'جيد' : 'Good') : (lang === 'ar' ? 'منخفض' : 'Low')}
                      </Badge>
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
