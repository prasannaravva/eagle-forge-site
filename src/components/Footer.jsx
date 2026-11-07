import { site } from '../config/site.js'
import mark from '../assets/eagle-forge-symbol-on-dark.svg'
import Wordmark from './Wordmark.jsx'

const columns = [
  ['Solutions', [['Tally insights', '#solutions'], ['WhatsApp reminders', '#solutions'], ['Store sync', '#solutions'], ['Devices', '#solutions'], ['IT consultation', '#solutions']]],
  ['Products', [['Keryo', '#products'], ['Keryo Insights', '#products'], ['In the pipeline', '#pipeline']]],
  ['Company', [['How we work', '#process'], ['About', '#about'], ['Questions', '#faq'], ['Contact', '#contact']]],
]

export default function Footer() {
  return (
    <footer aria-labelledby="footer-title" className="border-t border-white/[0.06] pt-16">
      <h2 id="footer-title" className="sr-only">
        Eagle Nexa
      </h2>
      <div className="container-x grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={mark} alt="" width="44" height="44" className="h-11 w-11" loading="lazy" />
            <Wordmark size="text-[30px]" />
          </div>
          <p className="mt-5 max-w-[300px] text-[14px] leading-relaxed text-white/45">
            Integrated technology for small businesses: accounting, online sales, customer messaging, devices and web presence in one working system.
          </p>
        </div>
        {columns.map(([title, links]) => (
          <nav key={title} aria-label={title}>
            <p className="text-[13px] font-semibold text-white/80">{title}</p>
            <ul className="mt-4 space-y-3 text-[14px] text-white/45">
              {links.map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="transition-colors hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <p className="text-[13px] font-semibold text-white/80">Visit</p>
          <address className="mt-4 text-[14px] not-italic leading-relaxed text-white/45">
            {site.address.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <a href={`mailto:${site.email}`} className="mt-4 inline-block break-all text-[14px] text-white/70 underline decoration-white/20 underline-offset-4 hover:text-white">
            {site.email}
          </a>
        </div>
      </div>
      <div className="container-x mt-16 flex flex-col gap-2 border-t border-white/[0.06] py-6 text-[13px] text-white/35 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Eagle Nexa, Vijayawada</p>
        <p>Set in Geist and Fraunces (SIL Open Font License)</p>
      </div>
    </footer>
  )
}
