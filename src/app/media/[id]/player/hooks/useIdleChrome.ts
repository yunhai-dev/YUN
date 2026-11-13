"use client";

import { useEffect, useRef, useState } from 'react';

// Folia's playing page hides its chrome (and the cursor) after a spell without mouse movement,
// bringing it back on the first move, wheel or press. Ported from hooks/usePlayerChromeAutoHide.ts
// and useIdleCursorHide.ts, reduced to the auto-hide mode this player offers.

const CHROME_IDLE_HIDE_MS = 3000;

/**
 * True after `CHROME_IDLE_HIDE_MS` without pointer activity. `enabled` false (touch devices,
 * where there is no pointer to bring the chrome back) or `suspended` true (a panel is open, the
 * pill is being used) keeps the chrome on screen.
 */
export const useIdleChrome = (enabled: boolean, suspended: boolean): boolean => {
    const [hidden, setHidden] = useState(false);
    const timeoutRef = useRef<number | undefined>(undefined);
    const rafRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (!enabled || suspended) {
            setHidden(false);
            return;
        }

        let throttled = false;
        let pointerHeld = false;

        const clearTimer = () => {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = undefined;
        };
        const schedule = (delay: number) => {
            clearTimer();
            if (pointerHeld) return;
            timeoutRef.current = window.setTimeout(() => {
                timeoutRef.current = undefined;
                setHidden(true);
            }, delay);
        };
        const showAndReset = () => {
            setHidden(false);
            schedule(CHROME_IDLE_HIDE_MS);
        };

        const handleMouseMove = (event: MouseEvent) => {
            // A pointer released outside the window does not reliably deliver pointerup here.
            if (pointerHeld && event.buttons === 0) pointerHeld = false;
            if (throttled) return;
            throttled = true;
            rafRef.current = requestAnimationFrame(() => {
                showAndReset();
                throttled = false;
            });
        };
        const handlePointerDown = () => {
            pointerHeld = true;
            clearTimer();
            setHidden(false);
        };
        const handlePointerUp = () => {
            pointerHeld = false;
            showAndReset();
        };
        // Leaving the window hides the chrome quickly: there is nothing left to point at.
        const handleMouseOut = (event: MouseEvent) => {
            const hasLeftWindow = !event.relatedTarget || event.clientY <= 0 || event.clientX <= 0
                || event.clientX >= window.innerWidth || event.clientY >= window.innerHeight;
            if (hasLeftWindow) schedule(300);
        };

        showAndReset();
        window.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointerup', handlePointerUp);
        window.addEventListener('pointercancel', handlePointerUp);
        window.addEventListener('wheel', showAndReset, { passive: true });

        return () => {
            clearTimer();
            if (rafRef.current !== undefined) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = undefined;
            }
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointerup', handlePointerUp);
            window.removeEventListener('pointercancel', handlePointerUp);
            window.removeEventListener('wheel', showAndReset);
        };
    }, [enabled, suspended]);

    return hidden;
};
