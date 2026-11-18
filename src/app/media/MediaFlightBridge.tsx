'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { beginReturnFlight, finishForwardFlight } from './mediaCoverFlight';

const PLAYER_PATH = /^\/media\/[^/]+\/?$/;
const WALL_PATH = /^\/media\/?$/;

/**
 * Persists across `/media` and `/media/[id]`, so it can close the forward flight when the player
 * mounts and start the reverse flight before a back navigation swaps the page.
 */
export function MediaFlightBridge() {
    const pathname = usePathname();
    const previousPath = useRef(pathname);

    useEffect(() => {
        if (PLAYER_PATH.test(pathname)) finishForwardFlight();
        previousPath.current = pathname;
    }, [pathname]);

    useEffect(() => {
        const fromPlayer = () => PLAYER_PATH.test(previousPath.current ?? '');
        const onPopState = () => {
            if (fromPlayer() && WALL_PATH.test(window.location.pathname)) beginReturnFlight();
        };
        // Capture phase: runs before next-view-transitions snapshots the outgoing page.
        const onClick = (event: MouseEvent) => {
            if (event.defaultPrevented || event.button !== 0
                || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            if (!fromPlayer()) return;
            const target = event.target;
            const anchor = target instanceof Element ? target.closest('a') : null;
            if (!(anchor instanceof HTMLAnchorElement)) return;
            if (WALL_PATH.test(anchor.pathname)) beginReturnFlight();
        };
        window.addEventListener('popstate', onPopState);
        document.addEventListener('click', onClick, true);
        return () => {
            window.removeEventListener('popstate', onPopState);
            document.removeEventListener('click', onClick, true);
        };
    }, []);

    return null;
}
