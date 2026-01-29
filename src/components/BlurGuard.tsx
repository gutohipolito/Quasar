"use client";

import { ReactNode } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlurGuardProps {
    children: ReactNode;
    locked: boolean;
    blurAmount?: "sm" | "md" | "lg";
    showOverlay?: boolean;
}

export function BlurGuard({ children, locked, blurAmount = "md", showOverlay = true }: BlurGuardProps) {
    return (
        <div className="relative h-full w-full">
            <div className={cn(
                "h-full w-full transition-all duration-500",
                locked ? `blur-${blurAmount} select-none pointer-events-none opacity-60` : ""
            )}>
                {children}
            </div>

            {locked && showOverlay && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center p-4 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white shadow-xl">
                        <Lock className="w-5 h-5" />
                        {/* Tooltip or Label could go here but minimal is better for small cards */}
                    </div>
                </div>
            )}
        </div>
    );
}
