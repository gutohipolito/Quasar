"use client";

import { AdData } from "@/lib/windsor";
import { useLanguage } from "@/components/LanguageProvider";
import { formatCurrency } from "@/lib/utils";

interface DataTableProps {
    data: AdData[];
}

// Minimal Table implementation relying on shadcn/ui styles (assumed present or mocked if not)
// Since we don't have the full shadcn/ui library installed in this scratch env, I will standard HTML table with Tailwind classes
// mimicking the premium look

export function DataTable({ data }: DataTableProps) {
    const { t } = useLanguage();

    return (
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">{t.charts.detailed_campaigns}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border">
                        <tr>
                            <th className="px-6 py-4 font-medium">{t.table.campaign}</th>
                            <th className="px-6 py-4 font-medium">{t.table.platform}</th>
                            <th className="px-6 py-4 font-medium">{t.metrics.impressions}</th>
                            <th className="px-6 py-4 font-medium">{t.metrics.clicks}</th>
                            <th className="px-6 py-4 font-medium">{t.table.spend}</th>
                            <th className="px-6 py-4 font-medium">{t.table.roas}</th>
                            <th className="px-6 py-4 font-medium">{t.table.conversions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i} className="bg-card border-b border-border hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-foreground">
                                    {row.campaign}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${row.platform === 'google' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                                            row.platform === 'facebook' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300' : 'bg-gray-100 text-gray-800'}`}>
                                        {row.platform}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-foreground">
                                    {row.impressions.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-foreground">
                                    {row.clicks.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-foreground">
                                    {formatCurrency(row.spend)}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`font-semibold ${row.roas > 4 ? 'text-emerald-500' : row.roas > 2 ? 'text-yellow-500' : 'text-rose-500'}`}>
                                        {row.roas.toFixed(2)}x
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-foreground">
                                    {row.conversions}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
