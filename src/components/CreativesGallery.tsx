"use client";

import { motion } from "framer-motion";
import { Creative } from "@/lib/windsor";
import { useLanguage } from "@/components/LanguageProvider";
import { Badge, TrendingUp, MousePointer2, Eye } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

interface CreativesGalleryProps {
    data: Creative[];
}

export function CreativesGallery({ data }: CreativesGalleryProps) {
    const { t } = useLanguage();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in zoom-in-95 duration-700">
            {data.map((creative, index) => {
                // Simple logic to determine badge
                let badge = null;
                if (creative.roas > 4) badge = { label: t.creatives.best_performer, color: "bg-emerald-500 text-white shadow-emerald-500/20" };
                else if (creative.impressions > 100000) badge = { label: t.creatives.high_impact, color: "bg-purple-500 text-white shadow-purple-500/20" };
                else if (creative.roas < 1.5) badge = { label: t.creatives.low_performing, color: "bg-rose-500 text-white shadow-rose-500/20" };

                return (
                    <motion.div
                        key={creative.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                    >
                        {/* Image Section */}
                        <div className="relative aspect-[4/3] bg-muted/30">
                            {creative.url ? (
                                <img
                                    src={creative.url}
                                    alt={creative.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-zinc-900 border-b border-white/5">
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest opacity-50">
                                        Sem Imagem
                                    </span>
                                </div>
                            )}

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                            {/* Info Overlay (Bottom) */}
                            <div className="absolute bottom-0 left-0 w-full p-4">
                                <h4 className="text-sm font-bold text-white leading-tight line-clamp-2 mb-1" title={creative.name}>
                                    {creative.name}
                                </h4>
                                <p className="text-[10px] uppercase font-medium text-white/60 tracking-wider">
                                    {creative.campaign}
                                </p>
                            </div>

                            {/* Top Badge */}
                            {badge && (
                                <div className={cn(
                                    "absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-md border border-white/10",
                                    badge.color
                                )}>
                                    {badge.label}
                                </div>
                            )}

                            {/* Platform Icon Top Right */}
                            <div className="absolute top-3 right-3 h-7 w-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                                {creative.platform === 'google' ? (
                                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                ) : (
                                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
                                    </svg>
                                )}
                            </div>
                        </div>

                        {/* Metrics Footer Section */}
                        <div className="flex-1 bg-card p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{t.creatives.roas}</p>
                                    <div className="flex items-center gap-1">
                                        <TrendingUp className={cn("h-4 w-4", creative.roas > 3 ? "text-emerald-500" : "text-foreground")} />
                                        <span className={cn("text-xl font-bold font-mono", creative.roas > 3 ? "text-emerald-500" : "text-foreground")}>
                                            {creative.roas}x
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{t.creatives.spend}</p>
                                    <p className="text-sm font-semibold text-foreground">{formatCurrency(creative.spend)}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/50">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Eye className="h-3.5 w-3.5" />
                                    <span className="text-xs font-medium">{creative.impressions > 1000 ? `${(creative.impressions / 1000).toFixed(1)}k` : creative.impressions}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground justify-end">
                                    <MousePointer2 className="h-3.5 w-3.5" />
                                    <span className="text-xs font-medium">{creative.ctr}%</span>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                );
            })}
        </div>
    );
}
