"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

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
import PeopleList from "@/components/people-list";

const MAX_DISTANCE = 5;

export default function NearbyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterToggle = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Nearby Neighbors</h1>
      </div>

      <NetworkFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilters={activeFilters}
        handleFilterToggle={handleFilterToggle}
        maxDistance={MAX_DISTANCE}
      />

      <PeopleList />
    </div>
  );
}

interface NearbyFiltersProps {
  activeFilters: string[];
  onFilterToggle: (filter: string) => void;
}

function NearbyFilters({ activeFilters, onFilterToggle }: NearbyFiltersProps) {
  const interestFilters = ["Gardening", "Cooking", "Reading", "Community Service", "Sports", "Arts", "Pets", "Technology", "Music"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
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
          {interestFilters.map((interest) => (
            <DropdownMenuCheckboxItem key={interest} checked={activeFilters.includes(interest)} onCheckedChange={() => onFilterToggle(interest)}>
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
              // Clear all filters
              activeFilters.forEach((filter) => onFilterToggle(filter));
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
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilters: string[];
  handleFilterToggle: (filter: string) => void;
  maxDistance: number;
}

const NetworkFilter: React.FC<NetworkFilterProps> = ({ searchQuery, setSearchQuery, activeFilters, handleFilterToggle, maxDistance }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          type="search"
          placeholder="Search by name, neighborhood, or interests..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Distance</label>
            <span className="text-sm text-gray-500 dark:text-gray-400">{maxDistance} miles</span>
          </div>
        </div>

        <NearbyFilters activeFilters={activeFilters} onFilterToggle={handleFilterToggle} />
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="flex items-center gap-1">
              {filter}
              <button
                onClick={() => handleFilterToggle(filter)}
                className="ml-1 h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <X />
              </button>
            </Badge>
          ))}
          {/* <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setActiveFilters([])}>
            Clear all
          </Button> */}
        </div>
      )}
    </div>
  );
};
