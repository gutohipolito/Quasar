"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AdData } from "@/lib/windsor";
import { useLanguage } from "@/components/LanguageProvider";

interface PerformanceChartProps {
    data: AdData[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
    const { t } = useLanguage();

    return (
        <div className="rounded-[10px] border border-border bg-card p-6 shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{t.charts.campaign_performance}</h3>
                <p className="text-sm text-muted-foreground">{t.charts.campaign_subtitle}</p>
            </div>

            {/* Explicitly sized container for Recharts */}
            <div className="h-[350px] w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                            </linearGradient>
                            {/* Glow Filter */}
                            <filter id="glow" height="200%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                                <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
                                <feFlood floodColor="#8b5cf6" floodOpacity="0.5" result="offsetColor" />
                                <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur" />
                                <feMerge>
                                    <feMergeNode in="offsetBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="campaign"
                            stroke="#525252"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => value.split('|')[0].trim().substring(0, 10) + '...'}
                            dy={10}
                        />
                        <YAxis
                            stroke="#525252"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(20, 20, 30, 0.8)',
                                backdropFilter: 'blur(8px)',
                                borderColor: 'rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#f8fafc',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                            }}
                            itemStyle={{ color: '#e2e8f0', fontSize: '12px', fontWeight: 500 }}
                            labelStyle={{ color: '#94a3b8', marginBottom: '8px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="impressions"
                            stroke="#8b5cf6"
                            fillOpacity={1}
                            fill="url(#colorImpressions)"
                            strokeWidth={3}
                        // filter="url(#glow)" // Optional: can be heavy on performance, enable if smooth
                        />
                        <Area
                            type="monotone"
                            dataKey="clicks"
                            stroke="#06b6d4"
                            fillOpacity={1}
                            fill="url(#colorClicks)"
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
