"use client";

import { motion } from "framer-motion";
import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageProvider";

interface StatsCardProps {
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon: LucideIcon;
    delay?: number;
}

export function StatsCard({ title, value, trend, trendUp, icon: Icon, delay = 0 }: StatsCardProps) {
    const { t } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-primary/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/10"
        >
            {/* Dynamic Gradient Blob on Hover */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover:bg-primary/30" />
            <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors">{title}</p>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {value}
                    </h3>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-3 text-primary shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6" />
                </div>
            </div>

            {trend && (
                <div className="relative z-10 mt-4 flex items-center gap-2">
                    <span
                        className={cn(
                            "flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
                            trendUp
                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                        )}
                    >
                        {trendUp ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                        {trend}
                    </span>
                    <span className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">{t.metrics.vs_last_30}</span>
                </div>
            )}
        </motion.div>
    );
}
