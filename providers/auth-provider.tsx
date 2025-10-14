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
  const { setContextResponse, clearContext, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(isLoading);

    if (!isLoading) {
      if (data && !isError && data.success) {
        setContextResponse(data);
      } else {
        clearContext();
      }
    }
  }, [data, isLoading, isError, setContextResponse, clearContext, setLoading]);

  return <>{children}</>;
}
