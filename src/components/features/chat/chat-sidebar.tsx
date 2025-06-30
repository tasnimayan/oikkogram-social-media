"use client";
import React from "react";
import { MessageSquare } from "lucide-react";

import SearchInput from "@/components/shared/search-input";
import ConversationList from "./conversation-list";
import { useSearch } from "@/lib/hooks/use-search";

const ChatSidebar = () => {
  const { searchFilters, onChange } = useSearch(["participants.user.name"]);

  return (
    <div className="h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Messages
          </h2>
        </div>
        <SearchInput onChange={onChange} className="bg-muted rounded-full" />
      </div>
      <ConversationList filters={searchFilters} />
    </div>
  );
};

export default ChatSidebar;
