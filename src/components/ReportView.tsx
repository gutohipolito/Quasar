"use client";

import { AdData, AudienceData, Creative, SummaryMetrics } from "@/lib/windsor";
import { Activity, CreditCard, DollarSign, MousePointerClick, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/StatsCard"; // We might replicate minimal versions to avoid animation delays or just reuse
import { DemographicsChart } from "@/components/Charts/DemographicsChart";
import { DeviceChart } from "@/components/Charts/DeviceChart";
import { AIPulse } from "@/components/AIPulse";
import { cn } from "@/lib/utils";

// Simplified Static Card for Report (No animations)
function ReportCard({ title, value, icon: Icon, subtext }: any) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
                <Icon className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
        </div>
    );
}

interface ReportViewProps {
    summary: SummaryMetrics | null;
    audience: AudienceData | null;
    creatives: Creative[];
    platform: string;
}

export function ReportView({ summary, audience, creatives, platform }: ReportViewProps) {
    const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

    return (
        <div id="report-container" className="bg-white text-gray-900 font-sans p-12 min-w-[1200px] max-w-[1200px] mx-auto">
            {/* HERDER */}
            <div className="flex items-center justify-between mb-12 border-b border-gray-200 pb-8">
                <div>
                    <img
                        src="https://framerusercontent.com/images/fNyuw9UGY9U2aNeDDdz0VsA27vg.svg"
                        alt="Brand Logo"
                        className="h-8 w-auto brightness-0 invert-0 mb-4"
                    />
                    <h1 className="text-3xl font-bold text-gray-900">Performance Report</h1>
                    <p className="text-gray-500 mt-1">Generated on {today}</p>
                </div>
                <div className="text-right">
                    <span className="inline-block px-4 py-1 rounded-full bg-gray-100 text-gray-600 font-medium text-sm border border-gray-200 uppercase">
                        Platform: {platform === 'all' ? 'All Platforms' : platform}
                    </span>
                </div>
            </div>

            {/* SECTION 1: EXECUTIVE SUMMARY */}
            <div className="mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Executive Summary
                </h2>

                {/* AI Insight Static */}
                <div className="mb-6 p-6 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2 text-blue-700 font-bold uppercase text-xs tracking-wider">
                        AI Insight
                    </div>
                    <p className="text-lg text-blue-900 leading-relaxed font-medium">
                        Analysis detected a 12% increase in ROAS driven by high engagement in Facebook Stories.
                        Reallocating budget from Google Display is recommended.
                    </p>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <ReportCard
                        title="Total Spend"
                        value={summary ? `$${summary.totalSpend.toLocaleString()}` : "-"}
                        icon={CreditCard}
                    />
                    <ReportCard
                        title="Revenue"
                        value={summary ? `$${summary.totalConversionValue.toLocaleString()}` : "-"}
                        icon={DollarSign}
                    />
                    <ReportCard
                        title="Impressions"
                        value={summary ? summary.totalImpressions.toLocaleString() : "-"}
                        icon={TrendingUp}
                    />
                    <ReportCard
                        title="Clicks"
                        value={summary ? summary.totalClicks.toLocaleString() : "-"}
                        icon={MousePointerClick}
                    />
                </div>
            </div>

            {/* SECTION 2: AUDIENCE */}
            <div className="mb-12 break-inside-avoid">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-t border-gray-100 pt-8">
                    <Activity className="h-5 w-5 text-purple-600" />
                    Audience Demographics
                </h2>
                <div className="grid grid-cols-2 gap-8 h-[400px]">
                    {audience && (
                        <>
                            <div className="rounded-xl border border-gray-200 p-4">
                                <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase">Gender Distribution</h3>
                                <DemographicsChart data={audience.gender} title="" color="#7c3aed" />
                            </div>
                            <div className="rounded-xl border border-gray-200 p-4">
                                <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase">Device Breakdown</h3>
                                <DeviceChart data={audience.device} />
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* SECTION 3: CREATIVES (Top 6) */}
            <div className="mb-8 break-inside-avoid">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-t border-gray-100 pt-8">
                    <Activity className="h-5 w-5 text-pink-600" />
                    Top Creatives Performance
                </h2>
                <div className="grid grid-cols-3 gap-6">
                    {creatives.slice(0, 6).map((c, i) => (
                        <div key={i} className="flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                            <div className="h-48 w-full bg-gray-100">
                                <img src={c.url} className="h-full w-full object-cover" alt="Ad" />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-end mb-2">
                                    <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase", c.roas > 3 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600")}>
                                        ROAS {c.roas}x
                                    </span>
                                    <span className="text-xs text-gray-400 font-mono">{c.platform}</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-600">
                                    <span>Spend: <span className="font-semibold text-gray-900">${c.spend}</span></span>
                                    <span>CTR: <span className="font-semibold text-gray-900">{c.ctr}%</span></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center text-xs text-gray-400 mt-12 pt-8 border-t border-gray-100">
                Generated by Ads Dashboard • Confidential
            </div>
        </div>
    );
}
