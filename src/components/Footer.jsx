import { site } from '../config/site.js'
import mark from '../assets/eagle-forge-symbol-on-dark.svg'
import Wordmark from './Wordmark.jsx'
import { Item, Stagger } from './Reveal.jsx'

const columns = [
  ['Solutions', [['Tally + AI', '#solutions'], ['WhatsApp reminders', '#solutions'], ['Store sync', '#solutions'], ['Devices', '#solutions'], ['IT consultation', '#solutions']]],
  ['Products', [['Keryo', '#products'], ['Keryo Insights', '#products'], ['In the pipeline', '#pipeline']]],
  ['Company', [['How we work', '#process'], ['About', '#about'], ['Questions', '#faq'], ['Contact', '#contact']]],
]

export default function Footer() {
  return (
    <footer aria-labelledby="footer-title" className="border-t border-line bg-panel">
      <h2 id="footer-title" className="sr-only">
        Eagle Nexa
      </h2>
      <Stagger className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]" gap={0.1}>
        <Item className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <img src={mark} alt="" width="36" height="36" className="h-9 w-9" loading="lazy" />
            <Wordmark size="text-[24px]" underline />
          </div>
          <p className="mt-2 font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-amber">AI · Automation</p>
          <p className="mt-4 max-w-[300px] text-[14.5px] leading-relaxed text-muted">
            Accounting, online sales, customer messaging, devices and your website, joined into one working system.
          </p>
        </Item>
        {columns.map(([title, links]) => (
          <Item as="nav" key={title} aria-label={title}>
            <p className="font-display text-[14px] font-semibold text-white">{title}</p>
            <ul className="mt-4 space-y-2.5 text-[14.5px]">
              {links.map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="inline-block text-muted transition-[color,transform] duration-200 hover:translate-x-0.5 hover:text-crimson">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </Item>
        ))}
      </Stagger>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-[13px] text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Eagle Nexa, Vijayawada</p>
          <p>{site.address[2]}</p>
        </div>
      </div>
    </footer>
  )
}
