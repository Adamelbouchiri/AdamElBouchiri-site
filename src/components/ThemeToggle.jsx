import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { useTranslation } from 'react-i18next'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? t('ui.theme_light') : t('ui.theme_dark')}
      className="relative w-10 h-10 rounded-lg border border-accent-500/20 hover:border-accent-500/50 transition-all flex items-center justify-center group overflow-hidden"
    >
      <span className="absolute inset-0 bg-accent-500/0 group-hover:bg-accent-500/10 transition-colors" />
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="absolute"
      >
        <Moon className="w-4 h-4 text-accent-500" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? -180 : 0, scale: isDark ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="absolute"
      >
        <Sun className="w-4 h-4 text-accent-500" />
      </motion.div>
    </button>
  )
}
