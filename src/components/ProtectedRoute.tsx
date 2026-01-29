"use client";

import { useAuth } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: "ADMIN" | "CLIENT" }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isLoading) return;

        if (!user) {
            // Not logged in -> Redirect to login
            router.replace("/login");
        } else if (requiredRole && user.role !== requiredRole) {
            // Logged in but wrong role -> Redirect based on role
            if (user.role === "ADMIN") router.replace("/dashboard");
            if (user.role === "CLIENT") router.replace(`/project?id=${user.id}`);
        }
    }, [user, isLoading, router, requiredRole, pathname]);

    if (isLoading || !user || (requiredRole && user.role !== requiredRole)) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black text-white">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return <>{children}</>;
}
