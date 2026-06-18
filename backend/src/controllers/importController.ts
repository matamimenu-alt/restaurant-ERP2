import { Response } from 'express';
import * as XLSX from 'xlsx';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/response';

// ── Revenue Excel Import ──────────────────────────────────────────────────────

export const importRevenue = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return sendError(res, 'No file uploaded', 400);
    const wb = XLSX.read(req.file.buffer, { type: 'buffer', cellDates: true });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(ws);

    const restaurants = await prisma.restaurant.findMany({ where: { companyId: req.user!.companyId, isActive: true }, select: { id: true, nameAr: true, nameEn: true } });
    const restMap = new Map(restaurants.flatMap(r => [[r.nameAr.trim().toLowerCase(), r.id], [r.nameEn.trim().toLowerCase(), r.id]]));

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

    let created = 0; const errors: string[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      try {
        const restaurantName = String(row['المطعم'] || row['Restaurant'] || '').trim().toLowerCase();
        const restaurantId = restMap.get(restaurantName);
        if (!restaurantId) { errors.push(`Row ${i + 2}: Restaurant "${restaurantName}" not found`); continue; }

        const rawDate = row['التاريخ'] || row['Date'];
        const date = rawDate instanceof Date ? rawDate : new Date(String(rawDate));
        if (isNaN(date.getTime())) { errors.push(`Row ${i + 2}: Invalid date`); continue; }

        const rawSource = String(row['المصدر'] || row['Source'] || '').trim().toLowerCase();
        const source = SOURCE_MAP[rawSource] || 'OTHER';

        const amount = parseFloat(String(row['المبلغ'] || row['Amount'] || 0));
        if (isNaN(amount) || amount <= 0) { errors.push(`Row ${i + 2}: Invalid amount`); continue; }

        const isVatInclusive = String(row['شامل ضريبة'] || row['VAT Inclusive'] || 'نعم').trim().toLowerCase() !== 'لا';
        const vatRate = parseFloat(String(row['نسبة الضريبة'] || row['VAT Rate'] || 15));
        const vatAmount = isVatInclusive ? (amount * vatRate) / (100 + vatRate) : (amount * vatRate) / 100;
        const amountExVat = isVatInclusive ? amount - vatAmount : amount;

        await prisma.revenueEntry.create({
          data: {
            companyId: req.user!.companyId, restaurantId, date, source: source as never,
            amount, isVatInclusive, vatRate, vatAmount, amountExVat,
            notes: String(row['ملاحظات'] || row['Notes'] || '') || undefined,
            createdBy: req.user!.userId,
          },
        });
        created++;
      } catch (e) {
        errors.push(`Row ${i + 2}: ${(e as Error).message}`);
      }
    }

    sendSuccess(res, { created, errors, total: rows.length }, `Imported ${created} revenue entries`);
  } catch (e) {
    sendError(res, `Import failed: ${(e as Error).message}`, 500);
  }
};

// ── Expense Excel Import ──────────────────────────────────────────────────────

export const importExpenses = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return sendError(res, 'No file uploaded', 400);
    const wb = XLSX.read(req.file.buffer, { type: 'buffer', cellDates: true });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(ws);

    const [restaurants, categories] = await Promise.all([
      prisma.restaurant.findMany({ where: { companyId: req.user!.companyId, isActive: true }, select: { id: true, nameAr: true, nameEn: true } }),
      prisma.expenseCategory.findMany({ where: { companyId: req.user!.companyId }, select: { id: true, nameAr: true, nameEn: true } }),
    ]);
    const restMap = new Map(restaurants.flatMap(r => [[r.nameAr.trim().toLowerCase(), r.id], [r.nameEn.trim().toLowerCase(), r.id]]));
    const catMap = new Map(categories.flatMap(c => [[c.nameAr.trim().toLowerCase(), c.id], [c.nameEn.trim().toLowerCase(), c.id]]));

    const PAYMENT_MAP: Record<string, string> = {
      'نقد': 'CASH', 'cash': 'CASH', 'بنك': 'BANK', 'bank': 'BANK', 'ائتمان': 'CREDIT', 'credit': 'CREDIT',
    };

    let created = 0; const errors: string[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      try {
        const restaurantName = String(row['المطعم'] || row['Restaurant'] || '').trim().toLowerCase();
        const restaurantId = restMap.get(restaurantName);
        if (!restaurantId) { errors.push(`Row ${i + 2}: Restaurant "${restaurantName}" not found`); continue; }

        const catName = String(row['التصنيف'] || row['Category'] || '').trim().toLowerCase();
        const categoryId = catMap.get(catName);
        if (!categoryId) { errors.push(`Row ${i + 2}: Category "${catName}" not found`); continue; }

        const rawDate = row['التاريخ'] || row['Date'];
        const date = rawDate instanceof Date ? rawDate : new Date(String(rawDate));
        if (isNaN(date.getTime())) { errors.push(`Row ${i + 2}: Invalid date`); continue; }

        const amount = parseFloat(String(row['المبلغ'] || row['Amount'] || 0));
        if (isNaN(amount) || amount <= 0) { errors.push(`Row ${i + 2}: Invalid amount`); continue; }

        const isVatable = String(row['خاضع للضريبة'] || row['Vatable'] || 'لا').trim().toLowerCase() === 'نعم';
        const vatRate = parseFloat(String(row['نسبة الضريبة'] || row['VAT Rate'] || 15));
        const vatAmount = isVatable ? (amount * vatRate) / 100 : 0;

        const rawPayment = String(row['طريقة الدفع'] || row['Payment Method'] || 'نقد').trim().toLowerCase();
        const paymentMethod = (PAYMENT_MAP[rawPayment] || 'CASH') as never;

        await prisma.expense.create({
          data: {
            companyId: req.user!.companyId, restaurantId, categoryId, date, amount,
            isVatable, vatRate, vatAmount, paymentMethod,
            description: String(row['الوصف'] || row['Description'] || '') || undefined,
            createdBy: req.user!.userId,
          },
        });
        created++;
      } catch (e) {
        errors.push(`Row ${i + 2}: ${(e as Error).message}`);
      }
    }

    sendSuccess(res, { created, errors, total: rows.length }, `Imported ${created} expenses`);
  } catch (e) {
    sendError(res, `Import failed: ${(e as Error).message}`, 500);
  }
};

// ── Employee Excel Import ─────────────────────────────────────────────────────

export const importEmployees = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return sendError(res, 'No file uploaded', 400);
    const wb = XLSX.read(req.file.buffer, { type: 'buffer', cellDates: true });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(ws);

    const restaurants = await prisma.restaurant.findMany({ where: { companyId: req.user!.companyId, isActive: true }, select: { id: true, nameAr: true, nameEn: true } });
    const restMap = new Map(restaurants.flatMap(r => [[r.nameAr.trim().toLowerCase(), r.id], [r.nameEn.trim().toLowerCase(), r.id]]));

    let created = 0; let updated = 0; const errors: string[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      try {
        const restaurantName = String(row['المطعم'] || row['Restaurant'] || '').trim().toLowerCase();
        const restaurantId = restMap.get(restaurantName);
        if (!restaurantId) { errors.push(`Row ${i + 2}: Restaurant "${restaurantName}" not found`); continue; }

        const rawJoin = row['تاريخ الالتحاق'] || row['Joining Date'];
        const joiningDate = rawJoin instanceof Date ? rawJoin : new Date(String(rawJoin));
        if (isNaN(joiningDate.getTime())) { errors.push(`Row ${i + 2}: Invalid joining date`); continue; }

        const rawIqamaExpiry = row['انتهاء الإقامة'] || row['Iqama Expiry'];
        const iqamaExpiryDate = rawIqamaExpiry ? (rawIqamaExpiry instanceof Date ? rawIqamaExpiry : new Date(String(rawIqamaExpiry))) : undefined;

        const employeeData = {
          companyId: req.user!.companyId,
          restaurantId,
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

        if (!employeeData.nameAr && !employeeData.nameEn) { errors.push(`Row ${i + 2}: Name is required`); continue; }
        if (!employeeData.nameAr) employeeData.nameAr = employeeData.nameEn;
        if (!employeeData.nameEn) employeeData.nameEn = employeeData.nameAr;

        // Upsert by employeeId if provided
        if (employeeData.employeeId) {
          const existing = await prisma.employee.findFirst({ where: { companyId: req.user!.companyId, employeeId: employeeData.employeeId } });
          if (existing) {
            await prisma.employee.update({ where: { id: existing.id }, data: employeeData });
            updated++;
            continue;
          }
        }
        await prisma.employee.create({ data: employeeData });
        created++;
      } catch (e) {
        errors.push(`Row ${i + 2}: ${(e as Error).message}`);
      }
    }

    sendSuccess(res, { created, updated, errors, total: rows.length }, `Imported ${created} employees, updated ${updated}`);
  } catch (e) {
    sendError(res, `Import failed: ${(e as Error).message}`, 500);
  }
};

// ── Purchase Invoices & Returns Excel Import ──────────────────────────────────

export const importPurchases = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return sendError(res, 'No file uploaded', 400);
    const wb = XLSX.read(req.file.buffer, { type: 'buffer', cellDates: true });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(ws);

    const companyId = req.user!.companyId;

    const [restaurants, suppliers] = await Promise.all([
      prisma.restaurant.findMany({ where: { companyId, isActive: true }, select: { id: true, nameAr: true, nameEn: true } }),
      prisma.supplier.findMany({ where: { companyId }, select: { id: true, nameAr: true, nameEn: true } }),
    ]);

    const restMap = new Map(restaurants.flatMap(r => [[r.nameAr.trim().toLowerCase(), r.id], [r.nameEn.trim().toLowerCase(), r.id]]));
    const suppMap = new Map(suppliers.flatMap(s => [[s.nameAr.trim().toLowerCase(), s.id], [s.nameEn.trim().toLowerCase(), s.id]]));

    const PAYMENT_MAP: Record<string, string> = {
      'نقد': 'CASH', 'cash': 'CASH', 'آجل': 'CREDIT', 'credit': 'CREDIT', 'ائتمان': 'CREDIT',
      'تحويل': 'BANK_TRANSFER', 'bank': 'BANK_TRANSFER', 'bank transfer': 'BANK_TRANSFER',
    };

    let createdInvoices = 0; let createdReturns = 0; const errors: string[] = [];

    // First pass: build a map of invoiceNumber → invoiceId for returns that reference same-file invoices
    const invoiceNumberMap = new Map<string, string>();

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowType = String(row['نوع السجل'] || row['Type'] || 'فاتورة').trim();
      if (rowType === 'استرداد' || rowType.toLowerCase() === 'return') continue;

      try {
        const invoiceNumber = String(row['رقم الفاتورة'] || row['Invoice Number'] || '').trim();
        if (!invoiceNumber) { errors.push(`Row ${i + 2}: رقم الفاتورة مطلوب`); continue; }

        const rawDate = row['تاريخ الفاتورة'] || row['Invoice Date'];
        const invoiceDate = rawDate instanceof Date ? rawDate : new Date(String(rawDate));
        if (isNaN(invoiceDate.getTime())) { errors.push(`Row ${i + 2}: تاريخ غير صحيح`); continue; }

        const supplierName = String(row['المورد'] || row['Supplier'] || '').trim().toLowerCase();
        const supplierId = suppMap.get(supplierName);
        if (!supplierId) { errors.push(`Row ${i + 2}: المورد "${supplierName}" غير موجود`); continue; }

        const restaurantName = String(row['المطعم'] || row['Restaurant'] || '').trim().toLowerCase();
        const restaurantId = restMap.get(restaurantName);
        if (!restaurantId) { errors.push(`Row ${i + 2}: المطعم "${restaurantName}" غير موجود`); continue; }

        const subtotal = parseFloat(String(row['المبلغ قبل الضريبة'] || row['Subtotal'] || 0));
        const vatAmount = parseFloat(String(row['مبلغ الضريبة'] || row['VAT Amount'] || 0));
        const total = parseFloat(String(row['الإجمالي'] || row['Total'] || subtotal + vatAmount));
        const invoiceType = String(row['نوع الفاتورة'] || row['Invoice Type'] || 'TAX').trim().toUpperCase();
        const rawPayment = String(row['طريقة الدفع'] || row['Payment Method'] || 'نقد').trim().toLowerCase();
        const paymentMethod = (PAYMENT_MAP[rawPayment] || 'CASH') as never;

        // Check if invoice number already exists (avoid duplicates)
        const existing = await prisma.purchaseInvoice.findFirst({ where: { companyId, invoiceNumber } });
        if (existing) {
          invoiceNumberMap.set(invoiceNumber, existing.id);
          errors.push(`Row ${i + 2}: رقم الفاتورة "${invoiceNumber}" موجود مسبقاً - تم تخطيه`);
          continue;
        }

        const inv = await prisma.purchaseInvoice.create({
          data: {
            companyId, supplierId, restaurantId, invoiceNumber, invoiceDate,
            subtotal: isNaN(subtotal) ? 0 : subtotal,
            vatAmount: isNaN(vatAmount) ? 0 : vatAmount,
            total: isNaN(total) ? 0 : total,
            invoiceType, paymentMethod,
            notes: String(row['ملاحظات'] || row['Notes'] || '') || undefined,
            status: 'POSTED',
            createdBy: req.user!.userId,
          },
        });
        invoiceNumberMap.set(invoiceNumber, inv.id);
        createdInvoices++;
      } catch (e) {
        errors.push(`Row ${i + 2}: ${(e as Error).message}`);
      }
    }

    // Second pass: process returns
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowType = String(row['نوع السجل'] || row['Type'] || 'فاتورة').trim();
      if (rowType !== 'استرداد' && rowType.toLowerCase() !== 'return') continue;

      try {
        const refInvoiceNumber = String(row['رقم الفاتورة'] || row['Invoice Number'] || '').trim();
        if (!refInvoiceNumber) { errors.push(`Row ${i + 2}: رقم الفاتورة المرجعي مطلوب للاسترداد`); continue; }

        // Look up invoice: in-file first, then DB
        let invoiceId = invoiceNumberMap.get(refInvoiceNumber);
        if (!invoiceId) {
          const inv = await prisma.purchaseInvoice.findFirst({ where: { companyId, invoiceNumber: refInvoiceNumber } });
          if (!inv) { errors.push(`Row ${i + 2}: فاتورة "${refInvoiceNumber}" غير موجودة`); continue; }
          invoiceId = inv.id;
        }

        const rawDate = row['تاريخ الاسترداد'] || row['تاريخ الفاتورة'] || row['Return Date'] || row['Invoice Date'];
        const returnDate = rawDate instanceof Date ? rawDate : new Date(String(rawDate));
        if (isNaN(returnDate.getTime())) { errors.push(`Row ${i + 2}: تاريخ غير صحيح`); continue; }

        const subtotal = parseFloat(String(row['المبلغ قبل الضريبة'] || row['Subtotal'] || 0));
        const vatAmount = parseFloat(String(row['مبلغ الضريبة'] || row['VAT Amount'] || 0));
        const total = parseFloat(String(row['الإجمالي'] || row['Total'] || subtotal + vatAmount));

        await prisma.purchaseReturn.create({
          data: {
            companyId, invoiceId,
            returnDate,
            returnType: 'PARTIAL',
            subtotal: isNaN(subtotal) ? 0 : subtotal,
            vatAmount: isNaN(vatAmount) ? 0 : vatAmount,
            total: isNaN(total) ? 0 : total,
            reason: String(row['سبب الاسترداد'] || row['Return Reason'] || '') || undefined,
            status: 'POSTED',
            createdBy: req.user!.userId,
          },
        });
        createdReturns++;
      } catch (e) {
        errors.push(`Row ${i + 2}: ${(e as Error).message}`);
      }
    }

    sendSuccess(res, { createdInvoices, createdReturns, errors, total: rows.length },
      `تم استيراد ${createdInvoices} فاتورة و ${createdReturns} استرداد`);
  } catch (e) {
    sendError(res, `Import failed: ${(e as Error).message}`, 500);
  }
};

// ── Excel Templates ───────────────────────────────────────────────────────────

export const downloadTemplate = async (req: AuthRequest, res: Response) => {
  const type = req.params.type;
  const templates: Record<string, { headers: string[]; sample: Record<string, unknown>; filename: string }> = {
    revenue: {
      filename: 'revenue_import_template.xlsx',
      headers: ['التاريخ', 'المطعم', 'المصدر', 'المبلغ', 'شامل ضريبة', 'نسبة الضريبة', 'ملاحظات'],
      sample: { 'التاريخ': '2024-01-01', 'المطعم': 'اسم المطعم', 'المصدر': 'نقد', 'المبلغ': 1000, 'شامل ضريبة': 'نعم', 'نسبة الضريبة': 15, 'ملاحظات': '' },
    },
    expense: {
      filename: 'expense_import_template.xlsx',
      headers: ['التاريخ', 'المطعم', 'التصنيف', 'المبلغ', 'خاضع للضريبة', 'نسبة الضريبة', 'طريقة الدفع', 'الوصف'],
      sample: { 'التاريخ': '2024-01-01', 'المطعم': 'اسم المطعم', 'التصنيف': 'اسم التصنيف', 'المبلغ': 500, 'خاضع للضريبة': 'لا', 'نسبة الضريبة': 15, 'طريقة الدفع': 'نقد', 'الوصف': '' },
    },
    employee: {
      filename: 'employee_import_template.xlsx',
      headers: ['رقم الموظف', 'الاسم بالعربي', 'الاسم بالإنجليزي', 'المطعم', 'المسمى الوظيفي', 'القسم', 'الجنسية', 'الراتب الأساسي', 'بدل سكن', 'بدل مواصلات', 'بدلات أخرى', 'تاريخ الالتحاق', 'رقم الإقامة', 'انتهاء الإقامة', 'الحالة'],
      sample: { 'رقم الموظف': 'EMP001', 'الاسم بالعربي': 'محمد أحمد', 'الاسم بالإنجليزي': 'Mohammed Ahmed', 'المطعم': 'اسم المطعم', 'المسمى الوظيفي': 'طاهٍ', 'القسم': 'المطبخ', 'الجنسية': 'سعودي', 'الراتب الأساسي': 3000, 'بدل سكن': 500, 'بدل مواصلات': 300, 'بدلات أخرى': 0, 'تاريخ الالتحاق': '2024-01-01', 'رقم الإقامة': '', 'انتهاء الإقامة': '', 'الحالة': 'ACTIVE' },
    },
    purchase: {
      filename: 'purchase_import_template.xlsx',
      headers: ['نوع السجل', 'رقم الفاتورة', 'تاريخ الفاتورة', 'المورد', 'المطعم', 'نوع الفاتورة', 'المبلغ قبل الضريبة', 'مبلغ الضريبة', 'الإجمالي', 'طريقة الدفع', 'ملاحظات', 'سبب الاسترداد'],
      sample: { 'نوع السجل': 'فاتورة', 'رقم الفاتورة': 'INV-001', 'تاريخ الفاتورة': '2024-01-01', 'المورد': 'اسم المورد', 'المطعم': 'اسم المطعم', 'نوع الفاتورة': 'TAX', 'المبلغ قبل الضريبة': 1000, 'مبلغ الضريبة': 150, 'الإجمالي': 1150, 'طريقة الدفع': 'نقد', 'ملاحظات': '', 'سبب الاسترداد': '' },
    },
    'purchase-return-example': {
      filename: 'purchase_with_returns_template.xlsx',
      headers: ['نوع السجل', 'رقم الفاتورة', 'تاريخ الفاتورة', 'المورد', 'المطعم', 'نوع الفاتورة', 'المبلغ قبل الضريبة', 'مبلغ الضريبة', 'الإجمالي', 'طريقة الدفع', 'ملاحظات', 'سبب الاسترداد'],
      sample: { 'نوع السجل': 'استرداد', 'رقم الفاتورة': 'INV-001', 'تاريخ الفاتورة': '2024-01-15', 'المورد': '', 'المطعم': '', 'نوع الفاتورة': '', 'المبلغ قبل الضريبة': 200, 'مبلغ الضريبة': 30, 'الإجمالي': 230, 'طريقة الدفع': '', 'ملاحظات': '', 'سبب الاسترداد': 'بضاعة تالفة' },
    },
  };

  const tpl = templates[type];
  if (!tpl) return sendError(res, 'Unknown template type', 400);

  const wb = XLSX.utils.book_new();

  // For purchase template, include two sample rows: one invoice + one return
  const sampleRows = type === 'purchase'
    ? [
        tpl.sample,
        { 'نوع السجل': 'استرداد', 'رقم الفاتورة': 'INV-001', 'تاريخ الفاتورة': '2024-01-15', 'المورد': '', 'المطعم': '', 'نوع الفاتورة': '', 'المبلغ قبل الضريبة': 200, 'مبلغ الضريبة': 30, 'الإجمالي': 230, 'طريقة الدفع': '', 'ملاحظات': '', 'سبب الاسترداد': 'بضاعة تالفة' },
      ]
    : [tpl.sample];

  const ws = XLSX.utils.json_to_sheet(sampleRows, { header: tpl.headers });

  // Set column widths
  ws['!cols'] = tpl.headers.map(() => ({ wch: 20 }));

  XLSX.utils.book_append_sheet(wb, ws, 'Template');
  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

  res.set({
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Content-Disposition': `attachment; filename="${tpl.filename}"`,
  });
  res.send(buf);
};
