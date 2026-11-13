// Vendored from Folia's src/types.ts (AGPL-3.0 — see ../../LICENSE).
// The sora background's tuning and defaults, copied from upstream types.ts. Upstream's
// backgrounds/sora/tuning.ts only adds the settings-store registration, which this port omits.

export interface SoraBackgroundTuning {
  /** Skips the WebGL starfield and shows a static solid black (night) / white (daylight) frame. */
  blank: boolean;
}

export const DEFAULT_SORA_BACKGROUND_TUNING: SoraBackgroundTuning = {
  blank: false,
};
