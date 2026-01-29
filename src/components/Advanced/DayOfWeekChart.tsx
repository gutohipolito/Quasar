"use client";

import { motion } from "framer-motion";
import { DaypartingData } from "@/lib/windsor";
import { Clock, CalendarDays } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from "recharts";

import { useLanguage } from "@/components/LanguageProvider";

interface DayOfWeekChartProps {
    data: DaypartingData[];
}

export function DayOfWeekChart({ data }: DayOfWeekChartProps) {
    const { t } = useLanguage();
    // Sort days correctly: Mon -> Sun
    const sorter: Record<string, number> = { "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6, "Sunday": 7 };
    const sortedData = [...data].sort((a, b) => (sorter[a.dayOfWeek] || 0) - (sorter[b.dayOfWeek] || 0));

    return (
        <div className="w-full flex flex-col p-6 rounded-3xl border border-white/10 bg-card/50 backdrop-blur-md shadow-xl overflow-hidden relative">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                    <CalendarDays className="text-amber-400 h-5 w-5" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-foreground">{t.advanced?.weekly_activity || "Weekly Activity"}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.advanced?.best_days || "Best Performing Days"}</p>
                </div>
            </div>

            {/* Chart */}
            <div className="w-full h-[300px] relative z-20">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sortedData}>
                        <XAxis
                            dataKey="dayOfWeek"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10 }}
                            tickFormatter={(val) => {
                                const map: Record<string, string> = { "Monday": "Seg", "Tuesday": "Ter", "Wednesday": "Qua", "Thursday": "Qui", "Friday": "Sex", "Saturday": "Sáb", "Sunday": "Dom" };
                                return map[val] || val.substring(0, 3);
                            }}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value: any) => [value, t.metrics?.clicks]}
                        />
                        <Bar dataKey="clicks" radius={[4, 4, 0, 0]}>
                            {sortedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.clicks > 1 ? "#fbbf24" : "#334155"} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-amber-500/5 blur-[60px] rounded-full pointer-events-none" />
        </div>
    );
}
