import { Box } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import { io } from "socket.io-client";

import { useMsgSocket } from "../../../contexts/msgSocketCtx/MsgSocketCtx";
import useAuth from "../../../hooks/useAuth";
import FriendsProfile from "../../../components/FriendsProfile";
import { checkIfTokenHasExpired, BASEURL } from "../../../utils/api";

interface User {
  id: string;
  username: string;
  email: string;
}

// this component will house all friends that can be messaged
let ChatsContent1 = () => {
  let [users, setUsers] = useState<User[]>([]);
  let { state } = useAuth();
  let { name, userId } = state;
  let socket = useMsgSocket();

  let handleFectchUsers = useCallback(
    //fetch users to show as chat mate
    //Add users to context
    async function fecthAllUsers() {
      try {
        checkIfTokenHasExpired({ username: name, userId: String(userId) });
        console.log(state);
        let url = BASEURL + "/user/get_users";
        let accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("No access token found");
        }
        console.log(accessToken);
        let parsedToken = JSON.parse(accessToken);
        let response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${parsedToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status !== 200) {
          let error = new Error(`server error, status is ${response.status}`);
          throw error;
        }
        let data = await response.json();
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  useEffect(() => {
    handleFectchUsers();
  }, [handleFectchUsers]);

  let isUsers = users.length > 0;

  return (
    <Box>
      <h3 style={{ marginLeft: "10px" }}>Friends</h3>
      <Box
        sx={{
          display: "flex",
          rowGap: "20px",
          flexDirection: "column",
          padding: "10px",
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
