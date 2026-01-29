"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// Types
export type UserRole = "ADMIN" | "CLIENT";

export interface User {
    id: string;
    name: string;
    role: UserRole;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (name: string, pass: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => false,
    logout: () => { },
    isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Load user from session storage on mount
    useEffect(() => {
        const storedUser = sessionStorage.getItem("ads_dashboard_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    // Protect Routes
    useEffect(() => {
        if (isLoading) return;

        const publicRoutes = ["/login"];
        const isPublic = publicRoutes.includes(pathname);

        if (!user && !isPublic) {
            router.push("/login");
        } else if (user) {
            // Role-based Redirects
            if (pathname === "/login") {
                if (user.role === "ADMIN") router.push("/");
                if (user.role === "CLIENT") router.push(`/project?id=${user.id}`);
            }

            // Prevent Client from accessing Hub
            if (user.role === "CLIENT" && pathname === "/") {
                router.push(`/project?id=${user.id}`);
            }
        }
    }, [user, isLoading, pathname, router]);

    const login = async (name: string, pass: string): Promise<boolean> => {
        // 1. Check Admin
        if (name === "admin" && pass === "admin") {
            const adminUser: User = { id: "admin", name: "Administrator", role: "ADMIN" };
            setUser(adminUser);
            sessionStorage.setItem("ads_dashboard_user", JSON.stringify(adminUser));
            return true;
        }

        // 2. Check Clients (from localStorage projects)
        const storedProjects = localStorage.getItem("ads_dashboard_projects");
        if (storedProjects) {
            const projects = JSON.parse(storedProjects);
            // We assume 'name' matches project name and 'pass' matches a stored password property
            // Note: Existing projects don't have passwords yet, so this works for NEW ones
            const found = projects.find((p: any) => p.name === name && p.password === pass);

            if (found) {
                const clientUser: User = {
                    id: found.id,
                    name: found.name,
                    role: "CLIENT",
                    avatar: found.logoUrl
                };
                setUser(clientUser);
                sessionStorage.setItem("ads_dashboard_user", JSON.stringify(clientUser));
                return true;
            }
        }

        return false;
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("ads_dashboard_user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
