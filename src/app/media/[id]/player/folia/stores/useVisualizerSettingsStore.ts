// Stub for Folia's app-level visualizer settings store. This port fixes the frame-rate cap to
// "off" (the browser's own cadence) and smart beat to "off" (no beat-analysis engine), which are
// the neutral values the runtime paths read.
export interface VisualizerSettingsState {
    visualizerFrameRate: 'off';
    smartBeat: { mode: 'off' };
}

const state: VisualizerSettingsState = {
    visualizerFrameRate: 'off',
    smartBeat: { mode: 'off' },
};

export const useVisualizerSettingsStore = {
    getState: (): VisualizerSettingsState => state,
};
