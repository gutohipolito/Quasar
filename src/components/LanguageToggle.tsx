"use client";

import { useLanguage } from "./LanguageProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);

    // Target language is the one we switch TO
    const targetLanguage = language === "en" ? "pt" : "en";

    // Icon to display: if hovered, show target (prediction). if not, show current.
    const displayLanguage = isHovered ? targetLanguage : language;

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLanguage(targetLanguage)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white/10 text-foreground hover:bg-white/20 shadow-sm transition-colors group overflow-hidden"
            aria-label="Toggle language"
        >
            <AnimatePresence mode="wait" initial={false}>
                {displayLanguage === "en" ? (
                    <motion.div
                        key="en"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {/* US Flag SVG */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 480"
                            className="h-4 w-6 rounded-sm shadow-sm grayscale group-hover:grayscale-0 transition-all duration-300 transform scale-125"
                        >
                            <path fill="#bd3d44" d="M0 0h640v480H0" />
                            <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640" />
                            <path fill="#192f5d" d="M0 0h244.8v221.7H0" />
                            <g fill="#fff">
                                <circle cx="17.5" cy="18.5" r="7.4" />
                                <circle cx="59.3" cy="18.5" r="7.4" />
                                <circle cx="101.2" cy="18.5" r="7.4" />
                                <circle cx="143" cy="18.5" r="7.4" />
                                <circle cx="184.9" cy="18.5" r="7.4" />
                                <circle cx="226.7" cy="18.5" r="7.4" />
                            </g>
                        </svg>
                    </motion.div>
                ) : (
                    <motion.div
                        key="pt"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {/* Brazil Flag SVG */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 480"
                            className="h-4 w-6 rounded-sm shadow-sm grayscale group-hover:grayscale-0 transition-all duration-300 transform scale-125"
                        >
                            <path fill="#009c3b" d="M0 0h640v480H0z" />
                            <path fill="#ffdf00" d="m317 29 270 211-270 211L49 240z" />
                            <circle cx="317" cy="240" r="88" fill="#002776" />
                            <path fill="#fff" d="M317 222c54 0 99 35 113 83-58-30-111-28-151 5-4-32 10-63 38-88z" />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
