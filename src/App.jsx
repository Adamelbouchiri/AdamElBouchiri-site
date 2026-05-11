import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useLanguage } from './contexts/LanguageContext'

// SEO metadata per language
const META = {
  en: {
    title: 'Adam El Bouchiri — Fullstack Developer | React, Laravel',
    description: 'Mid-level fullstack developer based in Morocco. Building modern web experiences with React, Laravel, and Tailwind CSS.',
  },
  fr: {
    title: 'Adam El Bouchiri — Développeur Fullstack | React, Laravel',
    description: 'Développeur fullstack de niveau intermédiaire basé au Maroc. Création d\'expériences web modernes avec React, Laravel et Tailwind CSS.',
  },
  ar: {
    title: 'آدم البوشيري — مطور ويب متكامل | React و Laravel',
    description: 'مطور ويب متكامل بمستوى متوسط مقيم في المغرب. أبني تجارب ويب حديثة باستخدام React و Laravel و Tailwind CSS.',
  },
}

// Cursor-follow glow (desktop only)
function CursorGlow() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[1] w-[500px] h-[500px] rounded-full blur-3xl transition-opacity duration-500"
      style={{
        left: pos.x - 250,
        top: pos.y - 250,
        opacity: visible ? 0.15 : 0,
        background: 'radial-gradient(circle, #bf77f6 0%, transparent 70%)',
      }}
    />
  )
}

function App() {
  const { current } = useLanguage()
  const meta = META[current.code] || META.en

  return (
    <>
      <Helmet>
        <html lang={current.code} dir={current.dir} />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:locale" content={current.code === 'en' ? 'en_US' : current.code === 'fr' ? 'fr_FR' : 'ar_MA'} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
      </Helmet>

      <CursorGlow />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent-500 focus:text-white focus:rounded-lg focus:font-mono focus:text-sm"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
