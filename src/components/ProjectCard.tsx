import { ArrowRight, Calendar, MoreVertical, TrendingUp, DollarSign, MousePointerClick, Pencil, Trash2 } from "lucide-react";
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
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card/30 p-6 backdrop-blur-md transition-all duration-300 hover:bg-card/50 hover:shadow-2xl hover:scale-[1.02] cursor-pointer flex flex-col justify-between h-full min-h-[280px]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Header Section */}
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {logoUrl ? (
                            <img src={logoUrl} alt={name} className="w-10 h-10 rounded-full object-cover border border-white/10 bg-white/5" />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-white/10">
                                {name.substring(0, 2).toUpperCase()}
                            </div>
                        )}
                        <div>
                            <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium border inline-block mb-1 ${status === 'active' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                                status === 'paused' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                                    'bg-gray-500/10 border-gray-500/20 text-gray-500'
                                }`}>
                                {status === 'active' ? 'Ativo' : status === 'paused' ? 'Pausado' : 'Arquivado'}
                            </div>
                            <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{name}</h3>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit(id); }}
                            className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-primary transition-colors"
                            title="Edit Project"
                        >
                            <Pencil size={16} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(id); }}
                            className="p-2 rounded-full hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
                            title="Delete Project"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                <p className="text-muted-foreground text-sm line-clamp-2 mb-6 h-10">{description}</p>
            </div>

            {/* Metrics Mini-Grid */}
            <div className="relative z-10 grid grid-cols-3 gap-2 mb-6">
                <div className="bg-black/20 rounded-xl p-2 text-center border border-white/5">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Spend</div>
                    <div className="text-sm font-bold text-white">
                        {loading ? "..." : metrics ? formatCurrency(metrics.totalSpend) : formatCurrency(0)}
                    </div>
                </div>
                <div className="bg-black/20 rounded-xl p-2 text-center border border-white/5">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">ROAS</div>
                    <div className="text-sm font-bold text-emerald-400">
                        {loading ? "..." : metrics ? `${metrics.avgRoas.toFixed(2)}x` : "0.00x"}
                    </div>
                </div>
                <div className="bg-black/20 rounded-xl p-2 text-center border border-white/5">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Conv.</div>
                    <div className="text-sm font-bold text-blue-400">
                        {loading ? "..." : metrics ? metrics.totalConversions.toLocaleString() : "0"}
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="relative z-10 mt-auto">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{lastActive}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="capitalize">{platform === 'mixed' ? 'Misto' : platform}</span>
                    </div>
                </div>

                <Link
                    href={`/project?id=${id}`}
                    className="flex items-center justify-between w-full rounded-2xl bg-white/5 p-3 text-sm font-medium text-foreground transition-all hover:bg-white/10 hover:pr-2 group-hover:bg-primary group-hover:text-primary-foreground"
                >
                    <span>Open Dashboard</span>
                    <ArrowRight size={16} className="-ml-4 opacity-0 transition-all group-hover:ml-0 group-hover:opacity-100" />
                </Link>
            </div>
        </div>
    );
}
