import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import EmptyState from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bell, CheckCheck, AlertTriangle, Package, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/useToast'

const ALERT_ICONS: Record<string, React.ElementType> = {
  LOW_STOCK: Package,
  IQAMA_EXPIRY: AlertTriangle,
}

const SEVERITY_COLORS: Record<string, 'destructive' | 'warning' | 'info'> = {
  HIGH: 'destructive',
  MEDIUM: 'warning',
  LOW: 'info',
}

export default function AlertsPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()

  const { data, isLoading } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => api.get('/api/v1/alerts?limit=100').then(r => r.data),
  })

  const generateMutation = useMutation({
    mutationFn: () => api.post('/api/v1/alerts/generate', {}),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['alerts'] }); toast({ title: lang === 'ar' ? 'تم تحديث التنبيهات' : 'Alerts refreshed', variant: 'success' }) },
  })

  const resolveMutation = useMutation({
    mutationFn: (id: string) => api.put(`/api/v1/alerts/${id}/resolve`, {}),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['alerts'] }) },
  })

  const resolveAllMutation = useMutation({
    mutationFn: () => api.put('/api/v1/alerts/resolve-all', {}),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['alerts'] }); toast({ title: lang === 'ar' ? 'تم إغلاق جميع التنبيهات' : 'All alerts resolved', variant: 'success' }) },
  })

  const alerts = data?.data || []
  const unreadCount = alerts.filter((a: {isRead: boolean}) => !a.isRead).length

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === 'ar' ? 'التنبيهات الذكية' : 'Smart Alerts'}
        subtitle={unreadCount > 0 ? (lang === 'ar' ? `${unreadCount} تنبيه غير مقروء` : `${unreadCount} unread alerts`) : undefined}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => generateMutation.mutate()} disabled={generateMutation.isPending} className="gap-2">
              <RefreshCw className={`h-4 w-4 ${generateMutation.isPending ? 'animate-spin' : ''}`} />
              {lang === 'ar' ? 'تحديث' : 'Refresh'}
            </Button>
            {alerts.length > 0 && (
              <Button variant="outline" onClick={() => resolveAllMutation.mutate()} disabled={resolveAllMutation.isPending} className="gap-2">
                <CheckCheck className="h-4 w-4" />
                {lang === 'ar' ? 'إغلاق الكل' : 'Resolve All'}
              </Button>
            )}
          </div>
        }
      />

      {isLoading ? <LoadingSpinner /> : alerts.length === 0 ? (
        <EmptyState
          title={lang === 'ar' ? 'لا توجد تنبيهات' : 'No alerts'}
          description={lang === 'ar' ? 'كل شيء يسير بشكل طبيعي' : 'Everything looks good'}
          icon={Bell}
          action={{ label: lang === 'ar' ? 'فحص الآن' : 'Check Now', onClick: () => generateMutation.mutate() }}
        />
      ) : (
        <div className="space-y-3">
          {alerts.map((alert: Record<string, unknown>) => {
            const Icon = ALERT_ICONS[alert.type as string] || Bell
            const isResolved = alert.isResolved as boolean
            return (
              <Card key={alert.id as string} className={`p-4 ${isResolved ? 'opacity-50' : ''} ${!alert.isRead ? 'border-s-4 border-s-orange-400' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${isResolved ? 'bg-muted' : 'bg-orange-50'}`}>
                    <Icon className={`h-4 w-4 ${isResolved ? 'text-muted-foreground' : 'text-orange-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm">{lang === 'ar' ? alert.titleAr as string : alert.titleEn as string}</p>
                      <Badge variant={SEVERITY_COLORS[alert.severity as string] || 'secondary'} className="text-xs">
                        {lang === 'ar' ? (alert.severity === 'HIGH' ? 'عالي' : alert.severity === 'MEDIUM' ? 'متوسط' : 'منخفض') : alert.severity as string}
                      </Badge>
                      {isResolved && <Badge variant="secondary" className="text-xs">{lang === 'ar' ? 'مغلق' : 'Resolved'}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{lang === 'ar' ? alert.messageAr as string : alert.messageEn as string}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(alert.createdAt as string).toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US')}</p>
                  </div>
                  {!isResolved && (
                    <Button variant="ghost" size="sm" onClick={() => resolveMutation.mutate(alert.id as string)} className="shrink-0">
                      <CheckCheck className="h-4 w-4 me-1" />
                      {lang === 'ar' ? 'إغلاق' : 'Resolve'}
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
