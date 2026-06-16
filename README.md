# Power House — Market Traders Initiative

Marketing website for the **Power House Market Traders Initiative**, an association
empowering market traders through training, market access, advocacy, and community
support.

Design direction: *"Modern Institutional" meets "Community Warmth"* — strong and
professional, but vibrant and accessible.

## Brand

| Token | Value | Use |
| --- | --- | --- |
| Navy / Slate | `#1A202C` | Authority, "Power" |
| Gold / Burnt Orange | `#F59E0B` | Commerce, energy, accent |
| Mist (Off-white) | `#F8FAFC` | Background |
| Montserrat / Bebas Neue | — | Headings |
| Inter | — | Body |

## Sections

- **Hero** — full-bleed darkened market image, "Empowering the Pulse of Trade", gold + outline CTAs
- **Aims** — 3×2 glassmorphism card grid with duotone icons, hover lift + accent recolor
- **Stats strip** — deep navy band with animated count-up figures
- **Trader Spotlight** — auto-playing testimonial carousel
- **News** — bento grid (varying card sizes)
- **Join CTA + Footer**

Micro-interactions use `framer-motion` (scroll fade-ins, staggered reveals). Mobile
navigation is a full-screen overlay.

## Tech

- [Next.js](https://nextjs.org) 16 (App Router)
- Tailwind CSS v4
- Framer Motion

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Notes

Imagery in `public/images/` is placeholder photography — replace with the
initiative's own photos before launch. Copy (trader names, stats, news) is sample
content to be swapped for real data.
