import { GET_FRIENDS } from "@/lib/api/queries";
import { UserType } from "@/lib/Interface";
import { ResultOf } from "gql.tada";
import Link from "next/link";
import { useParams } from "next/navigation";
type ConnectionType = ResultOf<typeof GET_FRIENDS>["data"][number];

const FriendCardImage = ({ connection }: { connection: ConnectionType }) => {
  const params = useParams();
  const userId = params.userId as string;

  const friend = connection.receiver.id === userId ? connection.sender : connection.receiver;

  return (
    <div className="bg-white p-0.5">
      <img src={friend.image ?? ""} className="w-24 h-24 rounded-md object-cover mt-2 cursor-pointer border shadow-sm" />
      <Link href={`/profile/${friend.id}`} className="font-semibold text-sm">
        {friend.name}
      </Link>
    </div>
  );
};

export default FriendCardImage;
