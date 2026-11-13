// Vendored subset of Folia's src/types.ts (AGPL-3.0 — see ./LICENSE).
// Only the types the vendored Sonnet/Diorama runtimes need.
import type { MotionValue } from 'framer-motion';
import type { LineRenderHints } from './utils/lyrics/renderHints';

export interface LyricSyllable {
    text: string;
    startTime: number;
    endTime: number;
    endsWithSpace?: boolean;
}

export interface LyricAlternateText {
    role: 'translation' | 'romanization' | string;
    language?: string;
    text: string;
    syllables?: LyricSyllable[];
}

export interface Word {
    text: string;
    startTime: number;
    endTime: number;
    syllables?: LyricSyllable[];
}

export interface Line {
    words: Word[];
    startTime: number;
    endTime: number;
    fullText: string;
    /** TTML voice/agent identity; Cappella uses it to keep a speaker on one side. */
    agentId?: string;
    translation?: string;
    romanization?: string;
    alternateTexts?: LyricAlternateText[];
    id?: string;
    songPart?: string;
    blockIndex?: number;
    renderHints?: LineRenderHints;
    isChorus?: boolean;
    chorusEffect?: 'bars' | 'circles' | 'beams';
    wordSegments?: string[];
    autoWordSegments?: string[];
}

export interface Theme {
    name: string;
    backgroundColor: string;
    primaryColor: string;
    accentColor: string;
    secondaryColor: string;
    fontStyle: 'sans' | 'serif' | 'mono';
    fontFamily?: string;
    fontFamilyStack?: string[];
    fontWeight?: number;
    animationIntensity: 'calm' | 'normal' | 'chaotic';
    wordColors?: { word: string; color: string }[];
    lyricsIcons?: string[];
    description?: string;
    /** Where the theme came from; scenery that prints a shop name accepts AI-made or preset names. */
    provider?: string;
}

export type LyricRenderScale = 0.5 | 0.75 | 1 | 1.5 | 2;
export type LyricAntialias = 'auto' | 'on' | 'off';

export interface LyricRenderQuality {
    scale: LyricRenderScale;
    antialias: LyricAntialias;
}

export interface LyricRenderOverride {
    scale: 'global' | LyricRenderScale;
    antialias: 'global' | 'on' | 'off';
}

export interface AudioBands {
    bass: MotionValue<number>;
    lowMid: MotionValue<number>;
    mid: MotionValue<number>;
    vocal: MotionValue<number>;
    treble: MotionValue<number>;
    spectrum?: MotionValue<Uint8Array<ArrayBuffer>>;
}

export interface SonnetTuning {
    render: LyricRenderOverride;
    cameraIntensity: number;
    typographyMotion: number;
    mgDensity: number;
    showOnlyText: boolean;
    showGuide: boolean;
    showBackgroundMg: boolean;
    showFixedGeo: boolean;
    showGiantDecorativeText: boolean;
    showBackgroundDecor: boolean;
    enableTransitions: boolean;
    outerFrameMode: 'none' | 'frame' | 'full';
    textureResolution: number;
    postProcessEnabled: boolean;
    postProcessGrain: number;
    postProcessContrast: number;
    postProcessRgbShift: number;
    postProcessHalftone: number;
    postProcessVignette: number;
    postProcessLensDistortion: number;
    postProcessLensDispersion: number;
}

export const DEFAULT_SONNET_TUNING: SonnetTuning = {
    render: { scale: 'global', antialias: 'global' },
    cameraIntensity: 1,
    typographyMotion: 1,
    mgDensity: 1,
    showOnlyText: false,
    showGuide: true,
    showBackgroundMg: true,
    showFixedGeo: true,
    showGiantDecorativeText: true,
    showBackgroundDecor: true,
    enableTransitions: true,
    outerFrameMode: 'full',
    textureResolution: 1.5,
    postProcessEnabled: false,
    postProcessGrain: 0.2,
    postProcessContrast: 0,
    postProcessRgbShift: 0,
    postProcessHalftone: 0,
    postProcessVignette: 0.85,
    postProcessLensDistortion: 0.3,
    postProcessLensDispersion: 0.6,
};

export type DioramaGeometryMode = 'clouds' | 'corridor';

export interface DioramaGeometryVisibility {
    enabled: boolean;
    mode: DioramaGeometryMode;
    strands: boolean;
    blobs: boolean;
    ribbons: boolean;
    rings: boolean;
}

export const DEFAULT_DIORAMA_GEOMETRY_VISIBILITY: DioramaGeometryVisibility = {
    enabled: true,
    mode: 'clouds',
    strands: true,
    blobs: true,
    ribbons: true,
    rings: true,
};

export const DIORAMA_PARTICLE_DENSITY_MIN = 96;
export const DIORAMA_PARTICLE_DENSITY_MAX = 1536;
export const DIORAMA_PARTICLE_DENSITY_STEP = 24;
export const DIORAMA_MOTE_CIRCUMFERENCE_MIN = 4;
export const DIORAMA_MOTE_CIRCUMFERENCE_MAX = 48;
export const DIORAMA_MOTE_CIRCUMFERENCE_STEP = 2;
export const DIORAMA_MOTE_RADIAL_MIN = 1;
export const DIORAMA_MOTE_RADIAL_MAX = 4;
export const DIORAMA_MOTE_RADIAL_STEP = 1;
export const DIORAMA_PARTICLE_SCALE_MIN = 0.65;
export const DIORAMA_PARTICLE_SCALE_MAX = 1.6;
export const DIORAMA_PARTICLE_SCALE_STEP = 0.05;
export const DIORAMA_PARTICLE_GLOW_INTENSITY_MIN = 0.1;
export const DIORAMA_PARTICLE_GLOW_INTENSITY_MAX = 1.5;
export const DIORAMA_PARTICLE_GLOW_INTENSITY_STEP = 0.05;

export interface DioramaTuning {
    render: LyricRenderOverride;
    cameraSpeed: number;
    motionAmount: number;
    audioReactivity: number;
    geometryVisibility: DioramaGeometryVisibility;
    particleDensity: number;
    particleScale: number;
    particleGlowEnabled: boolean;
    particleGlowIntensity: number;
    showParticles: boolean;
    backgroundParticleCircumference: number;
    backgroundParticleRadial: number;
    glowEnabled: boolean;
    glowIntensity: number;
    soulEnabled: boolean;
    soulIntensity: number;
    soulActiveEnabled: boolean;
    gradientEnabled: boolean;
    gradientIntensity: number;
    keywordColoringEnabled: boolean;
}

export const DEFAULT_DIORAMA_TUNING: DioramaTuning = {
    render: { scale: 'global', antialias: 'global' },
    cameraSpeed: 1,
    motionAmount: 1,
    audioReactivity: 1,
    geometryVisibility: DEFAULT_DIORAMA_GEOMETRY_VISIBILITY,
    particleDensity: 576,
    particleScale: 1,
    particleGlowEnabled: true,
    particleGlowIntensity: 0.65,
    showParticles: true,
    backgroundParticleCircumference: 28,
    backgroundParticleRadial: 2,
    glowEnabled: true,
    glowIntensity: 1,
    soulEnabled: true,
    soulIntensity: 1,
    soulActiveEnabled: false,
    gradientEnabled: false,
    gradientIntensity: 1,
    keywordColoringEnabled: true,
};

export type TiltColorScheme = 'default' | 'swap' | 'accentAll' | 'primaryAll';

export interface TiltTuning {
    splitProbability: number;
    tiltStyleProbability: number;
    colorScheme?: TiltColorScheme;
}

export const DEFAULT_TILT_TUNING: TiltTuning = {
    splitProbability: 0.75,
    tiltStyleProbability: 0.35,
    colorScheme: 'default',
};

export interface ClassicTuning {
    enableWordRotation: boolean;
    breathingFloatMultiplier: number;
    useLegacyLayout?: boolean;
    wordSpacing?: number;
    /** Space the words by how far they are drawn when scaled, turned and offset, so none overlaps another. */
    avoidOverlap?: boolean;
}

export const DEFAULT_CLASSIC_TUNING: ClassicTuning = {
    enableWordRotation: true,
    breathingFloatMultiplier: 1,
    useLegacyLayout: false,
    wordSpacing: 0.7,
    avoidOverlap: false,
};

export type VisualizerFrameRate = 'off' | 120 | 90 | 60;

export interface CladdaghTuning {
    focusScaleRatio: number;
    radiusScale: number;
    ellipseTiltDeg: number;
    showAxisLine: boolean;
    /** 主歌词字符间距（px，每个字间隙额外加的量）。 */
    letterSpacingOffset: number;
    /** 圆环中心的左右位置（#1124）：相对画面宽度的百分比，0 是正中，正值往右。 */
    positionX?: number;
    /** 圆环中心的上下位置（#1124）：相对画面高度的百分比，0 是正中，正值往下。 */
    positionY?: number;
    /** 在每句主歌词下方沿圆环显示翻译（#1124）。 */
    showTranslation?: boolean;
    /** 翻译字号相对默认（主歌词的一半）的倍率。 */
    translationScale?: number;
    /** 翻译字符间距（px），同 letterSpacingOffset 的算法。 */
    translationLetterSpacingOffset?: number;
}

export const DEFAULT_CLADDAGH_TUNING: CladdaghTuning = {
    focusScaleRatio: 0.65,
    radiusScale: 1.0,
    ellipseTiltDeg: 45,
    showAxisLine: true,
    letterSpacingOffset: 0,
    positionX: 0,
    positionY: 0,
    showTranslation: false,
    translationScale: 1,
    translationLetterSpacingOffset: 0,
};

export type CappellaEmojiPackSource = 'builtin' | 'custom';
export type CappellaAvatarSource = 'cover' | 'builtin' | 'color' | 'custom';

export interface CappellaTuning {
    showEmoMessages: boolean;
    emojiPackSource: CappellaEmojiPackSource;
    avatarSource: CappellaAvatarSource;
}

export const DEFAULT_CAPPELLA_TUNING: CappellaTuning = {
    showEmoMessages: true,
    emojiPackSource: 'builtin',
    avatarSource: 'cover',
};

export interface CappellaEmojiImage {
    id: string;
    name: string;
    url: string;
}

export interface CadenzaTuning {
    render: LyricRenderOverride;
    fontScale: number;
    widthRatio: number;
    motionAmount: number;
    glowIntensity: number;
    beamIntensity: number;
}

export const DEFAULT_CADENZA_TUNING: CadenzaTuning = {
    render: { scale: 'global', antialias: 'global' },
    fontScale: 1.12,
    widthRatio: 0.72,
    motionAmount: 1,
    glowIntensity: 1,
    beamIntensity: 0,
};

export interface PartitaTuning {
    showGuideLines: boolean;
    useSemanticLayout: boolean;
    staggerMin: number;
    staggerMax: number;
    /** Space the words and rows by how far they are drawn when scaled, so none overlaps another. */
    avoidOverlap?: boolean;
}

export const DEFAULT_PARTITA_TUNING: PartitaTuning = {
    showGuideLines: true,
    useSemanticLayout: true,
    staggerMin: 20,
    staggerMax: 100,
    avoidOverlap: false,
};

export interface FumeTuning {
    /** 分辨率与抗锯齿（#929）：默认跟随全局挡位（utils/lyricRenderQuality.ts）。 */
    render: LyricRenderOverride;
    hidePrintSymbols: boolean;
    disableGeometricBackground: boolean;
    backgroundObjectOpacity: number;
    textHoldRatio: number;
    cameraTrackingMode: 'stepped' | 'smooth';
    cameraSpeed: number;
    glowIntensity: number;
    heroScale: number;
}

export const DEFAULT_FUME_TUNING: FumeTuning = {
    render: { scale: 'global', antialias: 'global' },
    hidePrintSymbols: false,
    disableGeometricBackground: true,
    backgroundObjectOpacity: 0.5,
    textHoldRatio: 1,
    cameraTrackingMode: 'smooth',
    cameraSpeed: 1,
    glowIntensity: 1,
    heroScale: 1,
};

export type LumiereRenderQuality = 'full' | 'balanced' | 'low';

export interface LumiereTuning {
    render: LyricRenderOverride;
    lightIntensity: number;
    audioResponse: number;
    fogDensity: number;
    darkField: number;
    moteAmount: number;
    bloom: number;
    textBloom: number;
    unlitOpacity: number;
    windowNeighbors: 1 | 2;
    decay: number;
    echo: number;
    fogOctaves: number;
    lineArt: boolean;
    frontBokeh: boolean;
    trails: boolean;
    hideTrails: boolean;
    seamlessTransitions: boolean;
    overlayFrame: boolean;
    textOnly: boolean;
    keywordColors: boolean;
    themeIcons: boolean;
    themeColorMix: number;
    renderQuality: LumiereRenderQuality;
}

export const DEFAULT_LUMIERE_TUNING: LumiereTuning = {
    render: { scale: 'global', antialias: 'global' },
    lightIntensity: 1,
    audioResponse: 1,
    fogDensity: 1,
    darkField: 0.75,
    moteAmount: 1,
    bloom: 1,
    textBloom: 1,
    unlitOpacity: 0.22,
    windowNeighbors: 2,
    decay: 1,
    echo: 1,
    fogOctaves: 5,
    lineArt: true,
    frontBokeh: true,
    trails: true,
    hideTrails: false,
    seamlessTransitions: true,
    overlayFrame: true,
    textOnly: false,
    keywordColors: true,
    themeIcons: true,
    themeColorMix: 0.3,
    renderQuality: 'full',
};

export interface PendoloTuning {
  /** 分辨率与抗锯齿（#929）：默认跟随「动画与性能」里的全局挡位（utils/lyricRenderQuality.ts）。 */
  render: LyricRenderOverride;
  arcRadius: number;
  arcAngleDeg: number;
  wheelCenterX: number;
  wheelCenterY: number;
  tickSnappiness: number;
  activeScale: number;
  showGearDecor: 'none' | 'subtle' | 'full';
  showCenterGradient?: boolean;
  showCoverOnWatchFace?: boolean;
  enableLineGlow?: boolean;
  /** 歌词左右镜像（#1124）：表盘移到右边、歌词弧线在左；wheelCenterX 改从右边缘量。 */
  mirrorLayout?: boolean;
  /** 表盘倾斜（度，正值时倾斜轴上方往屏幕里退）：表盘平面带透视地转出屏幕，0 是平放。 */
  tiltDeg?: number;
  /** 倾斜轴的方向（度）：0 是水平轴（前后俯仰），±90 是竖直轴（左右偏转）。 */
  tiltAxisDeg?: number;
  /** 分层视差强度：倾斜时齿轮、摆轮、歌词按各自高度浮在表盘上方，0 是全在一个平面上。 */
  parallaxDepth?: number;
  /** 轮心视角：相机在轮心后上方、顺着刻度针看向焦点句，代替倾斜；只在 WebGL 下生效。 */
  hubView?: boolean;
  /** 轮心视角的相机高度（轮盘半径的倍数）：低时贴着表盘平视，高时接近俯视。 */
  hubViewHeight?: number;
  /** 轮心视角的相机从轮心沿刻度针反方向后退多远（轮盘半径的倍数），0 是正在轮心上方。 */
  hubViewBack?: number;
}

export const DEFAULT_PENDOLO_TUNING: PendoloTuning = {
  render: { scale: 'global', antialias: 'global' },
  arcRadius: 0.42,
  arcAngleDeg: 100,
  wheelCenterX: 0.0,
  wheelCenterY: 0.50,
  tickSnappiness: 2.0,
  activeScale: 1.25,
  showGearDecor: 'subtle',
  showCenterGradient: true,
  showCoverOnWatchFace: false,
  enableLineGlow: false,
  mirrorLayout: false,
  tiltDeg: 0,
  tiltAxisDeg: 0,
  parallaxDepth: 1,
  hubView: false,
  hubViewHeight: 1.4,
  hubViewBack: 1.2,
};

// 'both' stacks romanization above translation.
export type SubtitleContentMode = 'translation' | 'romanization' | 'both' | 'none';

export type MonetAudioStyle = 'bar' | 'line';
export type MonetPortraitSource = 'cover' | 'custom' | 'none';
export type MonetChromeVisibility = 'auto' | 'always' | 'hidden';
export const MONET_CHROME_VISIBILITIES: readonly MonetChromeVisibility[] = ['auto', 'always', 'hidden'];

export interface MonetTuning {
    render: LyricRenderOverride;
    keywordColoringEnabled: boolean;
    /** Whether the description shows at all; kept equal to `descriptionVisibility !== 'hidden'` for older readers. */
    showDescription: boolean;
    descriptionVisibility?: MonetChromeVisibility;
    showAudioVisualization: boolean;
    audioStyle: MonetAudioStyle;
    fontScale: number;
    portraitSource: MonetPortraitSource;
    portraitOffsetX?: number;
    portraitStyle?: 'square' | 'rectangular';
    showPortraitDragHanger?: boolean;
    portraitHangerVisibility?: MonetChromeVisibility;
    mirrorLayout?: boolean;
    customDescription?: string;
}

export const DEFAULT_MONET_TUNING: MonetTuning = {
    render: { scale: 'global', antialias: 'global' },
    keywordColoringEnabled: true,
    showDescription: true,
    descriptionVisibility: 'auto',
    showAudioVisualization: true,
    audioStyle: 'bar',
    fontScale: 1.2,
    portraitSource: 'cover',
    portraitOffsetX: 0,
    portraitStyle: 'square',
    showPortraitDragHanger: true,
    portraitHangerVisibility: 'auto',
    mirrorLayout: false,
    customDescription: '',
};

export type TemperaColorMode = 'duo' | 'mono' | 'gradient';
export type TemperaLayerImageAlign = 'left' | 'center' | 'right' | 'free';
export type TemperaLayerImageVerticalAlign = 'top' | 'center' | 'bottom' | 'free';

export interface TemperaLayerImage {
    id: string;
    name: string;
    align: TemperaLayerImageAlign;
    verticalAlign: TemperaLayerImageVerticalAlign;
    scale: number;
    opacity: number;
}

export const TEMPERA_MAX_LAYER_IMAGES = 16;

export const DEFAULT_TEMPERA_LAYER_IMAGE: Omit<TemperaLayerImage, 'id' | 'name'> = {
    align: 'free',
    verticalAlign: 'bottom',
    scale: 0.7,
    opacity: 1,
};

export interface TemperaTuning {
    render: LyricRenderOverride;
    cameraIntensity: number;
    glyphMotion: number;
    wholeLineLyrics: boolean;
    glyphSettleStretch: number;
    depthOfField: number;
    depthPan: number;
    glyphDepth: number;
    colorMode: TemperaColorMode;
    showBlocks: boolean;
    showDecor: boolean;
    showCornerMarks: boolean;
    textInversion: boolean;
    layerImages: TemperaLayerImage[];
    layerImageDepth: 'back' | 'front';
    layerImageFrequency: number;
    enableTransitions: boolean;
    textureResolution: number;
    postProcessEnabled: boolean;
    postProcessTextureCompression: boolean;
    postProcessGrain: number;
    postProcessContrast: number;
    postProcessRgbShift: number;
    postProcessVignette: number;
    postProcessLensDistortion: number;
}

export const DEFAULT_TEMPERA_TUNING: TemperaTuning = {
    render: { scale: 'global', antialias: 'global' },
    cameraIntensity: 1,
    glyphMotion: 1,
    wholeLineLyrics: false,
    glyphSettleStretch: 0.5,
    depthOfField: 1,
    depthPan: 1,
    glyphDepth: 1,
    colorMode: 'duo',
    showBlocks: true,
    showDecor: true,
    showCornerMarks: true,
    textInversion: true,
    layerImages: [],
    layerImageDepth: 'back',
    layerImageFrequency: 0.6,
    enableTransitions: true,
    textureResolution: 1.5,
    postProcessEnabled: true,
    postProcessTextureCompression: false,
    postProcessGrain: 0.2,
    postProcessContrast: 0,
    postProcessRgbShift: 0,
    postProcessVignette: 0.85,
    postProcessLensDistortion: 0.3,
};
