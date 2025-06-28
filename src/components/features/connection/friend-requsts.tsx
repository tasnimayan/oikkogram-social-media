"use client";

import { GET_CONNECTION_REQS } from "@/lib/api/api-connection";
import { useQuery } from "@tanstack/react-query";
import FriendRequestCard from "./connection-req-card";
import { UserCardSkeleton } from "../../skeletons/user-card-skeleton";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";
import { EmptyResult, ErrorResult } from "@/components/ui/data-message";
import { useSession } from "next-auth/react";

const FriendRequsts = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data, isError, isLoading } = useQuery({
    queryKey: [QK.CONNECTIONS, "REQUESTS", { userId }],
    queryFn: async () =>
      useFetchGql(GET_CONNECTION_REQS, {
        user_id: userId,
        status: "pending",
      }),
  });

  if (isLoading) return <UserCardSkeleton />;
  if (isError) return <ErrorResult />;
  if (!data?.data?.length) return <EmptyResult message="No Requests available" />;

  return (
    <div className="space-y-3">
      {data.data.map(friend => (
        <FriendRequestCard data={friend} />
      ))}
    </div>
  );
};

export default FriendRequsts;
