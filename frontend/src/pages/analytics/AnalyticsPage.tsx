import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import StatCard from '@/components/shared/StatCard'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'
import { TrendingUp, TrendingDown, Award, AlertTriangle } from 'lucide-react'
import CurrencyDisplay from '@/components/shared/CurrencyDisplay'

export default function AnalyticsPage() {
  const { lang } = useLang()
  const [from] = useState(() => { const d = new Date(); d.setMonth(d.getMonth() - 12); return d.toISOString().split('T')[0] })
  const [to] = useState(new Date().toISOString().split('T')[0])

  const { data, isLoading } = useQuery({
    queryKey: ['analytics', from, to],
    queryFn: () => api.get(`/api/v1/dashboard/analytics?from=${from}&to=${to}`).then(r => r.data.data),
  })

  if (isLoading) return <LoadingSpinner />

  const restaurants: {
    restaurant: { nameAr: string; nameEn: string };
    revenue: number; cogs: number; expenses: number; laborCost: number;
    grossProfit: number; netProfit: number; profitMargin: number; foodCostPercent: number;
  }[] = data?.restaurants || []
  const highest = data?.highestProfitRestaurant
  const lowest = data?.lowestProfitRestaurant
  const highFC = data?.highestFoodCostRestaurant
  const lowFC = data?.lowestFoodCostRestaurant

  const chartData = restaurants.map(r => ({
    name: lang === 'ar' ? r.restaurant.nameAr : r.restaurant.nameEn,
    revenue: r.revenue,
    netProfit: r.netProfit,
    foodCost: r.foodCostPercent,
  }))

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'التحليلات التنفيذية' : 'Executive Analytics'}
        subtitle={lang === 'ar' ? 'نظرة شاملة على أداء المطاعم' : 'Comprehensive restaurant performance overview'}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {highest && (
          <StatCard
            title={lang === 'ar' ? 'أعلى ربحية' : 'Highest Profit'}
            value={lang === 'ar' ? highest.restaurant.nameAr : highest.restaurant.nameEn}
            subtitle={<CurrencyDisplay amount={highest.netProfit} /> as unknown as string}
            icon={Award} color="green"
          />
        )}
        {lowest && (
          <StatCard
            title={lang === 'ar' ? 'أدنى ربحية' : 'Lowest Profit'}
            value={lang === 'ar' ? lowest.restaurant.nameAr : lowest.restaurant.nameEn}
            subtitle={<CurrencyDisplay amount={lowest.netProfit} /> as unknown as string}
            icon={TrendingDown} color="red"
          />
        )}
        {highFC && (
          <StatCard
            title={lang === 'ar' ? 'أعلى تكلفة طعام' : 'Highest Food Cost'}
            value={lang === 'ar' ? highFC.restaurant.nameAr : highFC.restaurant.nameEn}
            subtitle={`${highFC.foodCostPercent?.toFixed(1)}%`}
            icon={AlertTriangle} color="yellow"
          />
        )}
        {lowFC && (
          <StatCard
            title={lang === 'ar' ? 'أدنى تكلفة طعام' : 'Lowest Food Cost'}
            value={lang === 'ar' ? lowFC.restaurant.nameAr : lowFC.restaurant.nameEn}
            subtitle={`${lowFC.foodCostPercent?.toFixed(1)}%`}
            icon={TrendingUp} color="blue"
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{lang === 'ar' ? 'الإيرادات وصافي الربح' : 'Revenue vs Net Profit'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip formatter={(v: number) => `${v.toLocaleString()} SAR`} />
                <Legend />
                <Bar dataKey="revenue" name={lang === 'ar' ? 'الإيرادات' : 'Revenue'} fill="#16a34a" radius={[4,4,0,0]} />
                <Bar dataKey="netProfit" name={lang === 'ar' ? 'صافي الربح' : 'Net Profit'} fill="#2563eb" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{lang === 'ar' ? 'نسبة تكلفة الطعام' : 'Food Cost %'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" fontSize={11} />
                <YAxis fontSize={11} unit="%" />
                <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
                <Line dataKey="foodCost" stroke="#ea580c" strokeWidth={2} dot={true} name={lang === 'ar' ? 'تكلفة الطعام %' : 'Food Cost %'} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{lang === 'ar' ? 'تصنيف المطاعم حسب الربحية' : 'Restaurant Profitability Ranking'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-start py-2 px-3 font-medium text-muted-foreground">#</th>
                  <th className="text-start py-2 px-3 font-medium text-muted-foreground">{lang === 'ar' ? 'المطعم' : 'Restaurant'}</th>
                  <th className="text-end py-2 px-3 font-medium text-muted-foreground">{lang === 'ar' ? 'الإيرادات' : 'Revenue'}</th>
                  <th className="text-end py-2 px-3 font-medium text-muted-foreground">{lang === 'ar' ? 'تكلفة الطعام' : 'Food Cost'}</th>
                  <th className="text-end py-2 px-3 font-medium text-muted-foreground">{lang === 'ar' ? 'صافي الربح' : 'Net Profit'}</th>
                  <th className="text-end py-2 px-3 font-medium text-muted-foreground">{lang === 'ar' ? 'هامش الربح' : 'Margin'}</th>
                </tr>
              </thead>
              <tbody>
                {[...restaurants].sort((a, b) => b.netProfit - a.netProfit).map((r, i) => (
                  <tr key={i} className="border-b hover:bg-muted/30">
                    <td className="py-3 px-3 text-muted-foreground">{i + 1}</td>
                    <td className="py-3 px-3 font-medium">{lang === 'ar' ? r.restaurant.nameAr : r.restaurant.nameEn}</td>
                    <td className="py-3 px-3 text-end"><CurrencyDisplay amount={r.revenue} /></td>
                    <td className="py-3 px-3 text-end">
                      <span className={r.foodCostPercent > 35 ? 'text-red-600' : 'text-green-600'}>
                        {r.foodCostPercent.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-end">
                      <span className={r.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                        <CurrencyDisplay amount={r.netProfit} />
                      </span>
                    </td>
                    <td className="py-3 px-3 text-end">
                      <span className={r.profitMargin >= 10 ? 'text-green-600' : r.profitMargin >= 0 ? 'text-yellow-600' : 'text-red-600'}>
                        {r.profitMargin.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
