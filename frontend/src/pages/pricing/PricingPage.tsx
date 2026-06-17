import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import CurrencyDisplay from '@/components/shared/CurrencyDisplay'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, TrendingUp } from 'lucide-react'

export default function PricingPage() {
  const { lang } = useLang()
  const [foodCost, setFoodCost] = useState('')
  const [targetMargin, setTargetMargin] = useState('70')
  const [deliveryCommission, setDeliveryCommission] = useState('25')
  const [result, setResult] = useState<Record<string, number> | null>(null)

  const calcMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => api.post('/api/v1/recipes/calculate-pricing', d).then(r => r.data.data),
    onSuccess: (data) => setResult(data),
  })

  const calculate = () => {
    calcMutation.mutate({ foodCost: Number(foodCost), targetMargin: Number(targetMargin), deliveryCommission: Number(deliveryCommission) })
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'محرك التسعير' : 'Pricing Engine'}
        subtitle={lang === 'ar' ? 'احسب السعر المناسب بناءً على تكلفة الطعام وهامش الربح المستهدف' : 'Calculate optimal prices based on food cost and target margin'}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Calculator className="h-4 w-4" />{lang === 'ar' ? 'المدخلات' : 'Inputs'}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'تكلفة الطعام (ريال)' : 'Food Cost (SAR)'}</Label>
              <Input type="number" step="0.01" value={foodCost} onChange={e => setFoodCost(e.target.value)} placeholder="10.00" />
            </div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'هامش الربح المستهدف %' : 'Target Margin %'}</Label>
              <div className="flex items-center gap-2">
                <Input type="number" value={targetMargin} onChange={e => setTargetMargin(e.target.value)} className="w-28" />
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${Math.min(100, Number(targetMargin))}%` }} />
                </div>
                <span className="text-sm font-bold">{targetMargin}%</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'عمولة التطبيق %' : 'Delivery Commission %'}</Label>
              <Input type="number" value={deliveryCommission} onChange={e => setDeliveryCommission(e.target.value)} className="w-28" />
              <p className="text-xs text-muted-foreground">{lang === 'ar' ? 'مثال: هنقرستيشن 25%' : 'e.g. HungerStation 25%'}</p>
            </div>
            <Button onClick={calculate} className="w-full gap-2" disabled={!foodCost || calcMutation.isPending}>
              <Calculator className="h-4 w-4" />
              {lang === 'ar' ? 'احسب الأسعار' : 'Calculate Prices'}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className="bg-green-50 border-green-200">
            <CardHeader><CardTitle className="text-base flex items-center gap-2 text-green-800"><TrendingUp className="h-4 w-4" />{lang === 'ar' ? 'النتائج' : 'Results'}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-green-200 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{lang === 'ar' ? 'سعر المحل (بدون ضريبة)' : 'Local Price (ex-VAT)'}</p>
                  <p className="text-2xl font-bold text-green-700"><CurrencyDisplay amount={result.localPriceBeforeVat} /></p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{lang === 'ar' ? 'سعر المحل (شامل ضريبة)' : 'Local Price (inc-VAT)'}</p>
                  <p className="text-2xl font-bold text-green-700"><CurrencyDisplay amount={result.localPriceWithVat} /></p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{lang === 'ar' ? 'سعر التطبيق (بدون ضريبة)' : 'App Price (ex-VAT)'}</p>
                  <p className="text-2xl font-bold text-blue-700"><CurrencyDisplay amount={result.appPriceBeforeVat} /></p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{lang === 'ar' ? 'سعر التطبيق (شامل ضريبة)' : 'App Price (inc-VAT)'}</p>
                  <p className="text-2xl font-bold text-blue-700"><CurrencyDisplay amount={result.appPriceWithVat} /></p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{lang === 'ar' ? 'تكلفة الطعام' : 'Food Cost'}</span>
                  <span className="font-medium"><CurrencyDisplay amount={result.foodCost} /></span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                  <span className="text-muted-foreground">{lang === 'ar' ? 'نسبة تكلفة الطعام' : 'Food Cost %'}</span>
                  <span className={`font-bold ${result.foodCostPercent > 35 ? 'text-red-600' : 'text-green-600'}`}>{result.foodCostPercent?.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                  <span className="text-muted-foreground">{lang === 'ar' ? 'هامش الربح المستهدف' : 'Target Margin'}</span>
                  <span className="font-bold text-primary">{result.targetMargin}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Explanation */}
      <Card>
        <CardHeader><CardTitle className="text-base">{lang === 'ar' ? 'كيف يعمل محرك التسعير' : 'How the Pricing Engine Works'}</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-semibold mb-1">{lang === 'ar' ? 'سعر المحل' : 'Local Price'}</p>
              <p className="text-muted-foreground font-mono text-xs">{lang === 'ar' ? 'السعر = تكلفة الطعام ÷ (1 - هامش الربح)' : 'Price = Food Cost ÷ (1 - Margin)'}</p>
              <p className="text-xs text-muted-foreground mt-1">{lang === 'ar' ? 'مثال: 10 ÷ (1 - 0.70) = 33.33 ريال' : 'e.g. 10 ÷ (1 - 0.70) = 33.33 SAR'}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-semibold mb-1">{lang === 'ar' ? 'سعر التطبيق' : 'Delivery App Price'}</p>
              <p className="text-muted-foreground font-mono text-xs">{lang === 'ar' ? 'السعر = تكلفة ÷ ((1-هامش) × (1-عمولة))' : 'Price = Cost ÷ ((1-Margin) × (1-Commission))'}</p>
              <p className="text-xs text-muted-foreground mt-1">{lang === 'ar' ? 'يأخذ في الاعتبار عمولة التطبيق' : 'Accounts for delivery app commission'}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-semibold mb-1">{lang === 'ar' ? 'ضريبة القيمة المضافة' : 'VAT'}</p>
              <p className="text-muted-foreground font-mono text-xs">{lang === 'ar' ? 'السعر شامل الضريبة = السعر × 1.15' : 'Price inc-VAT = Price × 1.15'}</p>
              <p className="text-xs text-muted-foreground mt-1">{lang === 'ar' ? 'ضريبة القيمة المضافة 15% في المملكة العربية السعودية' : '15% VAT rate for Saudi Arabia'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
