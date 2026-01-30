"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabsProps {
    tabs: string[];
    activeTab: string;
    onChange: (tab: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
    return (
        <div className="flex gap-2 rounded-[10px] bg-card/50 p-1 border border-border w-fit backdrop-blur-md">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={cn(
                        "relative px-4 py-2 text-sm font-medium transition-colors outline-none",
                        activeTab === tab ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    {activeTab === tab && (
                        <motion.div
                            layoutId="active-tab"
                            className="absolute inset-0 rounded-lg bg-primary shadow-sm"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10">{tab}</span>
                </button>
            ))}
        </div>
    );
}
