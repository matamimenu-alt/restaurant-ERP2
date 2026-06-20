import * as XLSX from 'xlsx'

export function downloadSalesTemplate() {
  const headers = [
    'Date',
    'VAT Mode',
    'Cash (SAR)',
    'Card (SAR)',
    'HungerStation',
    'Jahez',
    'Noon Food',
    'Talabat',
    'App 5',
    'App 6',
    'Opening Balance (SAR)',
    'Cash Expenses (SAR)',
    'Closing Balance (SAR)',
    'Notes',
  ]

  const example = [
    '2026-06-01',
    'inclusive',
    1200,
    3500,
    0,
    0,
    0,
    0,
    4200,
    0,
    500,
    150,
    1550,
    '',
  ]

  const notes = [
    '--- ملاحظات ---',
    'VAT Mode: inclusive أو exclusive',
    'التاريخ: YYYY-MM-DD',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet([headers, example, notes])

  // Column widths
  ws['!cols'] = headers.map((h, i) => ({ wch: i === 0 ? 14 : h.length + 4 }))

  // Style header row (bold)
  const range = XLSX.utils.decode_range(ws['!ref'] || 'A1')
  for (let c = range.s.c; c <= range.e.c; c++) {
    const cell = ws[XLSX.utils.encode_cell({ r: 0, c })]
    if (cell) cell.s = { font: { bold: true }, fill: { fgColor: { rgb: 'D6E4F0' } } }
  }

  XLSX.utils.book_append_sheet(wb, ws, 'Sales Import')
  XLSX.writeFile(wb, 'sales_import_template.xlsx')
}

export function downloadPurchasesTemplate() {
  const headers = [
    'Date',
    'Supplier',
    'Invoice ID',
    'Invoice Type',
    'Payment',
    'Product',
    'Category',
    'Unit',
    'Quantity',
    'Unit Price (SAR)',
    'VAT (SAR)',
  ]

  const examples = [
    ['2026-06-01', 'دار بردى', 'INV-001', 'Tax', 'Credit', 'زيت هلة تنك', 'Food Supplies & Oils', 'tin', 5, 99.15, 74.36],
    ['2026-06-01', 'دار بردى', 'INV-001', 'Tax', 'Credit', 'طحين', 'Dry Goods', 'kg', 50, 2.10, 15.75],
    ['2026-06-02', 'عصن الخضار', 'INV-002', 'Simple', 'Cash', 'طماطم', 'Vegetables & Fruits', 'kg', 30, 3.50, 0],
  ]

  const notes = [
    ['--- ملاحظات ---', '', '', '', '', '', '', '', '', '', ''],
    ['Invoice Type:', 'Tax أو Simple', '', '', '', '', '', '', '', '', ''],
    ['Payment:', 'Cash أو Credit أو Bank', '', '', '', '', '', '', '', '', ''],
    ['نفس Invoice ID = نفس الفاتورة', '', '', '', '', '', '', '', '', '', ''],
  ]

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet([headers, ...examples, ...notes])

  ws['!cols'] = [
    { wch: 12 }, { wch: 18 }, { wch: 12 }, { wch: 14 }, { wch: 10 },
    { wch: 22 }, { wch: 20 }, { wch: 8 }, { wch: 10 }, { wch: 16 }, { wch: 10 },
  ]

  XLSX.utils.book_append_sheet(wb, ws, 'Purchases Import')
  XLSX.writeFile(wb, 'purchases_import_template.xlsx')
}
