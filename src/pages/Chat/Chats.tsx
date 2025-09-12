import { useCallback, useEffect, useState } from "react";

import ChatTextBox from "../../components/ChatTextBox";
import { BASEURL, checkIfTokenHasExpired } from "../../utils/api";
import useAuth from "../../hooks/useAuth";
import DashBoardOutletContainer from "../../components/dashboard/components/DashBoardOutletContainer";
import { Box } from "@mui/material";

interface User {
  id: string;
  username: string;
  email: string;
}

// this component will house all friends that can be messaged
let ChatsContainer = () => {
  let [users, setUsers] = useState<User[]>([]);
  let { state } = useAuth();
  let { name, userId } = state;

  let handleFectchUsers = useCallback(
    //fetch users to show as chat mate
    //Add users to context
    async function fecthAllUsers() {
      try {
        checkIfTokenHasExpired({ username: name, userId });
        console.log(state);
        let url = BASEURL + "/user/get_users";
        let accessToken = localStorage.getItem("accessToken");
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
        console.log(response);
        let data = await response.json();
        setUsers(data);
        console.log(data);
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
            return <ChatTextBox userId={user.id} userName={user.username} />;
          })}
      </Box>
    </Box>
  );
};

export default function Chats() {
  return (
    <DashBoardOutletContainer content1={<ChatsContainer />} content2={null} />
  );
}
