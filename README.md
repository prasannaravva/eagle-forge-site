# Eagle Nexa website

One-page site for Eagle Nexa, Vijayawada: React 18, Tailwind CSS 3 and Framer Motion, built with Vite. Static, no server code.

**Live preview:** https://prasannaravva.github.io/eagle-forge-site/

Every push to `main` rebuilds and redeploys the preview through GitHub Actions (`.github/workflows/pages.yml`).

## Design

- **Direction (Nov 2026):** concept A, "AI-native", designed in Google Stitch (project 17480544976547713170) from a ui-ux-pro-max recommendation. Light first, white cards with hairline borders, crimson `#C81E3A` for actions and amber `#F59E0B` for signals. Space Grotesk for headings, DM Sans for text, JetBrains Mono for small system lines. The wordmark keeps Fraunces (self-hosted in `public/fonts`, SIL OFL).
- **Live piece:** the hero assistant (`Assistant.jsx`) answers three example questions from Tally, sales and sensors: it types the question, reads the source, streams the answer and fills a table. Visitors can pick a question; it cycles on its own until they do.
- **Themes:** light by default, with a dark theme from the sun/moon button in the header (remembered in `localStorage`, applied before first paint by a small script in `index.html`). The colour tokens (`white` = ink, `bg`, `card`, `raised`, `panel`, and the crimson/amber/green accents) are CSS variables in `src/styles/index.css`, so one set of classes serves both themes; only a few fixed-colour spots use `dark:` variants.
- **Sections:** hero, five solutions (Tally + AI, WhatsApp, store sync, IoT, IT consultation), products (Keryo, Keryo Insights) with the pipeline (HRMS, CRM, ERP, society management), how we work, about, questions, enquiry.
- **Visuals:** no photographs. Each service is shown as a product window built in HTML (business overview, Tally insights, WhatsApp reminders, store sync, devices) with example data that adds up across windows, each marked "Example data".
- **Live piece:** in the closing section visitors tick the tools they run, see the connections Eagle Forge would set up, and send an enquiry email pre-filled with their choices.

## Before launch

1. **Contact email:** set `email` in `src/config/site.js` (it is `hello@eaglenexa.example` now). Add a phone number or WhatsApp link there too if you want one.
2. **Example data:** the product windows use sample business names and figures. Keep them as illustrations or swap in real screenshots.
3. **Meta:** check `<title>` and `<meta name="description">` in `index.html`.

## Run, build, deploy

Needs Node.js 18 or newer.

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

**Production (eaglenexa.ai):** the site runs in Docker on an Oracle Cloud VM, served by Caddy with automatic HTTPS. Steps in [DEPLOY.md](DEPLOY.md); on the server it is `docker compose up -d --build`.

`npm run build` writes the static site to `dist/`. Upload `dist/` to any static host: Netlify or Cloudflare Pages (build `npm run build`, output `dist`), Vercel (preset "Vite"), or the web root of shared hosting.

## Structure

```
src/
  config/site.js        all copy, the address, the enquiry tools and connections
  styles/index.css      base styles, buttons, badges, chips, glows
  pages/Home.jsx        section order; sections below the fold are code-split
  components/
    Nav.jsx             header: logo, location tag, section links (current one marked), theme switch, action
    ThemeToggle.jsx     light/dark switch with a circular reveal
    Hero.jsx            headline, actions, the AI assistant, the "works with" tiles
    Assistant.jsx       the live assistant demo (three example conversations)
    Solutions.jsx       five solution cards, each with a small working detail
    Process.jsx         four numbered steps
    About.jsx           who we serve, values, office card with map link
    FAQ.jsx             @ssych accordion (components/ui), one open at a time
    Enquiry.jsx         tool picker, connections preview, enquiry form (mailto)
    Footer.jsx          lockup, link columns, address
    Reveal.jsx          scroll-in fade
  assets/               Eagle Forge logo SVGs
public/                 favicon, icons, site.webmanifest (from the logo kit)
```

## Performance and accessibility

- No photographs to download; visuals are HTML and SVG. Framer Motion features load after first paint through `LazyMotion`; five sections are separate chunks.
- One `h1`, a heading on every section, skip link, visible focus, `aria-expanded`/`aria-pressed` on toggles, a live region for the connections preview, and `prefers-reduced-motion` support.
