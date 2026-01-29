"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { StarryBackground } from "@/components/StarryBackground";
import { Lock, User, ArrowRight, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
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
        <div className="flex min-h-screen w-full overflow-hidden bg-black font-sans">
            <StarryBackground />

            {/* Left Side - Hero Image (Desktop Only) */}
            <div className="hidden lg:flex w-1/2 relative items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/login-hero.png"
                        alt="Future Dashboard Analysis"
                        className="h-full w-full object-cover opacity-80 mix-blend-screen"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/20 to-black pointer-events-none" />
                </div>

                <div className="relative z-10 p-12 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-5xl font-bold text-white mb-6 font-[family-name:var(--font-orbitron)] tracking-wider">
                            QUASAR
                        </h2>
                        <p className="text-xl text-gray-300 font-light leading-relaxed">
                            Navegue pelos dados do seu negócio com a precisão de quem mapeia o universo.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-10">
                        <h1 className="text-4xl font-bold text-white font-[family-name:var(--font-orbitron)] tracking-widest flex items-center justify-center gap-2">
                            <Sparkles className="text-primary w-6 h-6" /> QUASAR
                        </h1>
                    </div>

                    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">
                        {/* Header */}
                        <div className="mb-8 text-center">
                            <h1 className="text-2xl font-bold text-white tracking-tight">Bem-vindo a bordo</h1>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Insira suas credenciais de acesso
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                                    Usuário
                                </label>
                                <div className="relative group/input">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within/input:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full rounded-2xl border border-white/10 bg-black/20 py-3.5 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:bg-black/40 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                                        placeholder="Ex: admin"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                                    Senha
                                </label>
                                <div className="relative group/input">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within/input:text-primary transition-colors" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-2xl border border-white/10 bg-black/20 py-3.5 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:bg-black/40 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-500"
                                >
                                    <AlertCircle className="h-4 w-4 shrink-0" />
                                    <p>{error}</p>
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative w-full overflow-hidden rounded-2xl bg-primary py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Entrando...
                                        </>
                                    ) : (
                                        <>
                                            Iniciar Sessão
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </span>
                                {/* Glow effect on button */}
                                <div className="absolute inset-0 -z-10 translate-y-[100%] bg-gradient-to-t from-black/20 to-transparent transition-transform duration-300 group-hover:translate-y-[0%]" />
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-center text-xs text-muted-foreground/50 font-[family-name:var(--font-orbitron)] tracking-wider">
                        QUASAR &copy; 2026. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
