import { m } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]
const inView = { once: true, amount: 0.4 }

/*
  Product windows: detailed mock-ups of the systems Eagle Nexa builds.
  All figures are example data and add up across windows.
*/

const glows = { crimson: 'glow-crimson', amber: 'glow-amber', green: 'glow-green' }

export function Window({ title, glow = 'crimson', children, className = '', footer }) {
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden="true" className={`pointer-events-none absolute -inset-16 -z-10 blur-2xl ${glows[glow]}`} />
      <div
        data-ui
        className="overflow-hidden rounded-2xl bg-panel shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_24px_80px_-12px_rgba(0,0,0,0.8)]"
      >
        <div className="relative flex h-10 items-center border-b border-white/[0.06] px-4">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <p className="absolute inset-x-0 text-center text-[12px] text-white/40">{title}</p>
        </div>
        {children}
        {footer && (
          <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-2 font-mono text-[11px] text-white/35">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

function Dot({ className = 'bg-ok' }) {
  return <span aria-hidden="true" className={`inline-block h-1.5 w-1.5 rounded-full ${className}`} />
}

function Label({ children }) {
  return <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">{children}</p>
}

function Tick() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
      <path d="M2 6.5 4.8 9 10 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ---------- Hero: the whole business on one screen ---------- */

const week = [
  { d: 'Mon', v: 62 },
  { d: 'Tue', v: 74 },
  { d: 'Wed', v: 58 },
  { d: 'Thu', v: 81 },
  { d: 'Fri', v: 92 },
  { d: 'Sat', v: 70 },
  { d: 'Sun', v: 34 },
]

const feed = [
  { t: '10:02', text: 'Reminder sent to Sai Agencies', src: 'WhatsApp', tone: 'bg-ok' },
  { t: '09:48', text: 'Order 1042 synced, invoice raised', src: 'Shopify → Tally', tone: 'bg-amber' },
  { t: '09:30', text: 'Cold room 2 at 4.1 °C, normal', src: 'Sensor', tone: 'bg-sky-400' },
  { t: '09:15', text: 'Weekly sales report sent to owner', src: 'Tally → WhatsApp', tone: 'bg-crimson-soft' },
]

export function OverviewWindow() {
  return (
    <Window title="Eagle Nexa · Business overview" footer={<><span>Example data</span><span className="flex items-center gap-1.5"><Dot /> 5 systems connected</span></>}>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[13px] text-white/45">Thursday, 6 November</p>
            <p className="mt-0.5 text-lg font-semibold tracking-[-0.01em]">Good morning, Sri Lakshmi Traders</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-ok/10 px-3 py-1 text-[12px] font-medium text-ok ring-1 ring-inset ring-ok/25">
            <Dot className="animate-pulse-dot bg-ok" /> All systems in sync
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {[
            ['Sales today', '₹1,84,300', 'from Tally', 'text-white'],
            ['Overdue', '₹1,12,400', '3 dealers, 30+ days', 'text-crimson-soft'],
            ['Reminders sent', '42', 'on WhatsApp this week', 'text-white'],
            ['Store orders', '18', 'Shopify and WooCommerce', 'text-white'],
          ].map(([k, v, s, c]) => (
            <div key={k} className="rounded-xl bg-white/[0.03] p-3.5 ring-1 ring-inset ring-white/[0.06]">
              <Label>{k}</Label>
              <p className={`mt-2 font-mono text-xl font-medium tracking-[-0.02em] sm:text-2xl ${c}`}>{v}</p>
              <p className="mt-1 text-[12px] text-white/40">{s}</p>
            </div>
          ))}
        </div>

        <div className="mt-2.5 grid gap-2.5 lg:grid-cols-5">
          <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-inset ring-white/[0.06] lg:col-span-3">
            <div className="flex items-baseline justify-between">
              <Label>Sales this week, ₹ thousands</Label>
              <p className="font-mono text-[12px] text-white/45">target 75</p>
            </div>
            <div className="relative mt-4 flex h-36 items-end gap-2.5 sm:gap-4" role="img" aria-label="Daily sales this week against a target of 75 thousand rupees; Thursday and Friday above target">
              <div className="absolute inset-x-0 border-t border-dashed border-white/20" style={{ bottom: '75%' }} aria-hidden="true" />
              {week.map((b) => (
                <div key={b.d} className="flex flex-1 flex-col items-center gap-2">
                  <m.div
                    className={`w-full origin-bottom rounded-md ${b.v >= 75 ? 'bg-gradient-to-t from-crimson to-crimson-soft' : 'bg-white/[0.12]'}`}
                    style={{ height: `${b.v * 1.2}px` }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={inView}
                    transition={{ duration: 0.8, ease, delay: 0.9 + week.indexOf(b) * 0.07 }}
                  />
                  <span className="font-mono text-[11px] text-white/35">{b.d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-inset ring-white/[0.06] lg:col-span-2">
            <Label>Activity</Label>
            <ul className="mt-3 space-y-3">
              {feed.map((f) => (
                <li key={f.t} className="flex gap-3">
                  <span className="mt-[7px]">
                    <Dot className={f.tone} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] text-white/85">{f.text}</p>
                    <p className="font-mono text-[11px] text-white/35">
                      {f.t} · {f.src}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-2.5 flex items-center gap-3 rounded-xl bg-white/[0.03] px-4 py-3 ring-1 ring-inset ring-white/[0.06]">
          <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-amber" aria-hidden="true">
            <path d="M10 2l1.8 4.7L16.5 8l-4.7 1.8L10 14.5 8.2 9.8 3.5 8l4.7-1.3L10 2zM15.5 13l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" fill="currentColor" />
          </svg>
          <p className="truncate text-[13px] text-white/50">Ask: which dealers are more than 30 days overdue?</p>
          <span className="ml-auto hidden rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[11px] text-white/40 sm:block">Enter</span>
        </div>
      </div>
    </Window>
  )
}

/* ---------- Tally insights ---------- */

const districts = [
  { n: 'Krishna', t: 6.0, a: 6.6 },
  { n: 'Guntur', t: 4.5, a: 3.9 },
  { n: 'NTR', t: 5.0, a: 5.2 },
]

export function TallyWindow() {
  return (
    <Window title="Tally insights · Target vs actual" glow="crimson" footer={<><span>Week 45 · ₹ lakh</span><span>Example data</span></>}>
      <div className="space-y-5 p-5 sm:p-6">
        <div className="flex items-end justify-between">
          <div>
            <Label>This week</Label>
            <p className="mt-1 font-mono text-3xl font-medium tracking-[-0.03em]">₹15.7 L</p>
          </div>
          <p className="rounded-full bg-ok/10 px-2.5 py-1 font-mono text-[12px] text-ok ring-1 ring-inset ring-ok/25">101% of target</p>
        </div>
        <div className="space-y-4">
          {districts.map((d) => {
            const pct = Math.round((d.a / d.t) * 100)
            return (
              <div key={d.n}>
                <div className="flex items-baseline justify-between text-[13px]">
                  <span className="text-white/80">{d.n}</span>
                  <span className="font-mono text-white/50">
                    {d.a.toFixed(1)} / {d.t.toFixed(1)}{' '}
                    <span className={pct < 100 ? 'text-amber' : 'text-white/80'}>{pct}%</span>
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                  <m.div
                    className={`h-full origin-left rounded-full ${pct < 100 ? 'bg-amber' : 'bg-gradient-to-r from-crimson to-crimson-soft'}`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={inView}
                    transition={{ duration: 1, ease, delay: 0.3 + districts.indexOf(d) * 0.12 }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-inset ring-white/[0.06]">
          <p className="text-[13px] text-white/50">Which dealers are more than 30 days overdue?</p>
          <p className="mt-2 text-[13px] text-white/85">3 dealers owe ₹1,12,400 in all:</p>
          <ul className="mt-2 space-y-1.5 font-mono text-[12px]">
            {[
              ['Sai Agencies', '₹52,000', '41 d'],
              ['Venkata Traders', '₹38,900', '34 d'],
              ['Ganesh Stores', '₹21,500', '31 d'],
            ].map(([n, a, d]) => (
              <li key={n} className="flex justify-between">
                <span className="font-sans text-[13px] text-white/75">{n}</span>
                <span className="text-white/50">
                  {a} <span className="text-amber">{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Window>
  )
}

/* ---------- WhatsApp reminders ---------- */

export function WhatsAppWindow() {
  const rows = [
    ['Sai Agencies', '₹52,000', 'Read', 'text-sky-400'],
    ['Venkata Traders', '₹38,900', 'Paid', 'text-ok'],
    ['Ganesh Stores', '₹21,500', 'Delivered', 'text-white/50'],
  ]
  return (
    <Window title="WhatsApp · Payment reminders" glow="green" footer={<><span>Runs every Monday 10:00</span><span>Example data</span></>}>
      <div className="grid gap-5 p-5 sm:grid-cols-[1fr_0.9fr] sm:p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {[
              ['Sent', '42'],
              ['Delivered', '40'],
              ['Read', '31'],
              ['Paid', '12'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-white/[0.03] px-2.5 py-2 ring-1 ring-inset ring-white/[0.06]">
                <p className="font-mono text-lg">{v}</p>
                <p className="text-[11px] text-white/40">{k}</p>
              </div>
            ))}
          </div>
          <ul className="divide-y divide-white/[0.06] rounded-lg bg-white/[0.02] ring-1 ring-inset ring-white/[0.06]">
            {rows.map(([n, a, s, c]) => (
              <li key={n} className="flex items-center justify-between gap-3 px-3 py-2.5 text-[13px]">
                <span className="min-w-0 truncate text-white/80">{n}</span>
                <span className="shrink-0 font-mono text-[12px] text-white/45">
                  {a} <span className={`ml-2 ${c}`}>{s}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-[#0b141a] p-3">
          <m.div className="ml-auto max-w-[250px] rounded-xl rounded-tr-sm bg-[#005c4b] px-3 py-2 text-[13px] leading-snug text-white" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.6, ease, delay: 0.3 }}>
            <p>Namaste. A reminder from Sri Lakshmi Traders: bill 2184 for ₹48,600 was due on 25 October. Reply PAID if it is settled.</p>
            <p className="mt-1 flex items-center justify-end gap-1 text-[11px] text-white/70">
              10:02
              <span className="flex text-[#53bdeb]" aria-label="Read">
                <Tick />
                <span className="-ml-1.5">
                  <Tick />
                </span>
              </span>
            </p>
          </m.div>
          <m.div className="mt-2 max-w-[170px] rounded-xl rounded-tl-sm bg-[#202c33] px-3 py-2 text-[13px] text-white" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.6, ease, delay: 0.9 }}>
            PAID, sent by UPI today
          </m.div>
          <m.div className="mt-2 ml-auto w-max rounded-full bg-ok/15 px-2.5 py-1 text-[11px] text-ok" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.6, ease, delay: 1.4 }}>
            Marked paid in Tally
          </m.div>
        </div>
      </div>
    </Window>
  )
}

/* ---------- Store to books ---------- */

export function StoreWindow() {
  const steps = [
    ['09:47:12', 'Order 1042 placed', 'Shopify'],
    ['09:47:13', 'Payment confirmed', '₹2,340 via UPI'],
    ['09:47:15', 'Invoice raised in Tally', 'Sales voucher 3318'],
    ['09:47:15', 'Stock updated', '3 items, 2 godowns'],
    ['09:47:16', 'Customer told on WhatsApp', 'Dispatch by Friday'],
  ]
  return (
    <Window title="Store sync · Order 1042" glow="amber" footer={<><span>4 seconds, no typing</span><span>Example data</span></>}>
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between rounded-xl bg-white/[0.03] p-4 ring-1 ring-inset ring-white/[0.06]">
          <div>
            <p className="font-semibold">Order 1042</p>
            <p className="text-[12px] text-white/45">3 items · Shopify</p>
          </div>
          <p className="font-mono text-xl">₹2,340</p>
        </div>
        <ol className="relative mt-5 space-y-4 pl-6">
          <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-amber/60 via-white/15 to-ok/60" />
          {steps.map(([t, a, b], i) => (
            <m.li key={a} className="relative" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.12 }}>
              <span
                className={`absolute -left-6 top-0.5 flex h-[15px] w-[15px] items-center justify-center rounded-full ${
                  i === steps.length - 1 ? 'bg-ok text-bg' : 'bg-amber text-bg'
                }`}
                aria-hidden="true"
              >
                <Tick />
              </span>
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[13px] text-white/85">{a}</p>
                <p className="font-mono text-[11px] text-white/35">{t}</p>
              </div>
              <p className="text-[12px] text-white/45">{b}</p>
            </m.li>
          ))}
        </ol>
      </div>
    </Window>
  )
}

/* ---------- Devices ---------- */

const temps = [4.0, 4.1, 4.3, 4.2, 4.6, 5.1, 5.9, 6.8, 7.6, 8.3, 8.6, 8.4]

export function DevicesWindow() {
  const max = 10
  const pts = temps.map((v, i) => `${(i / (temps.length - 1)) * 300},${100 - (v / max) * 100}`).join(' ')
  return (
    <Window title="Devices · Live" glow="crimson" footer={<><span>Readings every 5 minutes</span><span>Example data</span></>}>
      <div className="relative p-5 sm:p-6">
        <div className="grid grid-cols-3 gap-2">
          {[
            ['Cold room 1', '8.6 °C', 'text-crimson-soft', 'Above 8 °C'],
            ['Cold room 2', '4.1 °C', 'text-white', 'Normal'],
            ['Godown humidity', '61%', 'text-white', 'Normal'],
          ].map(([n, v, c, s]) => (
            <div key={n} className="rounded-lg bg-white/[0.03] p-3 ring-1 ring-inset ring-white/[0.06]">
              <p className="truncate text-[11px] text-white/45">{n}</p>
              <p className={`mt-1 font-mono text-lg ${c}`}>{v}</p>
              <p className={`text-[11px] ${c === 'text-white' ? 'text-white/40' : c}`}>{s}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-white/[0.03] p-4 ring-1 ring-inset ring-white/[0.06]">
          <div className="flex justify-between">
            <Label>Cold room 1, last hour</Label>
            <p className="font-mono text-[11px] text-crimson-soft">limit 8 °C</p>
          </div>
          <svg viewBox="0 0 300 100" className="mt-3 h-28 w-full overflow-visible" role="img" aria-label="Cold room 1 temperature rising from 4 to 8.6 degrees over the last hour, crossing the 8 degree limit">
            <defs>
              <linearGradient id="dev-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#c81e3a" stopOpacity="0.35" />
                <stop offset="1" stopColor="#c81e3a" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" x2="300" y1="20" y2="20" stroke="#fb7185" strokeOpacity="0.6" strokeDasharray="4 4" />
            <polygon points={`0,100 ${pts} 300,100`} fill="url(#dev-fill)" />
            <m.polyline points={pts} fill="none" stroke="#fb7185" strokeWidth="2" strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={inView} transition={{ duration: 1.4, ease, delay: 0.2 }} />
          </svg>
        </div>
        <div className="pointer-events-none absolute inset-x-5 bottom-5 animate-toast sm:inset-x-6">
          <div className="flex items-center gap-3 rounded-xl bg-raised/95 px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_16px_40px_rgba(0,0,0,0.6)]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ok/15 text-ok">
              <Tick />
            </span>
            <p className="text-[13px] text-white/85">Alert sent on WhatsApp: Cold room 1 is at 8.6 °C</p>
          </div>
        </div>
      </div>
    </Window>
  )
}

/* ---------- IT consultation ---------- */

const findings = [
  ['Keep', 'TallyPrime as the single source of figures', 'text-ok', 'bg-ok/10 ring-ok/25'],
  ['Connect', 'Online store to Tally: invoices and stock', 'text-amber', 'bg-amber/10 ring-amber/25'],
  ['Move', 'Dealer WhatsApp groups to managed broadcasts', 'text-sky-400', 'bg-sky-400/10 ring-sky-400/25'],
  ['Replace', 'Paper visitor and stock registers', 'text-crimson-soft', 'bg-crimson/10 ring-crimson/30'],
]

export function ConsultWindow() {
  return (
    <Window title="IT review · Findings and plan" glow="crimson" footer={<><span>4 steps, in order</span><span>Example data</span></>}>
      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex items-end justify-between">
          <div>
            <Label>Systems reviewed</Label>
            <p className="mt-1 font-mono text-3xl font-medium tracking-[-0.03em]">7</p>
          </div>
          <div className="text-right">
            <Label>Hours of manual work found</Label>
            <p className="mt-1 font-mono text-3xl font-medium tracking-[-0.03em] text-amber">38 / month</p>
          </div>
        </div>
        <ol className="space-y-2.5">
          {findings.map(([tag, text, tc, bg], i) => (
            <m.li
              key={text}
              className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-4 py-3 ring-1 ring-inset ring-white/[0.06]"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inView}
              transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.12 }}
            >
              <span className={`w-[68px] shrink-0 rounded-full px-2 py-0.5 text-center text-[11px] font-medium ring-1 ring-inset ${tc} ${bg}`}>{tag}</span>
              <span className="text-[13px] text-white/85">{text}</span>
            </m.li>
          ))}
        </ol>
      </div>
    </Window>
  )
}
