import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useLang } from '@/hooks/useLang'
import { useAuthStore } from '@/store/authStore'
import api from '@/lib/api'
import { Globe, Eye, EyeOff } from 'lucide-react'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

type LoginForm = z.infer<typeof schema>

export default function LoginPage() {
  const { lang, toggleLang } = useLang()
  const navigate = useNavigate()
  const login = useAuthStore(s => s.login)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/api/v1/auth/login', data)
      const { accessToken, refreshToken, user } = res.data.data
      localStorage.setItem('refreshToken', refreshToken)
      login({ ...user, nameAr: user.nameAr, nameEn: user.nameEn }, accessToken)
      navigate('/')
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      setError(msg || (lang === 'ar' ? 'بيانات غير صحيحة' : 'Invalid credentials'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-slate-100 p-4" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md">
        <button
          onClick={toggleLang}
          className="absolute top-4 end-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <Globe className="h-4 w-4" />
          {lang === 'ar' ? 'English' : 'عربي'}
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white font-bold text-3xl mb-4">م</div>
          <h1 className="text-3xl font-bold text-gray-900">{lang === 'ar' ? 'مطعمي ERP' : "Mat'ami ERP"}</h1>
          <p className="text-muted-foreground mt-1">{lang === 'ar' ? 'نظام إدارة المطاعم المتكامل' : 'Complete Restaurant Management System'}</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="pb-0 pt-6 px-6">
            <h2 className="text-xl font-semibold">{lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</h2>
            <p className="text-sm text-muted-foreground">{lang === 'ar' ? 'أدخل بيانات حسابك للمتابعة' : 'Enter your credentials to continue'}</p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={lang === 'ar' ? 'example@company.com' : 'example@company.com'}
                  {...register('email')}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">{lang === 'ar' ? 'كلمة المرور' : 'Password'}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
              </div>

              {error && (
                <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (lang === 'ar' ? 'جاري الدخول...' : 'Signing in...') : (lang === 'ar' ? 'دخول' : 'Sign In')}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          {lang === 'ar' ? '© 2024 مطعمي ERP. جميع الحقوق محفوظة.' : "© 2024 Mat'ami ERP. All rights reserved."}
        </p>
      </div>
    </div>
  )
}
