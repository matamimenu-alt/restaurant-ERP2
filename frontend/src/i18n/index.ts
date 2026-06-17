import { ar } from './ar'
import { en } from './en'

export type Lang = 'ar' | 'en'
export type TranslationKey = keyof typeof ar

const translations = { ar, en }

export function t(key: TranslationKey, lang: Lang): string {
  return translations[lang][key] || translations['ar'][key] || key
}

export { ar, en }
