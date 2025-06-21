import UserCard from "../../shared/user-card";
import { ResultOf } from "gql.tada";
import { GET_FRIENDS } from "@/lib/api/api-connection";
import ConnectActions from "../network/connect-actions";
import ConnectButton from "../network/connect-button";
import { useSession } from "next-auth/react";

type ConnectionType = ResultOf<typeof GET_FRIENDS>["data"][number];
const FriendCard = ({ connection }: { connection: ConnectionType }) => {
  let { data: session } = useSession();

  const friend = connection.receiver.id === session?.user?.id ? connection.sender : connection.receiver;

  const actions = (
    <div className="w-full flex gap-2">
      <ConnectActions senderId={friend.id} connectionStatus={"accepted"} />
      <ConnectButton receiverId={friend.id} connectionStatus={"accepted"} />
    </div>
  );

  return <UserCard user={friend} friendCount={20} actions={actions} />;
};

export default FriendCard;
