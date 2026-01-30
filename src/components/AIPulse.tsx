"use client";

import { motion } from "framer-motion";
import { Sparkles, BrainCircuit, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function AIPulse() {
    const { t, language } = useLanguage();
    const [typedText, setTypedText] = useState("");

    // Simulated AI Insight text
    const fullTextEn = "Analysis detected a 12% increase in ROAS driven by high engagement in Facebook Stories. Reallocating budget from Google Display is recommended.";
    const fullTextPt = "Análise detectou aumento de 12% no ROAS impulsionado pelo alto engajamento em Facebook Stories. Recomendamos realocar verba de Google Display.";

    const textToType = language === "pt" ? fullTextPt : fullTextEn;

    useEffect(() => {
        setTypedText("");
        let i = 0;
        const timer = setInterval(() => {
            if (i < textToType.length) {
                setTypedText((prev) => prev + textToType.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 30); // Typing speed

        return () => clearInterval(timer);
    }, [textToType]);

    return (
        <div className="relative overflow-hidden rounded-[10px] border border-primary/20 bg-primary/5 p-6 backdrop-blur-md shadow-lg">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 animate-pulse" />

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 text-primary">
                    <BrainCircuit className="h-5 w-5 animate-pulse" />
                    <span className="font-bold text-sm tracking-widest uppercase">AI Pulse Insights</span>
                </div>

                <div className="min-h-[60px]">
                    <p className="text-lg font-medium leading-relaxed text-foreground/90">
                        {typedText}
                        <span className="inline-block w-1.5 h-5 ml-1 bg-primary animate-blink align-middle" />
                    </p>
                </div>

                <div className="mt-6 flex items-center gap-2">
                    <button className="flex items-center gap-1 text-xs font-bold text-primary hover:underline uppercase tracking-wider">
                        {language === "pt" ? "Ver Detalhes" : "View Details"} <ArrowUpRight className="h-3 w-3" />
                    </button>
                </div>
            </div>

            {/* Decorative Orbs */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
        </div>
    );
}
