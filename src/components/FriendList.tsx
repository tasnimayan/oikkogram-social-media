"use client";

import fetchGraphql from "@/lib/fetchGraphql";
import { getFriendRequests } from "@/lib/queries";
import { useSession } from "next-auth/react";

import List from "./List";
import FriendCard from "./FriendCard";
import { useQuery } from "@tanstack/react-query";
import UserCardSkeleton from "./skeletons/UserCardSkeleton";

const FriendList = () => {
  let { data: session } = useSession();

  const { data, error, isLoading } = useQuery({
    queryKey: ["friend-list"],
    queryFn: async () => {
      const variables = {
        user_id: session?.user.id,
        status: "accepted",
      };
      return await fetchGraphql(getFriendRequests, variables);
    },
  });

  if (isLoading) return <UserCardSkeleton/>;

  if (error || data.errors) return <p>An error occurred</p>;

  return (
    <div className="flex flex-col gap-y-2">
      <List
        data={data.data?.friends}
        component={FriendCard}
        emptyFallback={
          <p className="text-sm text-gray-300 text-center">
            No friends available
          </p>
        }
      />
    </div>
  );
};

export default FriendList;
