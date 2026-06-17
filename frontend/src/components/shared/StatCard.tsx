import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  trend?: number
  color?: 'default' | 'green' | 'red' | 'blue' | 'yellow' | 'purple'
  className?: string
}

const colorMap = {
  default: 'bg-background',
  green: 'bg-green-50 border-green-200',
  red: 'bg-red-50 border-red-200',
  blue: 'bg-blue-50 border-blue-200',
  yellow: 'bg-yellow-50 border-yellow-200',
  purple: 'bg-purple-50 border-purple-200',
}

const iconColorMap = {
  default: 'text-muted-foreground',
  green: 'text-green-600',
  red: 'text-red-600',
  blue: 'text-blue-600',
  yellow: 'text-yellow-600',
  purple: 'text-purple-600',
}

export default function StatCard({ title, value, subtitle, icon: Icon, trend, color = 'default', className }: StatCardProps) {
  return (
    <Card className={cn(colorMap[color], className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            {trend !== undefined && (
              <div className={cn("text-xs font-medium", trend >= 0 ? "text-green-600" : "text-red-600")}>
                {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
              </div>
            )}
          </div>
          {Icon && (
            <div className={cn("rounded-lg p-2 bg-white/50", iconColorMap[color])}>
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
