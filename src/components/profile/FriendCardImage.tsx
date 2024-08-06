import { UserType } from "@/lib/Interface";
import Link from "next/link";
import { useParams } from "next/navigation";

const FriendCardImage = ({
  data,
}: {
  data: { friend: UserType; user: UserType };
}) => {
  const params = useParams();
  const userId = params.userId as string;
  const friend = data.user.id === userId ? data.friend : data.user;
  return (
    <div className="bg-white p-0.5">
      <img
        src={friend.image}
        className="w-24 h-24 rounded-md object-cover mt-2 cursor-pointer border shadow-sm"
      />
      <Link href={`/profile/${friend.id}`} className="font-semibold text-sm">
        {friend.name}
      </Link>
    </div>
  );
};

export default FriendCardImage;
