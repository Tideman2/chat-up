import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

interface CurrentUser {
  userId: string;
  name: string;
  email: string;
  isAutenticated?: boolean;
}

const useCurrentUser = () => {
  const queryClient = useQueryClient();

  const fetchCurrentUser = useCallback(async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return null;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("accessToken");
          localStorage.removeItem("tokenExpiresIn");
          return null;
        }
        throw new Error(`Failed to fetch user: ${response.status}`);
      }

      const data = await response.json();
      const userDetails = data.userDetails || data;

      return {
        userId: userDetails.id,
        name: userDetails.username,
        email: userDetails.email,
        isAuthenticated: true,
      };
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  }, []);

  return useQuery<CurrentUser | null>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    initialData: queryClient.getQueryData(["currentUser"]) || null,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export default useCurrentUser;
