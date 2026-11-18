# Folia Media Wall Design Document

## Background & Goals

The `/media` list page originally rendered an ordinary crystal-card grid. The target is Folia
v0.7.28's full-bleed library wall: a full-screen collage of cover tiles in mixed aspect ratios,
thin dark gutters, number badges, bottom title/artist copy over a dark gradient, a light global
tilt, and an infinite wrap that repeats the catalog across the field. The previous attempt ported
the wrong upstream surface (`library/suites/grid`, the hexagonal Polaroid grid) and has been
replaced.

Success criteria:

- The list reads as one continuous cover wall, not cards on a page background.
- Tiles keep Folia's mixed 12-slot block compositions (12 x 8 cells per block, 128px cells, 8px gaps).
- Hover, focus, current-track marking, drag/wheel panning and arrow-key stepping work.
- Clicking a tile opens the existing `/media/[id]` player; the playback engine and provider are untouched.
- No build/server/browser was run (per the standing instruction); static checks only.

## High-Level Design

- `src/app/media/mediaWallGeometry.ts` is a pure port of the wall geometry from upstream:
  - `components/wall/blockTemplates.ts` (four 12-slot compositions, X/Y reflections, coordinate hash)
  - `components/wall/layout.ts` (infinite period from `FIELD_ASPECT = 2.2`, viewport culling, render cap)
  - `components/wall/startTile.ts` (item sequence per block; the period repeats the item list)
  - `library/suites/bravais/bravaisConstants.ts` (128px cells, 8px gap, camera zoom 0.52 / 0.64 / 0.76)
- `src/app/media/MediaLibrary.tsx` renders the wall with a DOM camera:
  - Camera state is `{ x, y, scale }`; the world is `translate3d(x, y, 0) scale(scale)` with a top-left origin,
    matching upstream `formatWorldTransform`.
  - Pointer drag and wheel pan update the camera directly; the React tile set only re-culls when the
    visible rect approaches the culled bounds (150px margin, 420px overscan).
  - Programmatic pans (session restore, search reset, arrow keys) use a 420ms cubic ease-out tween.
  - The whole field sits in a `rotate(-3.5deg) scale(1.16)` wrapper, reproducing Bravais' collection-wall
    tilt; the centre-origin rotation keeps the view centre fixed.
  - Poster DOM follows upstream `wall.css`: background cover, bottom shade, `lattice`-style number badge,
    bottom copy with `clamp(16px, 1.6vw, 28px)` titles, accent inset stroke for the playing song.
  - `fallbackBackground(id)` and `<img onError>` reproduce Folia's deterministic gradient fallback.
- Chrome: `/media` uses the wall's own overlay (site link, title/count, search, hint, home link). The
  global `Navbar` and `Footer` return `null` on exactly `/media` and `/media/`; player pages already
  hide the header, and the footer was already hidden on player pages.
- Playback: tiles are `next-view-transitions` links to `/media/[id]/`. `PlaybackProvider` still owns the
  shared decks; the wall only subscribes for the playing mark and remembers the focused id in
  session storage, as before.

Out of scope (not imported): Folia accounts, providers, playlists, queues, seam UI, lyrics wall,
reserved structural windows, and metadata services. The cover flight is adapted separately in
Stage 4 rather than importing upstream's suite code.

## Implementation Plan

### Stage 1: Geometry
- **Files**: `src/app/media/mediaWallGeometry.ts` (new); removed `hexViewport.ts` and `hexCardFalloff.ts`.
- **Logic**: block templates and reflections, period (`ceil(count / 12)` blocks with the landscape
  aspect rule), slot culling with overscan and a 360-tile cap, stable item per slot
  (`blockIndex * 12 + slotIndex`, modulo count), and `getMediaWallItemRect` for focus restoration.
- **Validation**: deterministic slot coverage, unique keys per block, wrap continuity, item mapping.

### Stage 2: Wall surface and interaction
- **Files**: `src/app/media/MediaLibrary.tsx` (rewritten), `src/app/media/page.tsx` (fixed full-screen root).
- **Logic**: measured camera, Folia home corner (34, 80), session focus restore, search-first-match
  centring, drag with click suppression and release inertia (last 100ms velocity + exponential
  friction; interrupted by press/wheel/programmatic centring), wheel pan, arrow-key nearest-tile
  stepping, Enter to open, current-track ring/badge, image fallback, atmosphere layers (glows,
  vignette, grain), tilted field.
- **Validation**: TypeScript, ESLint; visual verification left to the user.

### Stage 3: Site chrome and docs
- **Files**: `src/components/navbar.tsx`, `src/components/footer.tsx`, this plan,
  `docs/IMPLEMENTATION_PLAN.md`, `src/app/media/[id]/player/folia/NOTICE.md`.
- **Logic**: hide global chrome on the wall route; record the actual upstream surface and adaptations.
- **Validation**: diff review; confirm only route-scoped conditions changed.

### Stage 4: Cover flight and current-song marks
- **Files**: `src/app/media/mediaCoverFlight.ts` (new), `src/app/media/MediaFlightBridge.tsx` (new),
  `src/app/media/layout.tsx`, `src/app/media/MediaLibrary.tsx`, `src/app/globals.css`.
- **Logic**: a body-level fixed cover layer, adapted from Folia's `bravaisCoverFlight`. Forward:
  the clicked tile's tilted quad is measured from its AABB, grown to the viewport, and released
  when the player route mounts. Back: a session handoff record lets the media layout cover the
  page before navigation; the wall centres the restored tile and collapses the cover onto it.
  The current-card ring/badge track the engine `trackId` plus transport state (playing/paused),
  the wall centres the current song on entry, and a `locate-playing` chrome button re-centres it.
  While a flight owns the screen the root view transition is collapsed to 1ms.
- **Validation**: TypeScript, ESLint, quad inverse formula; visual verification left to the user.

## Testing Strategy

- Happy path: first paint shows a mixed-size collage; drag and wheel pan; click opens the player
  with the cover expanding over the page; back shrinks the cover onto the centred card; the current
  card shows its accent ring and playing/paused badge, and the locator re-centres it; search filters
  and centres its first match.
- Error paths: empty catalog, no search matches, failed cover images, stale session focus, resize.
- Regression: `/media/[id]` links, `PlaybackProvider`, playback engine, site navigation on other routes.
- Do not run builds, servers, watchers or browsers. Visual checks are the user's.

## Risks & Mitigation

- Upstream wall depends on services we do not port: only the block geometry, poster presentation and
  camera mechanics are adapted; no seam, queue or account UI is exposed.
- The tilt wrapper applies Bravais' collection angle (`-4°`) to the field as a whole; the extra
  scale (1.18) keeps the rotated field covering the section corners down to tall phone aspect ratios.
- The infinite wall repeats covers by design (as upstream); focus and current markers may appear on
  more than one copy, but only the copy nearest the view centre carries the keyboard ring.
- The flight is decorative: `prefers-reduced-motion` skips it, unavailable session storage skips
  only the reverse landing, and modified clicks (new tab) bypass both flight and playback changes.
- Rollback: restore the previous `/media` grid, delete `MediaLibrary.tsx` and `mediaWallGeometry.ts`,
  and revert the Navbar/Footer/NOTICE changes; the catalog and player are untouched.

## Validation Results

- `npx tsc --noEmit --incremental false` passed.
- `npx eslint` on the changed media components, page and chrome files passed.
- Cover flight: the tilted-quad inverse was checked offline for square and non-square tile sizes;
  TypeScript and ESLint passed after the flight module, bridge, wall and CSS changes.
- Offline geometry assertions passed (Node type stripping): every block holds 12 non-overlapping
  slots covering its 96 cells with unique keys; the 277-item field wraps on a 6×4-block period in
  both signs; every catalog item round-trips through `getMediaWallItemRect`; culling only removes
  tiles without changing the slot→item mapping.
- The previous hexagonal implementation (geometry modules, Polaroid cards, card CSS) was removed
  after the user's screenshot correction.
- Visual verification of the wall, tilt, grain, search and interaction remains for the user.
