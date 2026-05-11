import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'

const NAV_ITEMS = ['home', 'about', 'skills', 'projects', 'testimonials', 'contact']

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track active section
  useEffect(() => {
    const sections = NAV_ITEMS.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-white/70 dark:bg-ink-950/70 backdrop-blur-xl border-b border-accent-500/10'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 group"
          aria-label="Adam El Bouchiri — home"
        >
          <span className="font-mono text-lg font-bold tracking-tight">
            <span className="text-accent-500">~/</span>Adam
            <span className="text-accent-500 animate-blink">_</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 font-mono text-sm">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                className={`relative px-3 py-2 transition-colors ${
                  active === item ? 'text-accent-500' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <span className="opacity-50">/</span>
                {t(`nav.${item}`)}
                {active === item && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-0.5 h-px bg-accent-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-10 h-10 rounded-lg border border-accent-500/20 hover:border-accent-500/50 flex items-center justify-center"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="w-4 h-4 text-accent-500" /> : <Menu className="w-4 h-4 text-accent-500" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-accent-500/10 bg-white/80 dark:bg-ink-950/80 backdrop-blur-xl"
          >
            <ul className="px-5 py-4 font-mono text-base space-y-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <a
                    href={`#${item}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setOpen(false)
                      requestAnimationFrame(() => {
                        const target = document.getElementById(item)
                        if (!target) return
                        const top = target.getBoundingClientRect().top + window.pageYOffset - 72
                        window.scrollTo({ top, behavior: 'smooth' })
                        history.replaceState(null, '', `#${item}`)
                      })
                    }}
                    className="block py-2.5 px-3 rounded-lg hover:bg-accent-500/10 transition-colors"
                  >
                    <span className="text-accent-500">/</span>
                    {t(`nav.${item}`)}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
