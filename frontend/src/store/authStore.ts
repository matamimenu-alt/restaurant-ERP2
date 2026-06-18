import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: string
  restaurantId?: string
  branchId?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

const DEFAULT_USER: User = {
  id: 'default',
  name: 'Admin',
  email: 'admin@matami.sa',
  role: 'COMPANY_ADMIN',
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: DEFAULT_USER,
      token: 'no-auth',
      isAuthenticated: true,
      login: (user, token) => {
        localStorage.setItem('token', token)
        set({ user, token, isAuthenticated: true })
      },
      logout: () => {
        set({ user: DEFAULT_USER, token: 'no-auth', isAuthenticated: true })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
