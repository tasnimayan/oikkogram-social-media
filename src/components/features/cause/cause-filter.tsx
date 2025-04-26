import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CausesFilter: React.FC = () => {
  return (
    <div className="flex gap-4">
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="environment">Environment</SelectItem>
          <SelectItem value="education">Education</SelectItem>
          <SelectItem value="health">Health & Wellness</SelectItem>
          <SelectItem value="community">Community Development</SelectItem>
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
  );
};

export default CausesFilter;
