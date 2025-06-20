"use client";

import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchGql } from "@/lib/api/graphql";
import { GET_CAUSE_VOLUNTEERS } from "@/lib/api/api-cause";
import { QK } from "@/lib/constants/query-key";
import { useQuery } from "@tanstack/react-query";
import VolunteerButton from "./volunteer-button";
import { Loading } from "@/components/ui/loading";

export function CauseVolunteers({ causeId }: { causeId: string }) {
  const { data: volunteers, isLoading } = useQuery({
    queryKey: [QK.CAUSES, "VOLUNTEERS", { causeId }],
    queryFn: () => useFetchGql(GET_CAUSE_VOLUNTEERS, { cause_id: causeId }),
    select: data => data.data,
    enabled: !!causeId,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!volunteers?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Volunteers</CardTitle>
          <CardDescription>No volunteers found</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Volunteers</CardTitle>
            <CardDescription>{volunteers?.length} people are volunteering for this cause</CardDescription>
          </div>
          <VolunteerButton causeId={causeId} />
        </div>
      </CardHeader>
      <CardContent>
        {volunteers?.length > 0 ? (
          <div className="space-y-4">
            {volunteers.map(supporter => (
              <div key={supporter.id} className="flex items-center gap-3">
                <Avatar src={supporter.user.image || "/placeholder.png"} name={supporter.user.name} />
                <div className="flex-1">
                  <div className="font-medium">{supporter.user.name || ""}</div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Skills: {supporter.skills?.join(", ") || ""}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No volunteers yet. Be the first to support this cause!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
