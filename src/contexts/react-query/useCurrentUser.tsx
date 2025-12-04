import { useQuery, useQueryClient } from "@tanstack/react-query";

interface CurrentUser {
  userId: string;
  name: string;
  email: string;
  isAutenticated?: boolean;
}

const useCurrentUser = () => {
  const queryClient = useQueryClient();

  return useQuery<CurrentUser | null>({
    queryKey: ["currentUser"],
    queryFn: () => {
      const cached = queryClient.getQueryData<CurrentUser>(["currentUser"]);
      if (cached) return cached;
      return null;
    },
  });
};

export default useCurrentUser;
