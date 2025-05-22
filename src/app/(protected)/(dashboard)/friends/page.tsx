'use client'
import dynamic from "next/dynamic";
import { useSessionContext } from "../../AuthWrapper";
const FriendRequstList = dynamic(() => import("@/components/FriendRequstList"));

const Friends = () => {
  const {user} = useSessionContext()

  return (
    <div>
      <div className="flex justify-between">
        <h2>Friend Requests</h2>
        <a
          href={`/friends/${user?.id}`}
          className="text-blue-500 hover:text-blue-700 text-xs font-semibold"
        >
          See All Friends
        </a>
      </div>
      <FriendRequstList />
    </div>
  );
};

export default Friends;
