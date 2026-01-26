# Copilot instructions for this repository

Purpose: give AI coding agents the immediate, practical knowledge to work on this Next.js portfolio.

- **Quick start (local)**: run `npm install` then `npm run dev` (starts Next dev server). Build with `npm run build` and serve with `npm run start`. Lint with `npm run lint`.

- **Framework & layout**: this is a Next.js (app directory) project (Next 16) using React 19. Source is under `src/app`. Global layout lives in `src/app/layout.jsx` and global styles in `src/app/globals.css`.

- **Server vs Client components**: files are server components by default. Any file with the directive `"use client"` at the top is a client component (example: `src/app/projects/page.jsx`). Respect that when adding hooks or browser-only APIs.

- **Routing & pages**: pages are filesystem routes under `src/app` (e.g., `src/app/projects/page.jsx` → `/projects`). Some project detail experiences use in-page modals (see the modal logic in the projects page) while others link to `href` paths.

- **State + URL patterns**: the projects page syncs a medium filter to the hash (`#physical`, `#digital`, `#all`) using `hashToMedium` and `window.history.replaceState`. Tag filters use a `Set` stored in React state and OR-match semantics (any selected tag shows the project).

- **Assets & static files**: images and thumbnails live in `public/images` and `public/images/thumbs`. Use those paths directly in `src` attributes (Next Image is not used here).

- **Styling**: project uses plain CSS files (per-page CSS in `src/app/*/*.css`) and also has Tailwind/PostCSS installed. Prefer the existing CSS files for small changes; introduce Tailwind classes only after ensuring its config is used project-wide.

- **Animation & UX patterns**: `framer-motion` is used for layout/entrance animations (see `AnimatePresence` and `motion.*` in `src/app/projects/page.jsx`). When updating animated elements, follow the existing transition durations and `layout` usage.

- **Components**: reusable UI lives in `src/components` (examples: `MobileNav.jsx`, `FlowingCircleCarousel.jsx`). Many components are client components — check for `"use client"` and browser-only APIs before converting to server components.

- **TypeScript & tooling**: repo has `tsconfig.json` and type packages installed, but most source files are `.jsx`. `tsconfig` includes an alias `@/* -> ./src/*` — prefer relative paths unless adding TypeScript files or expanding alias usage.

- **Linting & conventions**: ESLint config is customized in `eslint.config.mjs` using `eslint-config-next` presets. Run `npm run lint` to surface quick issues.

- **Small code patterns worth noting**:
  - Collapsible UI: local `Collapsible` in `src/app/projects/page.jsx` measures `scrollHeight` with a `ResizeObserver` — preserve that pattern for collapsible areas.
  - Project cards: code toggles between `motion.a` and `motion.button` depending on `href` presence; non-linked cards open a fullscreen modal via `openProjectId` state.
  - Tag filtering uses `activeTags` as a `Set` — mutate by creating a new `Set` in `setState` to preserve immutability.

- **When to run the app in the browser**: the projects page uses `window.location.hash` and `window.history` — test those behaviors in the browser (dev server) instead of relying only on unit tests.

- **Common edits an AI might perform**:
  - Add new project entries: update the `projects` array in `src/app/projects/page.jsx`. Include `id`, `title`, `subtitle`, `description`, `category`, `medium`, `tags`, `thumbSrc` and optionally `href` or `caseStudy`.
  - Add small UI tweaks: prefer editing the relevant `.css` under `src/app/*/` to match site style.

If anything here is unclear or you want more examples (component patterns, build/deploy details, or file-level links), say which area to expand and I will iterate.
