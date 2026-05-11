import { useTranslation } from 'react-i18next'
import { Github, Linkedin } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-accent-500/10 py-10 mt-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs sm:text-sm text-muted">
          <span className="text-accent-500">© {year}</span> · {t('footer.made_with')}
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Adamelbouchiri"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-accent-500/10 hover:border-accent-500/50 hover:bg-accent-500/10 flex items-center justify-center transition-all"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/adam-el-bouchiri-aa99aa336"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-accent-500/10 hover:border-accent-500/50 hover:bg-accent-500/10 flex items-center justify-center transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
