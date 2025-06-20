import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface MessageBubbleProps {
  id: number;
  message: string;
  isFromMe: boolean;
  created_at: string | Date | null;
  showTime?: boolean;
}

export function MessageBubble({ message, isFromMe, showTime = true, created_at, id }: MessageBubbleProps) {
  return (
    <div className={cn("flex", isFromMe ? "justify-end" : "justify-start")} data-id={id}>
      <div className="max-w-[75%]" data-message-bubble>
        <div
          className={cn(
            "rounded-2xl px-4 py-2 break-words cursor-pointer transition-all duration-200",
            isFromMe
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
          )}
          data-toggle-time
        >
          {message}
        </div>

        <div
          className={cn(
            "text-xs mt-1 text-gray-500 dark:text-gray-400 hidden",
            isFromMe ? "justify-end" : "justify-start"
          )}
          data-time
        >
          <span>{format(new Date(created_at || ""), "h:mm a")}</span>
        </div>
      </div>
    </div>
  );
}
