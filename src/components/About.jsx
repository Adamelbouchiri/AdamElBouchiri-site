import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../hooks/useScrollReveal'

const stats = [
  { key: 'experience', value: '2+' },
  { key: 'projects', value: '12' },
  { key: 'tech', value: '12' },
]

export default function About() {
  const { t } = useTranslation()
  const [ref, visible] = useScrollReveal()

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start"
        >
          {/* Left: heading */}
          <div className="lg:col-span-5">
            <p className="section-label">{t('about.label')}</p>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance">
              {t('about.title')}
            </h2>
          </div>

          {/* Right: text + stats */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-base sm:text-lg text-muted leading-relaxed">{t('about.p1')}</p>
            <p className="text-base sm:text-lg text-muted leading-relaxed">{t('about.p2')}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6">
              {stats.map((s, i) => (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="glass rounded-xl p-4 sm:p-5 card-lift"
                >
                  <div className="font-mono text-3xl sm:text-4xl font-bold text-accent-500">{s.value}</div>
                  <div className="font-mono text-xs sm:text-sm text-muted mt-1">{t(`about.stats.${s.key}`)}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
