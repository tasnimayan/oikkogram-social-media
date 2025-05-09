"use client";

import { GET_FRIENDS } from "@/lib/api/queries";

import FriendCard from "./connection-card";
import { useQuery } from "@tanstack/react-query";
import UserCardSkeleton from "./skeletons/UserCardSkeleton";
import { useFetchGql } from "@/lib/api/graphql";
import { useSession } from "next-auth/react";
import { QK } from "@/lib/constants/query-key";

const FriendList = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data, error, isLoading } = useQuery({
    queryKey: [QK.CONNECTIONS, "FRIENDS", { userId }],
    queryFn: async () => useFetchGql(GET_FRIENDS, { user_id: userId! }),
  });

  if (isLoading) return <UserCardSkeleton />;

  if (error) return <p>An error occurred</p>;
  if (!data?.data) return <p className="text-sm text-gray-300 text-center">No friends available</p>;

  return (
    <div className="flex flex-col gap-y-2">
      {data.data.map((friend) => (
        <FriendCard connection={friend} />
      ))}
    </div>
  );
};

export default FriendList;
