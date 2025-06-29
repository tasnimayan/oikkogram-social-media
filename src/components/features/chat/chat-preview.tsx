import React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { UserType } from "@/lib/interfaces";
import { Badge } from "@/components/ui/badge";
import { getTimeDifference } from "@/lib/utils/index";

interface ChatPreviewProps extends UserType {
  message: string | null;
  timestamp?: Date | string | null;
  isActive?: boolean;
  unread?: number;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({ id, name, message, image, timestamp, isActive, unread }) => {
  return (
    <div className={cn("p-4 cursor-pointer transition-colors hover:bg-secondary", isActive && "bg-secondary")}>
      <div className="flex items-center gap-3">
        <Avatar src={image} name={name} />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-sm truncate">{name}</h3>
            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
              {timestamp && getTimeDifference(timestamp)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground truncate">{message}</p>

            {unread && (
              <Badge variant="outline" className="bg-blue-50">
                {unread}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;
