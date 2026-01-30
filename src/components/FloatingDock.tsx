"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutGrid,
    BarChart2,
    Users,
    Settings,
    Globe,
    Moon,
    Sun,
    Monitor,
    Zap,
    DownloadCloud,
    Calendar as CalendarIcon,
    Menu,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { DateRange } from "@/lib/windsor";
import { useState } from "react";

interface FloatingDockProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    platform: "all" | "google" | "facebook";
    setPlatform: (p: "all" | "google" | "facebook") => void;
    dateRange: DateRange;
    setDateRange: (d: DateRange) => void;
    onExport: () => void;
}

export function FloatingDock({ activeTab, setActiveTab, platform, setPlatform, dateRange, setDateRange, onExport }: FloatingDockProps) {
    const { t } = useLanguage();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Common Button Styles
    const btnClass = (isActive: boolean) => cn(
        "relative flex h-12 w-12 items-center justify-center rounded-[10px] transition-all border border-white/5",
        isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:scale-105"
    );

    return (
        <>
            {/* ================= DESKTOP DOCK (Bottom Centered) ================= */}
            <div className="hidden md:flex fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex items-center gap-2 rounded-[10px] border border-white/10 bg-black/60 p-2 shadow-2xl backdrop-blur-xl dark:bg-white/10 dark:border-white/20"
                >
                    {/* Navigation Group */}
                    <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1">
                        <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab("overview")}
                            className={cn(
                                "relative flex h-10 w-10 items-center justify-center rounded-lg transition-all",
                                activeTab === "overview" ? "text-primary bg-white/10" : "text-muted-foreground hover:bg-white/10"
                            )}
                            title={t.tabs.overview}
                        >
                            <LayoutGrid className="h-5 w-5" />
                            {activeTab === "overview" && (
                                <motion.span
                                    layoutId="activeTabIndicator"
                                    className="absolute -bottom-1 h-1 w-1 rounded-full bg-primary"
                                />
                            )}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab("audience")}
                            className={cn(
                                "relative flex h-10 w-10 items-center justify-center rounded-lg transition-all",
                                activeTab === "audience" ? "text-primary bg-white/10" : "text-muted-foreground hover:bg-white/10"
                            )}
                            title={t.tabs.audience}
                        >
                            <Users className="h-5 w-5" />
                            {activeTab === "audience" && (
                                <motion.span
                                    layoutId="activeTabIndicator"
                                    className="absolute -bottom-1 h-1 w-1 rounded-full bg-primary"
                                />
                            )}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab("creatives")}
                            className={cn(
                                "relative flex h-10 w-10 items-center justify-center rounded-lg transition-all",
                                activeTab === "creatives" ? "text-primary bg-white/10" : "text-muted-foreground hover:bg-white/10"
                            )}
                            title={t.tabs.creatives}
                        >
                            <BarChart2 className="h-5 w-5" />
                            {activeTab === "creatives" && (
                                <motion.span
                                    layoutId="activeTabIndicator"
                                    className="absolute -bottom-1 h-1 w-1 rounded-full bg-primary"
                                />
                            )}
                        </motion.button>
                    </div>

                    <div className="h-8 w-px bg-white/10" />

                    {/* Platform Group */}
                    <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1">
                        {(["all", "google", "facebook"] as const).map((p) => (
                            <motion.button
                                key={p}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setPlatform(p)}
                                className={cn(
                                    "relative flex h-10 w-10 items-center justify-center rounded-lg transition-all",
                                    platform === p ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-white/10"
                                )}
                                title={t.platforms[p]}
                            >
                                {p === "all" && <Zap className="h-5 w-5" />}
                                {p === "google" && (
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" />
                                    </svg>
                                )}
                                {p === "facebook" && (
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor" />
                                    </svg>
                                )}
                            </motion.button>
                        ))}
                    </div>

                    <div className="h-8 w-px bg-white/10" />

                    {/* Date and Settings Groups */}
                    <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1">
                        <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                            className={cn(
                                "relative flex h-10 w-10 items-center justify-center rounded-lg transition-all",
                                isCalendarOpen ? "bg-white/10 text-primary" : "text-muted-foreground hover:bg-white/10"
                            )}
                        >
                            <CalendarIcon className="h-5 w-5" />
                        </motion.button>
                        {/* Simple Dropdown for Date Selection */}
                        {isCalendarOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: -60, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute bottom-full left-0 mb-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-black/90 p-1 shadow-2xl backdrop-blur-xl"
                            >
                                {(['last_7d', 'last_30d', 'this_month', 'last_month'] as const).map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => {
                                            setDateRange(range);
                                            setIsCalendarOpen(false);
                                        }}
                                        className={cn(
                                            "w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                                            dateRange === range
                                                ? "bg-primary/20 text-primary"
                                                : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
                                        )}
                                    >
                                        {t.dates[range]}
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        <div className="h-8 w-px mx-1 bg-white/10" />

                        <motion.button whileHover={{ scale: 1.1 }} onClick={onExport} className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-white/10 text-muted-foreground">
                            <DownloadCloud className="h-4 w-4" />
                        </motion.button>
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>
                </motion.div>
            </div>


            {/* ================= MOBILE HAMBURGER BUTTON (Right Top) ================= */}
            <div className="md:hidden fixed top-4 right-4 z-[60]">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 border border-white/10 backdrop-blur-md shadow-xl text-foreground"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* ================= MOBILE "IPHONE FOLDER" MENU ================= */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm md:hidden"
                        />

                        {/* Menu Container */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: -20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: -20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed z-[80] top-[15%] left-1/2 -translate-x-1/2 w-[300px] rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-2xl p-6 shadow-2xl md:hidden"
                        >
                            {/* Header / Title */}
                            <div className="flex items-center justify-between mb-6 px-2">
                                <span className="text-sm font-medium text-white/50">Menu</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="rounded-full bg-white/10 p-1 text-white/70 hover:bg-white/20">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Grid of Apps */}
                            <div className="grid grid-cols-3 gap-4">
                                {/* TAB GROUP */}
                                <button onClick={() => { setActiveTab("overview"); setIsMobileMenuOpen(false); }} className={btnClass(activeTab === "overview")}>
                                    <LayoutGrid className="h-6 w-6" />
                                </button>
                                <button onClick={() => { setActiveTab("audience"); setIsMobileMenuOpen(false); }} className={btnClass(activeTab === "audience")}>
                                    <Users className="h-6 w-6" />
                                </button>
                                <button onClick={() => { setActiveTab("creatives"); setIsMobileMenuOpen(false); }} className={btnClass(activeTab === "creatives")}>
                                    <BarChart2 className="h-6 w-6" />
                                </button>

                                {/* PLATFORM GROUP */}
                                {(["all", "google", "facebook"] as const).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => { setPlatform(p); setIsMobileMenuOpen(false); }}
                                        className={btnClass(platform === p)}
                                    >
                                        {p === "all" && <Zap className="h-6 w-6" />}
                                        {p === "google" && <span className="font-bold text-xs">G</span>}
                                        {p === "facebook" && <span className="font-bold text-xs">F</span>}
                                    </button>
                                ))}

                                {/* UTILS */}
                                <button onClick={() => { onExport(); setIsMobileMenuOpen(false); }} className={btnClass(false)}>
                                    <DownloadCloud className="h-6 w-6" />
                                </button>
                                <button className={cn("col-span-1 flex h-12 w-12 items-center justify-center rounded-[10px] border border-white/5 bg-white/5")}>
                                    <ThemeToggle />
                                </button>
                                <div className="flex items-center justify-center h-12 w-12 rounded-[10px] bg-white/5 border border-white/5">
                                    <LanguageToggle />
                                </div>
                            </div>

                            {/* Date Selector Footer */}
                            <div className="mt-6 pt-4 border-t border-white/10">
                                <div className="grid grid-cols-2 gap-2">
                                    {(['last_7d', 'last_30d', 'this_month', 'last_month'] as const).map((range) => (
                                        <button
                                            key={range}
                                            onClick={() => { setDateRange(range); setIsMobileMenuOpen(false); }}
                                            className={cn(
                                                "px-3 py-2 rounded-xl text-xs font-medium border transition-colors",
                                                dateRange === range ? "bg-primary/20 border-primary text-primary" : "bg-white/5 border-transparent text-muted-foreground"
                                            )}
                                        >
                                            {t.dates[range]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
