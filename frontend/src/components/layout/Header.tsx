import { Bell, Menu, Globe, LogOut, User, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLang } from '@/hooks/useLang'
import { useAuth } from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { Link } from 'react-router-dom'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { lang, toggleLang } = useLang()
  const { user, logout } = useAuth()

  const { data: alerts } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => api.get('/api/v1/alerts').then(r => r.data.data),
    refetchInterval: 60000,
  })

  const unreadCount = Array.isArray(alerts) ? alerts.filter((a: { isRead: boolean }) => !a.isRead).length : 0

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={toggleLang} className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{lang === 'ar' ? 'English' : 'عربي'}</span>
        </Button>

        <Link to="/alerts">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -end-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Button>
        </Link>

        <div className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="font-medium text-sm leading-tight">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.role}</p>
          </div>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </div>

        <Button variant="ghost" size="icon" onClick={logout} title={lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
