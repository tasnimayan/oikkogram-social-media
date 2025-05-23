"use client";

import UserSkeleton from "@/components/skeletons/UserSkeleton";
import { useChatContext } from "./ChatContext";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";

const ChatHeader = () => {
  const { conversations } = useChatContext();
  const { user } = useSessionContext();
  const [isOnline, setIsOnline] = useState(true);

  if (!conversations) return <UserSkeleton />;

  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="md:hidden">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <Avatar>
          <AvatarImage src={user?.image || "/placeholder.png"} />
          <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{user?.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <span className={`h-2 w-2 rounded-full mr-1 ${isOnline ? "bg-green-500" : "bg-gray-400"}`}></span>
            {isOnline ? "Online" : "Offline"}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View profile</DropdownMenuItem>
            <DropdownMenuItem>Mute notifications</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 dark:text-red-400">Block user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChatHeader;
