import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import EmptyState from '@/components/shared/EmptyState'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { ClipboardList } from 'lucide-react'

export default function PhysicalCountPage() {
  const { lang } = useLang()
  const { data, isLoading } = useQuery({
    queryKey: ['physical-counts'],
    queryFn: () => api.get('/api/v1/inventory/physical-counts').then(r => r.data.data).catch(() => []),
  })
  const counts = Array.isArray(data) ? data : []

  return (
    <div className="space-y-6">
      <PageHeader title={lang === 'ar' ? 'الجرد الفعلي' : 'Physical Count'} />
      {isLoading ? <LoadingSpinner /> : counts.length === 0 ? (
        <EmptyState title={lang === 'ar' ? 'لا توجد جردات' : 'No physical counts'} icon={ClipboardList} />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{lang === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الفرع' : 'Branch'}</TableHead>
                <TableHead>{lang === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead>{lang === 'ar' ? 'عدد الأصناف' : 'Items'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {counts.map((row: Record<string, unknown>) => (
                <TableRow key={row.id as string}>
                  <TableCell>{new Date(row.date as string).toLocaleDateString()}</TableCell>
                  <TableCell>{row.branchId as string}</TableCell>
                  <TableCell><Badge variant={row.status === 'COMPLETED' ? 'success' : 'warning'}>{row.status as string}</Badge></TableCell>
                  <TableCell>{(row.lines as unknown[])?.length || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}
