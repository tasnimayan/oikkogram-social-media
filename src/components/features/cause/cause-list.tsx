"use client";

import { Ribbon } from "lucide-react";
import { CauseCard } from "./cause-card";
import { useFetchGql } from "@/lib/api/graphql";
import { GET_CAUSES } from "@/lib/api/api-cause";
import { useQuery } from "@tanstack/react-query";
import { QK } from "@/lib/constants/query-key";
import { Loading } from "@/components/ui/loading";
import { DataState, ErrorResult } from "@/components/ui/data-message";
import { useSession } from "next-auth/react";
import { VariablesOf } from "gql.tada";

export type CauseFilterType = VariablesOf<typeof GET_CAUSES>["filter"];

export default function CauseList({ filter }: { filter?: CauseFilterType }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: [QK.CAUSES],
    queryFn: () => useFetchGql(GET_CAUSES, { filter }),
    select: data => data.data,
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorResult />;
  if (!data?.length) return <DataState message="No causes found" icon={<Ribbon className="size-10" />} />;

  return (
    <div className="flex flex-col gap-6">
      {data.map(cause => (
        <CauseCard key={cause.id} cause={cause} isMine={cause.created_by.id === userId!} />
      ))}
    </div>
  );
}
