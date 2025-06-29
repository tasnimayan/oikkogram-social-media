"use client";

import { useFetchGql } from "@/lib/api/graphql";
import { GET_CAUSES } from "@/lib/api/api-cause";
import { useQuery } from "@tanstack/react-query";
import { FeaturedCause } from "./featured-cause";
import { QK } from "@/lib/constants/query-key";
import { useSession } from "next-auth/react";

export default function TrendingCauseList() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: [QK.CAUSES],
    queryFn: () => useFetchGql(GET_CAUSES),
    select: data => data.data,
  });

  if (isLoading) return null;
  if (isError) return null;
  if (!data?.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map(cause => (
        <FeaturedCause cause={cause} isMine={cause.created_by.id === userId!} variant="trending" />
      ))}
    </div>
  );
}
