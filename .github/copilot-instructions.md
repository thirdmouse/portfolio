# Copilot instructions for this repository

Purpose: give AI coding agents immediate, practical knowledge to be productive on this Next.js portfolio.

Quick start (local):
- `npm install`
- `npm run dev` (Next dev server)
- `npm run build` then `npm run start` to serve production build
- `npm run lint` for lint checks

Repo snapshot:
- Next.js (app directory) project. Source: `src/app`.
- Global layout: [src/app/layout.jsx](src/app/layout.jsx#L1)
- Global CSS: [src/app/globals.css](src/app/globals.css#L1)

Must-know patterns and conventions:
- Server vs Client: files are server components by default. Add `"use client"` at top to opt into client behavior (see `src/app/projects/page.jsx` which is a client component).
- Projects data: the canonical project list lives inline in `src/app/projects/page.jsx` — edit that `projects` array to add/remove projects (include `id`, `title`, `subtitle`, `description`, `category`, `medium`, `tags`, `thumbSrc`, optional `href` or `caseStudy`).
- Hash-driven medium filter: medium filter is synced to URL hash (`#physical`, `#digital`, `#all`) via `hashToMedium` and `window.history.replaceState` — test hash behavior in a browser because it relies on `window` APIs.
- Filters: FILTER_GROUPS in `src/app/projects/page.jsx` groups filters. Selected values are stored as `Set` objects in React state — always replace with a new `Set` when toggling.
- Collapsible pattern: `Collapsible` measures `scrollHeight` with `ResizeObserver` (used for dropdowns). Keep this pattern when building similar components.
- Card behavior: project cards render `motion.a` when `href` exists, otherwise `motion.button` that opens the fullscreen modal (`openProjectId`). Follow existing `framer-motion` usage (`AnimatePresence`, `layout`, short durations).

Styling & assets:
- Prefer per-page CSS under `src/app/*/*.css` (e.g., [src/app/projects/projects.css](src/app/projects/projects.css#L1)). Tailwind/PostCSS is present but the codebase uses plain CSS for small changes.
- Static assets: `public/images` and `public/images/thumbs` — reference these directly in `src` attributes (Next Image is not used).

Components & examples:
- Reusable components in `src/components` (e.g., `MobileNav.jsx`, `FlowingCircleCarousel.jsx`). Check for `"use client"` before adding hooks.
- Animation: `framer-motion` is used across the projects grid and modal (`AnimatePresence`, `motion.*`). Keep transitions and `layout` props consistent.

Tooling & TypeScript:
- The project uses JSX files; `tsconfig.json` contains an alias `@/* -> ./src/*` but most imports are relative. Avoid changing import styles unless adding TypeScript.
- ESLint: `eslint.config.mjs`. Use `npm run lint`.

Practical editing notes (concrete examples):
- Add a project: edit `projects` array in [src/app/projects/page.jsx](src/app/projects/page.jsx#L1). Example fields: `id`, `title`, `subtitle`, `description`, `category`, `medium`, `tags`, `thumbSrc`, `demo`, `href`, `caseStudy`.
- Add CSS tweaks: edit or create `src/app/projects/projects.css` or the matching page-level CSS file.
- Browser-only behaviors: any logic that reads `window.location.hash`, `window.history`, or uses `ResizeObserver` must run in a client component.

Small code hygiene notes found while exploring:
- `src/app/projects/page.jsx` imports `transpileModule` from `typescript` but does not use it — consider removing unused imports during cleanup.

When to run the app in the browser:
- Test interactive behaviors (hash-based medium switching, modal open/close, dropdowns) on the dev server: `npm run dev` and open in Chrome/Firefox.

If anything in these instructions is unclear or you'd like more specific examples (component wiring, where to add tests, or a checklist for a PR), tell me which area to expand and I'll iterate.
