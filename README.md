# MCG. — Developer Portfolio

Portfolio of **Manuel Cedric Goco**, BSIT student and software developer.
React 19 · Vite · TypeScript · React Router · Tailwind CSS v4 · Framer Motion · Lucide.
Frontend only: no backend, API, database, or authentication.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command             | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Start the dev server with hot reload           |
| `npm run build`     | Type-check, then build to `dist/`              |
| `npm run preview`   | Serve the production build locally             |
| `npm run typecheck` | Type-check only                                |

Requires **Node 20.19+ or 22.12+** (a Vite requirement).

## Before you publish

1. **Contact details** — set `email` and `linkedin` in `src/data/profile.ts`. Both stay hidden on the
   site until you do (in dev mode a dashed hint shows where they will appear). Setting `email` also turns the
   contact form into a `mailto:` flow; without it the form explains that nothing was sent.
2. **Screenshots** — add images to `src/assets/images/projects/<sems|bms|mtpms>/`. They are picked up
   automatically (see the README in that folder). Until then, clearly labelled placeholders are shown.
3. **Case-study wording** — *My role*, *Challenges* and *What I learned* use neutral wording because the
   repositories can't answer them. Rewrite them in your own words in `src/data/projects.ts`.
4. **Link previews** — copy your deployed address into `.env` as `VITE_SITE_URL=https://…` (no trailing
   slash) so the canonical link and Open Graph / Twitter image URLs are absolute.
5. **Check your public repos** — this site links to them. Make sure they don't contain database dumps,
   backups, or uploads with real personal data (for example `database/*.sql`, `backups/`, `uploads/`).

## Where to edit things

| To change…                                   | Edit                                      |
| -------------------------------------------- | ----------------------------------------- |
| Name, headline, intro, About copy, education, contact, "currently learning" | `src/data/profile.ts` |
| Projects (cards, filters, case studies, GitHub panel) | `src/data/projects.ts`           |
| Skill categories and technologies            | `src/data/skills.ts`                      |
| Journey timeline                             | `src/data/journey.ts`                     |
| "What I Can Build" cards                     | `src/data/services.ts`                    |
| Navigation and footer links                  | `src/data/navigation.ts`                  |
| Colours, fonts, spacing tokens               | `src/index.css`                           |
| Page title, description, Open Graph tags     | `index.html`                              |
| Social preview image (1200×630)              | `public/og-image.png`                     |

**Add a project:** append an object to `projects` in `src/data/projects.ts` (copy an existing one), then
create `src/assets/images/projects/<slug>/` for its screenshots. The card, filter counts, case-study
page (`/projects/<slug>`), and GitHub panel all update from that one entry.

**Add a technology icon:** paste its 24×24 `d` path from [simpleicons.org](https://simpleicons.org) into
`src/assets/icons/techIcons.ts`. Unknown technologies fall back to a neutral icon.

The *Technology footprint* grid in the GitHub section is computed from `projects.ts` — the site never calls
the GitHub API.

## Project structure

```
src/
├── assets/            icons (tech glyph paths) and project screenshots
├── components/        reusable UI: Navbar, Button, ProjectCard, CodePanel, ContactForm, Timeline …
├── sections/          Hero, About, Skills, Projects, Journey (+ Education), Services, GithubSection, Contact
├── pages/             Home, ProjectDetails (case study), NotFound
├── data/              profile, projects, skills, journey, services, navigation, types
├── hooks/             useTheme, useActiveSection, useFocusTrap, useDocumentTitle …
├── lib/               motion setup (LazyMotion), animation variants, context objects
├── utils/             cn, scroll helpers, validation, clipboard, screenshot discovery
├── App.tsx            providers + router
└── index.css          Tailwind setup, design tokens (light/dark), base styles
```

## Design notes

- **Theme:** dark-first, with a light mode. The choice is saved in `localStorage` (`mcg-theme`) and applied
  before first paint, so there is no flash. The accent (electric blue/indigo) is used for primary actions,
  links, the active nav item, and tags only.
- **Type:** Mona Sans (variable, with a width axis for the tighter headlines) and JetBrains Mono for code,
  both self-hosted through Fontsource — no external font requests.
- **Motion:** Framer Motion, loaded lazily. Honours `prefers-reduced-motion` (transform and layout
  animations are turned off; smooth scrolling becomes instant).
- **Accessibility:** semantic landmarks, one `h1` per page, skip link, visible focus rings, keyboard-operable
  menu / tabs / lightbox with focus trapping, labelled form errors, and WCAG AA colour contrast in both themes.
- **Performance:** route-level code splitting for case studies, lazy images with skeletons, self-hosted
  fonts that load only the subsets a page needs, and icons stored as bare SVG paths.

## Deploying

The output is a static site in `dist/`. `npm run build` also copies `index.html` to `404.html`, so deep links
such as `/projects/sems` work on GitHub Pages, Netlify, and Vercel without extra rewrite rules.

- **Vercel / Netlify:** build command `npm run build`, output directory `dist`.
- **GitHub Pages (project site):** set `VITE_BASE=/your-repo-name/` and `VITE_SITE_URL=https://your-name.github.io`
  in `.env`, run `npm run build`, and publish `dist/`.

## Credits

Technology glyphs from [Simple Icons](https://simpleicons.org) (CC0). UI icons from
[Lucide](https://lucide.dev) (ISC). Fonts: Mona Sans and JetBrains Mono (SIL Open Font License).
Brand names and logos belong to their respective owners.
