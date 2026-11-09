import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useInView, useReducedMotion } from 'framer-motion'
import { Bell, Database, FileText, Send, Sparkles } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

/* Example conversations. Figures match the rest of the site (overview, Tally and devices). */
export const conversations = [
  {
    chip: 'Overdue dealers',
    q: 'Which dealers are more than 30 days overdue?',
    source: 'Read Tally Prime · receivables',
    answer: '3 dealers are more than 30 days overdue, ₹1,12,400 in all. Sai Agencies is the largest.',
    cols: ['Dealer', 'Balance', 'Age'],
    rows: [
      ['Sai Agencies', '₹52,000', '41 days'],
      ['Venkata Traders', '₹38,900', '34 days'],
      ['Ganesh Stores', '₹21,500', '31 days'],
    ],
    tone: 'text-crimson',
    action: { label: 'Send WhatsApp reminders', icon: Send },
    secondary: 'Export to Excel',
  },
  {
    chip: 'Sales vs target',
    q: 'How are sales against target this week?',
    source: 'Read Tally Prime · sales vouchers',
    answer: '₹15.7 lakh against a ₹15.5 lakh target, 101%. Guntur is behind at 87%.',
    cols: ['District', 'Actual / target', 'Progress'],
    rows: [
      ['Krishna', '₹6.6 L / ₹6.0 L', '110%'],
      ['NTR', '₹5.2 L / ₹5.0 L', '104%'],
      ['Guntur', '₹3.9 L / ₹4.5 L', '87%'],
    ],
    tone: 'text-white',
    flag: 2,
    action: { label: 'Send report to owner', icon: FileText },
    secondary: 'Open dashboard',
  },
  {
    chip: 'Cold room check',
    q: 'Is the cold room within limits?',
    source: 'Read 3 sensors · live',
    answer: 'Yes. All three rooms are inside your limits. Cold room 2 is the warmest at 4.1 °C.',
    cols: ['Room', 'Now', 'Limit'],
    rows: [
      ['Cold room 1', '3.8 °C', '2–6 °C'],
      ['Cold room 2', '4.1 °C', '2–6 °C'],
      ['Freezer', '−18.2 °C', 'below −15 °C'],
    ],
    tone: 'text-ok',
    action: { label: 'Alert me on WhatsApp', icon: Bell },
    secondary: 'See all devices',
  },
]

/**
 * The hero's live piece: an assistant answering from the business's own systems. It types the
 * question, reads the source, streams the answer and fills the table. Visitors can pick another
 * question; until they do, it moves on by itself every few seconds while it is on screen.
 */
export default function Assistant() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })
  const [idx, setIdx] = useState(0)
  const [touched, setTouched] = useState(false)
  const [typed, setTyped] = useState(0)
  const [phase, setPhase] = useState('ask') // ask → read → answer → done
  const [words, setWords] = useState(0)
  const c = conversations[idx]
  const answerWords = c.answer.split(' ')

  // Play one conversation.
  useEffect(() => {
    if (reduce) {
      setTyped(c.q.length)
      setWords(answerWords.length)
      setPhase('done')
      return
    }
    setTyped(0)
    setWords(0)
    setPhase('ask')
    const timers = []
    const at = (ms, fn) => timers.push(setTimeout(fn, ms))
    const typeMs = 22
    for (let i = 1; i <= c.q.length; i++) at(200 + i * typeMs, () => setTyped(i))
    const asked = 200 + c.q.length * typeMs + 250
    at(asked, () => setPhase('read'))
    const read = asked + 900
    at(read, () => setPhase('answer'))
    for (let w = 1; w <= answerWords.length; w++) at(read + w * 55, () => setWords(w))
    at(read + answerWords.length * 55 + 200, () => setPhase('done'))
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, reduce])

  // Move on by itself until the visitor picks a question.
  useEffect(() => {
    if (touched || reduce || phase !== 'done' || !inView) return
    const t = setTimeout(() => setIdx((i) => (i + 1) % conversations.length), 5200)
    return () => clearTimeout(t)
  }, [phase, touched, reduce, inView])

  const pick = (i) => {
    setTouched(true)
    setIdx(i)
  }
  const Icon = c.action.icon
  const showRead = phase !== 'ask'
  const showAnswer = phase === 'answer' || phase === 'done'
  const done = phase === 'done'

  return (
    <div ref={ref}>
      <div data-ui className="overflow-hidden rounded-xl border border-line bg-card shadow-[0_24px_60px_-28px_rgb(15_23_42/0.35)]">
        {/* Title bar */}
        <div className="flex h-11 items-center justify-between gap-3 border-b border-line bg-raised px-4">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <p className="flex min-w-0 items-center gap-2 truncate text-[12.5px] text-muted">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ok" aria-hidden="true" />
            Eagle Nexa assistant · connected to Tally Prime, WhatsApp, 3 sensors
          </p>
          <span className="w-10" aria-hidden="true" />
        </div>

        {/* Conversation */}
        <div className="min-h-[392px] space-y-4 p-4 sm:p-6" aria-live="polite">
          <div className="flex justify-end">
            <p className="max-w-[85%] rounded-lg rounded-br-sm bg-[#0f172a] px-4 py-2.5 text-[14.5px] text-[#f8fafc] dark:bg-raised dark:text-white">
              {c.q.slice(0, typed)}
              {!reduce && typed < c.q.length && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-current" aria-hidden="true" />}
            </p>
          </div>

          <AnimatePresence>
            {showRead && (
              <m.div key={`read-${idx}`} className="flex items-start gap-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }}>
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-crimson/10 text-crimson">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="inline-flex items-center gap-1.5 rounded border border-amber-soft/40 bg-amber-soft/10 px-2 py-0.5 font-mono text-[11.5px] text-amber">
                    <Database className="h-3 w-3" aria-hidden="true" />
                    {c.source}
                    {phase === 'read' && <span className="ml-1 h-1.5 w-1.5 animate-pulse rounded-full bg-amber-soft" aria-hidden="true" />}
                  </p>

                  {showAnswer && (
                    <p className="mt-3 text-[15px] leading-relaxed text-white">
                      {answerWords.slice(0, words).join(' ')}
                    </p>
                  )}

                  {done && (
                    <m.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease }}>
                      <table className="num mt-4 w-full overflow-hidden rounded-md border border-line text-left text-[13.5px]">
                        <thead className="bg-raised text-[11.5px] uppercase tracking-[0.05em] text-muted">
                          <tr>
                            {c.cols.map((h, i) => (
                              <th key={h} className={`px-3 py-2 font-display font-semibold ${i > 0 ? 'text-right' : ''}`}>
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {c.rows.map((r, ri) => (
                            <m.tr
                              key={r[0]}
                              className="border-t border-line"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.08 * ri }}
                            >
                              <td className="px-3 py-2 text-white">{r[0]}</td>
                              <td className={`whitespace-nowrap px-3 py-2 text-right ${c.tone}`}>{r[1]}</td>
                              <td className={`whitespace-nowrap px-3 py-2 text-right ${c.flag === ri ? 'font-semibold text-amber' : 'text-muted'}`}>{r[2]}</td>
                            </m.tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex h-9 items-center gap-2 rounded-md bg-crimson px-3.5 font-display text-[13.5px] font-medium text-[#fff]">
                          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                          {c.action.label}
                        </span>
                        <span className="inline-flex h-9 items-center rounded-md border border-line px-3.5 font-display text-[13.5px] font-medium text-white">{c.secondary}</span>
                      </div>
                    </m.div>
                  )}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between border-t border-line bg-raised px-4 py-2 font-mono text-[11px] text-muted">
          <span>Reads your data · never changes a bill</span>
          <span>Example data</span>
        </div>
      </div>

      {/* Suggested questions: the visitor's way in */}
      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Ask the assistant">
        <span className="text-[13px] text-muted">Try asking:</span>
        {conversations.map((cv, i) => (
          <button
            key={cv.chip}
            type="button"
            aria-pressed={i === idx}
            onClick={() => pick(i)}
            className={`inline-flex h-8 items-center rounded-full border px-3 font-display text-[13px] font-medium transition-colors duration-200 ${
              i === idx ? 'border-crimson bg-crimson/[0.08] text-crimson' : 'border-line bg-card text-muted hover:border-white/25 hover:text-white'
            }`}
          >
            {cv.chip}
          </button>
        ))}
      </div>
    </div>
  )
}
