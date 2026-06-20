import { Button } from '@/components/ui/button'
import { FileSpreadsheet, Printer, FileDown } from 'lucide-react'
import { useLang } from '@/hooks/useLang'
import * as XLSX from 'xlsx'

interface ExportButtonsProps {
  data?: Record<string, unknown>[]
  filename?: string
  onPrint?: () => void
  showPDF?: boolean
  showExcel?: boolean
  showPrint?: boolean
  printTarget?: string
}

export default function ExportButtons({
  data = [],
  filename = 'export',
  onPrint,
  showPDF = true,
  showExcel = true,
  showPrint = true,
  printTarget,
}: ExportButtonsProps) {
  const { lang } = useLang()

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, `${filename}.xlsx`)
  }

  const exportPDF = () => {
    // Trigger browser print dialog which allows "Save as PDF"
    const style = document.createElement('style')
    style.id = '__pdf-print-style'
    style.innerHTML = `
      @media print {
        body > *:not(#${printTarget || 'root'}) { display: none !important; }
        #${printTarget || 'root'} { display: block !important; }
        .no-print { display: none !important; }
        nav, aside, header, [data-sidebar], [role="navigation"] { display: none !important; }
        .print\\:block { display: block !important; }
      }
    `
    document.head.appendChild(style)
    window.print()
    setTimeout(() => {
      const el = document.getElementById('__pdf-print-style')
      if (el) el.remove()
    }, 1000)
  }

  const handlePrint = () => {
    if (onPrint) {
      onPrint()
    } else {
      window.print()
    }
  }

  return (
    <div className="flex items-center gap-2">
      {showExcel && (
        <Button
          variant="outline"
          size="sm"
          onClick={exportExcel}
          className="gap-2 text-green-700 border-green-300 hover:bg-green-50 hover:border-green-400"
          title={lang === 'ar' ? 'تصدير Excel' : 'Export Excel'}
        >
          <FileSpreadsheet className="h-4 w-4" />
          <span className="hidden sm:inline">{lang === 'ar' ? 'Excel' : 'Excel'}</span>
        </Button>
      )}
      {showPDF && (
        <Button
          variant="outline"
          size="sm"
          onClick={exportPDF}
          className="gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
          title={lang === 'ar' ? 'حفظ PDF' : 'Save as PDF'}
        >
          <FileDown className="h-4 w-4" />
          <span className="hidden sm:inline">PDF</span>
        </Button>
      )}
      {showPrint && (
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
          className="gap-2 hover:bg-gray-50"
          title={lang === 'ar' ? 'طباعة' : 'Print'}
        >
          <Printer className="h-4 w-4" />
          <span className="hidden sm:inline">{lang === 'ar' ? 'طباعة' : 'Print'}</span>
        </Button>
      )}
    </div>
  )
}
