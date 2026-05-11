import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../hooks/useScrollReveal'

const SKILL_GROUPS = {
  frontend: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
  backend: ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'Node.js', 'Eloquent ORM'],
  tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'Linux'],
}

function SkillCard({ category, items, index }) {
  const { t } = useTranslation()
  const [ref, visible] = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-6 sm:p-7 card-lift group relative overflow-hidden"
    >
      {/* Decorative gradient */}
      <div
        className="absolute -top-20 -end-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle, #bf77f6, transparent)' }}
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex items-center gap-2 mb-5">
          <span className="font-mono text-xs text-accent-500">[{String(index + 1).padStart(2, '0')}]</span>
          <h3 className="font-mono text-lg font-semibold">{t(`skills.categories.${category}`)}</h3>
        </div>

        <ul className="space-y-2">
          {items.map((skill, i) => (
            <motion.li
              key={skill}
              initial={{ opacity: 0, x: -10 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 }}
              className="flex items-center gap-2 font-mono text-sm text-muted hover:text-accent-500 transition-colors"
            >
              <span className="text-accent-500 select-none">▸</span>
              <span>{skill}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useTranslation()
  const [headRef, visible] = useScrollReveal()

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <p className="section-label">{t('skills.label')}</p>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance">
            {t('skills.title')}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(SKILL_GROUPS).map(([category, items], i) => (
            <SkillCard key={category} category={category} items={items} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
