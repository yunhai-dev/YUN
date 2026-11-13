// Vendored from Folia's src/types.ts (AGPL-3.0 — see ../../LICENSE).
// The monet background's tuning and defaults, copied from upstream types.ts. Upstream's
// backgrounds/monet/tuning.ts only adds storage and settings registration, which this port omits.

export type MonetBackgroundSource = 'cover-derived' | 'uploaded-global';
export type MonetBackgroundLayout = 'full-overlay' | 'half-pane-gradient';
export type MonetBackgroundWashColorMode = 'theme' | 'custom';

export interface MonetBackgroundTuning {
  backgroundSource: MonetBackgroundSource;
  backgroundLayout: MonetBackgroundLayout;
  backgroundBlurPx: number;
  backgroundOverlayOpacity: number;
  backgroundGrayscale: number;
  backgroundSaturation: number;
  backgroundWash: number;
  backgroundHalfPaneOffsetX: number;
  backgroundWashColorMode: MonetBackgroundWashColorMode;
  backgroundWashCustomColor: string;
  /** 整张背景图的缓慢缩放漂移；纯 CSS 合成层动画，不参与背景烘焙。 */
  backgroundDriftEnabled: boolean;
  /** 漂移幅度 0..1，同时决定位移距离和为防止露边而预放大的倍率。 */
  backgroundDriftStrength: number;
  /** 是否在烘焙的 overlay 里绘制那几条 1px 竖向纹理。 */
  backgroundStreaksEnabled: boolean;
}

export const DEFAULT_MONET_BACKGROUND_TUNING: MonetBackgroundTuning = {
  backgroundSource: 'cover-derived',
  backgroundLayout: 'full-overlay',
  backgroundBlurPx: 6,
  backgroundOverlayOpacity: 0.74,
  backgroundGrayscale: 0,
  backgroundSaturation: 1.05,
  backgroundWash: 0.34,
  backgroundHalfPaneOffsetX: 0,
  backgroundWashColorMode: 'theme',
  backgroundWashCustomColor: '#8fb7ff',
  backgroundDriftEnabled: true,
  backgroundDriftStrength: 0.5,
  backgroundStreaksEnabled: true,
};
