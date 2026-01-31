"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle({ isAtTop = false }: { isAtTop?: boolean }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-14 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`relative w-[56px] h-8 rounded-full p-1 transition-all duration-300 focus:outline-none flex items-center ${isAtTop
                ? "bg-blue-50 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 border border-blue-100 dark:border-white/20 backdrop-blur-sm"
                : "bg-blue-50 dark:bg-zinc-800 border border-blue-100 dark:border dark:border-white/10"
                }`}
            aria-label="Toggle theme"
        >
            {/* The sliding background - Always white for best indicator visibility */}
            <motion.div
                className="absolute left-1 h-6 w-6 rounded-full z-0 bg-white"
                initial={false}
                animate={{
                    x: isDark ? 0 : 24,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                }}
            />

            {/* Icons container */}
            <div className="relative z-10 grid grid-cols-2 w-full h-full items-center">
                <div className="flex items-center justify-center h-full">
                    <Moon className={`h-3.5 w-3.5 transition-colors duration-300 ${isDark ? "text-primary" : "text-zinc-500 dark:text-white/50"}`} />
                </div>
                <div className="flex items-center justify-center h-full">
                    <Sun className={`h-3.5 w-3.5 transition-colors duration-300 translate-x-[1.5px] ${isDark ? "text-zinc-500 dark:text-white/50" : "text-primary"}`} />
                </div>
            </div>
        </button>
    );
}
