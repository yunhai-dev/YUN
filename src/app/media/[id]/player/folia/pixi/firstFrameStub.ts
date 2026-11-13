// Stub for Folia's styleTransition/firstFrame hook. Style switching / crossfade transitions are
// not part of this port; the hosts still call the hook to announce a style's first frame, so it
// resolves to a no-op.
export const useFirstFrameDrawn = (): (() => void) => () => undefined;
