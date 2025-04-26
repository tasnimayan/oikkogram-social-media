import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/lib/Interface";

interface ChatPreviewProps extends UserType {
  message: string;
  timestamp?: string;
  isActive?: boolean;
  unread?: number;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({ id, name, message, image, timestamp, isActive, unread }) => {
  return (
    <div className={cn("p-3 rounded-lg cursor-pointer transition-colors", isActive ? "bg-primary/10" : "hover:bg-muted")}>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={image || ""} />
          <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-sm truncate">{name}</h3>
            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{timestamp}</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground truncate">{message}</p>
            {unread && <span className="ml-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">{unread}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;
