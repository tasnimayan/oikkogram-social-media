"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NeighborhoodCard } from "@/components/features/neighborhood/neighborhood-card";
import { Search, Filter, MapPin, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { QK } from "@/lib/constants/query-key";
import { useFetchGql } from "@/lib/api/graphql";
import { GET_NEIGHBORHOODS } from "@/lib/api/api-neighborhood";
import SearchInput from "@/components/search-input";
import { useSearch } from "@/lib/hooks/use-search";
import { Loading } from "@/components/ui/loading";

export default function NeighborhoodsPage() {
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>([]);
  const [selectedLocationTypes, setSelectedLocationTypes] = useState<string[]>([]);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const { searchFilters, onChange } = useSearch(["name"]);

  const activeFiltersCount = selectedDivisions.length + selectedLocationTypes.length + (showVerifiedOnly ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Find Your Neighborhood</h1>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchInput placeholder="Search neighborhoods by name, location, or description..." onChange={onChange} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="bg-blue-600 text-white rounded-full min-w-[1.25rem] h-5 px-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Filter Neighborhoods</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-gray-500 font-normal">Verification</DropdownMenuLabel>
                <DropdownMenuCheckboxItem checked={showVerifiedOnly} onCheckedChange={setShowVerifiedOnly}>
                  Verified only
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-gray-500 font-normal">Division</DropdownMenuLabel>
                {["Dhaka", "Habiganj"].map(division => (
                  <DropdownMenuCheckboxItem
                    key={division}
                    checked={selectedDivisions.includes(division)}
                    onCheckedChange={checked => {
                      if (checked) {
                        setSelectedDivisions([...selectedDivisions, division]);
                      } else {
                        setSelectedDivisions(selectedDivisions.filter(d => d !== division));
                      }
                    }}
                  >
                    {division}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {activeFiltersCount > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setSelectedDivisions([]);
                        setSelectedLocationTypes([]);
                        setShowVerifiedOnly(false);
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <NeighborhoodList />
    </div>
  );
}

const NeighborhoodList = () => {
  const { data: neighborhoods, isLoading } = useQuery({
    queryKey: [QK.NEIGHBORHOOD],
    queryFn: () => useFetchGql(GET_NEIGHBORHOODS),
    select: data => data.data,
  });

  if (isLoading) return <Loading />;
  if (!neighborhoods?.length)
    return (
      <div className="text-center py-12">
        <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
          <MapPin className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">No neighborhoods found</h3>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {neighborhoods.map(neighborhood => (
        <NeighborhoodCard key={neighborhood.id} neighborhood={neighborhood} onJoin={() => {}} />
      ))}
    </div>
  );
};
