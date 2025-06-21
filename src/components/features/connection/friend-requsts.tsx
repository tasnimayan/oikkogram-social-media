"use client";

import { GET_CONNECTION_REQS } from "@/lib/api/api-connection";
import { useQuery } from "@tanstack/react-query";
import FriendRequestCard from "./connection-req-card";
import { UserCardSkeleton } from "../../skeletons/user-card-skeleton";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";

const FriendRequsts = () => {
  const { user } = useSessionContext();

  const { data, isError, isLoading } = useQuery({
    queryKey: [QK.CONNECTIONS, "REQUESTS", { userId: user?.id }],
    queryFn: async () =>
      useFetchGql(GET_CONNECTION_REQS, {
        user_id: user?.id,
        status: "pending",
      }),
  });

  if (isLoading) return <UserCardSkeleton />;
  if (isError) return <p>An error occurred</p>;
  if (!data?.data?.length) return <p className="text-center py-2">No Requests available</p>;

  return (
    <div className="space-y-3">
      {data.data.map(friend => (
        <FriendRequestCard data={friend} />
      ))}
    </div>
  );
};

export default FriendRequsts;
