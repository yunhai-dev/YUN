# Third-party notice

The code in this directory is vendored from **Folia**:

- Project: Folia (https://github.com/chthollyphile/folia-major)
- Version: 0.7.28
- License: GNU Affero General Public License v3.0 (see `LICENSE` in this directory)
- Modifications: removed application shell, settings panels, i18n and song-transition UI;
  rewrote import paths; replaced missing app-level services with neutral stubs
  (`stores/motionSignals.ts`, `services/beatFx/*`); reimplemented `sonnet/sonnetIcons.ts`
  without `react-dom/server` (icons are serialised from lucide's `__iconNode` into SVG data
  URLs); adjusted one
  regex literal in `utils/lyrics/wordSegmentation.ts` for the project's TS target.
  `tilt/VisualizerTilt.tsx` drops the shell and subtitle overlay and is hosted by
  `FoliaTilt.tsx`; `utils/lyrics/sentenceLayout.ts` inlines the `LyricLayoutUnit` type it needs.
  `monet/*` drops the shell, settings panel, i18n, tooltip kit, song hand-off and asset stores,
  and is hosted by `FoliaMonet.tsx`; its chrome-visibility helper is inlined into
  `monet/VisualizerMonet.tsx`.
  `tempera/*` drops the shell, subtitle overlay, settings panel, i18n, song-hand-off service,
  cover-colour extraction and IndexedDB layer images, is hosted by `FoliaTempera.tsx`, and
  replaces the app-level Pixi host/song-commit hooks with a local lifecycle in
  `tempera/VisualizerTempera.tsx`.
  `partita/*`, `cadenza/*`, `cappella/*`, `claddagh/*`, `classic/*`, `nebbia/*`, `fume/*`,
  `hanabi/*`, `lumiere/*`, `machi/*`, `pendolo/*` and `still/*` each drop the shell, subtitle
  overlay, settings panel, i18n and preview/first-frame markers, are hosted by their matching
  `Folia<Mode>.tsx`, and share the local font wrapper and props contract described above.
  Two directories were renamed because Next.js treats their upstream names as route-special:
  `hanabi/text/` → `hanabi/textLayers/` (with `layout.ts` → `textLayout.ts`) and
  `lumiere/text/` → `lumiere/textLayers/`; the Machi scene `layout.ts` files became
  `sceneLayout.ts` for the same reason.
  `services/lucideIconResolver.ts` is implemented locally against a closed 37-icon vocabulary,
  using static deep imports of `lucide-react` icon modules.
  Additional neutral stubs: `services/analysis/{drumHits,gpuActivity,vocalEnvelope}`,
  `stores/useVisualizerSettingsStore.ts`,
  `pixi/firstFrameStub.ts`, `tuningDefinition.ts`, `utils/lyrics/parserCore.ts` (interlude
  predicate only), `utils/lyrics/glowBlurQuantize` consumers and `utils/themeColorMath.ts`.
  Shared hosts `songHandover.ts` and `pixi/pixiRuntimeHost.ts` are vendored as-is apart from the
  first-frame stub. Cappella's Vite `import.meta.glob` assets were replaced with explicit static
  imports (`cappella/avatarImages.ts`, `cappella/emoImages.ts`) preserving selection order.

This project's source code is distributed under AGPL-3.0 (see the repository root `LICENSE`).
Distributing a build that includes this directory requires complying with the AGPL-3.0 for
this code, including providing its complete corresponding source. The project's written
content under `src/content/` is separately licensed CC BY-NC-SA 4.0.
