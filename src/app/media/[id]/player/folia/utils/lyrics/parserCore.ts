// Subset of Folia's src/utils/lyrics/parserCore.ts. The full parser (LRC/TTML decoding, interlude
// insertion) runs in the player's own lyric pipeline before lines reach this port; the 町景 engine
// only needs this one predicate.
import type { Line } from '../../types';

export const INTERLUDE_FULL_TEXT = '......';

export const isInterludeLine = (line: Pick<Line, 'fullText'>): boolean => line.fullText === INTERLUDE_FULL_TEXT;
