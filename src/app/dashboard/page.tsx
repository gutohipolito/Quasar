"use client";

import { useEffect, useState } from "react";
import { Plus, LayoutGrid, Search, Rocket } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { ProtectedRoute } from "@/components/ProtectedRoute"; // Import ProtectedRoute

interface Project {
    id: string;
    name: string;
    description: string;
    lastActive: string;
    status: "active" | "paused" | "archived";
    platform: "google" | "facebook" | "mixed";
    apiKey?: string;
    logoUrl?: string;
    password?: string;
    features?: {
        audience: boolean;
        creatives: boolean;
        reports: boolean;
        aiPulse: boolean;
    };
}

// Mock initial data
const INITIAL_PROJECTS: Project[] = [
    {
        id: "proj_internal_cob",
        name: "CO-B",
        description: "Projeto interno da empresa.",
        lastActive: "Agora mesmo",
        status: "active",
        platform: "mixed",
        apiKey: "543b424542ec11994fc42c2fa6b8e7ec011d",
        features: { audience: true, creatives: true, reports: true, aiPulse: true }
    }
];

export default function DashboardPage() {
    // Wrap content in ProtectedRoute with ADMIN role required
    return (
        <ProtectedRoute requiredRole="ADMIN">
            <DashboardContent />
        </ProtectedRoute>
    );
}

function DashboardContent() {
    const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    // Form State
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectDesc, setNewProjectDesc] = useState("");
    const [newApiKey, setNewApiKey] = useState("");
    const [newLogoUrl, setNewLogoUrl] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newFeatures, setNewFeatures] = useState({
        audience: true,
        creatives: true,
        reports: true,
        aiPulse: true
    });

    // Load from local storage on mount (simple persistence)
    // KEY CHANGED to v2 to force reset/loading of new INITIAL_PROJECTS for current users
    useEffect(() => {
        const saved = localStorage.getItem("ads_dashboard_projects_v2");
        if (saved) {
            setProjects(JSON.parse(saved));
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("ads_dashboard_projects_v2", JSON.stringify(projects));
        }
    }, [projects, isLoaded]);

    const handleCreateProject = () => {
        if (!newProjectName.trim()) return;

        if (editingProject) {
            // Update existing
            const updatedProjects = projects.map(p =>
                p.id === editingProject.id
                    ? {
                        ...p,
                        name: newProjectName,
                        description: newProjectDesc || "Sem descrição",
                        // SECURE LOGIC: Only update API key if user provided a new one. Otherwise keep existing.
                        apiKey: newApiKey.trim() ? newApiKey : p.apiKey,
                        logoUrl: newLogoUrl,
                        password: newPassword,
                        features: newFeatures
                    }
                    : p
            );
            setProjects(updatedProjects);
        } else {
            // Create new
            const newProject: Project = {
                id: `proj_${Date.now()}`,
                name: newProjectName,
                description: newProjectDesc || "Sem descrição",
                lastActive: "Agora mesmo",
                status: "active",
                platform: "mixed", // Default for now
                apiKey: newApiKey,
                logoUrl: newLogoUrl,
                password: newPassword,
                features: newFeatures
            };
            setProjects([newProject, ...projects]);
        }

        resetForm();
    };

    const resetForm = () => {
        setNewProjectName("");
        setNewProjectDesc("");
        setNewApiKey("");
        setNewLogoUrl("");
        setNewPassword("");
        setNewFeatures({ audience: true, creatives: true, reports: true, aiPulse: true });
        setEditingProject(null);
        setIsModalOpen(false);
    };

    const handleEditProject = (id: string) => {
        const project = projects.find(p => p.id === id);
        if (project) {
            setEditingProject(project);
            setNewProjectName(project.name);
            setNewProjectDesc(project.description);
            // SECURE LOGIC: Do NOT pre-fill the API key. User must enter a new one to change it.
            setNewApiKey("");
            setNewLogoUrl(project.logoUrl || "");
            setNewPassword(project.password || "");
            if (project.features) {
                setNewFeatures(project.features);
            }
            setIsModalOpen(true);
        }
    };

    const handleDeleteProject = (id: string) => {
        if (confirm("Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.")) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const toggleFeature = (key: keyof typeof newFeatures) => {
        setNewFeatures(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 pb-32 font-sans">
            {/* Header */}
            <div className="mx-auto max-w-[1600px] mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                        <LayoutGrid className="text-primary w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Project Hub</h1>
                        <p className="text-muted-foreground">Gerencie todas as suas campanhas e clientes em um só lugar.</p>
                    </div>
                </div>

                <button
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="group flex items-center gap-2 bg-foreground text-background px-5 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                    <Plus size={20} className="transition-transform group-hover:rotate-90" />
                    <span>Novo Projeto</span>
                </button>
            </div>

            {/* Main Grid */}
            <div className="mx-auto max-w-[1600px]">

                {/* Search / Filter (Visual only for now) */}
                <div className="mb-8 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar projetos..."
                            className="w-full bg-card/30 border border-white/5 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light"
                        />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{projects.length} Projetos</span>
                    </div>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            name={project.name}
                            description={project.description}
                            lastActive={project.lastActive}
                            status={project.status}
                            platform={project.platform}
                            apiKey={project.apiKey}
                            logoUrl={project.logoUrl}
                            onEdit={handleEditProject}
                            onDelete={handleDeleteProject}
                        />
                    ))}

                    {/* Empty State / Add Card */}
                    <button
                        onClick={() => { resetForm(); setIsModalOpen(true); }}
                        className="group relative flex flex-col items-center justify-center h-full min-h-[200px] rounded-3xl border border-dashed border-white/10 bg-transparent hover:bg-card/10 transition-colors p-6 text-center"
                    >
                        <div className="p-4 rounded-full bg-card/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="font-medium text-foreground mb-1">Criar Novo Projeto</h3>
                        <p className="text-xs text-muted-foreground">Inicie um novo dashboard de campanha</p>
                    </button>
                </div>
            </div>

            {/* Create Project Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-card border border-white/10 p-8 rounded-3xl shadow-2xl scale-100 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Rocket className="w-5 h-5 text-primary" />
                                {editingProject ? "Editar Projeto" : "Novo Projeto"}
                            </h2>
                            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
                                ✕
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nome do Projeto (Usuário)</label>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="ex: Campanha Verão"
                                    className="w-full rounded-xl bg-secondary/50 px-4 py-3 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary/50 transition-all border border-transparent focus:border-primary/30"
                                    value={newProjectName}
                                    onChange={(e) => setNewProjectName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Senha de Acesso do Cliente</label>
                                <input
                                    type="text"
                                    placeholder="Defina uma senha..."
                                    className="w-full rounded-xl bg-secondary/50 px-4 py-3 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary/50 transition-all border border-transparent focus:border-primary/30"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <p className="text-[10px] text-muted-foreground">Esta senha será usada pelo cliente para acessar o dashboard.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Descrição</label>
                                <textarea
                                    placeholder="Breve descrição sobre o cliente ou campanha..."
                                    className="w-full rounded-xl bg-secondary/50 px-4 py-3 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary/50 transition-all border border-transparent focus:border-primary/30 resize-none h-20"
                                    value={newProjectDesc}
                                    onChange={(e) => setNewProjectDesc(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Chave de API Windsor.ai</label>
                                <input
                                    type="password"
                                    placeholder={editingProject && editingProject.apiKey ? "•••••••••• (Chave configurada. Deixe em branco para manter)" : "Insira sua chave de API"}
                                    className="w-full rounded-xl bg-secondary/50 px-4 py-3 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary/50 transition-all border border-transparent focus:border-primary/30 font-mono"
                                    value={newApiKey}
                                    onChange={(e) => setNewApiKey(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">URL do Logo da Empresa</label>
                                <input
                                    type="text"
                                    placeholder="https://example.com/logo.png"
                                    className="w-full rounded-xl bg-secondary/50 px-4 py-3 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary/50 transition-all border border-transparent focus:border-primary/30"
                                    value={newLogoUrl}
                                    onChange={(e) => setNewLogoUrl(e.target.value)}
                                />
                            </div>

                            <div className="space-y-3 pt-2 border-t border-white/5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Recursos Habilitados</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="flex items-center gap-2 text-sm p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 cursor-pointer border border-transparent hover:border-white/10 transition-all">
                                        <input
                                            type="checkbox"
                                            checked={newFeatures.audience}
                                            onChange={() => toggleFeature('audience')}
                                            className="rounded border-white/20 bg-black/40 text-primary focus:ring-primary w-4 h-4"
                                        />
                                        <span>Público</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-sm p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 cursor-pointer border border-transparent hover:border-white/10 transition-all">
                                        <input
                                            type="checkbox"
                                            checked={newFeatures.creatives}
                                            onChange={() => toggleFeature('creatives')}
                                            className="rounded border-white/20 bg-black/40 text-primary focus:ring-primary w-4 h-4"
                                        />
                                        <span>Criativos</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-sm p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 cursor-pointer border border-transparent hover:border-white/10 transition-all">
                                        <input
                                            type="checkbox"
                                            checked={newFeatures.aiPulse}
                                            onChange={() => toggleFeature('aiPulse')}
                                            className="rounded border-white/20 bg-black/40 text-primary focus:ring-primary w-4 h-4"
                                        />
                                        <span>AI Pulse</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-sm p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 cursor-pointer border border-transparent hover:border-white/10 transition-all">
                                        <input
                                            type="checkbox"
                                            checked={newFeatures.reports}
                                            onChange={() => toggleFeature('reports')}
                                            className="rounded border-white/20 bg-black/40 text-primary focus:ring-primary w-4 h-4"
                                        />
                                        <span>Relatórios</span>
                                    </label>
                                </div>
                            </div>

                        </div>

                        <div className="flex items-center gap-3 mt-8 pt-4 border-t border-white/5">
                            <button
                                onClick={resetForm}
                                className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold hover:bg-secondary/80 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateProject}
                                className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                            >
                                {editingProject ? "Salvar Alterações" : "Criar Projeto"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
