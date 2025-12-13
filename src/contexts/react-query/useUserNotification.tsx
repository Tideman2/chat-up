import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import { BASEURL } from "../../utils/api";

export type NotificationType = {
  id: number;
  senderId: number;
  recieverId: number;
  roomId: number;
  isRead: boolean;
  timeStamp: string;
};

export type NotificationQueryType = {
  count: number;
  notifications: NotificationType[];
  success: string;
};

const useUserNotification = () => {
  const fetchUserUnreadNotifictions = useCallback(async () => {
    const url = BASEURL + "/notifications/get_unread_notifications";
    const accessToken = localStorage.getItem("accessToken");
    console.log("i rannnn");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Unread notifications:", data);
      return data;
    } else {
      console.error("Failed to fetch unread notifications");
    }
  }, []);

  return useQuery<NotificationQueryType>({
    queryKey: ["userNotificatons"],
    queryFn: fetchUserUnreadNotifictions,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export default useUserNotification;
