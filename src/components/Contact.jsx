import { motion } from 'framer-motion'
import { Mail, Phone, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../hooks/useScrollReveal'

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Adamelbouchiri',
    icon: Github,
    handle: '@Adamelbouchiri',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/adam-el-bouchiri-aa99aa336',
    icon: Linkedin,
    handle: 'adam-el-bouchiri',
  },
]

const EMAIL_PERSONAL = 'elbouchiriadam@gmail.com'
const EMAIL_WORK = 'adam@taahud.sa'
const PHONE = '+212767759400'
const PHONE_DISPLAY = '+212 7 67 75 94 00'

export default function Contact() {
  const { t } = useTranslation()
  const [ref, visible] = useScrollReveal()

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="section-label justify-center" style={{ display: 'inline-flex' }}>
            {t('contact.label')}
          </p>
          <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-balance mt-3">
            {t('contact.title')}
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-base sm:text-lg text-muted text-balance">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* Primary contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid sm:grid-cols-3 gap-4 mb-6"
        >
          <a
            href={`mailto:${EMAIL_PERSONAL}`}
            className="glass rounded-2xl p-6 card-lift group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5 text-accent-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-xs text-accent-500 mb-0.5">{t('contact.email_personal')}</div>
              <div className="font-mono text-sm truncate">{EMAIL_PERSONAL}</div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-accent-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all rtl:scale-x-[-1] rtl:group-hover:-translate-x-1" />
          </a>

          <a
            href={`mailto:${EMAIL_WORK}`}
            className="glass rounded-2xl p-6 card-lift group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5 text-accent-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-xs text-accent-500 mb-0.5">{t('contact.email_work')}</div>
              <div className="font-mono text-sm truncate">{EMAIL_WORK}</div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-accent-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all rtl:scale-x-[-1] rtl:group-hover:-translate-x-1" />
          </a>

          <a href={`tel:${PHONE}`} className="glass rounded-2xl p-6 card-lift group flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5 text-accent-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-xs text-accent-500 mb-0.5">{t('contact.call_me')}</div>
              <div className="font-mono text-sm" dir="ltr">{PHONE_DISPLAY}</div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-accent-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all rtl:scale-x-[-1] rtl:group-hover:-translate-x-1" />
          </a>
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <p className="font-mono text-xs text-muted mb-3 text-center">{t('contact.social')}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {SOCIALS.map(({ label, href, icon: Icon, handle }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-4 card-lift group flex items-center gap-3"
              >
                <Icon className="w-5 h-5 text-accent-500" />
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs text-muted">{label}</div>
                  <div className="font-mono text-sm truncate">{handle}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent-500 transition-colors rtl:scale-x-[-1]" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
