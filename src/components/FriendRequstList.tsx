"use client";

import fetchGraphql from "@/lib/fetchGraphql";
import { getFriendRequests } from "@/lib/queries";
import { useSession } from "next-auth/react";
import List from "./List";
import FriendRequestCard from "./FriendRequestCard";
import { useQuery } from "@tanstack/react-query";
import UserCardSkeleton from "./skeletons/UserCardSkeleton";

const FriendRequstList = () => {
  let { data: session } = useSession();

  const { data, error, isLoading } = useQuery({
    queryKey: ["friend-request"],
    queryFn: async () => {
      const variables = {
        user_id: session?.user.id,
        status: "pending",
      };

      return await fetchGraphql(getFriendRequests, variables);
    },
  });

  if (isLoading) return <UserCardSkeleton />;

  if (error || data.errors) return <p>An error occurred</p>;

  return (
    <div>
      <List
        data={data.data?.friends}
        component={FriendRequestCard}
        emptyFallback={
          <p className="text-sm text-gray-300 text-center">
            No requests available{" "}
          </p>
        }
      />
    </div>
  );
};

export default FriendRequstList;
