const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/tmp/local_data.json'));

let ts = `import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Running data migration...')
  const company = await prisma.company.findFirst()
  if (!company) { console.log('No company found - skipping'); return }
  const companyId = company.id

`;

// Restaurants
ts += `  // Restaurants\n`;
for (const r of data.restaurants) {
  ts += `  await prisma.restaurant.upsert({ where: { id: ${JSON.stringify(r.id)} }, update: {}, create: { id: ${JSON.stringify(r.id)}, companyId, nameAr: ${JSON.stringify(r.nameAr)}, nameEn: ${JSON.stringify(r.nameEn)} } })\n`;
}

// Suppliers
ts += `\n  // Suppliers\n`;
for (const s of data.suppliers) {
  ts += `  await prisma.supplier.upsert({ where: { id: ${JSON.stringify(s.id)} }, update: {}, create: { id: ${JSON.stringify(s.id)}, companyId, nameAr: ${JSON.stringify(s.nameAr)}, nameEn: ${JSON.stringify(s.nameEn || s.nameAr)} } })\n`;
}

// Inventory categories
ts += `\n  // Inventory Categories\n`;
for (const c of data.invCats) {
  ts += `  await prisma.inventoryCategory.upsert({ where: { id: ${JSON.stringify(c.id)} }, update: {}, create: { id: ${JSON.stringify(c.id)}, companyId, nameAr: ${JSON.stringify(c.nameAr)}, nameEn: ${JSON.stringify(c.nameEn)} } })\n`;
}

// Inventory items
ts += `\n  // Inventory Items\n`;
for (const i of data.items) {
  const catPart = i.categoryId ? `, categoryId: ${JSON.stringify(i.categoryId)}` : '';
  ts += `  await prisma.inventoryItem.upsert({ where: { id: ${JSON.stringify(i.id)} }, update: { lastPurchasePrice: ${i.lastPurchasePrice} }, create: { id: ${JSON.stringify(i.id)}, companyId, nameAr: ${JSON.stringify(i.nameAr)}, nameEn: ${JSON.stringify(i.nameEn || i.nameAr)}, unit: ${JSON.stringify(i.unit)}, lastPurchasePrice: ${i.lastPurchasePrice}${catPart} } })\n`;
}

// Purchase invoices + lines
ts += `\n  // Purchase Invoices\n`;
for (const inv of data.invoices) {
  const dateStr = new Date(inv.invoiceDate).toISOString();
  ts += `  {\n    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: ${JSON.stringify(inv.id)} } })\n    if (!existing) {\n      await prisma.purchaseInvoice.create({ data: { id: ${JSON.stringify(inv.id)}, companyId, restaurantId: ${JSON.stringify(inv.restaurantId)}, supplierId: ${JSON.stringify(inv.supplierId)}, invoiceNumber: ${JSON.stringify(inv.invoiceNumber)}, invoiceDate: new Date(${JSON.stringify(dateStr)}), invoiceType: ${JSON.stringify(inv.invoiceType)}, paymentMethod: ${JSON.stringify(inv.paymentMethod)}, subtotal: ${inv.subtotal}, vatAmount: ${inv.vatAmount}, total: ${inv.total}, createdBy: 'migration',\n        lines: { create: [\n`;
  for (const l of inv.lines) {
    ts += `          { id: ${JSON.stringify(l.id)}, itemId: ${JSON.stringify(l.itemId)}, quantity: ${l.quantity}, unitPrice: ${l.unitPrice}, vatRate: ${l.vatRate}, vatAmount: ${l.vatAmount}, total: ${l.total} },\n`;
  }
  ts += `        ] }\n      } })\n    }\n  }\n`;
}

// Daily sales
ts += `\n  // Daily Sales Records\n`;
for (const s of data.sales) {
  const dateStr = new Date(s.date).toISOString();
  ts += `  await prisma.dailySalesRecord.upsert({ where: { id: ${JSON.stringify(s.id)} }, update: {}, create: { id: ${JSON.stringify(s.id)}, companyId, restaurantId: ${JSON.stringify(s.restaurantId)}, date: new Date(${JSON.stringify(dateStr)}), vatMode: ${JSON.stringify(s.vatMode)}, vatRate: ${s.vatRate}, cashSales: ${s.cashSales}, cardSales: ${s.cardSales}, hungerStation: ${s.hungerStation}, jahez: ${s.jahez}, noonFood: ${s.noonFood}, talabat: ${s.talabat}, app5: ${s.app5}, app6: ${s.app6}, openingBalance: ${s.openingBalance}, cashExpenses: ${s.cashExpenses}, closingBalance: ${s.closingBalance}, notes: ${JSON.stringify(s.notes)}, createdBy: 'migration' } })\n`;
}

// Employees
ts += `\n  // Employees\n`;
for (const e of data.employees) {
  const startDate = e.startDate ? new Date(e.startDate).toISOString() : new Date('2026-01-01').toISOString();
  ts += `  await prisma.employee.upsert({ where: { id: ${JSON.stringify(e.id)} }, update: {}, create: { id: ${JSON.stringify(e.id)}, companyId, restaurantId: ${JSON.stringify(e.restaurantId)}, nameAr: ${JSON.stringify(e.nameAr)}, nameEn: ${JSON.stringify(e.nameEn || e.nameAr)}, employeeId: ${JSON.stringify(e.employeeId)}, position: ${JSON.stringify(e.position || '')}, nationality: ${JSON.stringify(e.nationality || '')}, basicSalary: ${e.basicSalary ?? e.baseSalary ?? 0}, housingAllowance: ${e.housingAllowance}, transportAllowance: ${e.transportAllowance}, otherAllowances: ${e.otherAllowances}, joiningDate: new Date(${JSON.stringify(startDate)}) } })\n`;
}

ts += `
  console.log('Data migration completed successfully!')
}

main()
  .catch(e => { console.error('Migration error:', e.message); process.exit(1) })
  .finally(() => prisma.$disconnect())
`;

fs.writeFileSync('/home/user/restaurant-ERP2/backend/prisma/migrate-data.ts', ts);
console.log('Generated migrate-data.ts:', ts.split('\n').length, 'lines,', Math.round(ts.length/1024), 'KB');
