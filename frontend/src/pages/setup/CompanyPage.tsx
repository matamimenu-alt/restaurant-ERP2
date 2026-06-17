import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import PageHeader from '@/components/shared/PageHeader'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Save } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

export default function CompanyPage() {
  const { lang } = useLang()
  const qc = useQueryClient()
  const { toast } = useToast()

  const { data, isLoading } = useQuery({
    queryKey: ['company'],
    queryFn: () => api.get('/api/v1/company').then(r => r.data.data),
  })

  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (data) reset(data)
  }, [data, reset])

  const saveMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => api.put('/api/v1/company', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['company'] }); toast({ title: lang === 'ar' ? 'تم الحفظ' : 'Saved', variant: 'success' }) },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <PageHeader title={lang === 'ar' ? 'إعدادات الشركة' : 'Company Settings'} />
      <form onSubmit={handleSubmit(d => saveMutation.mutate(d as Record<string, unknown>))} className="max-w-2xl space-y-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="h-4 w-4" />{lang === 'ar' ? 'معلومات الشركة' : 'Company Information'}</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'اسم الشركة بالعربي' : 'Company Name (Arabic)'}</Label><Input {...register('nameAr', { required: true })} /></div>
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'اسم الشركة بالإنجليزي' : 'Company Name (English)'}</Label><Input {...register('nameEn', { required: true })} /></div>
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label><Input type="email" {...register('email')} /></div>
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الهاتف' : 'Phone'}</Label><Input {...register('phone')} /></div>
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'العنوان' : 'Address'}</Label><Input {...register('address')} /></div>
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'الرقم الضريبي' : 'VAT Number'}</Label><Input {...register('vatNumber')} /></div>
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'السجل التجاري' : 'CR Number'}</Label><Input {...register('crNumber')} /></div>
            <div className="space-y-1.5"><Label>{lang === 'ar' ? 'المدينة' : 'City'}</Label><Input {...register('city')} /></div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saveMutation.isPending} className="gap-2">
            <Save className="h-4 w-4" />{lang === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}
