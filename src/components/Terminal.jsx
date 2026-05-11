import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function Terminal() {
  const { t, i18n } = useTranslation()
  const lines = t('hero.terminal_lines', { returnObjects: true })
  const [printed, setPrinted] = useState([])
  const [currentLine, setCurrentLine] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const scrollRef = useRef(null)

  // Reset typing when language changes
  useEffect(() => {
    setPrinted([])
    setCurrentLine('')
    setLineIndex(0)
    setCharIndex(0)
  }, [i18n.resolvedLanguage])

  useEffect(() => {
    if (lineIndex >= lines.length) return

    const line = lines[lineIndex]
    const isCommand = line.startsWith('$')
    const charDelay = isCommand ? 45 : 18
    const lineGap = isCommand ? 240 : 380

    if (charIndex < line.length) {
      const timer = setTimeout(() => {
        setCurrentLine(line.slice(0, charIndex + 1))
        setCharIndex((c) => c + 1)
      }, charDelay)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setPrinted((p) => [...p, line])
        setCurrentLine('')
        setCharIndex(0)
        setLineIndex((i) => i + 1)
      }, lineGap)
      return () => clearTimeout(timer)
    }
  }, [charIndex, lineIndex, lines])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [printed, currentLine])

  const renderLine = (line, key, withCursor = false) => {
    const isCommand = line.startsWith('$')
    return (
      <div key={key} className="flex items-start gap-2 leading-relaxed" dir="ltr">
        {isCommand && <span className="text-accent-500 select-none">❯</span>}
        <span className={isCommand ? 'text-white' : 'text-accent-300'}>
          {isCommand ? line.slice(2) : line}
          {withCursor && <span className="inline-block w-2 h-4 bg-accent-500 ms-1 align-middle animate-blink" />}
        </span>
      </div>
    )
  }

  const isDone = lineIndex >= lines.length

  return (
    <div className="terminal noise relative w-full max-w-xl" dir="ltr">
      {/* Header */}
      <div className="terminal-header">
        <span className="terminal-dot bg-red-500/70" />
        <span className="terminal-dot bg-yellow-500/70" />
        <span className="terminal-dot bg-green-500/70" />
        <span className="ms-auto font-mono text-xs text-white/40">~/portfolio — zsh</span>
      </div>

      {/* Body */}
      <div
        ref={scrollRef}
        className="relative px-5 py-4 sm:px-6 sm:py-5 font-mono text-sm sm:text-[15px] text-white/90 h-72 sm:h-80 overflow-hidden"
      >
        <div className="scan-line" aria-hidden="true" />
        <div className="relative space-y-1.5">
          {printed.map((line, i) => renderLine(line, i))}
          {currentLine && renderLine(currentLine, 'current', true)}
          {isDone && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-accent-500 select-none">❯</span>
              <span className="inline-block w-2 h-4 bg-accent-500 animate-blink" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
