import UserCard from "../../shared/user-card";
import { GET_CONNECTION_REQS } from "@/lib/api/api-connection";
import { ResultOf } from "gql.tada";
import ConnectActions from "../network/connect-actions";
import ConnectButton from "../network/connect-button";

const FriendRequestCard = ({ data }: { data: ResultOf<typeof GET_CONNECTION_REQS>["data"][number] }) => {
  const { status, user } = data;
  const actions = (
    <div className="w-full sm:w-fit flex gap-2">
      <ConnectActions senderId={user?.id!} connectionStatus={status} />
      <ConnectButton receiverId={user?.id!} connectionStatus={status} />
    </div>
  );
  return <UserCard user={data.user!} friendCount={20} actions={actions} />;
};

export default FriendRequestCard;
