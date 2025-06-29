"use client";

import { CauseHero } from "@/components/features/cause/cause-hero";
import CauseFilter from "@/components/features/cause/cause-filter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrendingCauseList from "@/components/features/cause/trending-cause-list";
import CauseList from "@/components/features/cause/cause-list";

const tabData = [
  { value: "all", label: "All" },
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most Supported" },
  { value: "trending", label: "Trending" },
];

export function CausesPage() {
  return (
    <div>
      <CauseHero />

      <CauseFilter />

      <div className="mt-8 space-y-4 md:space-y-12">
        <div>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Explore All Causes</h1>
              <TabsList className="w-full md:w-auto">
                {tabData.map(tab => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {tabData.map(tab => (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="py-4">{tab.value === "trending" ? <TrendingCauseList /> : <CauseList />}</div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
