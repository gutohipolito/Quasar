"use client";

import { Dashboard } from "@/components/Dashboard";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ProjectPageContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    if (!id) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Projeto não encontrado</h2>
                    <p className="text-muted-foreground">O ID do projeto não foi fornecido na URL.</p>
                </div>
            </div>
        );
    }

    return (
        <main>
            <Dashboard projectId={id} />
        </main>
    );
}

export default function ProjectPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center text-muted-foreground">Carregando...</div>}>
            <ProjectPageContent />
        </Suspense>
    );
}
