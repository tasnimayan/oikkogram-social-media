import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { Card } from "../ui/card";
import { useFetchGql } from "@/lib/api/graphql";
import { GET_CAUSES } from "@/lib/api/api-cause";
import { useQuery } from "@tanstack/react-query";
import { QK } from "@/lib/constants/query-key";

const PopularCauses: React.FC = () => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Popular Causes</h3>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/causes">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>

      <PopularList />
    </Card>
  );
};

const PopularList = () => {
  const { data: causes, isLoading } = useQuery({
    queryKey: [QK.CAUSES],
    queryFn: () => useFetchGql(GET_CAUSES, { limit: 5 }),
    select: data => data.data,
  });

  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        <PopularCausesSkeleton />
      ) : !causes?.length ? (
        <p className="text-center text-muted-foreground py-4">No causes available</p>
      ) : (
        causes.map(cause => (
          <Link href={`/causes/${cause.id}`} key={cause.id}>
            <div className="hover:bg-muted/50 transition-colors p-3 border rounded-md">
              <h4 className="font-medium text-sm line-clamp-2">{cause.title}</h4>
              <div className="mt-1 flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">{cause.total_volunteers?.aggregate?.count || 0}</span>/
                  {cause.goal_value} supporters
                </div>
                <Button variant="ghost" size="sm" className="h-6 px-1.5" asChild>
                  <Link href={`/causes/${cause.id}`}>
                    <Heart className="h-3 w-3 mr-1" />
                    <span className="text-xs">Support</span>
                  </Link>
                </Button>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

const PopularCausesSkeleton = () => (
  <div className="space-y-2">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="flex items-center justify-between py-2">
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    ))}
  </div>
);

export default PopularCauses;
