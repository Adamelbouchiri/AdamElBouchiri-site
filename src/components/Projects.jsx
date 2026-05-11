import { motion } from 'framer-motion'
import { ExternalLink, Github, Folder, Lock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../hooks/useScrollReveal'

function ProjectCard({ project, index }) {
  const { t } = useTranslation()
  const [ref, visible] = useScrollReveal()

  const sources = project.sources || (project.sourceUrl ? [{ url: project.sourceUrl }] : [])
  const hasAnyLink = sources.length > 0 || project.liveUrl

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-6 sm:p-8 card-lift group relative overflow-hidden h-full flex flex-col"
    >
      {/* Hover gradient */}
      <div
        className="absolute -top-32 -end-32 w-64 h-64 rounded-full opacity-0 group-hover:opacity-30 blur-3xl transition-all duration-700"
        style={{ background: 'radial-gradient(circle, #bf77f6, transparent)' }}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between mb-5">
        <div className="w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center group-hover:bg-accent-500/20 group-hover:rotate-6 transition-all duration-500">
          <Folder className="w-5 h-5 text-accent-500" />
        </div>
        {!hasAnyLink ? (
          <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-accent-500/10 text-accent-500 border border-accent-500/20 inline-flex items-center gap-1.5">
            <Lock className="w-3 h-3" />
            {t('projects.private')}
          </span>
        ) : (
          <div className="flex items-center gap-2">
            {sources.map((s) => {
              const label = s.label ? `${t('projects.code')} · ${s.label}` : t('projects.code')
              return (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label || t('projects.code')}
                  className="h-9 px-2.5 rounded-lg border border-accent-500/10 hover:border-accent-500/50 hover:bg-accent-500/10 flex items-center gap-1.5 transition-all"
                  aria-label={label}
                >
                  <Github className="w-4 h-4" />
                  {s.label && <span className="font-mono text-xs">{s.label}</span>}
                </a>
              )
            })}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-accent-500/10 hover:border-accent-500/50 hover:bg-accent-500/10 flex items-center justify-center transition-all"
                aria-label={t('projects.view')}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>

      <div className="relative flex-1 flex flex-col">
        <h3 className="font-mono text-xl font-semibold mb-2 group-hover:text-accent-500 transition-colors">
          {project.name}
        </h3>
        <p className="text-sm sm:text-base text-muted leading-relaxed mb-6 flex-1">{project.description}</p>

        <ul className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="font-mono text-xs px-2.5 py-1 rounded-md bg-accent-500/10 text-accent-500 border border-accent-500/20"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  const projects = t('projects.items', { returnObjects: true })
  const [headRef, visible] = useScrollReveal()

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl pointer-events-none"
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
          <p className="section-label">{t('projects.label')}</p>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance">
            {t('projects.title')}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
