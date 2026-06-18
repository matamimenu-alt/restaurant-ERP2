import { Response } from 'express';
import * as XLSX from 'xlsx';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/response';

// ── Shared lookup helpers ─────────────────────────────────────────────────────

async function getRestaurantMap(companyId: string) {
  const list = await prisma.restaurant.findMany({ where: { companyId, isActive: true }, select: { id: true, nameAr: true, nameEn: true } });
  return new Map(list.flatMap(r => [[r.nameAr.trim().toLowerCase(), r.id], [r.nameEn.trim().toLowerCase(), r.id]]));
}

async function getSupplierMap(companyId: string) {
  const list = await prisma.supplier.findMany({ where: { companyId }, select: { id: true, nameAr: true, nameEn: true } });
  return new Map(list.flatMap(s => [[s.nameAr.trim().toLowerCase(), s.id], [s.nameEn.trim().toLowerCase(), s.id]]));
}

async function getCategoryMap(companyId: string) {
  const list = await prisma.expenseCategory.findMany({ where: { companyId }, select: { id: true, nameAr: true, nameEn: true } });
  return new Map(list.flatMap(c => [[c.nameAr.trim().toLowerCase(), c.id], [c.nameEn.trim().toLowerCase(), c.id]]));
}

async function getInventoryCategoryMap(companyId: string) {
  const list = await prisma.inventoryCategory.findMany({ where: { companyId }, select: { id: true, nameAr: true, nameEn: true } });
  return new Map(list.flatMap(c => [[c.nameAr.trim().toLowerCase(), c.id], [c.nameEn.trim().toLowerCase(), c.id]]));
}

async function getInventoryItemMap(companyId: string) {
  const list = await prisma.inventoryItem.findMany({ where: { companyId }, select: { id: true, nameAr: true, nameEn: true, averageCost: true, unit: true } });
  return new Map(list.flatMap(i => [[i.nameAr.trim().toLowerCase(), i], [i.nameEn.trim().toLowerCase(), i]]));
}

async function logImport(companyId: string, createdBy: string, importType: string, fileName: string, totalRows: number, successRows: number, failedRows: number, errors: string[]) {
  try {
    await prisma.importHistory.create({
      data: { companyId, importType, fileName: fileName || 'unknown.xlsx', totalRows, successRows, failedRows, status: failedRows === 0 ? 'COMPLETED' : successRows === 0 ? 'FAILED' : 'PARTIAL', errorLog: errors.length > 0 ? errors : undefined, createdBy },
    });
  } catch { /* non-critical */ }
}

const PAYMENT_MAP: Record<string, string> = {
  'نقد': 'CASH', 'cash': 'CASH', 'كاش': 'CASH',
  'بطاقة': 'CARD', 'card': 'CARD', 'كارد': 'CARD',
  'تحويل': 'BANK_TRANSFER', 'bank transfer': 'BANK_TRANSFER', 'bank': 'BANK_TRANSFER',
  'آجل': 'CREDIT', 'ائتمان': 'CREDIT', 'credit': 'CREDIT',
};

// ── Preview Import (validate without saving) ──────────────────────────────────

export const previewImport = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return sendError(res, 'No file uploaded', 400);
    const type = req.params.type;
    const companyId = req.user!.companyId;
    const wb = XLSX.read(req.file.buffer, { type: 'buffer', cellDates: true });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(ws);

    if (rows.length === 0) return sendError(res, 'الملف فارغ', 400);

    const [restMap, suppMap, catMap, invCatMap] = await Promise.all([
      getRestaurantMap(companyId),
      getSupplierMap(companyId),
      getCategoryMap(companyId),
      getInventoryCategoryMap(companyId),
    ]);

    // Get existing invoice numbers for duplicate detection
    const existingInvoices = type === 'purchases'
      ? new Set((await prisma.purchaseInvoice.findMany({ where: { companyId }, select: { invoiceNumber: true } })).map(i => i.invoiceNumber))
      : new Set<string>();

    const result: Array<Record<string, unknown> & { _rowNum: number; _valid: boolean; _errors: string[] }> = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const errors: string[] = [];
      const rowNum = i + 2;

      if (type === 'purchases') {
        const rowType = String(row['نوع السجل'] || row['Type'] || 'فاتورة').trim();
        if (rowType === 'استرداد' || rowType.toLowerCase() === 'return') {
          const refNum = String(row['رقم الفاتورة'] || '').trim();
          if (!refNum) errors.push('رقم الفاتورة المرجعي مطلوب للاسترداد');
          result.push({ ...row, _rowNum: rowNum, _valid: errors.length === 0, _errors: errors, _type: 'return' });
          continue;
        }
        const invNum = String(row['رقم الفاتورة'] || row['Invoice Number'] || '').trim();
        if (!invNum) errors.push('رقم الفاتورة مطلوب');
        else if (existingInvoices.has(invNum)) errors.push(`رقم الفاتورة "${invNum}" موجود مسبقاً`);
        const rawDate = row['تاريخ الفاتورة'] || row['Invoice Date'];
        const d = rawDate instanceof Date ? rawDate : new Date(String(rawDate || ''));
        if (isNaN(d.getTime())) errors.push('تاريخ غير صحيح');
        const suppName = String(row['المورد'] || row['Supplier'] || '').trim().toLowerCase();
        if (suppName && !suppMap.has(suppName)) errors.push(`المورد "${suppName}" غير موجود`);
        const restName = String(row['المطعم'] || row['Restaurant'] || '').trim().toLowerCase();
        if (restName && !restMap.has(restName)) errors.push(`المطعم "${restName}" غير موجود`);
        const subtotal = parseFloat(String(row['المبلغ قبل الضريبة'] || row['Subtotal'] || 0));
        const vatAmount = parseFloat(String(row['مبلغ الضريبة'] || row['VAT Amount'] || 0));
        const total = parseFloat(String(row['الإجمالي'] || row['Total'] || 0));
        if (isNaN(subtotal) || subtotal < 0) errors.push('المبلغ قبل الضريبة غير صحيح');
        if (total > 0 && subtotal > 0 && vatAmount > 0) {
          const expectedTotal = Math.round((subtotal + vatAmount) * 100) / 100;
          if (Math.abs(expectedTotal - total) > 0.1) errors.push(`الإجمالي لا يتطابق: ${expectedTotal} ≠ ${total}`);
        }
        result.push({ ...row, _rowNum: rowNum, _valid: errors.length === 0, _errors: errors, _type: 'invoice' });

      } else if (type === 'expenses') {
        const rawDate = row['التاريخ'] || row['Date'];
        const d = rawDate instanceof Date ? rawDate : new Date(String(rawDate || ''));
        if (isNaN(d.getTime())) errors.push('تاريخ غير صحيح');
        const restName = String(row['المطعم'] || row['Restaurant'] || '').trim().toLowerCase();
        if (!restName) errors.push('المطعم مطلوب');
        else if (!restMap.has(restName)) errors.push(`المطعم "${restName}" غير موجود`);
        const catName = String(row['التصنيف'] || row['Category'] || '').trim().toLowerCase();
        if (!catName) errors.push('التصنيف مطلوب');
        else if (!catMap.has(catName)) errors.push(`التصنيف "${catName}" غير موجود`);
        const amount = parseFloat(String(row['المبلغ'] || row['Amount'] || 0));
        if (isNaN(amount) || amount <= 0) errors.push('المبلغ غير صحيح');
        result.push({ ...row, _rowNum: rowNum, _valid: errors.length === 0, _errors: errors });

      } else if (type === 'recipes') {
        const nameAr = String(row['اسم الوصفة (عربي)'] || row['Recipe Name Arabic'] || row['اسم الوصفة'] || '').trim();
        const nameEn = String(row['اسم الوصفة'] || row['Recipe Name'] || nameAr).trim();
        if (!nameAr && !nameEn) errors.push('اسم الوصفة مطلوب');
        const restName = String(row['المطعم'] || row['Restaurant'] || '').trim().toLowerCase();
        if (!restName) errors.push('المطعم مطلوب');
        else if (!restMap.has(restName)) errors.push(`المطعم "${restName}" غير موجود`);
        const ingredient = String(row['المكون'] || row['Ingredient'] || '').trim();
        if (!ingredient) errors.push('اسم المكون مطلوب');
        const qty = parseFloat(String(row['الكمية'] || row['Quantity'] || 0));
        if (isNaN(qty) || qty <= 0) errors.push('الكمية غير صحيحة');
        result.push({ ...row, _rowNum: rowNum, _valid: errors.length === 0, _errors: errors });

      } else if (type === 'inventory') {
        const nameAr = String(row['الاسم بالعربي'] || row['Name Arabic'] || '').trim();
        if (!nameAr) errors.push('الاسم بالعربي مطلوب');
        const catName = String(row['الفئة'] || row['Category'] || '').trim().toLowerCase();
        if (catName && !invCatMap.has(catName)) errors.push(`الفئة "${catName}" غير موجودة`);
        result.push({ ...row, _rowNum: rowNum, _valid: errors.length === 0, _errors: errors });
      } else {
        result.push({ ...row, _rowNum: rowNum, _valid: true, _errors: [] });
      }
    }

    const valid = result.filter(r => r._valid).length;
    const invalid = result.filter(r => !r._valid).length;
    sendSuccess(res, { rows: result, summary: { total: rows.length, valid, invalid } }, 'Preview ready');
  } catch (e) {
    sendError(res, `Preview failed: ${(e as Error).message}`, 500);
  }
};

// ── Revenue Excel Import ──────────────────────────────────────────────────────

const SOURCE_MAP: Record<string, string> = {
  'نقد': 'CASH', 'cash': 'CASH', 'كارد': 'CARD', 'card': 'CARD', 'بطاقة': 'CARD',
  'تحويل': 'BANK_TRANSFER', 'bank': 'BANK_TRANSFER', 'bank transfer': 'BANK_TRANSFER',
  'هنقرستيشن': 'HUNGER_STATION', 'hunger station': 'HUNGER_STATION', 'hungerstation': 'HUNGER_STATION',
  'جاهز': 'JAHEZ', 'jahez': 'JAHEZ',
  'طلبات': 'TOYOU', 'toyou': 'TOYOU',
  'نون': 'NOON', 'noon': 'NOON',
  'كريم': 'CAREEM', 'careem': 'CAREEM',
  'أخرى': 'OTHER', 'other': 'OTHER',
};

export const importRevenue = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return sendError(res, 'No file uploaded', 400);
    const wb = XLSX.read(req.file.buffer, { type: 'buffer', cellDates: true });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(ws);
    const companyId = req.user!.companyId;
    const restMap = await getRestaurantMap(companyId);
    let created = 0; const errors: string[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      try {
        const restaurantName = String(row['المطعم'] || row['Restaurant'] || '').trim().toLowerCase();
        const restaurantId = restMap.get(restaurantName);
        if (!restaurantId) { errors.push(`صف ${i + 2}: المطعم "${restaurantName}" غير موجود`); continue; }
        const rawDate = row['التاريخ'] || row['Date'];
        const date = rawDate instanceof Date ? rawDate : new Date(String(rawDate));
        if (isNaN(date.getTime())) { errors.push(`صف ${i + 2}: تاريخ غير صحيح`); continue; }
        const rawSource = String(row['المصدر'] || row['Source'] || '').trim().toLowerCase();
        const source = SOURCE_MAP[rawSource] || 'OTHER';
        const amount = parseFloat(String(row['المبلغ'] || row['Amount'] || 0));
        if (isNaN(amount) || amount <= 0) { errors.push(`صف ${i + 2}: مبلغ غير صحيح`); continue; }
        const isVatInclusive = String(row['شامل ضريبة'] || row['VAT Inclusive'] || 'نعم').trim().toLowerCase() !== 'لا';
        const vatRate = parseFloat(String(row['نسبة الضريبة'] || row['VAT Rate'] || 15));
        const vatAmount = isVatInclusive ? (amount * vatRate) / (100 + vatRate) : (amount * vatRate) / 100;
        const amountExVat = isVatInclusive ? amount - vatAmount : amount;
        await prisma.revenueEntry.create({
          data: { companyId, restaurantId, date, source: source as never, amount, isVatInclusive, vatRate, vatAmount, amountExVat, notes: String(row['ملاحظات'] || row['Notes'] || '') || undefined, createdBy: req.user!.userId },
        });
        created++;
      } catch (e) { errors.push(`صف ${i + 2}: ${(e as Error).message}`); }
    }
    await logImport(companyId, req.user!.userId, 'REVENUE', req.file.originalname, rows.length, created, rows.length - created, errors);
    sendSuccess(res, { created, errors, total: rows.length }, `تم استيراد ${created} إيراد`);
  } catch (e) { sendError(res, `Import failed: ${(e as Error).message}`, 500); }
};

// ── Expense Excel Import ──────────────────────────────────────────────────────

export const importExpenses = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return sendError(res, 'No file uploaded', 400);
    const wb = XLSX.read(req.file.buffer, { type: 'buffer', cellDates: true });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(ws);
    const companyId = req.user!.companyId;
    const [restMap, catMap] = await Promise.all([getRestaurantMap(companyId), getCategoryMap(companyId)]);
    let created = 0; const errors: string[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      try {
        const restaurantName = String(row['المطعم'] || row['Restaurant'] || '').trim().toLowerCase();
        const restaurantId = restMap.get(restaurantName);
        if (!restaurantId) { errors.push(`صف ${i + 2}: المطعم "${restaurantName}" غير موجود`); continue; }
        const catName = String(row['التصنيف'] || row['Category'] || '').trim().toLowerCase();
        const categoryId = catMap.get(catName);
        if (!categoryId) { errors.push(`صف ${i + 2}: التصنيف "${catName}" غير موجود`); continue; }
        const rawDate = row['التاريخ'] || row['Date'];
        const date = rawDate instanceof Date ? rawDate : new Date(String(rawDate));
        if (isNaN(date.getTime())) { errors.push(`صف ${i + 2}: تاريخ غير صحيح`); continue; }
        const amount = parseFloat(String(row['المبلغ'] || row['Amount'] || 0));
        if (isNaN(amount) || amount <= 0) { errors.push(`صف ${i + 2}: مبلغ غير صحيح`); continue; }
        const isVatable = String(row['خاضع للضريبة'] || row['Vatable'] || 'لا').trim().toLowerCase() === 'نعم';
        const vatRate = parseFloat(String(row['نسبة الضريبة'] || row['VAT Rate'] || 15));
        const vatAmount = isVatable ? (amount * vatRate) / 100 : 0;
        const rawPayment = String(row['طريقة الدفع'] || row['Payment Method'] || 'نقد').trim().toLowerCase();
        const paymentMethod = (PAYMENT_MAP[rawPayment] || 'CASH') as never;
        // Duplicate detection: same date + restaurant + category + amount
        const existing = await prisma.expense.findFirst({ where: { companyId, restaurantId, categoryId, date, amount } });
        if (existing) { errors.push(`صف ${i + 2}: سجل مكرر (${date.toLocaleDateString('ar')} - ${amount})`); continue; }
        await prisma.expense.create({
          data: { companyId, restaurantId, categoryId, date, amount, isVatable, vatRate, vatAmount, paymentMethod, description: String(row['الوصف'] || row['Description'] || '') || undefined, createdBy: req.user!.userId },
        });
        created++;
      } catch (e) { errors.push(`صف ${i + 2}: ${(e as Error).message}`); }
    }
    await logImport(companyId, req.user!.userId, 'EXPENSE', req.file.originalname, rows.length, created, rows.length - created, errors);
    sendSuccess(res, { created, errors, total: rows.length }, `تم استيراد ${created} مصروف`);
  } catch (e) { sendError(res, `Import failed: ${(e as Error).message}`, 500); }
};

// ── Employee Excel Import ─────────────────────────────────────────────────────

export const importEmployees = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return sendError(res, 'No file uploaded', 400);
    const wb = XLSX.read(req.file.buffer, { type: 'buffer', cellDates: true });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(ws);
    const companyId = req.user!.companyId;
    const restMap = await getRestaurantMap(companyId);
    let created = 0; let updated = 0; const errors: string[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      try {
        const restaurantName = String(row['المطعم'] || row['Restaurant'] || '').trim().toLowerCase();
        const restaurantId = restMap.get(restaurantName);
        if (!restaurantId) { errors.push(`صف ${i + 2}: المطعم غير موجود`); continue; }
        const rawJoin = row['تاريخ الالتحاق'] || row['Joining Date'];
        const joiningDate = rawJoin instanceof Date ? rawJoin : new Date(String(rawJoin));
        if (isNaN(joiningDate.getTime())) { errors.push(`صف ${i + 2}: تاريخ التحاق غير صحيح`); continue; }
        const rawIqamaExpiry = row['انتهاء الإقامة'] || row['Iqama Expiry'];
        const iqamaExpiryDate = rawIqamaExpiry ? (rawIqamaExpiry instanceof Date ? rawIqamaExpiry : new Date(String(rawIqamaExpiry))) : undefined;
        const employeeData = {
          companyId, restaurantId,
          employeeId: String(row['رقم الموظف'] || row['Employee ID'] || '').trim() || undefined,
          nameAr: String(row['الاسم بالعربي'] || row['Name Arabic'] || '').trim(),
          nameEn: String(row['الاسم بالإنجليزي'] || row['Name English'] || '').trim(),
          position: String(row['المسمى الوظيفي'] || row['Position'] || '').trim(),
          department: String(row['القسم'] || row['Department'] || '').trim() || undefined,
          nationality: String(row['الجنسية'] || row['Nationality'] || '').trim() || undefined,
          basicSalary: parseFloat(String(row['الراتب الأساسي'] || row['Basic Salary'] || 0)),
          housingAllowance: parseFloat(String(row['بدل سكن'] || row['Housing Allowance'] || 0)),
          transportAllowance: parseFloat(String(row['بدل مواصلات'] || row['Transport Allowance'] || 0)),
          otherAllowances: parseFloat(String(row['بدلات أخرى'] || row['Other Allowances'] || 0)),
          joiningDate,
          iqamaExpiryDate: iqamaExpiryDate && !isNaN(iqamaExpiryDate.getTime()) ? iqamaExpiryDate : undefined,
          iqamaNumber: String(row['رقم الإقامة'] || row['Iqama Number'] || '').trim() || undefined,
          status: String(row['الحالة'] || row['Status'] || 'ACTIVE').trim().toUpperCase(),
        };
        if (!employeeData.nameAr && !employeeData.nameEn) { errors.push(`صف ${i + 2}: الاسم مطلوب`); continue; }
        if (!employeeData.nameAr) employeeData.nameAr = employeeData.nameEn;
        if (!employeeData.nameEn) employeeData.nameEn = employeeData.nameAr;
        if (employeeData.employeeId) {
          const existing = await prisma.employee.findFirst({ where: { companyId, employeeId: employeeData.employeeId } });
          if (existing) { await prisma.employee.update({ where: { id: existing.id }, data: employeeData }); updated++; continue; }
        }
        await prisma.employee.create({ data: employeeData });
        created++;
      } catch (e) { errors.push(`صف ${i + 2}: ${(e as Error).message}`); }
    }
    await logImport(companyId, req.user!.userId, 'EMPLOYEE', req.file.originalname, rows.length, created + updated, rows.length - created - updated, errors);
    sendSuccess(res, { created, updated, errors, total: rows.length }, `تم استيراد ${created} موظف، تحديث ${updated}`);
  } catch (e) { sendError(res, `Import failed: ${(e as Error).message}`, 500); }
};

// ── Purchase Invoices & Returns Excel Import ──────────────────────────────────

export const importPurchases = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return sendError(res, 'No file uploaded', 400);
    const wb = XLSX.read(req.file.buffer, { type: 'buffer', cellDates: true });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(ws);
    const companyId = req.user!.companyId;
    const [restMap, suppMap] = await Promise.all([getRestaurantMap(companyId), getSupplierMap(companyId)]);
    let createdInvoices = 0; let createdReturns = 0; const errors: string[] = [];
    const invoiceNumberMap = new Map<string, string>();

    // Pass 1: invoices
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowType = String(row['نوع السجل'] || row['Type'] || 'فاتورة').trim();
      if (rowType === 'استرداد' || rowType.toLowerCase() === 'return') continue;
      try {
        const invoiceNumber = String(row['رقم الفاتورة'] || row['Invoice Number'] || '').trim();
        if (!invoiceNumber) { errors.push(`صف ${i + 2}: رقم الفاتورة مطلوب`); continue; }
        const existing = await prisma.purchaseInvoice.findFirst({ where: { companyId, invoiceNumber } });
        if (existing) { invoiceNumberMap.set(invoiceNumber, existing.id); errors.push(`صف ${i + 2}: فاتورة "${invoiceNumber}" موجودة مسبقاً`); continue; }
        const rawDate = row['تاريخ الفاتورة'] || row['Invoice Date'];
        const invoiceDate = rawDate instanceof Date ? rawDate : new Date(String(rawDate));
        if (isNaN(invoiceDate.getTime())) { errors.push(`صف ${i + 2}: تاريخ غير صحيح`); continue; }
        const supplierName = String(row['المورد'] || row['Supplier'] || '').trim().toLowerCase();
        const supplierId = suppMap.get(supplierName);
        if (!supplierId) { errors.push(`صف ${i + 2}: المورد غير موجود`); continue; }
        const restaurantName = String(row['المطعم'] || row['Restaurant'] || '').trim().toLowerCase();
        const restaurantId = restMap.get(restaurantName);
        if (!restaurantId) { errors.push(`صف ${i + 2}: المطعم غير موجود`); continue; }
        const invoiceType = String(row['نوع الفاتورة'] || row['Invoice Type'] || 'TAX').trim().toUpperCase();
        let subtotal = parseFloat(String(row['المبلغ قبل الضريبة'] || row['Subtotal'] || 0));
        let vatAmount = parseFloat(String(row['مبلغ الضريبة'] || row['VAT Amount'] || 0));
        const total = parseFloat(String(row['الإجمالي'] || row['Total'] || 0));
        const vatInclusive = String(row['شامل ضريبة'] || row['VAT Inclusive'] || 'لا').trim().toLowerCase() === 'نعم';
        // Auto-calculate VAT if inclusive
        if (vatInclusive && total > 0 && !vatAmount) {
          vatAmount = Math.round((total * 15 / 115) * 100) / 100;
          subtotal = total - vatAmount;
        }
        const rawPayment = String(row['طريقة الدفع'] || row['Payment Method'] || 'نقد').trim().toLowerCase();
        const paymentMethod = (PAYMENT_MAP[rawPayment] || 'CASH') as never;
        const inv = await prisma.purchaseInvoice.create({
          data: { companyId, supplierId, restaurantId, invoiceNumber, invoiceDate, subtotal: isNaN(subtotal) ? 0 : subtotal, vatAmount: isNaN(vatAmount) ? 0 : vatAmount, total: isNaN(total) ? (subtotal + vatAmount) : total, invoiceType, paymentMethod, notes: String(row['ملاحظات'] || row['Notes'] || '') || undefined, status: 'POSTED', createdBy: req.user!.userId },
        });
        invoiceNumberMap.set(invoiceNumber, inv.id);
        createdInvoices++;
      } catch (e) { errors.push(`صف ${i + 2}: ${(e as Error).message}`); }
    }

    // Pass 2: returns
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowType = String(row['نوع السجل'] || row['Type'] || 'فاتورة').trim();
      if (rowType !== 'استرداد' && rowType.toLowerCase() !== 'return') continue;
      try {
        const refNum = String(row['رقم الفاتورة'] || '').trim();
        if (!refNum) { errors.push(`صف ${i + 2}: رقم الفاتورة مطلوب للاسترداد`); continue; }
        let invoiceId = invoiceNumberMap.get(refNum);
        if (!invoiceId) {
          const inv = await prisma.purchaseInvoice.findFirst({ where: { companyId, invoiceNumber: refNum } });
          if (!inv) { errors.push(`صف ${i + 2}: فاتورة "${refNum}" غير موجودة`); continue; }
          invoiceId = inv.id;
        }
        const rawDate = row['تاريخ الاسترداد'] || row['تاريخ الفاتورة'] || row['Return Date'] || row['Invoice Date'];
        const returnDate = rawDate instanceof Date ? rawDate : new Date(String(rawDate));
        if (isNaN(returnDate.getTime())) { errors.push(`صف ${i + 2}: تاريخ غير صحيح`); continue; }
        const subtotal = parseFloat(String(row['المبلغ قبل الضريبة'] || row['Subtotal'] || 0));
        const vatAmount = parseFloat(String(row['مبلغ الضريبة'] || row['VAT Amount'] || 0));
        const total = parseFloat(String(row['الإجمالي'] || row['Total'] || subtotal + vatAmount));
        await prisma.purchaseReturn.create({
          data: { companyId, invoiceId, returnDate, returnType: 'PARTIAL', subtotal: isNaN(subtotal) ? 0 : subtotal, vatAmount: isNaN(vatAmount) ? 0 : vatAmount, total: isNaN(total) ? 0 : total, reason: String(row['سبب الاسترداد'] || row['Return Reason'] || '') || undefined, status: 'POSTED', createdBy: req.user!.userId },
        });
        createdReturns++;
      } catch (e) { errors.push(`صف ${i + 2}: ${(e as Error).message}`); }
    }
    await logImport(companyId, req.user!.userId, 'PURCHASE', req.file.originalname, rows.length, createdInvoices + createdReturns, rows.length - createdInvoices - createdReturns, errors);
    sendSuccess(res, { createdInvoices, createdReturns, errors, total: rows.length }, `تم استيراد ${createdInvoices} فاتورة و ${createdReturns} استرداد`);
  } catch (e) { sendError(res, `Import failed: ${(e as Error).message}`, 500); }
};

// ── Recipe Excel Import ───────────────────────────────────────────────────────

export const importRecipes = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return sendError(res, 'No file uploaded', 400);
    const wb = XLSX.read(req.file.buffer, { type: 'buffer', cellDates: true });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(ws);
    const companyId = req.user!.companyId;
    const restMap = await getRestaurantMap(companyId);
    let itemMap = await getInventoryItemMap(companyId);
    let createdRecipes = 0; let updatedRecipes = 0; const errors: string[] = [];

    // Group rows by (restaurantId + recipe name)
    type RecipeGroup = { nameAr: string; nameEn: string; restaurantId: string; category: string; servings: number; localPrice: number; deliveryPrice: number; targetMargin: number; ingredients: { name: string; qty: number; unit: string; unitCost: number }[] };
    const recipeMap = new Map<string, RecipeGroup>();

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const nameAr = String(row['اسم الوصفة (عربي)'] || row['Recipe Name Arabic'] || row['اسم الوصفة'] || '').trim();
      const nameEn = String(row['اسم الوصفة'] || row['Recipe Name'] || nameAr).trim();
      if (!nameAr && !nameEn) { errors.push(`صف ${i + 2}: اسم الوصفة مطلوب`); continue; }
      const restName = String(row['المطعم'] || row['Restaurant'] || '').trim().toLowerCase();
      const restaurantId = restMap.get(restName);
      if (!restaurantId) { errors.push(`صف ${i + 2}: المطعم "${restName}" غير موجود`); continue; }
      const key = `${restaurantId}::${nameAr || nameEn}`;
      if (!recipeMap.has(key)) {
        recipeMap.set(key, {
          nameAr: nameAr || nameEn, nameEn: nameEn || nameAr, restaurantId,
          category: String(row['الفئة'] || row['Category'] || '').trim(),
          servings: parseFloat(String(row['عدد الأجزاء'] || row['Servings'] || 1)) || 1,
          localPrice: parseFloat(String(row['سعر البيع'] || row['Selling Price'] || 0)) || 0,
          deliveryPrice: parseFloat(String(row['سعر التوصيل'] || row['Delivery Price'] || 0)) || 0,
          targetMargin: parseFloat(String(row['هامش الربح المستهدف %'] || row['Target Margin %'] || 70)) || 70,
          ingredients: [],
        });
      }
      const ingredientName = String(row['المكون'] || row['Ingredient'] || '').trim();
      const qty = parseFloat(String(row['الكمية'] || row['Quantity'] || 0));
      const unit = String(row['الوحدة'] || row['Unit'] || 'كجم').trim();
      const unitCost = parseFloat(String(row['تكلفة الوحدة'] || row['Cost Per Unit'] || 0)) || 0;
      if (ingredientName && qty > 0) {
        recipeMap.get(key)!.ingredients.push({ name: ingredientName, qty, unit, unitCost });
      }
    }

    // Process each recipe group
    for (const [, group] of recipeMap) {
      try {
        const lineItems: { itemId: string; quantity: number; unit: string; lineCost: number }[] = [];
        for (const ing of group.ingredients) {
          const nameKey = ing.name.trim().toLowerCase();
          let itemData = itemMap.get(nameKey);
          if (!itemData) {
            const newItem = await prisma.inventoryItem.create({
              data: { companyId, nameAr: ing.name, nameEn: ing.name, unit: ing.unit, averageCost: ing.unitCost, lastPurchasePrice: ing.unitCost, isActive: true },
            });
            itemData = { id: newItem.id, nameAr: newItem.nameAr, nameEn: newItem.nameEn, averageCost: newItem.averageCost, unit: newItem.unit };
            itemMap.set(nameKey, itemData);
          }
          const cost = ing.unitCost > 0 ? ing.unitCost : Number(itemData.averageCost);
          lineItems.push({ itemId: itemData.id, quantity: ing.qty, unit: ing.unit, lineCost: cost * ing.qty });
        }

        const foodCost = lineItems.reduce((s, l) => s + l.lineCost, 0);
        const costPerPortion = group.servings > 0 ? foodCost / group.servings : foodCost;
        const grossMargin = group.localPrice > 0 ? Math.round(((group.localPrice - costPerPortion) / group.localPrice) * 100 * 100) / 100 : 0;

        const existing = await prisma.recipe.findFirst({ where: { companyId, restaurantId: group.restaurantId, nameAr: group.nameAr } });
        if (existing) {
          await prisma.recipeLine.deleteMany({ where: { recipeId: existing.id } });
          await prisma.recipe.update({
            where: { id: existing.id },
            data: { nameEn: group.nameEn, category: group.category || null, servings: group.servings, localPrice: group.localPrice, deliveryPrice: group.deliveryPrice, targetMargin: group.targetMargin, foodCost, costPerPortion, grossMargin, lines: { create: lineItems.map(l => ({ itemId: l.itemId, quantity: l.quantity, unit: l.unit })) } },
          });
          updatedRecipes++;
        } else {
          await prisma.recipe.create({
            data: { companyId, restaurantId: group.restaurantId, nameAr: group.nameAr, nameEn: group.nameEn, category: group.category || null, servings: group.servings, localPrice: group.localPrice, deliveryPrice: group.deliveryPrice, targetMargin: group.targetMargin, foodCost, costPerPortion, grossMargin, lines: { create: lineItems.map(l => ({ itemId: l.itemId, quantity: l.quantity, unit: l.unit })) } },
          });
          createdRecipes++;
        }
      } catch (e) { errors.push(`وصفة "${group.nameAr}": ${(e as Error).message}`); }
    }

    await logImport(companyId, req.user!.userId, 'RECIPE', req.file.originalname, rows.length, createdRecipes + updatedRecipes, errors.length, errors);
    sendSuccess(res, { createdRecipes, updatedRecipes, errors, total: recipeMap.size }, `تم استيراد ${createdRecipes} وصفة جديدة، تحديث ${updatedRecipes}`);
  } catch (e) { sendError(res, `Import failed: ${(e as Error).message}`, 500); }
};

// ── Inventory Items Excel Import ──────────────────────────────────────────────

export const importInventoryItems = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return sendError(res, 'No file uploaded', 400);
    const wb = XLSX.read(req.file.buffer, { type: 'buffer', cellDates: true });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(ws);
    const companyId = req.user!.companyId;
    const invCatMap = await getInventoryCategoryMap(companyId);
    let created = 0; let updated = 0; const errors: string[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      try {
        const nameAr = String(row['الاسم بالعربي'] || row['Name Arabic'] || '').trim();
        const nameEn = String(row['الاسم بالإنجليزي'] || row['Name English'] || nameAr).trim();
        if (!nameAr) { errors.push(`صف ${i + 2}: الاسم بالعربي مطلوب`); continue; }
        const catName = String(row['الفئة'] || row['Category'] || '').trim().toLowerCase();
        const categoryId = catName ? invCatMap.get(catName) : undefined;
        const code = String(row['كود الصنف'] || row['Item Code'] || '').trim() || undefined;
        const itemData = {
          companyId, nameAr, nameEn: nameEn || nameAr,
          code: code || undefined,
          categoryId: categoryId || undefined,
          unit: String(row['الوحدة'] || row['Unit'] || 'كجم').trim(),
          lastPurchasePrice: parseFloat(String(row['آخر سعر شراء'] || row['Last Cost'] || 0)) || 0,
          averageCost: parseFloat(String(row['متوسط التكلفة'] || row['Average Cost'] || 0)) || 0,
          minStock: parseFloat(String(row['الحد الأدنى'] || row['Min Stock'] || 0)) || 0,
          maxStock: parseFloat(String(row['الحد الأقصى'] || row['Max Stock'] || 0)) || 0,
          isActive: true,
        };
        if (code) {
          const existing = await prisma.inventoryItem.findFirst({ where: { companyId, code } });
          if (existing) { await prisma.inventoryItem.update({ where: { id: existing.id }, data: itemData }); updated++; continue; }
        } else {
          const existing = await prisma.inventoryItem.findFirst({ where: { companyId, nameAr } });
          if (existing) { await prisma.inventoryItem.update({ where: { id: existing.id }, data: itemData }); updated++; continue; }
        }
        await prisma.inventoryItem.create({ data: itemData });
        created++;
      } catch (e) { errors.push(`صف ${i + 2}: ${(e as Error).message}`); }
    }
    await logImport(companyId, req.user!.userId, 'INVENTORY', req.file.originalname, rows.length, created + updated, rows.length - created - updated, errors);
    sendSuccess(res, { created, updated, errors, total: rows.length }, `تم استيراد ${created} صنف، تحديث ${updated}`);
  } catch (e) { sendError(res, `Import failed: ${(e as Error).message}`, 500); }
};

// ── Import History ────────────────────────────────────────────────────────────

export const getImportHistory = async (req: AuthRequest, res: Response) => {
  try {
    const limit = parseInt(String(req.query.limit || 50));
    const history = await prisma.importHistory.findMany({
      where: { companyId: req.user!.companyId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    sendSuccess(res, history);
  } catch (e) { sendError(res, 'Failed to fetch history', 500); }
};

// ── Excel Templates ───────────────────────────────────────────────────────────

export const downloadTemplate = async (req: AuthRequest, res: Response) => {
  const type = req.params.type;

  const templates: Record<string, { headers: string[]; rows: Record<string, unknown>[]; filename: string }> = {
    revenue: {
      filename: 'revenue_import_template.xlsx',
      headers: ['التاريخ', 'المطعم', 'المصدر', 'المبلغ', 'شامل ضريبة', 'نسبة الضريبة', 'ملاحظات'],
      rows: [
        { 'التاريخ': '2024-01-01', 'المطعم': 'اسم المطعم', 'المصدر': 'نقد', 'المبلغ': 1150, 'شامل ضريبة': 'نعم', 'نسبة الضريبة': 15, 'ملاحظات': 'إيرادات الغداء' },
        { 'التاريخ': '2024-01-01', 'المطعم': 'اسم المطعم', 'المصدر': 'هنقرستيشن', 'المبلغ': 575, 'شامل ضريبة': 'نعم', 'نسبة الضريبة': 15, 'ملاحظات': '' },
      ],
    },
    expense: {
      filename: 'expense_import_template.xlsx',
      headers: ['التاريخ', 'المطعم', 'الفرع', 'التصنيف', 'الوصف', 'المبلغ', 'مبلغ الضريبة', 'خاضع للضريبة', 'نسبة الضريبة', 'المورد', 'رقم الفاتورة', 'طريقة الدفع'],
      rows: [
        { 'التاريخ': '2024-01-01', 'المطعم': 'اسم المطعم', 'الفرع': '', 'التصنيف': 'اسم التصنيف', 'الوصف': 'وصف المصروف', 'المبلغ': 500, 'مبلغ الضريبة': 75, 'خاضع للضريبة': 'نعم', 'نسبة الضريبة': 15, 'المورد': '', 'رقم الفاتورة': '', 'طريقة الدفع': 'نقد' },
        { 'التاريخ': '2024-01-02', 'المطعم': 'اسم المطعم', 'الفرع': '', 'التصنيف': 'اسم التصنيف', 'الوصف': 'وصف آخر', 'المبلغ': 200, 'مبلغ الضريبة': 0, 'خاضع للضريبة': 'لا', 'نسبة الضريبة': 0, 'المورد': '', 'رقم الفاتورة': '', 'طريقة الدفع': 'بطاقة' },
      ],
    },
    employee: {
      filename: 'employee_import_template.xlsx',
      headers: ['رقم الموظف', 'الاسم بالعربي', 'الاسم بالإنجليزي', 'المطعم', 'المسمى الوظيفي', 'القسم', 'الجنسية', 'الراتب الأساسي', 'بدل سكن', 'بدل مواصلات', 'بدلات أخرى', 'تاريخ الالتحاق', 'رقم الإقامة', 'انتهاء الإقامة', 'الحالة'],
      rows: [
        { 'رقم الموظف': 'EMP001', 'الاسم بالعربي': 'محمد أحمد', 'الاسم بالإنجليزي': 'Mohammed Ahmed', 'المطعم': 'اسم المطعم', 'المسمى الوظيفي': 'طاهٍ', 'القسم': 'المطبخ', 'الجنسية': 'سعودي', 'الراتب الأساسي': 3000, 'بدل سكن': 500, 'بدل مواصلات': 300, 'بدلات أخرى': 0, 'تاريخ الالتحاق': '2024-01-01', 'رقم الإقامة': '', 'انتهاء الإقامة': '', 'الحالة': 'ACTIVE' },
      ],
    },
    purchase: {
      filename: 'purchase_import_template.xlsx',
      headers: ['نوع السجل', 'رقم الفاتورة', 'تاريخ الفاتورة', 'المورد', 'المطعم', 'نوع الفاتورة', 'المبلغ قبل الضريبة', 'مبلغ الضريبة', 'الإجمالي', 'شامل ضريبة', 'طريقة الدفع', 'ملاحظات', 'سبب الاسترداد'],
      rows: [
        { 'نوع السجل': 'فاتورة', 'رقم الفاتورة': 'INV-001', 'تاريخ الفاتورة': '2024-01-01', 'المورد': 'اسم المورد', 'المطعم': 'اسم المطعم', 'نوع الفاتورة': 'TAX', 'المبلغ قبل الضريبة': 1000, 'مبلغ الضريبة': 150, 'الإجمالي': 1150, 'شامل ضريبة': 'لا', 'طريقة الدفع': 'نقد', 'ملاحظات': '', 'سبب الاسترداد': '' },
        { 'نوع السجل': 'فاتورة', 'رقم الفاتورة': 'INV-002', 'تاريخ الفاتورة': '2024-01-05', 'المورد': 'اسم المورد', 'المطعم': 'اسم المطعم', 'نوع الفاتورة': 'NON_TAX', 'المبلغ قبل الضريبة': 500, 'مبلغ الضريبة': 0, 'الإجمالي': 500, 'شامل ضريبة': 'لا', 'طريقة الدفع': 'بطاقة', 'ملاحظات': '', 'سبب الاسترداد': '' },
        { 'نوع السجل': 'استرداد', 'رقم الفاتورة': 'INV-001', 'تاريخ الفاتورة': '2024-01-15', 'المورد': '', 'المطعم': '', 'نوع الفاتورة': '', 'المبلغ قبل الضريبة': 200, 'مبلغ الضريبة': 30, 'الإجمالي': 230, 'شامل ضريبة': '', 'طريقة الدفع': '', 'ملاحظات': '', 'سبب الاسترداد': 'بضاعة تالفة' },
      ],
    },
    recipes: {
      filename: 'recipes_import_template.xlsx',
      headers: ['اسم الوصفة', 'اسم الوصفة (عربي)', 'المطعم', 'الفئة', 'عدد الأجزاء', 'سعر البيع', 'سعر التوصيل', 'هامش الربح المستهدف %', 'المكون', 'الكمية', 'الوحدة', 'تكلفة الوحدة'],
      rows: [
        { 'اسم الوصفة': 'Crispy Burger', 'اسم الوصفة (عربي)': 'كرسبي برجر', 'المطعم': 'اسم المطعم', 'الفئة': 'ساندويتشات', 'عدد الأجزاء': 1, 'سعر البيع': 25, 'سعر التوصيل': 28, 'هامش الربح المستهدف %': 70, 'المكون': 'خبز برجر', 'الكمية': 1, 'الوحدة': 'قطعة', 'تكلفة الوحدة': 0.5 },
        { 'اسم الوصفة': 'Crispy Burger', 'اسم الوصفة (عربي)': 'كرسبي برجر', 'المطعم': 'اسم المطعم', 'الفئة': 'ساندويتشات', 'عدد الأجزاء': 1, 'سعر البيع': 25, 'سعر التوصيل': 28, 'هامش الربح المستهدف %': 70, 'المكون': 'دجاج مقلي', 'الكمية': 0.15, 'الوحدة': 'كجم', 'تكلفة الوحدة': 25 },
        { 'اسم الوصفة': 'Crispy Burger', 'اسم الوصفة (عربي)': 'كرسبي برجر', 'المطعم': 'اسم المطعم', 'الفئة': 'ساندويتشات', 'عدد الأجزاء': 1, 'سعر البيع': 25, 'سعر التوصيل': 28, 'هامش الربح المستهدف %': 70, 'المكون': 'صلصة', 'الكمية': 0.03, 'الوحدة': 'كجم', 'تكلفة الوحدة': 15 },
        { 'اسم الوصفة': 'Caesar Salad', 'اسم الوصفة (عربي)': 'سلطة سيزر', 'المطعم': 'اسم المطعم', 'الفئة': 'سلطات', 'عدد الأجزاء': 1, 'سعر البيع': 18, 'سعر التوصيل': 20, 'هامش الربح المستهدف %': 72, 'المكون': 'خس', 'الكمية': 0.2, 'الوحدة': 'كجم', 'تكلفة الوحدة': 8 },
      ],
    },
    inventory: {
      filename: 'inventory_import_template.xlsx',
      headers: ['كود الصنف', 'الاسم بالعربي', 'الاسم بالإنجليزي', 'الفئة', 'الوحدة', 'آخر سعر شراء', 'متوسط التكلفة', 'الحد الأدنى', 'الحد الأقصى'],
      rows: [
        { 'كود الصنف': 'ITM-001', 'الاسم بالعربي': 'دجاج طازج', 'الاسم بالإنجليزي': 'Fresh Chicken', 'الفئة': 'دواجن', 'الوحدة': 'كجم', 'آخر سعر شراء': 18, 'متوسط التكلفة': 17.5, 'الحد الأدنى': 10, 'الحد الأقصى': 100 },
        { 'كود الصنف': 'ITM-002', 'الاسم بالعربي': 'زيت طبخ', 'الاسم بالإنجليزي': 'Cooking Oil', 'الفئة': 'مواد غذائية', 'الوحدة': 'لتر', 'آخر سعر شراء': 8, 'متوسط التكلفة': 8, 'الحد الأدنى': 5, 'الحد الأقصى': 50 },
      ],
    },
  };

  const tpl = templates[type];
  if (!tpl) return sendError(res, 'Unknown template type', 400);

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(tpl.rows, { header: tpl.headers });
  ws['!cols'] = tpl.headers.map(h => ({ wch: Math.max(h.length * 2, 18) }));

  // Freeze header row
  ws['!freeze'] = { xSplit: 0, ySplit: 1 };

  XLSX.utils.book_append_sheet(wb, ws, 'البيانات');

  // Add instructions sheet
  const instrWs = XLSX.utils.aoa_to_sheet([
    ['تعليمات الاستيراد'],
    [''],
    ['1. تأكد من وجود أسماء المطاعم والموردين والتصنيفات في النظام أولاً'],
    ['2. لا تغير أسماء الأعمدة'],
    ['3. التاريخ بصيغة: YYYY-MM-DD'],
    ['4. اترك الخلايا غير المطلوبة فارغة (لا تحذف الأعمدة)'],
    ['5. للفواتير الضريبية: نوع الفاتورة = TAX'],
    ['6. للفواتير غير الضريبية: نوع الفاتورة = NON_TAX'],
  ]);
  XLSX.utils.book_append_sheet(wb, instrWs, 'التعليمات');

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  res.set({
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Content-Disposition': `attachment; filename="${tpl.filename}"`,
  });
  res.send(buf);
};
