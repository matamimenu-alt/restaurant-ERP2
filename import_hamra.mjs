import * as XLSX from './backend/node_modules/xlsx/xlsx.mjs';
import { PrismaClient } from './backend/node_modules/@prisma/client/index.js';

const prisma = new PrismaClient();

const COMPANY_ID = 'cmqm3x6wl0000u8l2o3p42qph';
const RESTAURANT_ID = 'cmqm4c1l10001rv2wb69dqxth'; // مطعم أسد الحمراء

// ─── Load reference data ───────────────────────────────────────────────────

const suppliers = await prisma.supplier.findMany({ where: { companyId: COMPANY_ID } });
const categories = await prisma.inventoryCategory.findMany({ where: { companyId: COMPANY_ID } });
const items = await prisma.inventoryItem.findMany({ where: { companyId: COMPANY_ID } });

const supplierMap = Object.fromEntries(suppliers.map(s => [s.nameAr, s.id]));
const categoryMap = Object.fromEntries(categories.map(c => [c.nameEn, c.id]));
const itemMap = Object.fromEntries(items.map(i => [i.nameAr, i.id]));

// ─── Helper: get or create inventory item ─────────────────────────────────

async function getOrCreateItem(nameAr, categoryId, unit = 'unit') {
  if (itemMap[nameAr]) return itemMap[nameAr];
  const item = await prisma.inventoryItem.create({
    data: { nameAr, nameEn: nameAr, companyId: COMPANY_ID, categoryId, unit, lastPurchasePrice: 0 }
  });
  itemMap[nameAr] = item.id;
  console.log(`  Created item: ${nameAr}`);
  return item.id;
}

// ─── Helper: get or create supplier ───────────────────────────────────────

async function getOrCreateSupplier(nameAr) {
  if (supplierMap[nameAr]) return supplierMap[nameAr];
  const s = await prisma.supplier.create({
    data: { nameAr, nameEn: nameAr, companyId: COMPANY_ID }
  });
  supplierMap[nameAr] = s.id;
  console.log(`  Created supplier: ${nameAr}`);
  return s.id;
}

// ─── IMPORT PURCHASES ─────────────────────────────────────────────────────

console.log('\n=== Importing Purchases ===');
const wb = XLSX.readFile('/tmp/hamra_purchases.xlsx');
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws);

// Group rows by invoice ID
const invoiceGroups = {};
for (const row of rows) {
  const invoiceId = row['Invoice ID'];
  if (!invoiceGroups[invoiceId]) invoiceGroups[invoiceId] = [];
  invoiceGroups[invoiceId].push(row);
}

let purchaseCreated = 0;
let purchaseErrors = [];

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

    const supplierName = first['Supplier'];
    const supplierId = await getOrCreateSupplier(supplierName);

    const paymentRaw = (first['Payment'] || 'cash').toLowerCase();
    const paymentMethod = paymentRaw === 'credit' ? 'CREDIT' : paymentRaw === 'bank' ? 'BANK' : 'CASH';

    const invoiceTypeRaw = (first['Invoice Type'] || 'Tax Invoice');
    const invoiceType = invoiceTypeRaw.toLowerCase().includes('tax') ? 'TAX' : 'SIMPLE';

    const invoiceLines = [];
    let subtotal = 0, totalVat = 0;

    for (const row of lines) {
      const productName = row['Product'];
      const categoryName = row['Category'];
      const catId = categoryMap[categoryName];
      if (!catId) {
        purchaseErrors.push(`Unknown category: ${categoryName} for item ${productName}`);
        continue;
      }
      const itemId = await getOrCreateItem(productName, catId, row['Unit'] || 'unit');
      const qty = Number(row['Quantity']) || 0;
      const unitPrice = Number(row['Unit Price (SAR)']) || 0;
      const vatAmount = Number(row['VAT (SAR)']) || 0;
      const vatRate = qty * unitPrice > 0 ? (vatAmount / (qty * unitPrice)) * 100 : 0;
      subtotal += qty * unitPrice;
      totalVat += vatAmount;
      invoiceLines.push({ itemId, quantity: qty, unitPrice, vatRate: Math.round(vatRate), vatAmount });
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
        lines: { create: invoiceLines.map(l => ({ ...l, total: l.quantity * l.unitPrice + l.vatAmount })) }
      }
    });
    purchaseCreated++;
  } catch (e) {
    purchaseErrors.push(`Invoice ${invoiceId}: ${e.message}`);
  }
}

console.log(`Purchases: created ${purchaseCreated} invoices`);
if (purchaseErrors.length) console.log('Errors:', purchaseErrors.slice(0, 10));

// ─── IMPORT SALES ─────────────────────────────────────────────────────────

console.log('\n=== Importing Sales ===');
const wb2 = XLSX.readFile('/tmp/hamra_sales.xlsx');
const ws2 = wb2.Sheets[wb2.SheetNames[0]];
const salesRows = XLSX.utils.sheet_to_json(ws2);

let salesCreated = 0;
let salesErrors = [];

for (const row of salesRows) {
  try {
    const dateVal = row['Date'];
    let date;
    if (typeof dateVal === 'number') {
      date = new Date(Math.round((dateVal - 25569) * 86400 * 1000));
    } else {
      date = new Date(dateVal);
    }

    const vatModeRaw = (row['VAT Mode'] || 'inclusive').toLowerCase();
    const vatMode = vatModeRaw === 'exclusive' ? 'EXCLUSIVE' : 'INCLUSIVE';

    const cashSales = Number(row['Cash (SAR)']) || 0;
    const cardSales = Number(row['Card (SAR)']) || 0;
    const hungerStation = Number(row['HungerStation']) || 0;
    const jahez = Number(row['Jahez']) || 0;
    const noonFood = Number(row['Noon Food']) || 0;
    const talabat = Number(row['Talabat']) || 0;
    const app5 = Number(row['App 5']) || 0;
    const app6 = Number(row['App 6']) || 0;
    const openingBalance = Number(row['Opening Balance (SAR)']) || 0;
    const cashExpenses = Number(row['Cash Expenses (SAR)']) || 0;
    const closingBalance = Number(row['Closing Balance (SAR)']) || 0;
    const notes = row['Notes'] || null;

    // Check for duplicate
    const existing = await prisma.dailySalesRecord.findFirst({
      where: { restaurantId: RESTAURANT_ID, date: { gte: new Date(date.toISOString().split('T')[0]), lt: new Date(new Date(date.getTime() + 86400000).toISOString().split('T')[0]) } }
    });
    if (existing) {
      salesErrors.push(`Duplicate date: ${date.toISOString().split('T')[0]}`);
      continue;
    }

    await prisma.dailySalesRecord.create({
      data: {
        companyId: COMPANY_ID,
        restaurantId: RESTAURANT_ID,
        date,
        vatMode,
        vatRate: 15,
        cashSales,
        cardSales,
        hungerStation,
        jahez,
        noonFood,
        talabat,
        app5,
        app6,
        openingBalance,
        cashExpenses,
        closingBalance,
        notes
      }
    });
    salesCreated++;
  } catch (e) {
    salesErrors.push(`Row ${row['Date']}: ${e.message}`);
  }
}

console.log(`Sales: created ${salesCreated} records`);
if (salesErrors.length) console.log('Errors:', salesErrors);

await prisma.$disconnect();
