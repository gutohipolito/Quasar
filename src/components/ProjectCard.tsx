import { ArrowRight, Calendar, MoreVertical, TrendingUp, DollarSign, MousePointerClick, Pencil, Trash2, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAdsData, SummaryMetrics } from "@/lib/windsor";
import { formatCurrency } from "@/lib/utils";

interface ProjectCardProps {
    id: string;
    name: string;
    description: string;
    lastActive: string;
    status: "active" | "paused" | "archived";
    platform: "google" | "facebook" | "mixed";
    apiKey?: string;
    logoUrl?: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export function ProjectCard({ id, name, description, lastActive, status, platform, apiKey, logoUrl, onEdit, onDelete }: ProjectCardProps) {
    const [metrics, setMetrics] = useState<SummaryMetrics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMetrics = async () => {
            setLoading(true);
            try {
                // Fetch summary for the last 30 days
                // Use "all" platform by default, logic allows filtering if needed in future
                const { summary } = await fetchAdsData(apiKey ?? null, "last_30d", "all");
                setMetrics(summary);
            } catch (error) {
                console.error("Failed to load project metrics", error);
            } finally {
                setLoading(false);
            }
        };

        loadMetrics();
    }, [apiKey]);

    return (
        <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-black/40 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:bg-black/60 flex flex-col justify-between h-full min-h-[320px]">

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/30 transition-colors duration-500" />

            {/* Content Container */}
            <div className="relative z-10 p-7 flex flex-col h-full">

                {/* Header: Logo & Actions */}
                <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                        {logoUrl ? (
                            <img src={logoUrl} alt={name} className="relative w-14 h-14 rounded-2xl object-cover border border-white/10 bg-black/50 p-1 shadow-lg" />
                        ) : (
                            <div className="relative w-14 h-14 rounded-2xl bg-black/50 flex items-center justify-center text-primary font-bold border border-white/10 shadow-lg text-xl font-[family-name:var(--font-orbitron)]">
                                {name.substring(0, 1).toUpperCase()}
                            </div>
                        )}
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black ${status === 'active' ? 'bg-green-500' : status === 'paused' ? 'bg-yellow-500' : 'bg-gray-500'}`} />
                    </div>

                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit(id); }}
                            className="p-2 rounded-xl hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                        >
                            <Pencil size={16} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(id); }}
                            className="p-2 rounded-xl hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                {/* Project Info */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-orbitron)] tracking-wide group-hover:text-primary transition-colors duration-300 truncate">
                        {name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Spend</p>
                        <p className="text-sm font-bold text-white font-mono">
                            {loading ? "..." : metrics ? formatCurrency(metrics.totalSpend) : "-"}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">ROAS</p>
                        <p className={`text-sm font-bold font-mono ${metrics && metrics.avgRoas >= 1 ? 'text-emerald-400' : 'text-white'}`}>
                            {loading ? "..." : metrics ? `${metrics.avgRoas.toFixed(2)}x` : "-"}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Conv.</p>
                        <p className="text-sm font-bold text-blue-400 font-mono">
                            {loading ? "..." : metrics ? metrics.totalConversions.toLocaleString() : "-"}
                        </p>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/60 font-mono">
                        <Calendar size={12} />
                        <span>Ultima atualização: {lastActive}</span>
                    </div>

                    <Link
                        href={`/project?id=${id}`}
                        className="flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider group/link border border-white/10 rounded-2xl px-4 py-2 hover:bg-white/5"
                    >
                        Acessar
                        <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
