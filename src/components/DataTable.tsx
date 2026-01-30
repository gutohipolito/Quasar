import { useState } from "react";
import { AdData } from "@/lib/windsor";
import { useLanguage } from "@/components/LanguageProvider";
import { formatCurrency } from "@/lib/utils";
import { ArrowDown, ArrowUp, ArrowUpDown, Facebook } from "lucide-react";

interface DataTableProps {
    data: AdData[];
}

type SortKey = keyof AdData;
type SortDirection = "asc" | "desc";

interface SortConfig {
    key: SortKey | null;
    direction: SortDirection;
}

export function DataTable({ data }: DataTableProps) {
    const { t } = useLanguage();
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

    const handleSort = (key: SortKey) => {
        setSortConfig((current) => {
            if (current.key === key) {
                return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'asc' }; // Default to ascending for new key
        });
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortConfig.direction === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortConfig.direction === 'asc'
                ? aValue - bValue
                : bValue - aValue;
        }

        return 0;
    });

    const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
        if (sortConfig.key !== columnKey) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />;
        return sortConfig.direction === 'asc'
            ? <ArrowUp className="w-3 h-3 ml-1 text-primary" />
            : <ArrowDown className="w-3 h-3 ml-1 text-primary" />;
    };

    const SortableHeader = ({ pKey, label }: { pKey: SortKey, label: string }) => (
        <th
            className="px-6 py-4 font-medium cursor-pointer hover:bg-secondary/80 transition-colors group select-none"
            onClick={() => handleSort(pKey)}
        >
            <div className="flex items-center">
                {label}
                <SortIcon columnKey={pKey} />
            </div>
        </th>
    );

    const GoogleIcon = () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2" aria-hidden="true">
            <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
            <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.07 7.92-2.9l-3.86-3c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z" />
            <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z" />
            <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0 7.565 0 3.515 2.7 1.545 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
        </svg>
    );

    const FacebookIcon = () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2" aria-hidden="true" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );

    return (
        <div className="rounded-[10px] border border-border bg-card shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">{t.charts.detailed_campaigns}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border">
                        <tr>
                            <SortableHeader pKey="campaign" label={t.table.campaign} />
                            <SortableHeader pKey="platform" label={t.table.platform} />
                            <SortableHeader pKey="impressions" label={t.metrics.impressions} />
                            <SortableHeader pKey="clicks" label={t.metrics.clicks} />
                            <SortableHeader pKey="spend" label={t.table.spend} />
                            <SortableHeader pKey="roas" label={t.table.roas} />
                            <SortableHeader pKey="conversions" label={t.table.conversions} />
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((row, i) => (
                            <tr key={i} className="bg-card border-b border-border hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-foreground">
                                    {row.campaign}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        {row.platform === 'google' && <GoogleIcon />}
                                        {row.platform === 'facebook' && <FacebookIcon />}
                                        <span className={`capitalize ${row.platform === 'google' ? 'text-[#3c4043] dark:text-[#bdc1c6]' :
                                            row.platform === 'facebook' ? 'text-[#1877F2] dark:text-[#1877F2]' : 'text-foreground'
                                            }`}>
                                            {row.platform}
                                        </span>
                                    </div>
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
