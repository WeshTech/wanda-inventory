"use client";

import { useEffect } from "react";
import { initializeAuth } from "@/server/auth/getCurrentUser";

interface ClientAuthInitializerProps {
  children: React.ReactNode;
}

export default function ClientAuthInitializer({
  children,
}: ClientAuthInitializerProps) {
  useEffect(() => {
    const initAuth = async () => {
      await initializeAuth();
    };
    initAuth();
  }, []);

  return <>{children}</>;
}
