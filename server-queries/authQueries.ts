import { getCurrentUser } from "@/server/auth/getCurrentUser";
import { ContextResponse } from "@/types/context";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUserQuery = () => {
  return useQuery<ContextResponse | null>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
