import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Pencil, Trash2, ShoppingCart, Receipt, Tag, ChevronRight } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm, Controller } from 'react-hook-form'

type InvCategory = {
  id: string
  nameAr: string
  nameEn: string
  type: string
  _count?: { items: number }
}

type ExpCategory = {
  id: string
  nameAr: string
  nameEn: string
  type: string
  parentId?: string
  children?: ExpCategory[]
  _count?: { expenses: number }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormValues = Record<string, any>

const INV_TYPES = [
  { value: 'FOOD', labelAr: 'أغذية', labelEn: 'Food' },
  { value: 'BEVERAGE', labelAr: 'مشروبات', labelEn: 'Beverage' },
  { value: 'PACKAGING', labelAr: 'تغليف', labelEn: 'Packaging' },
  { value: 'CLEANING', labelAr: 'منظفات / تنظيف', labelEn: 'Cleaning' },
  { value: 'CONSUMABLES', labelAr: 'مستهلكات', labelEn: 'Consumables' },
]

const TYPE_COLOR: Record<string, string> = {
  FOOD: 'bg-orange-100 text-orange-700',
  BEVERAGE: 'bg-blue-100 text-blue-700',
  PACKAGING: 'bg-purple-100 text-purple-700',
  CLEANING: 'bg-green-100 text-green-700',
  CONSUMABLES: 'bg-gray-100 text-gray-700',
  FIXED: 'bg-red-100 text-red-700',
  VARIABLE: 'bg-yellow-100 text-yellow-700',
}

function CategoryBadge({ type, labelAr, labelEn, lang }: { type: string; labelAr: string; labelEn: string; lang: string }) {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_COLOR[type] || 'bg-gray-100 text-gray-600'}`}>
      {lang === 'ar' ? labelAr : labelEn}
    </span>
  )
}

export default function CategoriesPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()

  // Inventory category state
  const [invOpen, setInvOpen] = useState(false)
  const [editingInv, setEditingInv] = useState<InvCategory | null>(null)

  // Expense category state
  const [expOpen, setExpOpen] = useState(false)
  const [editingExp, setEditingExp] = useState<ExpCategory | null>(null)

  const invForm = useForm<FormValues>({ defaultValues: { type: 'FOOD' } })
  const expForm = useForm<FormValues>({ defaultValues: { type: 'VARIABLE' } })

  // Inventory categories
  const { data: invData, isLoading: invLoading } = useQuery({
    queryKey: ['inventory-categories'],
    queryFn: () => api.get('/api/v1/inventory/categories').then(r => r.data.data),
  })

  // Expense categories
  const { data: expData, isLoading: expLoading } = useQuery({
    queryKey: ['expense-categories'],
    queryFn: () => api.get('/api/v1/expenses/categories').then(r => r.data.data),
  })

  // Inventory mutations
  const saveInvMutation = useMutation({
    mutationFn: (d: FormValues) => editingInv
      ? api.put(`/api/v1/inventory/categories/${editingInv.id}`, d)
      : api.post('/api/v1/inventory/categories', d),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['inventory-categories'] })
      setInvOpen(false); invForm.reset()
      toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' })
    },
    onError: (e: unknown) => toast({ title: (e as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error', variant: 'destructive' }),
  })

  const deleteInvMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/inventory/categories/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['inventory-categories'] })
      toast({ title: lang === 'ar' ? 'تم الحذف' : 'Deleted' })
    },
    onError: (e: unknown) => toast({ title: (e as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Cannot delete', variant: 'destructive' }),
  })

  // Expense mutations
  const saveExpMutation = useMutation({
    mutationFn: (d: FormValues) => editingExp
      ? api.put(`/api/v1/expenses/categories/${editingExp.id}`, d)
      : api.post('/api/v1/expenses/categories', d),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['expense-categories'] })
      setExpOpen(false); expForm.reset()
      toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' })
    },
    onError: (e: unknown) => toast({ title: (e as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error', variant: 'destructive' }),
  })

  const deleteExpMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/expenses/categories/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['expense-categories'] })
      toast({ title: lang === 'ar' ? 'تم الحذف' : 'Deleted' })
    },
    onError: (e: unknown) => toast({ title: (e as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Cannot delete', variant: 'destructive' }),
  })

  const openAddInv = () => { setEditingInv(null); invForm.reset({ type: 'FOOD' }); setInvOpen(true) }
  const openEditInv = (cat: InvCategory) => { setEditingInv(cat); invForm.reset(cat); setInvOpen(true) }

  const openAddExp = (parentId?: string) => { setEditingExp(null); expForm.reset({ type: 'VARIABLE', parentId: parentId || '' }); setExpOpen(true) }
  const openEditExp = (cat: ExpCategory) => { setEditingExp(cat); expForm.reset({ ...cat, parentId: cat.parentId || '' }); setExpOpen(true) }

  const invCategories: InvCategory[] = Array.isArray(invData) ? invData : []
  const expCategories: ExpCategory[] = Array.isArray(expData) ? expData.filter((c: ExpCategory) => !c.parentId) : []
  const allExpCategories: ExpCategory[] = Array.isArray(expData) ? expData : []

  const invTypeLabel = (type: string, ar: boolean) => {
    const t = INV_TYPES.find(x => x.value === type)
    return t ? (ar ? t.labelAr : t.labelEn) : type
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{lang === 'ar' ? 'إدارة التصنيفات' : 'Categories Management'}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {lang === 'ar' ? 'إدارة فئات المشتريات (المخزون) وفئات المصاريف وتقسيماتها الفرعية' : 'Manage purchase (inventory) categories and expense categories with subcategories.'}
          </p>
        </div>
      </div>

      <Tabs defaultValue="purchases">
        <TabsList className="bg-white border rounded-lg p-1 gap-1">
          <TabsTrigger value="purchases" className="gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <ShoppingCart className="h-4 w-4" />
            {lang === 'ar' ? 'فئات المشتريات' : 'Purchase Categories'}
          </TabsTrigger>
          <TabsTrigger value="expenses" className="gap-2 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
            <Receipt className="h-4 w-4" />
            {lang === 'ar' ? 'فئات المصاريف' : 'Expense Categories'}
          </TabsTrigger>
        </TabsList>

        {/* ─── PURCHASE / INVENTORY CATEGORIES ─── */}
        <TabsContent value="purchases" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {lang === 'ar' ? 'فئات الأصناف المستخدمة في المشتريات والمخزون' : 'Item categories used in purchasing and inventory'}
            </p>
            <Button onClick={openAddInv} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4" />{lang === 'ar' ? 'إضافة فئة' : 'Add Category'}
            </Button>
          </div>

          {/* Quick type summary */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {INV_TYPES.map(t => {
              const count = invCategories.filter(c => c.type === t.value).length
              return (
                <div key={t.value} className="bg-white border rounded-xl p-3 text-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_COLOR[t.value]}`}>
                    {lang === 'ar' ? t.labelAr : t.labelEn}
                  </span>
                  <p className="text-2xl font-bold mt-2">{count}</p>
                  <p className="text-xs text-gray-400">{lang === 'ar' ? 'فئة' : 'categories'}</p>
                </div>
              )
            })}
          </div>

          {invLoading ? <LoadingSpinner /> : (
            <div className="bg-white border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'الاسم بالعربي' : 'Name (Arabic)'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'الاسم بالإنجليزي' : 'Name (English)'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'النوع' : 'Type'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'عدد الأصناف' : '# Items'}</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invCategories.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-12 text-gray-400">
                      <Tag className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      <p>{lang === 'ar' ? 'لا توجد فئات. أضف فئتك الأولى.' : 'No categories yet. Add your first one.'}</p>
                    </TableCell></TableRow>
                  ) : invCategories.map(cat => (
                    <TableRow key={cat.id}>
                      <TableCell className="font-semibold text-sm">{cat.nameAr}</TableCell>
                      <TableCell className="text-sm text-gray-600">{cat.nameEn}</TableCell>
                      <TableCell>
                        <CategoryBadge type={cat.type} labelAr={invTypeLabel(cat.type, true)} labelEn={invTypeLabel(cat.type, false)} lang={lang} />
                      </TableCell>
                      <TableCell>
                        <span className={`text-sm font-medium ${(cat._count?.items || 0) > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                          {cat._count?.items || 0}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditInv(cat)}>
                            <Pencil className="h-3.5 w-3.5 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteInvMutation.mutate(cat.id)}
                            disabled={deleteInvMutation.isPending || (cat._count?.items || 0) > 0}
                            title={(cat._count?.items || 0) > 0 ? (lang === 'ar' ? 'يوجد أصناف مرتبطة' : 'Has linked items') : ''}>
                            <Trash2 className={`h-3.5 w-3.5 ${(cat._count?.items || 0) > 0 ? 'text-gray-300' : 'text-red-500'}`} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* ─── EXPENSE CATEGORIES ─── */}
        <TabsContent value="expenses" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {lang === 'ar' ? 'فئات المصاريف مع إمكانية إضافة تقسيمات فرعية' : 'Expense categories with support for subcategories'}
            </p>
            <Button onClick={() => openAddExp()} className="gap-2 bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="h-4 w-4" />{lang === 'ar' ? 'إضافة فئة' : 'Add Category'}
            </Button>
          </div>

          {/* Type summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-red-600 uppercase">{lang === 'ar' ? 'مصاريف ثابتة' : 'FIXED EXPENSES'}</p>
              <p className="text-3xl font-bold text-red-700 mt-1">{allExpCategories.filter(c => c.type === 'FIXED').length}</p>
              <p className="text-xs text-red-400">{lang === 'ar' ? 'فئة' : 'categories'}</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-yellow-600 uppercase">{lang === 'ar' ? 'مصاريف متغيرة' : 'VARIABLE EXPENSES'}</p>
              <p className="text-3xl font-bold text-yellow-700 mt-1">{allExpCategories.filter(c => c.type === 'VARIABLE').length}</p>
              <p className="text-xs text-yellow-400">{lang === 'ar' ? 'فئة' : 'categories'}</p>
            </div>
          </div>

          {expLoading ? <LoadingSpinner /> : (
            <div className="bg-white border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'الاسم بالعربي' : 'Name (Arabic)'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'الاسم بالإنجليزي' : 'Name (English)'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'النوع' : 'Type'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'مصاريف مسجلة' : '# Expenses'}</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-gray-500">{lang === 'ar' ? 'إجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expCategories.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-12 text-gray-400">
                      <Tag className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      <p>{lang === 'ar' ? 'لا توجد فئات. أضف فئتك الأولى.' : 'No categories yet. Add your first one.'}</p>
                    </TableCell></TableRow>
                  ) : expCategories.map(cat => (
                    <>
                      {/* Parent category row */}
                      <TableRow key={cat.id} className="bg-gray-50/50">
                        <TableCell className="font-semibold text-sm">{cat.nameAr}</TableCell>
                        <TableCell className="text-sm text-gray-600">{cat.nameEn}</TableCell>
                        <TableCell>
                          <CategoryBadge
                            type={cat.type}
                            labelAr={cat.type === 'FIXED' ? 'ثابت' : 'متغير'}
                            labelEn={cat.type === 'FIXED' ? 'Fixed' : 'Variable'}
                            lang={lang}
                          />
                        </TableCell>
                        <TableCell>
                          <span className={`text-sm font-medium ${(cat._count?.expenses || 0) > 0 ? 'text-orange-600' : 'text-gray-400'}`}>
                            {cat._count?.expenses || 0}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-blue-600 hover:text-blue-700" onClick={() => openAddExp(cat.id)}>
                              <Plus className="h-3 w-3" />{lang === 'ar' ? 'فرعية' : 'Sub'}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditExp(cat)}>
                              <Pencil className="h-3.5 w-3.5 text-gray-500" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteExpMutation.mutate(cat.id)}
                              disabled={deleteExpMutation.isPending || (cat._count?.expenses || 0) > 0 || (cat.children?.length || 0) > 0}>
                              <Trash2 className={`h-3.5 w-3.5 ${((cat._count?.expenses || 0) > 0 || (cat.children?.length || 0) > 0) ? 'text-gray-300' : 'text-red-500'}`} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {/* Children rows */}
                      {(cat.children || []).map(child => (
                        <TableRow key={child.id} className="bg-white">
                          <TableCell className="text-sm pl-8">
                            <span className="flex items-center gap-1.5 text-gray-600">
                              <ChevronRight className="h-3 w-3 text-gray-400" />{child.nameAr}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500 pl-8">{child.nameEn}</TableCell>
                          <TableCell>
                            <CategoryBadge
                              type={child.type}
                              labelAr={child.type === 'FIXED' ? 'ثابت' : 'متغير'}
                              labelEn={child.type === 'FIXED' ? 'Fixed' : 'Variable'}
                              lang={lang}
                            />
                          </TableCell>
                          <TableCell>
                            <span className={`text-sm ${(child._count?.expenses || 0) > 0 ? 'text-orange-600 font-medium' : 'text-gray-400'}`}>
                              {child._count?.expenses || 0}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditExp(child)}>
                                <Pencil className="h-3.5 w-3.5 text-gray-500" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteExpMutation.mutate(child.id)}
                                disabled={deleteExpMutation.isPending || (child._count?.expenses || 0) > 0}>
                                <Trash2 className={`h-3.5 w-3.5 ${(child._count?.expenses || 0) > 0 ? 'text-gray-300' : 'text-red-500'}`} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* ─── Inventory Category Dialog ─── */}
      <Dialog open={invOpen} onOpenChange={setInvOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingInv ? (lang === 'ar' ? 'تعديل فئة المشتريات' : 'Edit Purchase Category') : (lang === 'ar' ? 'إضافة فئة مشتريات' : 'Add Purchase Category')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={invForm.handleSubmit(d => saveInvMutation.mutate(d))} className="space-y-4">
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'الاسم بالعربي' : 'Name (Arabic)'} <span className="text-red-500">*</span></Label>
              <Input {...invForm.register('nameAr', { required: true })} placeholder="مثال: مشتريات تنظيف" />
            </div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'الاسم بالإنجليزي' : 'Name (English)'} <span className="text-red-500">*</span></Label>
              <Input {...invForm.register('nameEn', { required: true })} placeholder="e.g. Cleaning Supplies" />
            </div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'نوع الصنف' : 'Item Type'}</Label>
              <Controller name="type" control={invForm.control} render={({ field }) => (
                <Select value={field.value || 'FOOD'} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {INV_TYPES.map(t => (
                      <SelectItem key={t.value} value={t.value}>
                        <span className={`text-xs px-1.5 py-0.5 rounded mr-2 ${TYPE_COLOR[t.value]}`}>{lang === 'ar' ? t.labelAr : t.labelEn}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setInvOpen(false)}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
              <Button type="submit" disabled={saveInvMutation.isPending} className="bg-blue-600 hover:bg-blue-700 text-white">
                {lang === 'ar' ? 'حفظ' : 'Save'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ─── Expense Category Dialog ─── */}
      <Dialog open={expOpen} onOpenChange={setExpOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingExp ? (lang === 'ar' ? 'تعديل فئة المصاريف' : 'Edit Expense Category') : (lang === 'ar' ? 'إضافة فئة مصاريف' : 'Add Expense Category')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={expForm.handleSubmit(d => saveExpMutation.mutate({ ...d, parentId: d.parentId || null }))} className="space-y-4">
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'الاسم بالعربي' : 'Name (Arabic)'} <span className="text-red-500">*</span></Label>
              <Input {...expForm.register('nameAr', { required: true })} placeholder="مثال: مصاريف إيجار" />
            </div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'الاسم بالإنجليزي' : 'Name (English)'} <span className="text-red-500">*</span></Label>
              <Input {...expForm.register('nameEn', { required: true })} placeholder="e.g. Rent Expenses" />
            </div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'النوع' : 'Type'}</Label>
              <Controller name="type" control={expForm.control} render={({ field }) => (
                <Select value={field.value || 'VARIABLE'} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FIXED">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-700 mr-2">{lang === 'ar' ? 'ثابت' : 'Fixed'}</span>
                      {lang === 'ar' ? '— إيجار، رواتب، اشتراكات' : '— Rent, salaries, subscriptions'}
                    </SelectItem>
                    <SelectItem value="VARIABLE">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-700 mr-2">{lang === 'ar' ? 'متغير' : 'Variable'}</span>
                      {lang === 'ar' ? '— مواد، مستهلكات، تشغيل' : '— Materials, consumables, ops'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              )} />
            </div>
            <div className="space-y-1.5">
              <Label>{lang === 'ar' ? 'فئة رئيسية (اختياري)' : 'Parent Category (optional)'}</Label>
              <Controller name="parentId" control={expForm.control} render={({ field }) => (
                <Select value={field.value || ''} onValueChange={v => field.onChange(v || null)}>
                  <SelectTrigger><SelectValue placeholder={lang === 'ar' ? 'بدون فئة رئيسية' : 'No parent (top-level)'} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">{lang === 'ar' ? 'بدون فئة رئيسية' : 'No parent (top-level)'}</SelectItem>
                    {allExpCategories.filter(c => !c.parentId && c.id !== editingExp?.id).map(c => (
                      <SelectItem key={c.id} value={c.id}>{lang === 'ar' ? c.nameAr : c.nameEn}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} />
              <p className="text-xs text-gray-400">{lang === 'ar' ? 'اختر فئة رئيسية لجعل هذه الفئة تقسيماً فرعياً' : 'Select a parent to make this a subcategory'}</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setExpOpen(false)}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
              <Button type="submit" disabled={saveExpMutation.isPending} className="bg-orange-500 hover:bg-orange-600 text-white">
                {lang === 'ar' ? 'حفظ' : 'Save'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
