import { motionValue } from 'framer-motion';

// Folia's app-wide per-frame signals are fed by its beat-analysis engine.
// This site has no beat analysis, so the visualizers see a neutral (silent) signal.
export const beatImpact = motionValue(0);
export const downbeatImpact = motionValue(0);
