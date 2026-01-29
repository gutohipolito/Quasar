"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { StarryBackground } from "@/components/StarryBackground";
import { Lock, User, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Turnstile from "react-turnstile";

export default function LoginPage() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBotVerified, setIsBotVerified] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!isBotVerified) {
            setError("Por favor, complete a verificação de segurança.");
            return;
        }

        setIsSubmitting(true);

        try {
            const success = await login(username, password);
            if (!success) {
                setError("Credenciais inválidas. Tente novamente.");
            }
        } catch (err) {
            setError("Ocorreu um erro ao tentar fazer login.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden font-sans">

            {/* 1. LAYER -2: Full Screen Background Image */}
            <div className="fixed inset-0 z-[-2]">
                <img
                    src="/login-hero.png"
                    alt="Background"
                    className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            {/* 2. LAYER -1: Starry Background Overlay (Transparent) */}
            <StarryBackground transparent />

            {/* 3. LAYER 10: Content */}
            <div className="relative z-10 w-full max-w-md p-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {/* Logo Area */}
                    <div className="text-center mb-10">
                        <h1 className="text-6xl font-black font-[family-name:var(--font-orbitron)] tracking-widest bg-[linear-gradient(110deg,#eab308,45%,#fef08a,55%,#eab308)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_3s_infinite] drop-shadow-2xl">
                            QUASAR
                        </h1>
                        <p className="mt-4 text-gray-300 font-light tracking-wide text-lg">
                            Análise de dados nível interestelar
                        </p>
                    </div>

                    {/* Glass Card */}
                    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-md shadow-2xl transition-all hover:bg-black/50 hover:border-white/20 hover:shadow-primary/10">

                        {/* Header */}
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-white tracking-tight">Bem-vindo a bordo</h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Insira suas credenciais de acesso
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mb-6 flex items-center gap-2 rounded-xl bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20"
                            >
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase tracking-wider text-gray-400 ml-1">Usuário</label>
                                <div className="relative group/input">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within/input:text-primary">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:border-primary/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                        placeholder="Digite seu usuário..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase tracking-wider text-gray-400 ml-1">Senha</label>
                                <div className="relative group/input">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within/input:text-primary">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:border-primary/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all font-sans"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center py-2 relative z-20">
                                <Turnstile
                                    sitekey="1x00000000000000000000AA"
                                    theme="dark"
                                    onVerify={(token) => setIsBotVerified(true)}
                                    onError={() => setIsBotVerified(false)}
                                    onExpire={() => setIsBotVerified(false)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || !isBotVerified}
                                className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary to-amber-600 p-[1px] shadow-lg shadow-amber-900/20 transition-all hover:shadow-amber-600/20 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                            >
                                <div className="relative flex items-center justify-center gap-2 rounded-xl bg-black/20 backdrop-blur-sm px-4 py-3 text-white transition-all group-hover/btn:bg-transparent">
                                    {isSubmitting ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <>
                                            <span className="font-semibold">{!isBotVerified ? "Complete o Captcha" : "Entrar no Sistema"}</span>
                                            <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                                        </>
                                    )}
                                </div>
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500 font-mono">
                            QUASAR © 2026. All rights reserved.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
