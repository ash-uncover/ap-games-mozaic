import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

import CONFIG from 'config'

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    react: {
      useSuspense: false
    },
    backend: {
      loadPath: `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/locales/{{lng}}/{{ns}}.json`,
    }
  })

export default i18n
