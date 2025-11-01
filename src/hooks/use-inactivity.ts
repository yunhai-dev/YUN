import { useState, useEffect, useRef, useCallback } from 'react';

type UseInactivityOptions = {
    timeoutMs?: number;
    initialActive?: boolean;
    /**
     * 哪些事件算“活动”。
     * 默认: mousemove, mousedown, keydown, scroll, touchstart
     */
    activityEvents?: (keyof WindowEventMap)[];
};

export function useInactivityAdvanced(options: UseInactivityOptions = {}) {
    const {
        timeoutMs = 5000,
        initialActive = true,
        activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart']
    } = options;

    const [active, setActive] = useState<boolean>(initialActive);
    const timerRef = useRef<number | null>(null);

    const clearTimer = () => {
        if (timerRef.current !== null) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const schedule = useCallback(() => {
        clearTimer();
        timerRef.current = window.setTimeout(() => {
            setActive(false);
        }, timeoutMs);
    }, [timeoutMs]);

    const onActivity = useCallback(() => {
        // 若当前不活跃，用户有操作时恢复
        setActive(true);
        schedule();
    }, [schedule]);

    const reset = useCallback(() => {
        setActive(true);
        schedule();
    }, [schedule]);

    useEffect(() => {
        schedule();
        const opts: AddEventListenerOptions = { passive: true };
        activityEvents.forEach(evt => window.addEventListener(evt, onActivity, opts));

        return () => {
            activityEvents.forEach(evt => window.removeEventListener(evt, onActivity));
            clearTimer();
        };
    }, [activityEvents, onActivity, schedule]);

    return { active, reset };
}
