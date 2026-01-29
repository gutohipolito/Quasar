"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";

interface DemographicsChartProps {
    data: { name: string; value: number }[];
    title: string;
    color: string;
}

export function DemographicsChart({ data, title, color }: DemographicsChartProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            </div>

            <div className="h-[300px] w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }} barSize={20}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            stroke="#94a3b8"
                            fontSize={11}
                            fontWeight={500}
                            tickLine={false}
                            axisLine={false}
                            width={50}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{
                                backgroundColor: 'rgba(20, 20, 30, 0.9)',
                                backdropFilter: 'blur(8px)',
                                borderColor: 'rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#f8fafc'
                            }}
                            itemStyle={{ color: '#e2e8f0', fontSize: '12px' }}
                            labelStyle={{ display: 'none' }}
                        />
                        <Bar dataKey="value" radius={[0, 10, 10, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={color} fillOpacity={0.9} stroke={color} strokeWidth={1} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
