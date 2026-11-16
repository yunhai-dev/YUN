export interface Sweet3EngineSettings {
  devMode?: boolean;
  timeAtStart?: number;
  useDevCamera?: boolean;
  isMobile?: boolean;
}

export interface Sweet3EngineOptions {
  settings?: Sweet3EngineSettings;
  container: HTMLElement;
}

export interface CrystalViewportEventPayload {
  id: string;
  position: { x: number; y: number };
}

export declare class Sweet3Engine {
  static hoverEvent: string;
  static scrollEvent: string;
  static crystalViewportEvent: string;

  constructor(options: Sweet3EngineOptions);
  on(event: string, cb: (payload: never) => void): void;
  off(event: string, cb: (payload: never) => void): void;
  load(): Promise<void>;
  seek(progress: number): void;
  setPointerTrail(value: number): void;
  setIsContact(value: number): void;
  setContactImage(key: string): void;
  setIsCaseIce(value: number): void;
  setIsCaseVideo(value: number): void;
  setCaseVideo(el: HTMLVideoElement | null): void;
  setScrollSpeed(speed: number): void;
  setUseMobileTimeline(useMobile: boolean): void;
  releaseSpiritLight(): void;
}
