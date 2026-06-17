import { useLangStore } from '@/store/langStore'
import { t } from '@/i18n'
import type { TranslationKey } from '@/i18n'

export function useLang() {
  const { lang, dir, toggleLang, setLang } = useLangStore()

  const translate = (key: TranslationKey) => t(key, lang)

  return { lang, dir, toggleLang, setLang, t: translate }
}
