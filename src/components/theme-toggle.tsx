"use client";

import {Moon, Sun, SunMoon} from "lucide-react";
import {useEffect, useState} from "react";
import {Button} from "./ui/button";
import EaseToolTip from "@/components/EaseToolTip";

export function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark" | "auto">("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // 从 localStorage 读取主题，默认为 dark
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "auto" | null;
        const initialTheme = savedTheme || "dark";
        setTheme(initialTheme);

        applyTheme(initialTheme);
    }, []);

    // 监听系统主题变化
    useEffect(() => {
        if (theme !== "auto") return;
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            applyTheme("auto");
        };
        mql.addEventListener('change', handleChange);
        return () => mql.removeEventListener('change', handleChange);
    }, [theme]);

    const applyTheme = (mode: "light" | "dark" | "auto") => {
        if (mode === "auto") {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (isDark) {
                document.documentElement.classList.remove("light");
            } else {
                document.documentElement.classList.add("light");
            }
        } else if (mode === "light") {
            document.documentElement.classList.add("light");
        } else {
            document.documentElement.classList.remove("light");
        }
    };

    const toggleTheme = () => {
        // 顺序切换 dark -> light -> auto -> dark
        const nextTheme = theme === "dark" ? "light" : theme === "light" ? "auto" : "dark";
        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
        applyTheme(nextTheme);
    };

    // 避免服务端渲染不匹配
    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
                <Sun className="h-[1.2rem] w-[1.2rem]"/>
            </Button>
        );
    }

    let icon, tip;
    if (theme === "dark") {
        icon = <Sun className="h-[1.2rem] w-[1.2rem]"/>;
        tip = "切换到亮色主题";
    } else if (theme === "light") {
        icon = <Moon className="h-[1.2rem] w-[1.2rem]"/>;
        tip = "切换到自动主题";
    } else {
        icon = <SunMoon className="w-[1.2rem] h-[1.2rem]" />;
        tip = "切换到暗色主题 (自动)";
    }

    return (
        <EaseToolTip tip={tip}>
            <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle Theme"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
                {icon}
            </Button>
        </EaseToolTip>
    );
}
