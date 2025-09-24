import { Box } from "@mui/material";
import { useState, useCallback, useEffect } from "react";

import useAuth from "../../../hooks/useAuth";
import useUsersCtx from "../../../hooks/useUsersCtx";
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
  let { state: authState } = useAuth();
  let { name, userId } = authState;
  let { state: usersState, dispatch: usersDispatch } = useUsersCtx();

  let handleFectchUsers = useCallback(
    //fetch users to show as chat mate
    //Add users to context
    async function fecthAllUsers() {
      console.log(authState.name, authState.userId);
      try {
        checkIfTokenHasExpired({ username: name, userId: String(userId) });
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
        usersDispatch({
          type: "SET_USERS",
          payload: data,
        });

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
