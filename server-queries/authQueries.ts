import { getCurrentUser } from "@/server/auth/getCurrentUser";
import { UserLoginResponse } from "@/types/auth/user-login-response";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUserQuery = () => {
  return useQuery<UserLoginResponse | null>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
