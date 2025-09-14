import ChatsContent1 from "./Components/ChatsContent1";
import DashBoardOutletContainer from "../../components/dashboard/components/DashBoardOutletContainer";

export default function Chats() {
  return (
    <DashBoardOutletContainer content1={<ChatsContent1 />} content2={null} />
  );
}
