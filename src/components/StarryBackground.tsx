"use client";

import { useEffect, useState } from "react";

interface StarryBackgroundProps {
    transparent?: boolean;
}

export function StarryBackground({ transparent = false }: StarryBackgroundProps) {
    const [starShadows, setStarShadows] = useState({ small: "", medium: "", big: "" });
    const [sparkles, setSparkles] = useState<{ id: number; top: string; left: string; delay: string; scale: number }[]>([]);

    useEffect(() => {
        // 1. Generate Static Background Dust (Thousands of stars) using performant box-shadow
        const generateBoxShadow = (n: number) => {
            let value = "";
            for (let i = 0; i < n; i++) {
                const x = Math.floor(Math.random() * 4000) - 2000;
                const y = Math.floor(Math.random() * 4000) - 2000;
                value += `${x}px ${y}px var(--star-color)`;
                if (i < n - 1) value += ", ";
            }
            return value;
        };

        setStarShadows({
            small: generateBoxShadow(700),
            medium: generateBoxShadow(200),
            big: generateBoxShadow(100)
        });

        // 2. Generate "Hero" Sparkles (Actual 4-point star shapes with glow)
        const newSparkles = [];
        // Stratified sampling: Divide screen into 10 zones (5 rows x 2 cols) to prevent clumping
        for (let i = 0; i < 10; i++) {
            const row = Math.floor(i / 2); // 0 to 4
            const col = i % 2;             // 0 or 1

            // Random position strictly within the zone
            const top = row * 20 + Math.random() * 15 + 2.5; // +2.5% padding
            const left = col * 50 + Math.random() * 40 + 5;  // +5% padding

            newSparkles.push({
                id: i,
                top: `${top}%`,
                left: `${left}%`,
                delay: `${Math.random() * 4}s`,
                scale: Math.random() * 0.4 + 0.4
            });
        }
        setSparkles(newSparkles);

    }, []);

    return (
        <div className={`fixed inset-0 z-[-1] pointer-events-none overflow-hidden h-screen w-screen transition-colors duration-300 ${transparent ? '' : 'bg-background'}`}>
            {/* Styles for animations and shapes */}
            <style jsx>{`
                @keyframes star-anim {
                    from { transform: translateY(0); }
                    to { transform: translateY(-2000px); }
                }
                
                @keyframes sparkle-pulse {
                    0%, 100% { opacity: 0.4; transform: scale(0.8) rotate(0deg); }
                    50% { 
                        opacity: 1; 
                        transform: scale(1.1) rotate(15deg); 
                        /* Gold Glow Effect */
                        filter: drop-shadow(0 0 5px rgba(251, 191, 36, 0.8)) blur(0.5px); 
                    }
                }

                .star-sparkle {
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    /* Core color slightly warm white */
                    background: #fffbeb; 
                    border-radius: 50%;
                    animation: sparkle-pulse 4s ease-in-out infinite;
                    /* Base softness */
                    filter: blur(0.3px);
                }
                .star-sparkle::before, .star-sparkle::after {
                    content: "";
                    position: absolute;
                    background: #fffbeb;
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                /* Horizontal arm */
                .star-sparkle::before {
                    width: 12px;
                    height: 2px;
                }
                /* Vertical arm */
                .star-sparkle::after {
                    width: 2px;
                    height: 12px;
                }
            `}</style>

            {/* Background Gradient - Only if not transparent */}
            {!transparent && (
                <div className="absolute inset-0 opacity-100 dark:bg-[radial-gradient(ellipse_at_bottom,_#1B2735_0%,_#090A0F_100%)] bg-[radial-gradient(ellipse_at_bottom,_#e2e8f0_0%,_#f8fafc_100%)]" />
            )}

            {/* Layer 1: Background Dust (Box Shadow Method) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[1px]">
                <div className="absolute rounded-full" style={{ width: '1px', height: '1px', boxShadow: starShadows.small, animation: 'star-anim 150s linear infinite', background: 'transparent' }} />
                <div className="absolute rounded-full" style={{ width: '2px', height: '2px', boxShadow: starShadows.medium, animation: 'star-anim 100s linear infinite', background: 'transparent' }} />
                <div className="absolute rounded-full" style={{ width: '3px', height: '3px', boxShadow: starShadows.big, animation: 'star-anim 50s linear infinite', background: 'transparent' }} />
            </div>

            {/* Layer 2: Hero Sparkles (Custom CSS Shapes) */}
            <div className="absolute inset-0 w-full h-full">
                {sparkles.map((sparkle) => (
                    <div
                        key={sparkle.id}
                        className="star-sparkle"
                        style={{
                            top: sparkle.top,
                            left: sparkle.left,
                            animationDelay: sparkle.delay,
                            transform: `scale(${sparkle.scale})`
                        }}
                    />
                ))}
            </div>

            {/* Accents for Dark Mode - Only if not transparent */}
            {!transparent && (
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/10 to-amber-600/5 mix-blend-screen pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-300" />
            )}
        </div>
    );
}
