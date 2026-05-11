import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../hooks/useScrollReveal'

function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function TestimonialCard({ item, index }) {
  const [ref, visible] = useScrollReveal()

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-6 card-lift group relative overflow-hidden h-full flex flex-col"
    >
      <div
        className="absolute -top-20 -end-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle, #bf77f6, transparent)' }}
        aria-hidden="true"
      />

      <Quote className="w-6 h-6 text-accent-500/60 mb-3 rtl:scale-x-[-1]" aria-hidden="true" />

      <blockquote className="text-sm sm:text-[15px] leading-relaxed text-muted flex-1">
        {item.quote}
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 pt-4 border-t border-accent-500/10">
        <div className="w-10 h-10 rounded-full bg-accent-500/10 border border-accent-500/20 flex items-center justify-center font-mono text-xs font-semibold text-accent-500 shrink-0">
          {getInitials(item.name)}
        </div>
        <div className="min-w-0">
          <div className="font-mono text-sm font-semibold truncate">{item.name}</div>
          <div className="font-mono text-xs text-muted truncate">{item.role}</div>
        </div>
      </figcaption>
    </motion.figure>
  )
}

export default function Testimonials() {
  const { t } = useTranslation()
  const items = t('testimonials.items', { returnObjects: true })
  const [headRef, visible] = useScrollReveal()

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute top-1/3 end-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #bf77f6 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <p className="section-label">{t('testimonials.label')}</p>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance">
            {t('testimonials.title')}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <TestimonialCard key={item.name + i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
