import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Toaster } from '@/components/ui/toaster'
import { useLang } from '@/hooks/useLang'
import { cn } from '@/lib/utils'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { lang } = useLang()

  return (
    <div className={cn("flex h-screen overflow-hidden bg-background", lang === 'ar' ? 'font-cairo' : '')} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:border-e">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className={cn("absolute inset-y-0 w-72 flex flex-col", lang === 'ar' ? 'end-0' : 'start-0')}>
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      <Toaster />
    </div>
  )
}
