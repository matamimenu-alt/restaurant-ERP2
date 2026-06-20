import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface RestaurantOption {
  id: string
  nameAr: string
  nameEn: string
}

interface RestaurantState {
  selectedRestaurant: RestaurantOption | null
  setSelectedRestaurant: (restaurant: RestaurantOption | null) => void
}

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set) => ({
      selectedRestaurant: null,
      setSelectedRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),
    }),
    { name: 'restaurant-storage' }
  )
)
