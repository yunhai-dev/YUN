// Folia's styleTransition/firstFrame hook, reduced to what this port needs: style switching and
// crossfade transitions are not part of it, but the hosts still announce a runtime's first frame
// here. The forward cover flight waits for that signal before it lifts, so the reveal lands on a
// painted scene instead of a loading label.
import { notifyStageReady } from '../../../../mediaCoverFlight';

export const useFirstFrameDrawn = (): (() => void) => notifyStageReady;
