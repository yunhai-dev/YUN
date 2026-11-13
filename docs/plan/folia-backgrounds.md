# Folia Background Types Port Design Document

## Background & Goals

- **Problem**: the player page only renders Folia's default `latent` shell backdrop. Upstream registers six built-in background modes: `common`, `latent`, `monet`, `nomand`, `sora`, `url`.
- **Goal**: vendor the five missing types (AGPL-3.0, same "copy the logic, adapt the host" rule as the visualizer styles), expose a background-type picker in the player settings, and keep every type's upstream default tuning.
- **Explicit scope decision**: custom-image upload is **not** ported. `monet` and `nomand` keep only the `cover-derived` path (the song's cover art); `uploaded-global`, `customImage`, `monetBackgroundImage` and their settings are removed. `url` (embedded webpage) is not an image upload and stays.
- **Success criteria**:
  - Switching background types in the settings renders the corresponding full-screen background under the lyric styles.
  - Types draw from `theme` + cover URL only; no app services (i18n, upload, command palette, transitions).
  - `latent` behaviour is unchanged.
  - `tsc --noEmit` and ESLint pass.

## High-Level Design

- **Contract**: `src/app/media/[id]/player/folia/backgrounds/definition.ts` exposes `BackgroundType`, the picker labels, `UrlBackgroundItem`, and `BackgroundRenderProps` (theme, cover URL, cover palette, audio signals, seed, paused/static/daylight flags, blend duration, URL mode inputs).
- **Layout**: one folder per mode, each exporting a default `Background` component with the shared props:
  - `backgrounds/common/` — `FluidBackground` (cover-colour fluid layer) + `GeometricBackground` (shapes/vignette).
  - `backgrounds/monet/` — cover image baking pipeline (worker) + CSS drift.
  - `backgrounds/nomand/` — paper-shaders image effects (dithering / fluted glass / paper texture / halftone / lens distortion).
  - `backgrounds/sora/` — twgl starfield.
  - `backgrounds/url/` — sanitized iframe layer.
  - `backgrounds/latent/` stays as the existing `LatentBackground` (already vendored).
- **Dispatch**: `FoliaBackdrop` receives the selected `BackgroundType`, resolves the cover URL from the music item, and renders the matching layer over the theme's base colour. `latent` keeps its current tuning wiring.
- **Settings**: `usePlayerPrefs` gains `backgroundType` (default `latent`) and `urlBackgroundUrl`; `PlayerSettingsPanel` adds the type picker, shows the latent layer-mode options only for `latent`, and a URL field only for `url`.
- **Dropped upstream host coupling**: entry modules, registry/discovery, i18n, settings cards, quick controls, commands, style-transition/first-frame hooks, uploaded images.
- **Day/night**: the player page is dark-only; `isDaylight` is always `false` (kept in the contract because the vendored layers branch on it).

## Implementation Plan

### Stage 1: Shared contract + dependency
- **Files modified**: `backgrounds/definition.ts` (new), `package.json`/lock (`twgl.js@^7.0.0`, needed by Sora; already installed).
- **Specific logic**: define the type union, Chinese labels matching upstream (`通用/隐现/莫奈/漫游/空/嵌入`), URL item type, render props.
- **Validation**: contract types imported by the per-type components without cycles.

### Stage 2: 通用 Common (parallel agent A)
- **Files created**: `backgrounds/common/FluidBackground.tsx`, `GeometricBackground.tsx`, `GeometricBackground.css`, `Background.tsx`.
- **Specific logic**: port the two layers verbatim; compose as upstream's entry does with defaults (`useCoverColorBg=false`, overlay opacity 1, geometry/vignette enabled). Drop `ARRIVING_MARK`, first-frame and unseen-layer hooks. Use local `useBlendedColors`, `useLucideIcons`, `lucideIconResolver`.
- **Validation**: ESLint; no imports outside `backgrounds/` except local hooks/services.

### Stage 3: 莫奈 Monet (parallel agent B)
- **Files created**: `backgrounds/monet/MonetBackgroundLayer.tsx`, `monetBackgroundDrift.ts`, `monetBackgroundPipeline.ts`, `monetBackground.worker.ts`, `tuning.ts`, `Background.tsx`.
- **Specific logic**: port the layer, drift track and worker-based baking pipeline; cover-only source (no uploaded image, no `MonetBackgroundImage`); upstream default tuning verbatim. Replace Vite `import.meta.env.DEV` with a Next-safe check; replace the settings-store reduced-motion hook with a local shim; drop first-frame marks.
- **Validation**: worker URL uses `new Worker(new URL('./monetBackground.worker.ts', import.meta.url), {type:'module'})`; ESLint.

### Stage 4: 漫游 Nomand (parallel agent C)
- **Files created**: `backgrounds/nomand/NomandBackgroundLayer.tsx`, `nomandShaderAdjustments.ts`, `tuning.ts`, `Background.tsx`.
- **Specific logic**: port the paper-shaders layer verbatim; cover-only; use local `paperShaderContext`; upstream default tuning and effect `dithering`; drop first-frame hooks.
- **Validation**: ESLint; `@paper-design/shaders-react` resolves.

### Stage 5: 空 Sora (parallel agent D)
- **Files created**: `backgrounds/sora/SoraBackground.tsx`, `colorChannels.ts`, `tuning.ts`, `Background.tsx`.
- **Specific logic**: port the twgl starfield verbatim; copy the upstream `parseColorChannels` helper locally; adapt the local two-argument `useBlendedColors`; default `blank=false`.
- **Validation**: ESLint; `twgl.js` types resolve.

### Stage 6: 嵌入 URL (parallel agent E)
- **Files created**: `backgrounds/url/UrlBackgroundLayer.tsx`, `urlBackground.ts`, `Background.tsx`.
- **Specific logic**: port the iframe layer and URL sanitizers verbatim; take list/selection from render props; no settings card.
- **Validation**: ESLint; empty list renders nothing.

### Stage 7: Integration
- **Files modified**: `FoliaBackdrop.tsx`, `hooks/usePlayerPrefs.ts`, `styles/PlayerSettingsPanel.tsx`, `VisualizerPlayer.tsx` (pass cover URL + background type + URL item).
- **Specific logic**: dispatch by type; cover URL from `musicItem.imageUrl`; pass `paused`, `staticMode` (background motion off), `blendMs=800`, `isDaylight=false`; persist type and URL; latent options conditionally shown.
- **Validation**: type-check and lint; manual visual pass left to the user.

### Stage 8: Static validation
- `npx tsc --noEmit`; ESLint on all new/modified files; no Next build or dev-server launch (project rule).

## Testing Strategy

- **Happy path**: each type renders at 100vw/100vh behind the lyric styles; switching persists across reloads; latent still behaves as before; URL mode loads an embeddable page.
- **Error path**: missing cover URL → monet/nomand/sora fall back to theme colours / black starfield; no WebGL → latent/nomand/sora must not crash; empty URL → background renders nothing (no broken iframe); sites refusing iframes show their own frame (upstream behaviour).
- **Regression scope**: lyric styles remain transparent and interactive above the backdrop; pause/static freezes each type; Tailwind v4 classes in ported CSS remain valid.

## Risks & Mitigation

- **Monet worker under Turbopack/static export**: `new Worker(new URL('./…worker.ts', import.meta.url))` is new to this repo. If Turbopack rejects it, fall back to painting on the main thread behind the same `wantMonetBackgroundUrl` API.
- **Paper shaders / twgl bundle size**: only loaded with the player page; backgrounds are not lazy per type (kept simple). If that hurts first paint, move types behind `React.lazy`.
- **Global CSS import** (`GeometricBackground.css`): allowed in the App Router; verify in dev.
- **iframe embedding**: many sites send `X-Frame-Options`; the layer cannot bypass that (same as upstream).
- **Rollback**: remove the new `backgrounds/<type>/` folders, the picker/prefs additions, and restore the single-latent `FoliaBackdrop`.
