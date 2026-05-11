import { useState, useRef, useEffect } from 'react'
import { Languages, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { current, languages, changeLanguage } = useLanguage()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t('ui.lang_label')}
        aria-expanded={open}
        className="h-10 px-3 rounded-lg border border-accent-500/20 hover:border-accent-500/50 transition-all flex items-center gap-1.5 font-mono text-xs group"
      >
        <Languages className="w-4 h-4 text-accent-500" />
        <span className="text-accent-500 font-semibold">{current.label}</span>
        <ChevronDown className={`w-3 h-3 text-accent-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute end-0 mt-2 w-44 glass rounded-lg overflow-hidden z-50 shadow-2xl"
            role="listbox"
          >
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => {
                    changeLanguage(lang.code)
                    setOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-mono transition-colors hover:bg-accent-500/10 ${
                    current.code === lang.code ? 'text-accent-500 bg-accent-500/5' : ''
                  }`}
                  role="option"
                  aria-selected={current.code === lang.code}
                >
                  <span>{lang.name}</span>
                  <span className="text-xs opacity-60">{lang.label}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
