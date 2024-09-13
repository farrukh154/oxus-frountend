import en from '~/assets/locales/en-US.json'
import ru from '~/assets/locales/ru-RU.json'
import tj from '~/assets/locales/tj-TJ.json'

export const LOCALES = [
  {
    code: 'en',
    iso: 'en',
    name: 'English',
    file: 'en-US.json',
  },
  {
    code: 'ru',
    iso: 'ru',
    name: 'Русский',
    file: 'ru-RU.json',
    isCatchallLocale: true,
  },
  {
    code: 'tj',
    iso: 'tj',
    name: 'Тоҷикӣ',
    file: 'tj-TJ.json',
    isCatchallLocale: true,
  },
]

export default defineI18nConfig(() => ({
  legacy: false,
  strategy: 'prefix_except_default',
  defaultLocale: LOCALES[0].code,
  locale: LOCALES[0].code,
  messages: { en, ru, tj },
  detectBrowserLanguage: false,
}))
