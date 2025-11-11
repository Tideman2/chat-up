import { Box, Typography } from "@mui/material";
import { useState, useCallback, useEffect } from "react";

import { useMsgSocket } from "../../../contexts/msgSocketCtx/MsgSocketCtx";
import useAuth from "../../../hooks/useAuth";
import useUsersCtx from "../../../hooks/useUsersCtx";
import FriendsProfile from "../../../components/FriendsProfile";
import { checkIfTokenHasExpired, BASEURL } from "../../../utils/api";
import { useNotificationSocket } from "../../../contexts/notificationSckCtx/NotificationSckCtx";
import theme from "../../../config/theme";

interface User {
  id: string;
  username: string;
  email: string;
}

// this component will house all friends that can be messaged
let ChatsContent1 = () => {
  let [users, setUsers] = useState<User[]>([]);
  let { state: authState } = useAuth();
  let { dispatch: usersDispatch } = useUsersCtx();
  const { state: socketState } = useMsgSocket();
  const notificationSocketCtx = useNotificationSocket();
  let { name, userId } = authState;
  const msgSocket = socketState.socket;
  const notificationSocket = notificationSocketCtx.state.socket;

  function removeCurrentUserFromUsersList(users: User[]) {
    return users.filter((user) => user.id !== userId);
  }

  let handleFectchUsers = useCallback(
    //fetch users to show as chat mate
    //Add users to context
    async function fecthAllUsers() {
      try {
        checkIfTokenHasExpired(name, userId);
        let url = BASEURL + "/user/get_users";
        let accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("No access token found");
        }
        console.log(accessToken);
        let response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status !== 200) {
          let error = new Error(`server error, status is ${response.status}`);
          throw error;
        }
        let data = await response.json();
        data = removeCurrentUserFromUsersList(data);
        usersDispatch({
          type: "SET_USERS",
          payload: data,
        });

        setUsers(data);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  //useEffect to fetch users on component mount
  useEffect(() => {
    // Run fetch users and adds notification socket connection to necessery rooms
    const run = async () => {
      if (!notificationSocket) return;
      let usersData = await handleFectchUsers();
      for (let users in usersData) {
        let receiverId = usersData[users].id;
        console.log(userId, receiverId);
        notificationSocket.emit("notifications_room", {
          senderId: userId,
          receiverId,
        });
      }
    };
    run();
  }, [handleFectchUsers]);

  let isUsers = users.length > 0;

  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          zIndex: 99,
          width: "320px",
          backgroundColor: (theme) => theme.palette.background.default,
          padding: "16px",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        Friends
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "60px",
        }}
      >
        {isUsers &&
          users.map((user) => {
            return (
              <FriendsProfile
                key={user.id}
                userId={user.id}
                userName={user.username}
              />
            );
          })}
      </Box>
    </Box>
  );
};

export default ChatsContent1;
