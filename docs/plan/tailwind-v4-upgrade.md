# Tailwind CSS v4 Upgrade Design Document

## Background & Goals

- **Problem**: the project runs Tailwind CSS 3.4.19, while the vendored Folia player (`src/app/media/[id]/player/folia/**`) was authored against Tailwind CSS 4. This is not cosmetic:
  - Tailwind 3 compiles `-translate-x-1/2` to `transform: translate(var(--tw-translate-x), …)`; framer-motion writes an inline `transform` (scale), which overrides the class. In v4 the utility writes the standalone `translate` CSS property, which composes instead of colliding. This was the root cause of the Fume "only half the screen / not aligned to the viewport" bug.
  - Folia also uses v4-only utilities (`shadow-xs`, `text-shadow-*`, `mask-*`, `ring-3`, `outline-hidden`, `not-*`, etc.) that are silently dropped under v3.
- **Goal**: move the whole project to Tailwind CSS 4 (match upstream `^4.3.3`), preserving the existing visual result of the non-Folia site, and remove the Fume workaround so the player matches upstream.
- **Success criteria**:
  - `globals.css` compiles with `@tailwindcss/postcss` without warnings/errors.
  - All previously-used utility classes still generate CSS (no silently missing classes).
  - `tsc --noEmit` and ESLint stay clean for touched files.
  - Fume is centered by the upstream class again (`-translate-x-1/2` on the motion wrapper).

## High-Level Design

- **Tooling**: `tailwindcss@^4.3.3` + `@tailwindcss/postcss@^4.3.3`; PostCSS plugin switches from `tailwindcss` to `@tailwindcss/postcss`. Tailwind 4 handles vendor prefixing; no autoprefixer needed.
- **Entry CSS**: `src/app/globals.css` replaces the three `@tailwind` directives with:
  - `@import "tailwindcss";` (v4 engine)
  - `@import "tw-animate-css";` (drop-in replacement for `tailwindcss-animate`, which is v3-only)
  - `@config "../../tailwind.config.ts";` (keep the existing JS theme: colors, radius, typography)
  - `@plugin "@tailwindcss/typography";` (plugin loaded the v4 way)
  - `@custom-variant dark (&:where(.dark, .dark *));` (replaces `darkMode: ["class"]`)
  - `@source not` exclusions for `src/content` (markdown is not a class source; keeps v3 behavior and avoids CSS bloat)
- **Theme compatibility**: the JS config stays as the single source of truth via `@config`; only the animation plugin moves to CSS. `theme.extend.borderRadius` already overrides the radius scale, so `rounded-sm/md/lg` keep their current values.
- **Class migration (only outside `folia/`, which is already v4-authored)**:
  - Removed v4-only form: `bg-opacity-95` → `bg-background/95`.
  - Value-shifted utilities renamed to preserve the v3 look: `shadow-sm` → `shadow-xs`, `backdrop-blur-sm` → `backdrop-blur-xs`, `outline-none` → `outline-hidden`. (Verified against the compiled output: v4.3.5 still emits `flex-shrink-*`/`flex-grow-*`, `bg-gradient-to-*`, bare `rounded`, bare `shadow`, bare `blur`/`backdrop-blur` with the same values as v3, so those were deliberately left untouched to keep the diff small.)
  - `rounded-sm` keeps its current value because `theme.extend.borderRadius` (via `@config`) overrides the v4 scale; `container` config is likewise honored by v4.3.5.
  - v4 default border color is `currentColor`; add the upgrade-guide base layer rule restoring `gray-200` so bare `border`/`divide-y` keep the v3 appearance.
- **Deliberately unchanged**: `folia/**` class names (v4-authored), all component structure/logic, and `src/content` markdown.

## Implementation Plan

### Stage 1: Dependencies and PostCSS
- **Files modified**: `package.json`, `package-lock.json`, `postcss.config.mjs`
- **Specific logic**:
  - Remove `tailwindcss@^3.4.19` and `tailwindcss-animate`.
  - Add `tailwindcss@^4.3.5`, `@tailwindcss/postcss@^4.3.5`, `tw-animate-css@^1.4.0` (devDependencies).
  - Upgrade `@tailwindcss/typography` to `^0.5.20` (declares v4 support).
  - `@source "../../src"` with `source(none)` keeps scanning deterministic and matches the old content globs; `@source not "../../src/content"` keeps Markdown out.
  - `postcss.config.mjs`: `plugins: { '@tailwindcss/postcss': {} }`.
- **Validation**: `npm ls tailwindcss @tailwindcss/postcss tw-animate-css` shows one v4 tree; `node -e "require('tailwindcss/package.json').version"` prints 4.x.

### Stage 2: CSS entry + config
- **Files modified**: `src/app/globals.css` (first 3 lines + new blocks near the top only), `tailwind.config.ts`
- **Specific logic**:
  - Replace `@tailwind base/components/utilities` with the imports/plugins/variant described above.
  - `tailwind.config.ts`: drop `darkMode` and the `plugins` array (animation now via CSS import, typography via `@plugin`); keep `content` (harmless) and all `theme` data.
  - Add the border-color compatibility block in `@layer base`.
- **Validation**: standalone PostCSS compile of `src/app/globals.css` succeeds and the output contains `.prose`, `animate-in`, `.container`, `.text-foreground`, `.rounded-lg`, `.font-mono`.

### Stage 3: Class renames in app/shadcn code (excluding `folia/`)
- **Files modified**: the files found by the scans (≈40; tools pages, shadcn UI, comment system, AI elements).
- **Specific logic**: apply the exact renames listed in High-Level Design, one utility at a time, with word-boundary matching; never touch `src/app/media/[id]/player/folia/**` or CSS property values (`filter: blur(...)`).
- **Validation**: re-run the scans and confirm zero remaining v3-only forms; spot-check `git diff` for unintended hits.

### Stage 4: Revert the Fume workaround
- **Files modified**: `src/app/media/[id]/player/folia/fume/VisualizerFume.tsx`
- **Specific logic**: restore upstream markup — class `-translate-x-1/2` on the canvas wrapper, remove `x: '-50%'` from the motion `animate` object. Under v4 the class composes with the inline scale transform.
- **Validation**: diff against upstream; ensure no other folia file changes are introduced by this task.

### Stage 5: Static validation
- **Files modified**: none.
- **Specific logic / Validation**:
  - Standalone Tailwind 4 compile of `src/app/globals.css` (no Next build, per project rule), asserting key selectors and checking stderr is clean.
  - `npx tsc --noEmit`.
  - ESLint on changed files; compare to the pre-existing `no-explicit-any` baseline in `folia/sonnet` (not introduced here).
  - Leave visual verification to the user's dev server; note that the dev server needs a restart after the PostCSS change.

## Testing Strategy

- **Happy path**: dev server renders home, blog, tools, media player; Fume mode is horizontally centered and fills the viewport; Folia v4-only utilities now apply.
- **Error path**: Tailwind compile with an intentionally invalid utility/`@apply` should fail loudly; PostCSS config loaded by Next without "module not found".
- **Regression scope**: dark theme colors (`hsl(var(--…))`), border/divide appearance, shadcn focus rings, animate-in transitions, prose typography, accordion animations, tooltip/popover shadows.

## Risks & Mitigation

- **Plugin compatibility**: `tailwindcss-animate` is v3-only → replaced by `tw-animate-css` (same class API). Typography 0.5.20 supports v4.
- **Scale shifts**: shadow/rounded/blur/outline defaults changed in v4 → explicit renames preserve the current look outside `folia/`; inside `folia/` the v4 semantics are the intended ones.
- **Config drift**: theme stays in the JS config via `@config`, minimizing the blast radius; if `@config` behaves unexpectedly, fall back to migrating `theme.extend` into CSS `@theme`.
- **Rollback**: revert `package.json`/`package-lock.json`, `postcss.config.mjs`, the `globals.css` header block, and the class renames (all tracked in this document); `folia/` needs no rollback.

## Execution Notes (2026-11-13)

- Installed: `tailwindcss@4.3.5`, `@tailwindcss/postcss@4.3.5`, `tw-animate-css@1.4.0`, `@tailwindcss/typography@0.5.20`; removed `tailwindcss-animate`.
- Standalone PostCSS compile of `src/app/globals.css`: 298,151 bytes, 0 warnings. Verified `.prose` (custom `hsl(var(--foreground))`), `animate-in` + `--tw-enter-opacity`, `.container` (centered + 2rem + 1400px from the JS config), custom colors/radii/fonts, `.outline-hidden`, `.shadow-xs`, `.backdrop-blur-xs`, `.bg-background/95`, and `.dark` variants all present.
- `-translate-x-1/2` compiles to the standalone `translate:` property in v4 — the framer-motion transform collision is gone, and `VisualizerFume.tsx` is back to the upstream markup.
- `npx tsc --noEmit`: pass. ESLint on the 55 touched TS/TSX files: 0 errors (9 pre-existing warnings, unrelated).
- Not run by design: Next.js build / dev server. The running dev server must be restarted (and, if stale CSS persists, `.next` cleared) before visual verification.
- Post-restart Turbopack error (`globals.css:6590`, `Unexpected token Delim('!')`): caused by the v3-era arbitrary variant `[&.\\!rounded-\\[26px\\]]:rounded-[26px]` in `src/components/ui/input-group.tsx`. Tailwind 4's text scanner keeps the raw `\\!`, and the resulting selector contains `\\!`, which Lightning CSS rejects. The override had no consumer (`!rounded-[26px]` is unused; `cn()`/tailwind-merge already handles plain radius overrides), so the line was removed.
- Remaining v3 important-prefix utilities converted to the v4 suffix form: `prose-pre:!p-0` → `prose-pre:p-0!` (`markdown-view.tsx`, `MermaidContent.tsx`) and `[&_.hljs]:!bg-[…]` → `[&_.hljs]:bg-[…]!` (`markdown-view.tsx`).
- Re-validated: the full compiled CSS now parses cleanly with Lightning CSS (the same parser Turbopack uses); `tsc --noEmit` and ESLint pass.
