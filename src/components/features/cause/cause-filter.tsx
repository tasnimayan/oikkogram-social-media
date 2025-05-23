"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import SearchInput from "@/components/search-input";
import { useSearch } from "@/lib/hooks/use-search";

const categories = ["All", "Environment", "Community", "Education", "Health", "Animals"];

const CausesFilter: React.FC = () => {
  const { searchFilters, onChange } = useSearch(["tags", "title", "category"]);

  return (
    <div className="space-y-4">
      <SearchInput placeholder="Search causes..." onChange={onChange} className="bg-white" />

      <div className="flex flex-between">
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="active">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Badge variant="outline" className="ml-auto">
          <MapPin className="h-3 w-3 mr-1" />
          Near Me
        </Badge>
      </div>
    </div>
  );
};

export default CausesFilter;
