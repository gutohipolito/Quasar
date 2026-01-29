"use client";

import { motion } from "framer-motion";
import { GeoData } from "@/lib/windsor";
import { formatCurrency } from "@/lib/utils";
import { MapPin, TrendingUp } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";

interface GeoWidgetProps {
    data: GeoData[];
}

export function GeoWidget({ data }: GeoWidgetProps) {
    const { t } = useLanguage();
    // Find max values for progress bars
    const maxSpend = Math.max(...data.map(d => d.spend));

    return (
        <div className="w-full flex flex-col p-6 rounded-3xl border border-white/10 bg-card/50 backdrop-blur-md shadow-xl overflow-hidden relative">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <MapPin className="text-blue-400 h-5 w-5" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-foreground">{t.advanced?.top_regions || "Top Regions"}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.advanced?.by_spend_roas || "By Spend & ROAS"}</p>
                </div>
            </div>

            {/* Grid List */}
            <div className="w-full relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.map((item, index) => (
                        <motion.div
                            key={`${item.city}-${index}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative p-3 rounded-xl bg-background/40 border border-white/5 hover:bg-background/60 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-foreground truncate max-w-[120px]" title={item.city}>
                                    {item.city}
                                </span>
                                <div className="text-right">
                                    <span className="text-xs font-bold text-primary block">{formatCurrency(item.spend)}</span>
                                </div>
                            </div>

                            {/* Progress Bar (Spend) */}
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(item.spend / maxSpend) * 100}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                                />
                            </div>

                            {/* ROAS Badge */}
                            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                                <span>{item.region}</span>
                                <div className="flex items-center gap-1 text-emerald-400">
                                    <TrendingUp className="h-3 w-3" />
                                    <span className="font-bold">{item.roas.toFixed(2)}x ROAS</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
        </div>
    );
}
