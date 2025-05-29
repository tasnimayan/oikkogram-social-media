"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PeopleList from "@/components/features/network/people-list";
import { useSearch } from "@/lib/hooks/use-search";
import SearchInput from "@/components/shared/search-input";
import { MapPin } from "lucide-react";

const MAX_DISTANCE = 5;

export default function NearbyPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { searchFilters, onChange } = useSearch(["name"]);

  const handleFilterToggle = (filter: string) => {
    // setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Nearby Neighbors</h1>
      </div>

      <NetworkFilter
        onSearch={onChange}
        activeFilters={activeFilters}
        handleFilterToggle={handleFilterToggle}
        maxDistance={MAX_DISTANCE}
      />

      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <MapPin className="h-4 w-4 mr-1" />
        <span>Showing neighbors within {MAX_DISTANCE} miles</span>
      </div>
      <PeopleList searchQuery={searchFilters} />
    </div>
  );
}

interface NearbyFiltersProps {
  activeFilters: string[];
  onFilterToggle: (filter: string) => void;
}

function NearbyFilters({ activeFilters, onFilterToggle }: NearbyFiltersProps) {
  const interestFilters = [
    "Gardening",
    "Cooking",
    "Reading",
    "Community Service",
    "Sports",
    "Arts",
    "Pets",
    "Technology",
    "Music",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`gap-2 ${activeFilters.length ? "border-blue-400" : ""}`}>
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilters.length > 0 && (
            <span className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-600 text-white text-xs font-medium">
              {activeFilters.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Filter by Interests</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
          {interestFilters.map(interest => (
            <DropdownMenuCheckboxItem
              key={interest}
              checked={activeFilters.includes(interest)}
              onCheckedChange={() => onFilterToggle(interest)}
            >
              {interest}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              activeFilters.forEach(filter => onFilterToggle(filter));
            }}
          >
            Clear All Filters
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface NetworkFilterProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activeFilters: string[];
  handleFilterToggle: (filter: string) => void;
  maxDistance: number;
}

const NetworkFilter: React.FC<NetworkFilterProps> = ({ onSearch, activeFilters, handleFilterToggle, maxDistance }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <SearchInput onChange={onSearch} />

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="grow flex items-center justify-between">
          <label className="text-sm font-medium">Distance</label>
          <span className="text-sm text-gray-500 dark:text-gray-400">{maxDistance} miles</span>
        </div>

        <NearbyFilters activeFilters={activeFilters} onFilterToggle={handleFilterToggle} />
      </div>
    </div>
  );
};
