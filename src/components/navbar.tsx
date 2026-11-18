"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { STORAGE_HOST } from "@/data/baseUrl";
import {
    NoomoSiteMenu,
    siteMenuExploreItems,
    siteMenuPrimaryItems,
} from "@/components/noomo/NoomoSiteMenu";

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        // The full-screen menu owns the viewport while it is open.
        if (!isOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    const closeMenu = () => {
        setIsOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
    };

    const isPlayerPage = /^\/media\/[^/]+\/?$/.test(pathname);
    const isMediaWallPage = pathname === "/media" || pathname === "/media/";
    const isStorytellingPage =
        pathname === "/" ||
        pathname.startsWith("/cases/") ||
        pathname === "/cases" ||
        pathname === "/contacts" ||
        pathname.startsWith("/contacts/");
    if (isPlayerPage || isMediaWallPage || isStorytellingPage) {
        return null;
    }

    const sectionLabel = (pathname.split("/").filter(Boolean)[0] ?? "blog").toUpperCase();

    const isPathActive = (href: string) => {
        const target = href.replace(/\/+$/, "") || "/";
        const current = pathname.replace(/\/+$/, "") || "/";
        return target === "/"
            ? current === "/"
            : current === target || current.startsWith(`${target}/`);
    };
    const primaryActiveIndex = siteMenuPrimaryItems.findIndex((item) => isPathActive(item.href));
    const exploreActive = siteMenuExploreItems.some((item) => isPathActive(item.href));
    // Anchor Explore itself when the current page is one of its links.
    const menuActiveIndex =
        primaryActiveIndex >= 0
            ? primaryActiveIndex
            : exploreActive
              ? siteMenuPrimaryItems.length
              : -1;

    return (
        <>
        <header
            className={`fixed top-0 left-0 z-50 w-full transition-opacity duration-300 ${
                isOpen ? "pointer-events-none opacity-0" : ""
            }`}
            inert={isOpen}
            aria-hidden={isOpen}
        >
            {/* Same insets as the homepage: its .container adds 16px/20px, plus the header's own padding. */}
            <div className="flex w-full items-center justify-between px-9 pt-5 md:px-10 lg:items-start lg:px-[74px] lg:pt-[38px]">
                {/* Brand: same as the storytelling header */}
                <Link
                    href="/"
                    className="relative inline-flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-80"
                >
                    <Image
                        src={`${STORAGE_HOST}/Avatar.webp`}
                        alt="云云亦海 Avatar"
                        width={32}
                        height={32}
                        sizes="32px"
                        className="h-8 w-8 rounded-full object-cover border border-white/30"
                        priority
                    />
                    <span className="noomo-menu-sans-18 font-medium tracking-tight text-[#29345a]">
                        YunHai <span className="opacity-80">· 云云亦海</span>
                    </span>
                </Link>

                {/* One menu trigger at every width; links live in the full-screen menu. */}
                <button
                    ref={menuButtonRef}
                    type="button"
                    onClick={() => setIsOpen(true)}
                    aria-label="打开菜单"
                    aria-haspopup="dialog"
                    aria-controls="site-menu"
                    className="mobile-menu-button relative flex h-10 w-[92px] items-center justify-center rounded-full bg-white/31 backdrop-blur-2xl transition-all duration-500 ease-in-out"
                >
                    <div className="bb" />
                    <p className="noomo-menu-sans-18 text-[#29345a]">Menu</p>
                </button>
            </div>
        </header>

        {/* Vertical wordmark along the left edge, hidden while the menu is open. */}
        <span
            aria-hidden="true"
            style={{ writingMode: "vertical-rl" }}
            className={`pointer-events-none fixed left-3 top-1/2 -z-10 -translate-y-1/2 rotate-180 select-none text-[10vw] font-semibold uppercase leading-none tracking-[0.02em] text-white/60 transition-opacity duration-300 lg:left-5 ${
                isOpen ? "opacity-0" : "opacity-100"
            }`}
        >
            YUNHAI
        </span>

        {/* Matching vertical label on the right edge. */}
        <span
            aria-hidden="true"
            style={{ writingMode: "vertical-rl" }}
            className={`pointer-events-none fixed right-3 top-1/2 -z-10 -translate-y-1/2 select-none text-[10vw] font-semibold uppercase leading-none tracking-[0.02em] text-white/60 transition-opacity duration-300 lg:right-5 ${
                isOpen ? "opacity-0" : "opacity-100"
            }`}
        >
            {sectionLabel}
        </span>

        <NoomoSiteMenu
            open={isOpen}
            onClose={closeMenu}
            onCloseQuietly={() => setIsOpen(false)}
            activeIndex={menuActiveIndex}
            exploreActive={exploreActive}
            menuId="site-menu"
            linkComponent={Link}
        />
        </>
    );
}
