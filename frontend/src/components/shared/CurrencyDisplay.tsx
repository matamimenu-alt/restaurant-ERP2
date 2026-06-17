import { useLang } from '@/hooks/useLang'

interface CurrencyDisplayProps {
  amount: number | string
  className?: string
}

export default function CurrencyDisplay({ amount, className }: CurrencyDisplayProps) {
  const { lang } = useLang()
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  const formatted = new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2,
  }).format(isNaN(num) ? 0 : num)
  return <span className={className}>{formatted}</span>
}
