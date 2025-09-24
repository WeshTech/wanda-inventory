"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useCurrentUserQuery } from "@/server-queries/authQueries";

interface ClientAuthInitializerProps {
  children: React.ReactNode;
}

export default function ClientAuthInitializer({
  children,
}: ClientAuthInitializerProps) {
  const { data, isLoading, isError } = useCurrentUserQuery();
  const { setUser, clearUser, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(isLoading);

    if (!isLoading) {
      if (data && !isError) {
        setUser(data);
      } else {
        clearUser();
      }
    }
  }, [data, isLoading, isError, setUser, clearUser, setLoading]);

  return <>{children}</>;
}
