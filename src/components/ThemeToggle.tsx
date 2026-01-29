"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-9 w-9 rounded-full bg-white/10" />; // skeleton
    }

    // Current effective theme (handling 'system' if needed, generally we default to dark/light in logic)
    const currentTheme = theme === 'dark' ? 'dark' : 'light';

    // Target theme (what happens on click)
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Icon to display: if hovered, show target (prediction). if not, show current.
    const displayTheme = isHovered ? targetTheme : currentTheme;

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(targetTheme)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white/10 text-foreground hover:bg-white/20 shadow-sm transition-colors group overflow-hidden"
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                {displayTheme === 'light' ? (
                    <motion.div
                        key="light"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <Sun className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="dark"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <Moon className="h-4 w-4 text-slate-200 fill-slate-200" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
