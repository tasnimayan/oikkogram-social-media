"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import SearchInput from "@/components/search-input";
import { useSearch } from "@/lib/hooks/use-search";
import { NeighborhoodList } from "@/components/features/neighborhood/nieghborhood-list";
import { cn } from "@/lib/utils";
const NeighborhoodPage = () => {
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const { searchFilters, onChange } = useSearch(["name", "division"]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Find Your Neighborhood</h1>
      </div>

      {/* Search and Filters */}

      <FilterComponent
        selectedDivision={selectedDivision}
        onDivisionChange={setSelectedDivision}
        onSearchChange={onChange}
      />
      <NeighborhoodList
        division={selectedDivision}
        searchQuery={searchFilters}
        key={selectedDivision + JSON.stringify(searchFilters)}
      />
    </div>
  );
};

const FilterComponent = ({
  selectedDivision,
  onDivisionChange,
  onSearchChange,
}: {
  selectedDivision: string;
  onDivisionChange: (division: string) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <SearchInput placeholder="Search" onChange={onSearchChange} className="flex-1" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 h-input">
              <Filter className={cn("h-4 w-4", selectedDivision && "text-green-500")} />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-gray-500 font-normal">Division</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["Dhaka", "Habiganj"].map(division => (
                <DropdownMenuItem
                  key={division}
                  className={cn(selectedDivision === division && "bg-blue-600 text-white")}
                  onClick={() => {
                    if (selectedDivision === division) {
                      onDivisionChange("");
                    } else {
                      onDivisionChange(division);
                    }
                  }}
                >
                  {division}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NeighborhoodPage;
