# Eagle Nexa website

One-page site for Eagle Nexa, Vijayawada: React 18, Tailwind CSS 3 and Framer Motion, built with Vite. Static, no server code.

**Live preview:** https://prasannaravva.github.io/eagle-forge-site/

Every push to `main` rebuilds and redeploys the preview through GitHub Actions (`.github/workflows/pages.yml`).

## Design

- **Reference:** xenriq.com (captured in `Xenriq_DESIGN.md`): near-black `#09090B`, white type at a few opacities, hairline borders, soft colour glows behind detailed product windows, alternating text/window rows, white pill buttons, Geist and Geist Mono.
- **Brand:** the Eagle Nexa wordmark is "Eagle" in Fraunces 500 with *Nexa* in Fraunces Italic 400 (self-hosted in `public/fonts`, SIL OFL). Eagle Nexa crimson `#C81E3A` and amber `#F59E0B` from the logo kit, used only as glows, status dots, the gradient headline word and small accents.
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

`npm run build` writes the static site to `dist/`. Upload `dist/` to any static host: Netlify or Cloudflare Pages (build `npm run build`, output `dist`), Vercel (preset "Vite"), or the web root of shared hosting.

## Structure

```
src/
  config/site.js        all copy, the address, the enquiry tools and connections
  styles/index.css      base styles, buttons, badges, chips, glows
  pages/Home.jsx        section order; sections below the fold are code-split
  components/
    Nav.jsx             fixed bar, blurs when scrolled; phone menu
    Hero.jsx            headline, CTAs, business-overview window, "works with" row
    Windows.jsx         the product windows (overview, Tally, WhatsApp, store, devices)
    Solutions.jsx       four alternating text + window rows
    Process.jsx         four steps
    About.jsx           who we serve, values, office card with map link
    FAQ.jsx             <details> accordion, one open at a time
    Enquiry.jsx         tool picker, connections preview, enquiry form (mailto)
    Footer.jsx          lockup, link columns, address
    Reveal.jsx          scroll-in fade
  assets/               Eagle Forge logo SVGs
public/                 favicon, icons, site.webmanifest (from the logo kit)
```

## Performance and accessibility

- No photographs to download; visuals are HTML and SVG. Framer Motion features load after first paint through `LazyMotion`; five sections are separate chunks.
- One `h1`, a heading on every section, skip link, visible focus, `aria-expanded`/`aria-pressed` on toggles, a live region for the connections preview, and `prefers-reduced-motion` support.
