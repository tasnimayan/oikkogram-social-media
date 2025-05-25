"use client";

import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchGql } from "@/lib/api/graphql";
import { GET_CAUSE_SUPPORTERS } from "@/lib/api/api-cause";
import { QK } from "@/lib/constants/query-key";
import { getTimeDifference } from "@/lib/utils/index";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/ui/loading";

export function SupportersList({ causeId }: { causeId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: [QK.CAUSES, "SUPPORTERS", { causeId }],
    queryFn: () => useFetchGql(GET_CAUSE_SUPPORTERS, { cause_id: causeId }),
    enabled: !!causeId,
  });

  const supporters = data?.data || [];
  const totalSupporters = data?.total_supporters?.aggregate?.count || 0;

  if (isLoading) {
    return <Spinner />;
  }

  if (!supporters.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Supporters</CardTitle>
          <CardDescription>No supporters found</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supporters</CardTitle>
        <CardDescription>{totalSupporters} people are supporting this cause</CardDescription>
      </CardHeader>
      <CardContent>
        {supporters.length > 0 ? (
          <div className="space-y-4">
            {supporters.map(supporter => (
              <div key={supporter.id} className="flex items-center gap-3">
                <Avatar src={supporter.user.image || "/placeholder.png"} name={supporter.user.name} />
                <div className="flex-1">
                  <div className="font-medium">{supporter.user.name || ""}</div>
                  {/* <div className="text-sm text-gray-500 dark:text-gray-400">{supporter.user.name || ""}</div> */}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Supported at {getTimeDifference(supporter.created_at)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No supporters yet. Be the first to support this cause!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
