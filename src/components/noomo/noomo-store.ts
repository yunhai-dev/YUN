'use client';

import { useSyncExternalStore } from 'react';

export interface ScrollSectionConfig {
  id: string;
  scrollLength: number;
}

export interface CrystalPosition {
  x: number;
  y: number;
}

export type SectionColor = 'light' | 'dark';
export type NoomoPageType = 'home' | 'cases' | 'contacts' | '';

const CRYSTAL_IDS = [
  'crystal0',
  'crystal1',
  'crystal2',
  'crystal3',
  'crystal4',
  'crystal5',
  'crystal6',
] as const;

export function createInitialCrystals(): Record<string, CrystalPosition> {
  return CRYSTAL_IDS.reduce<Record<string, CrystalPosition>>((acc, id) => {
    acc[id] = { x: 0, y: 0 };
    return acc;
  }, {});
}

export function getScrollSectionsForViewport(isDesktop: boolean): ScrollSectionConfig[] {
  return [
    { id: '1', scrollLength: isDesktop ? 100 : 50 },
    { id: '2', scrollLength: isDesktop ? 150 : 75 },
    { id: '3', scrollLength: isDesktop ? 300 : 150 },
    { id: '4', scrollLength: isDesktop ? 300 : 150 },
    { id: '5', scrollLength: isDesktop ? 200 : 100 },
    { id: '6', scrollLength: isDesktop ? 300 : 150 },
    { id: '7', scrollLength: isDesktop ? 500 : 250 },
    { id: '8', scrollLength: isDesktop ? 200 : 100 },
    { id: '9', scrollLength: isDesktop ? 80 : 40 },
    { id: '10', scrollLength: isDesktop ? 80 : 40 },
    { id: '11', scrollLength: 170 },
    { id: '12', scrollLength: 190 },
    { id: '13', scrollLength: 280 },
    { id: '14', scrollLength: 50 },
    { id: '15', scrollLength: 50 },
    { id: '16', scrollLength: 100 },
    { id: '17', scrollLength: 140 },
    { id: '18', scrollLength: isDesktop ? 560 : 1100 },
    { id: '19', scrollLength: isDesktop ? 200 : 250 },
    { id: '20', scrollLength: 280 },
  ];
}

export interface ScrollControllerHandle {
  scrollTo: (target: number | string, smooth?: boolean) => void;
  scrollTop: (val?: number, smooth?: boolean) => number | void;
  paused: (val?: boolean) => boolean | void;
  scrollTrigger?: {
    refresh?: () => void;
    update?: () => void;
  };
}

export interface NoomoState {
  sceneQuality: 'high' | 'low';
  soundEnabled: boolean;
  sceneLoaded: boolean;
  scroll: ScrollControllerHandle | null;
  sectionColor: SectionColor;
  scrollProgress: number;
  scrollSections: ScrollSectionConfig[];
  cursorHover: boolean;
  cursorHoverCase: boolean;
  hoverCaseId: string | null;
  cursorText: string;
  cursorTextVisible: boolean;
  experienceStarted: boolean;
  scrollSpeed: number;
  contactTransition: number;
  iceTransition: number;
  videoTransition: number;
  cursorTransition: number;
  currentPage: NoomoPageType;
  videoElement: HTMLVideoElement | null;
  casePageTopFrost: number;
  casePageBottomFrost: number;
  fireSection: boolean;
  mobileMenuOpen: boolean;
  iceCubesPosition: Record<string, CrystalPosition>;
  firstClick: boolean;
  soundEnabledBeforeTabHidden: boolean;
  scrollCrutch: boolean;
  transitionActive: boolean;
}

export type NoomoActionName =
  | 'setSceneQuality'
  | 'setScroll'
  | 'setScrollProgress'
  | 'setSectionColor'
  | 'setCursorHover'
  | 'setCursorHoverCase'
  | 'setCursorText'
  | 'setCursorTextState'
  | 'setExperienceStarted'
  | 'setScrollSpeed'
  | 'setSceneLoaded'
  | 'setContactTransition'
  | 'setIceTransition'
  | 'setVideoTransition'
  | 'setCursorTransition'
  | 'setCurrentPage'
  | 'setVideoElement'
  | 'setCasePageTopFrost'
  | 'setCasePageBottomFrost'
  | 'changeBirdColor'
  | 'setFireSection'
  | 'setMobileMenuOpen'
  | 'setIceCubePositionByIndex'
  | 'setEnableSound'
  | 'setFirstClick'
  | 'setSoundEnabledBeforeTabHidden'
  | 'setScrollCrutch'
  | 'setTransitionActive'
  | 'playWingsSound'
  | 'playCubeSound'
  | 'toCase'
  | 'setScrollSections';

type ActionListener = (event: { name: NoomoActionName; args: unknown[] }) => void;

class NoomoStore {
  private state: NoomoState = {
    sceneQuality: 'high',
    soundEnabled: false,
    sceneLoaded: false,
    scroll: null,
    sectionColor: 'light',
    scrollProgress: 0,
    scrollSections: getScrollSectionsForViewport(true),
    cursorHover: false,
    cursorHoverCase: false,
    hoverCaseId: null,
    cursorText: '',
    cursorTextVisible: false,
    experienceStarted: false,
    scrollSpeed: 0,
    contactTransition: 0,
    iceTransition: 0,
    videoTransition: 0,
    cursorTransition: 0,
    currentPage: '',
    videoElement: null,
    casePageTopFrost: -0.5,
    casePageBottomFrost: -0.5,
    fireSection: false,
    mobileMenuOpen: false,
    iceCubesPosition: createInitialCrystals(),
    firstClick: false,
    soundEnabledBeforeTabHidden: false,
    scrollCrutch: false,
    transitionActive: false,
  };

  private listeners = new Set<() => void>();
  private actionListeners = new Set<ActionListener>();

  getSnapshot = (): NoomoState => this.state;

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  onAction = (listener: ActionListener): (() => void) => {
    this.actionListeners.add(listener);
    return () => {
      this.actionListeners.delete(listener);
    };
  };

  private emit(name: NoomoActionName, args: unknown[], mutate?: () => void) {
    if (mutate) {
      mutate();
      this.state = { ...this.state };
      this.listeners.forEach((fn) => fn());
    }
    this.actionListeners.forEach((fn) => fn({ name, args }));
  }

  getTotalScrollLength(): number {
    return this.state.scrollSections.reduce((acc, s) => acc + s.scrollLength, 0);
  }

  setScrollSections = (isDesktop: boolean) => {
    this.emit('setScrollSections', [isDesktop], () => {
      this.state.scrollSections = getScrollSectionsForViewport(isDesktop);
    });
  };

  setSceneQuality = (q: 'high' | 'low') => {
    this.emit('setSceneQuality', [q], () => {
      this.state.sceneQuality = q;
    });
  };

  setScroll = (scroll: ScrollControllerHandle | null) => {
    this.emit('setScroll', [scroll], () => {
      this.state.scroll = scroll;
    });
  };

  setScrollProgress = (progress: number) => {
    this.emit('setScrollProgress', [progress], () => {
      this.state.scrollProgress = progress;
    });
  };

  setSectionColor = (color: SectionColor) => {
    if (this.state.sectionColor === color) return;
    this.emit('setSectionColor', [color], () => {
      this.state.sectionColor = color;
    });
  };

  setCursorHover = (hover: boolean) => {
    this.emit('setCursorHover', [hover], () => {
      this.state.cursorHover = hover;
    });
  };

  setCursorHoverCase = (hover: boolean, id: string | null = null) => {
    this.emit('setCursorHoverCase', [hover, id], () => {
      this.state.cursorHoverCase = hover;
      this.state.hoverCaseId = id;
    });
  };

  setCursorText = (text: string) => {
    this.emit('setCursorText', [text], () => {
      this.state.cursorText = text;
    });
  };

  setCursorTextState = (visible: boolean) => {
    this.emit('setCursorTextState', [visible], () => {
      this.state.cursorTextVisible = visible;
    });
  };

  setExperienceStarted = (started: boolean) => {
    this.emit('setExperienceStarted', [started], () => {
      this.state.experienceStarted = started;
    });
  };

  setScrollSpeed = (speed: number) => {
    this.state.scrollSpeed = speed;
    this.listeners.forEach((fn) => fn());
  };

  setSceneLoaded = (loaded: boolean) => {
    this.emit('setSceneLoaded', [loaded], () => {
      this.state.sceneLoaded = loaded;
    });
  };

  setContactTransition = (val: number) => {
    this.state.contactTransition = val;
    this.listeners.forEach((fn) => fn());
  };

  setIceTransition = (val: number) => {
    this.state.iceTransition = val;
    this.listeners.forEach((fn) => fn());
  };

  setVideoTransition = (val: number) => {
    this.state.videoTransition = val;
    this.listeners.forEach((fn) => fn());
  };

  setCursorTransition = (val: number) => {
    this.state.cursorTransition = val;
    this.listeners.forEach((fn) => fn());
  };

  setCurrentPage = (page: NoomoPageType) => {
    this.emit('setCurrentPage', [page], () => {
      this.state.currentPage = page;
    });
  };

  setVideoElement = (el: HTMLVideoElement | null) => {
    this.emit('setVideoElement', [el], () => {
      this.state.videoElement = el;
    });
  };

  setCasePageTopFrost = (val: number) => {
    this.emit('setCasePageTopFrost', [val], () => {
      this.state.casePageTopFrost = val;
    });
  };

  setCasePageBottomFrost = (val: number) => {
    this.emit('setCasePageBottomFrost', [val], () => {
      this.state.casePageBottomFrost = val;
    });
  };

  changeBirdColor = (mode: 'bird' | 'fire') => {
    this.emit('changeBirdColor', [mode]);
  };

  setFireSection = (val: boolean) => {
    if (this.state.fireSection === val) return;
    this.emit('setFireSection', [val], () => {
      this.state.fireSection = val;
    });
  };

  setMobileMenuOpen = (open: boolean) => {
    this.emit('setMobileMenuOpen', [open], () => {
      this.state.mobileMenuOpen = open;
    });
  };

  setIceCubePositionByIndex = (id: string, pos: CrystalPosition) => {
    if (Object.prototype.hasOwnProperty.call(this.state.iceCubesPosition, id)) {
      this.state.iceCubesPosition = {
        ...this.state.iceCubesPosition,
        [id]: pos,
      };
      this.listeners.forEach((fn) => fn());
    }
  };

  setEnableSound = (enabled: boolean) => {
    this.emit('setEnableSound', [enabled], () => {
      this.state.soundEnabled = enabled;
    });
  };

  setFirstClick = (val: boolean) => {
    this.emit('setFirstClick', [val], () => {
      this.state.firstClick = val;
    });
  };

  setSoundEnabledBeforeTabHidden = (val: boolean) => {
    this.emit('setSoundEnabledBeforeTabHidden', [val], () => {
      this.state.soundEnabledBeforeTabHidden = val;
    });
  };

  setScrollCrutch = (val: boolean) => {
    this.emit('setScrollCrutch', [val], () => {
      this.state.scrollCrutch = val;
    });
  };

  setTransitionActive = (val: boolean) => {
    this.emit('setTransitionActive', [val], () => {
      this.state.transitionActive = val;
    });
  };

  playWingsSound = () => {
    this.emit('playWingsSound', []);
  };

  playCubeSound = () => {
    this.emit('playCubeSound', []);
  };

  toCase = () => {
    this.emit('toCase', []);
  };
}

export const noomoStore = new NoomoStore();

export function useNoomoStore(): NoomoState {
  return useSyncExternalStore(
    noomoStore.subscribe,
    noomoStore.getSnapshot,
    noomoStore.getSnapshot
  );
}
