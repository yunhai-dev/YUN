"use client";

import {useEffect} from "react";

export function HomeViewportOrchestrator() {
    useEffect(() => {
        const sections = Array.from(
            document.querySelectorAll<HTMLElement>("[data-home-section]")
        );

        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!(entry.target instanceof HTMLElement)) return;

                    if (entry.isIntersecting) {
                        entry.target.dataset.viewportState = "active";
                        return;
                    }

                    const rect = entry.boundingClientRect;
                    if (rect.top >= window.innerHeight * 0.6) {
                        entry.target.dataset.viewportState = "before";
                        return;
                    }

                    if (rect.bottom <= window.innerHeight * 0.4) {
                        entry.target.dataset.viewportState = "after";
                    }
                });
            },
            {
                threshold: [0.15, 0.35, 0.6],
                rootMargin: "-8% 0px -8% 0px",
            }
        );

        document.documentElement.dataset.homeViewportReady = "true";

        sections.forEach((section, index) => {
            section.dataset.viewportState = index === 0 ? "active" : "before";
            observer.observe(section);
        });

        const handlePageHide = () => {
            document.documentElement.dataset.homePageLeaving = "true";
        };

        window.addEventListener("pagehide", handlePageHide);

        const handleBeforeUnload = () => {
            document.documentElement.dataset.homePageLeaving = "true";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                document.documentElement.dataset.homePageLeaving = "true";
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener("pagehide", handlePageHide);
            window.removeEventListener("beforeunload", handleBeforeUnload);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            delete document.documentElement.dataset.homeViewportReady;
            delete document.documentElement.dataset.homePageLeaving;
            observer.disconnect();
        };
    }, []);

    return null;
}
