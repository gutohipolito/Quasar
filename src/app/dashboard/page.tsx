"use client";

import { useEffect, useState } from "react";
import { Plus, LayoutGrid, Search, Rocket } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { ProtectedRoute } from "@/components/ProtectedRoute"; // Import ProtectedRoute
import { cn } from "@/lib/utils";

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
    const [isApiKeyEditable, setIsApiKeyEditable] = useState(true);

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
        setIsApiKeyEditable(true); // Reset to editable for new projects
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
            setIsApiKeyEditable(false); // Lock by default for editing
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
                <div className="flex flex-col gap-2">
                    <h1 className="text-5xl font-black font-[family-name:var(--font-orbitron)] tracking-widest bg-[linear-gradient(110deg,#eab308,45%,#fef08a,55%,#eab308)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_3s_infinite] drop-shadow-2xl">
                        QUASAR
                    </h1>
                    <p className="text-muted-foreground ml-1">Gerencie todas as suas campanhas e clientes em um só lugar.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => { resetForm(); setIsModalOpen(true); }}
                        className="group flex items-center gap-2 bg-foreground text-background px-5 py-3 rounded-[10px] font-medium hover:opacity-90 transition-opacity"
                    >
                        <Plus size={20} className="transition-transform group-hover:rotate-90" />
                        <span>Novo Projeto</span>
                    </button>
                    <button
                        onClick={() => {
                            document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
                            window.location.href = "/login";
                        }}
                        className="flex items-center gap-2 bg-red-500/10 text-red-500 border border-red-500/20 px-5 py-3 rounded-[10px] font-medium hover:bg-red-500/20 transition-all"
                    >
                        <span>Sair</span>
                    </button>
                </div>
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
                            className="w-full bg-card/30 border border-white/5 rounded-[10px] py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light"
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


                </div>
            </div>

            {/* Create Project Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-3xl bg-card border border-white/10 p-8 rounded-[16px] shadow-2xl scale-100 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                            <div>
                                <h2 className="text-2xl font-bold flex items-center gap-2 mb-1">
                                    <Rocket className="w-6 h-6 text-primary" />
                                    {editingProject ? "Editar Projeto e Cliente" : "Cadastrar Novo Projeto"}
                                </h2>
                                <p className="text-sm text-muted-foreground ml-8">Configure os detalhes de acesso e visualização do cliente.</p>
                            </div>
                            <button onClick={resetForm} className="p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
                                <span className="sr-only">Fechar</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Column 1: Basic Info */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nome do Projeto (Cliente)</label>
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="ex: Campanha Verão 2024"
                                        className="w-full rounded-[10px] bg-secondary/30 px-4 py-3 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary/50 transition-all border border-transparent focus:border-primary/30 focus:bg-secondary/50"
                                        value={newProjectName}
                                        onChange={(e) => setNewProjectName(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Senha de Acesso</label>
                                    <input
                                        type="text"
                                        placeholder="Defina uma senha segura..."
                                        className="w-full rounded-[10px] bg-secondary/30 px-4 py-3 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary/50 transition-all border border-transparent focus:border-primary/30 focus:bg-secondary/50 font-mono"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <p className="text-[10px] text-muted-foreground">Compartilhe esta senha com o cliente para acesso ao dashboard.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Descrição / Notas</label>
                                    <textarea
                                        placeholder="Detalhes internos sobre a conta..."
                                        className="w-full rounded-[10px] bg-secondary/30 px-4 py-3 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary/50 transition-all border border-transparent focus:border-primary/30 focus:bg-secondary/50 resize-none h-[120px]"
                                        value={newProjectDesc}
                                        onChange={(e) => setNewProjectDesc(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Column 2: Technical Config */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Chave de API (Windsor.ai)</label>
                                        {!isApiKeyEditable && editingProject && (
                                            <button
                                                onClick={() => { setIsApiKeyEditable(true); setNewApiKey(""); }}
                                                className="text-[10px] text-primary hover:underline font-medium uppercase tracking-wide"
                                            >
                                                Alterar Chave
                                            </button>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={isApiKeyEditable ? "text" : "password"}
                                            disabled={!isApiKeyEditable}
                                            placeholder={!isApiKeyEditable ? "••••••••••••••••••••••••••••••••" : "Cole a chave de API aqui"}
                                            className={cn(
                                                "w-full rounded-[10px] bg-secondary/30 px-4 py-3 text-sm outline-none transition-all font-mono",
                                                isApiKeyEditable
                                                    ? "ring-offset-background focus:ring-2 focus:ring-primary/50 border border-transparent focus:border-primary/30 focus:bg-secondary/50"
                                                    : "cursor-not-allowed opacity-50 bg-secondary/10 text-muted-foreground border border-white/5"
                                            )}
                                            value={!isApiKeyEditable ? "" : newApiKey}
                                            onChange={(e) => setNewApiKey(e.target.value)}
                                        />
                                        {!isApiKeyEditable && (
                                            <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                                                <span className="text-muted-foreground/50 text-sm tracking-widest font-mono">••••••••••••••••••••••••</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-muted-foreground">Necessário para carregar dados reais das campanhas.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">URL do Logo (Marca)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="https://site.com/logo.png"
                                            className="flex-1 rounded-[10px] bg-secondary/30 px-4 py-3 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary/50 transition-all border border-transparent focus:border-primary/30 focus:bg-secondary/50"
                                            value={newLogoUrl}
                                            onChange={(e) => setNewLogoUrl(e.target.value)}
                                        />
                                        {newLogoUrl && (
                                            <div className="w-12 h-12 rounded-[8px] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                                <img src={newLogoUrl} alt="Preview" className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-white/5">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Recursos Habilitados</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { id: 'audience', label: 'Público' },
                                            { id: 'creatives', label: 'Criativos' },
                                            { id: 'aiPulse', label: 'AI Pulse' },
                                            { id: 'reports', label: 'Relatórios' }
                                        ].map((feature) => (
                                            <label key={feature.id} className="flex items-center gap-3 p-3 rounded-[10px] bg-secondary/20 hover:bg-secondary/40 cursor-pointer border border-transparent hover:border-white/10 transition-all">
                                                <div className="relative flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={newFeatures[feature.id as keyof typeof newFeatures]}
                                                        onChange={() => toggleFeature(feature.id as keyof typeof newFeatures)}
                                                        className="peer sr-only"
                                                    />
                                                    <div className="w-5 h-5 rounded border border-white/30 bg-black/40 peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                                                        <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-medium">{feature.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-10 pt-6 border-t border-white/5">
                            <button
                                onClick={resetForm}
                                className="flex-1 rounded-[10px] px-4 py-3.5 text-sm font-semibold hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateProject}
                                className="flex-[2] rounded-[10px] bg-gradient-to-r from-primary to-amber-600 px-4 py-3.5 text-sm font-bold text-white hover:shadow-lg hover:shadow-primary/20 transition-all transform hover:-translate-y-0.5"
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
