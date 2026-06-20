const XLSX = require('./backend/node_modules/xlsx');
const { PrismaClient } = require('./backend/node_modules/@prisma/client');

const prisma = new PrismaClient();

const COMPANY_ID = 'cmqm3x6wl0000u8l2o3p42qph';
const RESTAURANT_ID = 'cmqm4c1l10001rv2wb69dqxth'; // مطعم أسد الحمراء

async function main() {
  // ─── Load reference data ───────────────────────────────────────────────
  const suppliers = await prisma.supplier.findMany({ where: { companyId: COMPANY_ID } });
  const categories = await prisma.inventoryCategory.findMany({ where: { companyId: COMPANY_ID } });
  const items = await prisma.inventoryItem.findMany({ where: { companyId: COMPANY_ID } });

  const supplierMap = Object.fromEntries(suppliers.map(s => [s.nameAr, s.id]));
  const categoryMap = Object.fromEntries(categories.map(c => [c.nameEn, c.id]));
  const itemMap = Object.fromEntries(items.map(i => [i.nameAr, i.id]));

  async function getOrCreateItem(nameAr, categoryId, unit = 'unit') {
    if (itemMap[nameAr]) return itemMap[nameAr];
    const item = await prisma.inventoryItem.create({
      data: { nameAr, nameEn: nameAr, companyId: COMPANY_ID, categoryId, unit, lastPurchasePrice: 0 }
    });
    itemMap[nameAr] = item.id;
    console.log(`  Created item: ${nameAr}`);
    return item.id;
  }

  async function getOrCreateSupplier(nameAr) {
    if (supplierMap[nameAr]) return supplierMap[nameAr];
    const s = await prisma.supplier.create({
      data: { nameAr, nameEn: nameAr, companyId: COMPANY_ID }
    });
    supplierMap[nameAr] = s.id;
    console.log(`  Created supplier: ${nameAr}`);
    return s.id;
  }

  // ─── IMPORT PURCHASES ─────────────────────────────────────────────────
  console.log('\n=== Importing Purchases ===');
  const wb = XLSX.readFile('/tmp/hamra_purchases.xlsx');
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws);

  // Group by invoice ID
  const invoiceGroups = {};
  for (const row of rows) {
    const invoiceId = row['Invoice ID'];
    if (!invoiceGroups[invoiceId]) invoiceGroups[invoiceId] = [];
    invoiceGroups[invoiceId].push(row);
  }

  let purchaseCreated = 0;
  const purchaseErrors = [];

  for (const [invoiceId, lines] of Object.entries(invoiceGroups)) {
    try {
      const first = lines[0];
      const dateVal = first['Date'];
      let invoiceDate;
      if (typeof dateVal === 'number') {
        invoiceDate = new Date(Math.round((dateVal - 25569) * 86400 * 1000));
      } else {
        invoiceDate = new Date(dateVal);
      }

      const supplierId = await getOrCreateSupplier(first['Supplier']);
      const paymentRaw = (first['Payment'] || 'cash').toLowerCase();
      const paymentMethod = paymentRaw === 'credit' ? 'CREDIT' : paymentRaw === 'bank' ? 'BANK' : 'CASH';
      const invoiceType = (first['Invoice Type'] || '').toLowerCase().includes('tax') ? 'TAX' : 'SIMPLE';

      const invoiceLines = [];
      let subtotal = 0, totalVat = 0;

      for (const row of lines) {
        const catId = categoryMap[row['Category']];
        if (!catId) { purchaseErrors.push(`Unknown category: ${row['Category']}`); continue; }
        const itemId = await getOrCreateItem(row['Product'], catId, row['Unit'] || 'unit');
        const qty = Number(row['Quantity']) || 0;
        const unitPrice = Number(row['Unit Price (SAR)']) || 0;
        const vatAmount = Number(row['VAT (SAR)']) || 0;
        const vatRate = qty * unitPrice > 0 ? Math.round((vatAmount / (qty * unitPrice)) * 100) : 0;
        subtotal += qty * unitPrice;
        totalVat += vatAmount;
        invoiceLines.push({ itemId, quantity: qty, unitPrice, vatRate, vatAmount, total: qty * unitPrice + vatAmount });
      }

      if (invoiceLines.length === 0) continue;

      await prisma.purchaseInvoice.create({
        data: {
          companyId: COMPANY_ID,
          restaurantId: RESTAURANT_ID,
          supplierId,
          invoiceNumber: invoiceId.substring(0, 20),
          invoiceDate,
          invoiceType,
          paymentMethod,
          subtotal,
          vatAmount: totalVat,
          total: subtotal + totalVat,
          createdBy: 'import-script',
          lines: { create: invoiceLines }
        }
      });
      purchaseCreated++;
    } catch (e) {
      purchaseErrors.push(`Invoice ${invoiceId}: ${e.message}`);
    }
  }

  console.log(`Purchases: created ${purchaseCreated} invoices`);
  if (purchaseErrors.length) console.log('Purchase errors:', purchaseErrors.slice(0, 10));

  // ─── IMPORT SALES ─────────────────────────────────────────────────────
  console.log('\n=== Importing Sales ===');
  const wb2 = XLSX.readFile('/tmp/hamra_sales.xlsx');
  const ws2 = wb2.Sheets[wb2.SheetNames[0]];
  const salesRows = XLSX.utils.sheet_to_json(ws2);

  let salesCreated = 0;
  const salesErrors = [];

  for (const row of salesRows) {
    try {
      const dateVal = row['Date'];
      let date;
      if (typeof dateVal === 'number') {
        date = new Date(Math.round((dateVal - 25569) * 86400 * 1000));
      } else {
        date = new Date(dateVal);
      }

      const dayStart = new Date(date.toISOString().split('T')[0] + 'T00:00:00.000Z');
      const dayEnd = new Date(dayStart.getTime() + 86400000);

      const existing = await prisma.dailySalesRecord.findFirst({
        where: { restaurantId: RESTAURANT_ID, date: { gte: dayStart, lt: dayEnd } }
      });
      if (existing) { salesErrors.push(`Duplicate: ${date.toISOString().split('T')[0]}`); continue; }

      const vatMode = (row['VAT Mode'] || 'inclusive').toLowerCase() === 'exclusive' ? 'EXCLUSIVE' : 'INCLUSIVE';

      await prisma.dailySalesRecord.create({
        data: {
          companyId: COMPANY_ID,
          restaurantId: RESTAURANT_ID,
          date,
          vatMode,
          vatRate: 15,
          cashSales: Number(row['Cash (SAR)']) || 0,
          cardSales: Number(row['Card (SAR)']) || 0,
          hungerStation: Number(row['HungerStation']) || 0,
          jahez: Number(row['Jahez']) || 0,
          noonFood: Number(row['Noon Food']) || 0,
          talabat: Number(row['Talabat']) || 0,
          app5: Number(row['App 5']) || 0,
          app6: Number(row['App 6']) || 0,
          openingBalance: Number(row['Opening Balance (SAR)']) || 0,
          cashExpenses: Number(row['Cash Expenses (SAR)']) || 0,
          closingBalance: Number(row['Closing Balance (SAR)']) || 0,
          notes: row['Notes'] || null,
          createdBy: 'import-script'
        }
      });
      salesCreated++;
    } catch (e) {
      salesErrors.push(`Row ${row['Date']}: ${e.message}`);
    }
  }

  console.log(`Sales: created ${salesCreated} records`);
  if (salesErrors.length) console.log('Sales errors:', salesErrors);

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
