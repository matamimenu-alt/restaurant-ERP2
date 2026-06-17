import { Button } from '@/components/ui/button'
import { FileDown, FileSpreadsheet, Printer } from 'lucide-react'
import { useLang } from '@/hooks/useLang'
import * as XLSX from 'xlsx'

interface ExportButtonsProps {
  data: Record<string, unknown>[]
  filename?: string
  onPrint?: () => void
}

export default function ExportButtons({ data, filename = 'export', onPrint }: ExportButtonsProps) {
  const { lang } = useLang()

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, `${filename}.xlsx`)
  }

  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(data)
    const csv = XLSX.utils.sheet_to_csv(ws)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={exportExcel} className="gap-2">
        <FileSpreadsheet className="h-4 w-4" />
        <span className="hidden sm:inline">{lang === 'ar' ? 'Excel' : 'Excel'}</span>
      </Button>
      <Button variant="outline" size="sm" onClick={exportCSV} className="gap-2">
        <FileDown className="h-4 w-4" />
        <span className="hidden sm:inline">{lang === 'ar' ? 'CSV' : 'CSV'}</span>
      </Button>
      {onPrint && (
        <Button variant="outline" size="sm" onClick={onPrint} className="gap-2">
          <Printer className="h-4 w-4" />
          <span className="hidden sm:inline">{lang === 'ar' ? 'طباعة' : 'Print'}</span>
        </Button>
      )}
    </div>
  )
}
