"use client";

import { motion } from "framer-motion";
import { FunnelData } from "@/lib/windsor";
import { Filter } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";

interface ConversionFunnelProps {
    data: FunnelData;
}

export function ConversionFunnel({ data }: ConversionFunnelProps) {
    const { t } = useLanguage();
    // Find max count to normalize widths relative to Impressions usually
    const maxCount = data.steps[0]?.count || 1;

    return (
        <div className="w-full flex flex-col p-6 rounded-3xl border border-white/10 bg-card/50 backdrop-blur-md shadow-xl overflow-hidden relative">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <Filter className="text-purple-400 h-5 w-5" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-foreground">{t.advanced?.conversion_funnel || "Conversion Funnel"}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.advanced?.customer_journey || "Customer Journey"}</p>
                </div>
            </div>

            {/* Funnel Steps */}
            <div className="w-full flex flex-col space-y-3 relative z-10 px-2 sm:px-4">
                {data.steps.map((step, index) => {
                    const prevStep = data.steps[index - 1];
                    const dropOff = prevStep ? Math.round(((prevStep.count - step.count) / prevStep.count) * 100) : 0;

                    // Width logic: Logarithmic scale often looks better for funnels with huge impression drops
                    // But linear is more honest. Let's use a clamped linear to avoid tiny bars.
                    const widthPercent = Math.max((step.count / maxCount) * 100, 15);

                    return (
                        <div key={step.step} className="relative group">
                            {/* Connector Line */}
                            {index > 0 && (
                                <div className="absolute left-8 -top-4 h-5 w-0.5 bg-white/10 z-0"></div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.15 }}
                                className="relative z-10"
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    {/* Step Label & Count */}
                                    <div className="w-24 shrink-0 text-right">
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground">{step.step}</p>
                                        <p className="text-sm font-bold text-foreground">{step.count.toLocaleString()}</p>
                                    </div>

                                    {/* Bar */}
                                    <div className="flex-1 min-w-0 h-10 bg-black/20 rounded-r-lg relative overflow-hidden flex items-center">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${widthPercent}%` }}
                                            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                                            className="h-full absolute left-0 top-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-80 group-hover:opacity-100 transition-opacity rounded-r-lg shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                                        />

                                        {/* Rate Info Inside Bar */}
                                        <span className="relative z-20 ml-3 text-xs font-bold text-white shadow-black drop-shadow-md">
                                            {index === 0 ? "100%" : `${step.conversionRate.toFixed(1)}%`}
                                        </span>
                                    </div>
                                </div>

                                {/* Dropoff Label (Optional, floating on right) */}
                                {index > 0 && (
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-red-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                        -{dropOff}% {t.advanced?.drop || "drop"}
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    );
                })}
            </div>

            {/* Background Decoration */}
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-purple-500/10 blur-[90px] rounded-full pointer-events-none" />
        </div>
    );
}
