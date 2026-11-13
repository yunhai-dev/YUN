// Subset of Folia's src/components/visualizer/tuningDefinition.ts. The full module describes the
// per-style tuning editors (sliders, switches, persistence) and is not part of this port; the
// renderers only need this range clamp from it.
export const numberWithin = (value: unknown, fallback: number, min: number, max: number) => (
    typeof value === 'number' && Number.isFinite(value)
        ? Math.min(max, Math.max(min, value))
        : fallback
);
