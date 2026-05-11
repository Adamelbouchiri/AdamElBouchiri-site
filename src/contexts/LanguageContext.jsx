import { createContext, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGS } from '../i18n'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation()
  const current = SUPPORTED_LANGS.find((l) => l.code === i18n.resolvedLanguage) || SUPPORTED_LANGS[0]

  useEffect(() => {
    document.documentElement.lang = current.code
    document.documentElement.dir = current.dir
    document.documentElement.classList.toggle('rtl', current.dir === 'rtl')
  }, [current])

  const changeLanguage = (code) => {
    i18n.changeLanguage(code)
  }

  return (
    <LanguageContext.Provider value={{ current, languages: SUPPORTED_LANGS, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
