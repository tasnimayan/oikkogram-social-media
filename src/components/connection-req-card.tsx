import UserCard from "./UserCard";
import { GET_CONNECTION_REQS } from "@/lib/api/queries";
import { ResultOf } from "gql.tada";
import ConnectActions from "./features/network/connect-actions";
import ConnectButton from "./features/network/connect-button";

const FriendRequestCard = ({ data }: { data: ResultOf<typeof GET_CONNECTION_REQS>["data"][number] }) => {
  const { status, user } = data;
  const actions = (
    <div className="w-full flex gap-3">
      <ConnectActions senderId={user.id} connectionStatus={status} />
      <ConnectButton receiverId={user.id} connectionStatus={status} />
    </div>
  );
  return <UserCard user={data.user} friendCount={20} actions={actions} />;
};

export default FriendRequestCard;
