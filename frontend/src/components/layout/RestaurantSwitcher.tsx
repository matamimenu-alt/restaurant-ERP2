import { useEffect, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronDown, Store, Check, ChevronsUpDown } from 'lucide-react'
import api from '@/lib/api'
import { useLang } from '@/hooks/useLang'
import { useRestaurantStore } from '@/store/restaurantStore'
import { cn } from '@/lib/utils'

interface Restaurant {
  id: string
  nameAr: string
  nameEn: string
}

export default function RestaurantSwitcher() {
  const { lang } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()
  const { selectedRestaurant, setSelectedRestaurant } = useRestaurantStore()

  const { data } = useQuery<{ data: Restaurant[] }>({
    queryKey: ['restaurants-list'],
    queryFn: () => api.get('/api/v1/restaurants?limit=100').then(r => r.data),
  })

  const restaurants: Restaurant[] = data?.data ?? []

  // Auto-select first restaurant if none selected
  useEffect(() => {
    if (restaurants.length > 0 && !selectedRestaurant) {
      setSelectedRestaurant(restaurants[0])
    }
  }, [restaurants, selectedRestaurant, setSelectedRestaurant])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const select = (r: Restaurant) => {
    setSelectedRestaurant(r)
    setOpen(false)
    // Invalidate all queries so pages re-fetch with new restaurantId
    queryClient.invalidateQueries()
  }

  const allLabel = lang === 'ar' ? 'جميع المطاعم' : 'All Restaurants'
  const displayName = selectedRestaurant
    ? (lang === 'ar' ? selectedRestaurant.nameAr : selectedRestaurant.nameEn)
    : allLabel

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={cn(
          'flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium',
          'bg-background hover:bg-muted transition-colors',
          open && 'border-primary'
        )}
      >
        <Store className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="max-w-[140px] truncate hidden sm:block">{displayName}</span>
        <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>

      {open && (
        <div className={cn(
          'absolute z-50 mt-1 w-56 rounded-md border bg-popover shadow-lg',
          lang === 'ar' ? 'left-0' : 'right-0'
        )}>
          <div className="p-1">
            <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              {lang === 'ar' ? 'اختر المطعم' : 'Select Restaurant'}
            </p>

            <button
              onClick={() => { setSelectedRestaurant(null); setOpen(false); queryClient.invalidateQueries() }}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
            >
              <Check className={cn('h-4 w-4', selectedRestaurant === null ? 'opacity-100' : 'opacity-0')} />
              <span>{allLabel}</span>
            </button>

            {restaurants.map(r => (
              <button
                key={r.id}
                onClick={() => select(r)}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
              >
                <Check className={cn('h-4 w-4', selectedRestaurant?.id === r.id ? 'opacity-100' : 'opacity-0')} />
                <span className="truncate">{lang === 'ar' ? r.nameAr : r.nameEn}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
