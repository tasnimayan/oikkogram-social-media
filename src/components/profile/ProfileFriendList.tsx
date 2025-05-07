"use client";
import Link from "next/link";

import fetchGraphql from "@/lib/fetchGraphql";
import { getUserFriends } from "@/lib/api/queries";
import { useQuery } from "@tanstack/react-query";
import FriendCardImage from "./FriendCardImage";
import FriendCardSkeleton from "../skeletons/FriendCardSkeleton";
import { useParams } from "next/navigation";

const ProfileFriendList = () => {
  const params = useParams();
  const { userId } = params;

  const { data, error, isLoading } = useQuery({
    queryKey: ["friend-list", userId],
    queryFn: async () => {
      const variables = {
        user_id: userId,
      };
      return await fetchGraphql(getUserFriends, variables);
    },
  });

  if (isLoading) return <FriendCardSkeleton />;

  if (error || data.errors) return <p>An error occurred</p>;
  if (!data?.data.friends) return <p className="text-sm text-gray-300 text-center">No friends available</p>;

  return (
    <div className="mr-12 mt-4">
      <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
        {/* Header */}
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">Friends</h1>
          <Link href="/friends/myId" className="text-blue-500 hover:text-blue-700 text-xs font-semibold">
            See All Friends
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {data.data?.friends.map((friend) => (
            <FriendCardImage data={friend} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileFriendList;
