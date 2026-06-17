import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Language = 'ar' | 'en'

interface LangState {
  lang: Language
  dir: 'rtl' | 'ltr'
  toggleLang: () => void
  setLang: (lang: Language) => void
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: 'ar',
      dir: 'rtl',
      toggleLang: () =>
        set((state) => {
          const newLang = state.lang === 'ar' ? 'en' : 'ar'
          const newDir = newLang === 'ar' ? 'rtl' : 'ltr'
          document.documentElement.lang = newLang
          document.documentElement.dir = newDir
          return { lang: newLang, dir: newDir }
        }),
      setLang: (lang) => {
        const dir = lang === 'ar' ? 'rtl' : 'ltr'
        document.documentElement.lang = lang
        document.documentElement.dir = dir
        set({ lang, dir })
      },
    }),
    {
      name: 'lang-storage',
    }
  )
)
