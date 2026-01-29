import { Dashboard } from "@/components/Dashboard";

interface ProjectPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;

    return (
        <main>
            <Dashboard projectId={id} />
        </main>
    );
}
