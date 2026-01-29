"use client";

import { useEffect, useState } from "react";
import { Activity, BarChart3, Coins, CreditCard, DollarSign, MousePointerClick, RefreshCcw, ShoppingBag, TrendingUp, LayoutGrid, AlertCircle } from "lucide-react";
import { AdData, fetchAdsData, fetchAudienceData, fetchCreativesData, SummaryMetrics, AudienceData, Creative, DateRange } from "@/lib/windsor";
import { StatsCard } from "@/components/StatsCard";
import { PerformanceChart } from "@/components/Charts/PerformanceChart";
import { DataTable } from "@/components/DataTable";
import { DemographicsChart } from "@/components/Charts/DemographicsChart";
import { DeviceChart } from "@/components/Charts/DeviceChart";
import { CreativesGallery } from "@/components/CreativesGallery";
import { AIPulse } from "@/components/AIPulse";
import { ReportView } from "@/components/ReportView";
import { FloatingDock } from "@/components/FloatingDock";
import { cn, formatCurrency } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageProvider";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { StarryBackground } from "@/components/StarryBackground";
import { GeoWidget } from "@/components/Advanced/GeoWidget";
import { ConversionFunnel } from "@/components/Advanced/ConversionFunnel";
import { DayOfWeekChart } from "@/components/Advanced/DayOfWeekChart";
import { GeoData, DaypartingData, FunnelData, fetchGeoData, fetchDaypartingData, fetchFunnelData } from "@/lib/windsor";

// Interface for Project structure based on localStorage
interface Project {
    id: string;
    apiKey?: string;
    logoUrl?: string;
    features?: {
        audience: boolean;
        creatives: boolean;
        reports: boolean;
        aiPulse: boolean;
    };
}

export function Dashboard({ projectId }: { projectId?: string }) {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<AdData[]>([]);
    const [audience, setAudience] = useState<AudienceData | null>(null);
    const [creatives, setCreatives] = useState<Creative[]>([]);
    const [summary, setSummary] = useState<SummaryMetrics | null>(null);

    // Advanced Data States
    const [geo, setGeo] = useState<GeoData[]>([]);
    const [funnel, setFunnel] = useState<FunnelData | null>(null);
    const [dayData, setDayData] = useState<DaypartingData[]>([]);
    const [platform, setPlatform] = useState<"all" | "google" | "facebook">("all");
    const [dateRange, setDateRange] = useState<DateRange>("last_30d");
    const [activeTab, setActiveTab] = useState("overview");
    const [hasApiKey, setHasApiKey] = useState(false);

    // Project Settings
    const [projectLogo, setProjectLogo] = useState<string | null>(null);
    const [features, setFeatures] = useState({
        audience: true,
        creatives: true,
        reports: true,
        aiPulse: true
    });

    const loadData = async () => {
        setLoading(true);
        setError(null);

        // Lookup API Key and Settings from LocalStorage
        let apiKey = null;
        if (projectId) {
            try {
                const projectsStr = localStorage.getItem("ads_dashboard_projects");
                if (projectsStr) {
                    const projects = JSON.parse(projectsStr);
                    const project = projects.find((p: Project) => p.id === projectId);
                    if (project) {
                        if (project.apiKey) apiKey = project.apiKey;
                        if (project.logoUrl) setProjectLogo(project.logoUrl);
                        if (project.features) setFeatures(project.features);
                    }
                }
            } catch (e) {
                console.error("Failed to load project config", e);
            }
        }

        setHasApiKey(!!apiKey);

        try {
            const { data: adsData, summary: adsSummary } = await fetchAdsData(apiKey, dateRange, platform);
            setData(adsData);
            setSummary(adsSummary);

            if (features.audience) {
                const audienceData = await fetchAudienceData(apiKey);
                setAudience(audienceData);
            }

            if (features.creatives) {
                const creativesData = await fetchCreativesData(apiKey);
                setCreatives(creativesData);
            }

            // Fetch Advanced Data
            const geoData = await fetchGeoData(apiKey);
            setGeo(geoData);

            const dayParting = await fetchDaypartingData(apiKey);
            setDayData(dayParting);

            const funnelData = await fetchFunnelData(apiKey);
            setFunnel(funnelData);

        } catch (err) {
            console.error("Dashboard Loading Error:", err);
            setError("Erro na comunicação com a API (Windsor.ai). Verifique sua chave de projeto.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [platform, projectId, dateRange]);

    const handleExportPDF = async () => {
        const element = document.getElementById("report-container");
        if (!element) return;

        try {
            const dataUrl = await toPng(element, {
                cacheBust: true,
                backgroundColor: '#ffffff',
                pixelRatio: 2
            });

            const pdf = new jsPDF({
                orientation: "landscape",
                unit: "px",
                format: [element.offsetWidth, element.offsetHeight]
            });

            pdf.addImage(dataUrl, "PNG", 0, 0, element.offsetWidth, element.offsetHeight);
            pdf.save(`ads-report-full-${platform}-${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error("PDF Export failed:", error);
        }
    };

    return (
        <div id="dashboard-root" className="min-h-screen bg-transparent p-4 pb-32 md:p-8 md:pb-40 transition-colors duration-300 relative">
            <StarryBackground />

            {/* ERROR TOAST */}
            {error && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-500/90 text-white px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 border border-red-400">
                    <div className="bg-white/20 p-1.5 rounded-full"><AlertCircle className="w-5 h-5" /></div>
                    <span className="font-medium">{error}</span>
                    <button onClick={() => setError(null)} className="ml-2 opacity-80 hover:opacity-100">✕</button>
                </div>
            )}

            {/* Top Bar Branding */}
            <div className="mx-auto max-w-[1600px] mb-8 flex items-center justify-between relative z-10">
                <div>
                    {projectLogo ? (
                        <div className="flex items-center gap-4">
                            <img
                                src={projectLogo}
                                alt="Company Logo"
                                className="h-12 w-auto max-w-[200px] object-contain"
                            />
                        </div>
                    ) : (
                        <img
                            src="https://framerusercontent.com/images/fNyuw9UGY9U2aNeDDdz0VsA27vg.svg"
                            alt="Brand Logo"
                            className="h-8 w-auto logo-brand transition-all duration-300"
                        />
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="mx-auto max-w-[1600px] space-y-8 relative z-10">

                {/* Minimal Hero Header */}
                <div className="mb-8 pt-4">
                    <h1 className="text-4xl font-extrabold text-foreground tracking-tight bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent sm:text-5xl">
                        {t.header.title}
                    </h1>
                    <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
                        {t.header.subtitle}
                    </p>
                </div>

                {/* ================= OVERVIEW BENTO GRID ================= */}
                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 animate-in fade-in zoom-in-95 duration-700">

                        {/* HERO STATS - Left Column (2 cols) */}
                        <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-6">
                            <StatsCard
                                title={t.metrics.total_spend}
                                value={summary ? formatCurrency(summary.totalSpend) : "..."}
                                icon={CreditCard}
                                delay={0.1}
                                trend="+12.5%"
                                trendUp={true}
                            />
                            <StatsCard
                                title={t.metrics.revenue}
                                value={summary ? formatCurrency(summary.totalConversionValue) : "..."}
                                icon={DollarSign}
                                delay={0.2}
                                trend="+18.2%"
                                trendUp={true}
                            />
                            <StatsCard
                                title={t.metrics.conversions}
                                value={summary ? summary.totalConversions.toLocaleString() : "..."}
                                icon={ShoppingBag}
                                delay={0.3}
                                trend="+5.1%"
                                trendUp={true}
                            />
                        </div>

                        {/* MAIN CHART - Center/Right Column (4 cols) */}
                        <div className="col-span-1 md:col-span-4 lg:col-span-4 h-full min-h-[400px]">
                            <div className="h-full rounded-3xl border border-white/10 bg-card/50 p-6 backdrop-blur-md shadow-2xl flex flex-col">
                                <PerformanceChart data={data} />
                            </div>
                        </div>

                        {/* SECONDARY STATS STRIP - Bottom Row (Full Width) */}
                        <div className="col-span-1 md:col-span-4 lg:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <StatsCard
                                title={t.metrics.roas}
                                value={summary ? `${summary.avgRoas.toFixed(2)}x` : "..."}
                                icon={TrendingUp}
                                delay={0.4}
                                trend="-0.5%"
                                trendUp={false}
                            />
                            <StatsCard
                                title={t.metrics.clicks}
                                value={summary ? summary.totalClicks.toLocaleString() : "..."}
                                icon={MousePointerClick}
                                delay={0.6}
                            />
                            <StatsCard
                                title={t.metrics.avg_cpc}
                                value={summary ? formatCurrency(summary.avgCpc) : "..."}
                                icon={Coins}
                                delay={0.7}
                            />
                        </div>

                        {/* ADVANCED INSIGHTS STACK (NEW) */}
                        <div className="col-span-1 md:col-span-4 lg:col-span-6 space-y-3">
                            {/* Geo Widget */}
                            <div className="w-full min-w-0">
                                <GeoWidget data={geo} />
                            </div>

                            {/* Funnel Widget */}
                            <div className="w-full min-w-0">
                                {funnel && <ConversionFunnel data={funnel} />}
                            </div>

                            {/* Weekly Activity */}
                            <div className="w-full min-w-0 min-h-[400px]">
                                <DayOfWeekChart data={dayData} />
                            </div>
                        </div>

                        {/* DATA TABLE - Bottom Row (Full Width) */}
                        <div className="col-span-1 md:col-span-4 lg:col-span-6">
                            <DataTable data={data} />
                        </div>
                    </div>
                )}

                {/* ================= AUDIENCE BENTO GRID ================= */}
                {activeTab === "audience" && features.audience && audience && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-700">
                        <div className="col-span-1 md:col-span-2 lg:col-span-1 h-[400px]">
                            <DemographicsChart
                                data={audience.age}
                                title={t.charts.age_distribution}
                                color="#8b5cf6"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-1 lg:col-span-1 h-[400px]">
                            <DemographicsChart
                                data={audience.gender}
                                title={t.charts.gender_distribution}
                                color="#06b6d4"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-1 lg:col-span-1 h-[400px]">
                            <DeviceChart data={audience.device} />
                        </div>
                    </div>
                )}

                {/* ================= CREATIVES BENTO GRID ================= */}
                {activeTab === "creatives" && features.creatives && (
                    <div className="space-y-6">
                        <CreativesGallery data={creatives} />
                    </div>
                )}

            </div>

            {/* FLOATING HUD NAVIGATION */}
            <FloatingDock
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                platform={platform}
                setPlatform={setPlatform}
                dateRange={dateRange}
                setDateRange={setDateRange}
                onExport={handleExportPDF}
            />

            {/* Hidden Report View for PDF Generation */}
            {features.reports && (
                <div className="fixed top-0 left-[-9999px] w-[1200px] h-auto -z-50 opacity-0 pointer-events-none overflow-hidden">
                    <ReportView
                        summary={summary}
                        audience={audience}
                        creatives={creatives}
                        platform={platform}
                    />
                </div>
            )}
        </div>
    );
}
