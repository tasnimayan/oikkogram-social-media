"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";
import { CauseCard } from "./cause-card";
import { useFetchGql } from "@/lib/api/graphql";
import { GET_CAUSES } from "@/lib/api/api-cause";
import { causes } from "@/lib/constants/data";
import { useQuery } from "@tanstack/react-query";
import { FeaturedCause } from "./featured-cause";
import { QK } from "@/lib/constants/query-key";
import { Loading } from "@/components/ui/loading";

export default function CauseList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QK.CAUSES],
    queryFn: () => useFetchGql(GET_CAUSES),
  });

  const trendingCauses = causes.slice(1, 3);
  // Remaining causes
  const remainingCauses = causes.slice(3);

  const tabData = [
    { value: "all", label: "All" },
    { value: "newest", label: "Newest" },
    { value: "popular", label: "Most Supported" },
    { value: "urgent", label: "Urgent" },
  ];

  if (isLoading) return <Loading />;
  if (isError) return <p>Error</p>;
  if (!data?.data.length) {
    return (
      <div className="text-muted-foreground p-2 mt-8 h-full flex flex-col items-center">
        <TrendingUp className="size-10 mb-3" />
        <p>No causes available currently</p>
      </div>
    );
  }

  const featuredCause = data.data[0];

  return (
    <div className="mt-4">
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Featured Cause</h2>
        </div>
        <FeaturedCause causeData={featuredCause} />
      </div>

      {/* Trending causes */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold mr-2">Trending Now</h2>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trendingCauses.map(cause => (
            <CauseCard key={cause.id} cause={cause} variant="trending" />
          ))}
        </div>
      </div>

      {/* All causes */}
      <div className="mb-10">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Explore All Causes</h2>
            <TabsList>
              {tabData.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabData.map(tab => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              <div className="grid grid-cols-1  gap-6">
                {tab.value === "urgent"
                  ? remainingCauses.slice(0, 2).map(cause => <CauseCard key={cause.id} cause={cause} />)
                  : remainingCauses.map(cause => <CauseCard key={cause.id} cause={cause} />)}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
