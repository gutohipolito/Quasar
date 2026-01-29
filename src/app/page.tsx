"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/login");
    } else {
      if (user.role === "ADMIN") {
        router.replace("/dashboard");
      } else if (user.role === "CLIENT") {
        router.replace(`/project?id=${user.id}`);
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black text-white">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
