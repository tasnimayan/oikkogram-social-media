"use client";
import Link from "next/link";

import fetchGraphql from "@/lib/fetchGraphql";
import { getUserFriends } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import List from "../List";
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

  return (
    <div className="mr-12 mt-4">
      <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
        {/* Header */}
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">Friends</h1>
          <Link
            href="/friends/myId"
            className="text-blue-700 hover:bg-blue-200"
          >
            See All Friends
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-1">
          <List
            data={data.data?.friends}
            component={FriendCardImage}
            emptyFallback={
              <p className="text-sm text-gray-300 text-center">
                No friends available
              </p>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileFriendList;
