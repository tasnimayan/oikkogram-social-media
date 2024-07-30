"use client";

import fetchGraphql from "@/lib/fetchGraphql";
import { getUserFriends } from "@/lib/queries";


import List from "./List";
import FriendCard from "./FriendCard";
import { useQuery } from "@tanstack/react-query";
import UserCardSkeleton from "./skeletons/UserCardSkeleton";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";

const FriendList = () => {
  const session = useSessionContext()

  const { data, error, isLoading } = useQuery({
    queryKey: ["friend-list"],
    queryFn: async () => {
      const variables = {
        user_id: session?.user.id,
      };
      return await fetchGraphql(getUserFriends, variables);
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
