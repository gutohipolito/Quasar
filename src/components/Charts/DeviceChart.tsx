"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useLanguage } from "@/components/LanguageProvider";

interface DeviceChartProps {
    data: { name: string; value: number }[];
}

const COLORS = ["#8b5cf6", "#06b6d4", "#f43f5e"]; // Violet, Cyan, Rose

export function DeviceChart({ data }: DeviceChartProps) {
    const { t } = useLanguage();

    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{t.charts.device_breakdown}</h3>
            </div>

            <div className="h-[300px] w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={70} // Thinner ring
                            outerRadius={90}
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={6}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    stroke="rgba(0,0,0,0.2)"
                                    strokeWidth={2}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(20, 20, 30, 0.9)',
                                backdropFilter: 'blur(8px)',
                                borderColor: 'rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#f8fafc'
                            }}
                            itemStyle={{ color: '#e2e8f0', fontSize: '12px' }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            iconSize={8}
                            formatter={(value) => <span className="text-muted-foreground text-xs ml-1">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
