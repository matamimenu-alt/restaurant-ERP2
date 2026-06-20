import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('[clear-purchases] Starting purchase data cleanup...')

  const returnLines = await prisma.purchaseReturnLine.deleteMany({})
  console.log(`[clear-purchases] Deleted ${returnLines.count} purchase return lines`)

  const returns = await prisma.purchaseReturn.deleteMany({})
  console.log(`[clear-purchases] Deleted ${returns.count} purchase returns`)

  const invoiceLines = await prisma.purchaseInvoiceLine.deleteMany({})
  console.log(`[clear-purchases] Deleted ${invoiceLines.count} purchase invoice lines`)

  const invoices = await prisma.purchaseInvoice.deleteMany({})
  console.log(`[clear-purchases] Deleted ${invoices.count} purchase invoices`)

  console.log('[clear-purchases] Done. Purchase tables are now empty.')
}

main()
  .catch((e) => {
    console.error('[clear-purchases] Error:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
