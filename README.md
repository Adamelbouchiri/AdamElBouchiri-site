# Adam El Bouchiri — Portfolio

Modern, animated, multilingual portfolio site. Terminal/glass aesthetic.

**Stack:** React 18 · Vite · Tailwind CSS · Framer Motion · i18next

**Features:**
- 🌐 Three languages: English, French, Arabic (with full RTL support)
- 🌗 Dark / Light mode with smooth color transitions
- ⚡ Terminal-style hero with typing animation
- 🎨 Glass morphism cards, ambient gradients, cursor-follow glow
- 📱 Mobile-first responsive (works beautifully on every screen)
- 🔍 Full SEO: meta tags, Open Graph, JSON-LD structured data, sitemap, hreflang
- ♿ Accessible: skip link, ARIA labels, reduced-motion support, keyboard nav
- 🚀 Production-ready: code splitting, lazy-loaded fonts, optimized build

---

## Quick start

```bash
# install
npm install

# dev (http://localhost:5173)
npm run dev

# build
npm run build

# preview production build
npm run preview
```

Requires Node 18+.

---

## Customization checklist

Before deploying, edit these:

### 1. Replace placeholder email
**File:** `src/components/Contact.jsx`
```js
const EMAIL = 'adam.elbouchiri@example.com' // <-- your real email
```

### 2. Update your real projects
**Files:** `src/i18n/en.json`, `fr.json`, `ar.json` — edit the `projects.items` array.
Then in `src/components/Projects.jsx`, replace the `href="#"` on the GitHub & live links with real URLs.

### 3. Adjust the stat numbers
**Files:** `src/i18n/*.json` and `src/components/About.jsx`:
```js
const stats = [
  { key: 'experience', value: '3+' },  // your years
  { key: 'projects', value: '20+' },   // projects shipped
  { key: 'tech', value: '12' },        // technologies
]
```

### 4. Domain & SEO
Search and replace `https://adamelbouchiri.com` across:
- `index.html`
- `public/sitemap.xml`
- `public/robots.txt`

### 5. Open Graph image
Drop a 1200×630 PNG at `public/og-image.png` for nice link previews on social media.

### 6. (Optional) Add more skills
Edit `SKILL_GROUPS` in `src/components/Skills.jsx`.

---

## Deploy

### Vercel (recommended)
1. Push to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Done — auto-deploys on push

### Netlify
```bash
npm run build
# upload `dist/` folder, or connect via Git
```

### Static hosting
The `dist/` folder is a static site — drop it on any host (GitHub Pages, Cloudflare Pages, S3, etc).

---

## Project structure

```
src/
├── components/         UI components
│   ├── Navbar.jsx
│   ├── Hero.jsx        Terminal-style hero with typing animation
│   ├── Terminal.jsx    The actual animated terminal
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── ThemeToggle.jsx
│   └── LanguageSwitcher.jsx
├── contexts/
│   ├── ThemeContext.jsx     Dark mode state
│   └── LanguageContext.jsx  i18n + RTL handling
├── hooks/
│   └── useScrollReveal.js   IntersectionObserver wrapper
├── i18n/
│   ├── index.js        i18next setup
│   ├── en.json
│   ├── fr.json
│   └── ar.json
├── App.jsx             Main composition + SEO
├── main.jsx            Entry
└── index.css           Tailwind + custom utilities
```

---

## How the languages work

- Default language is auto-detected from browser
- User can override via the language switcher (saved to localStorage)
- URL param `?lang=fr` also works (great for sharing localized links)
- Arabic auto-switches the entire layout to RTL and uses the IBM Plex Sans Arabic font

---

## Performance notes

- Fonts loaded with `display=swap` to prevent FOIT
- Manual chunk splitting for `react`, `framer-motion`, `i18n`
- All animations respect `prefers-reduced-motion`
- No tracking, no analytics by default (add yours if needed)

---

Built with 💜 by Adam.
