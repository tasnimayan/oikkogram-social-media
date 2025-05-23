import { format } from "date-fns";
import { CheckCheck } from "lucide-react";

export interface MessageType {
  id: string;
  message: string;
  sender_id: string;
  created_at: string;
}

interface MessageBubbleProps {
  id: string;
  message: string;
  isFromMe: boolean;
  created_at: string | Date;
  showTime?: boolean;
}

export function MessageBubble({ message, isFromMe, showTime = false, created_at }: MessageBubbleProps) {
  return (
    <div className={`flex ${isFromMe ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[75%]">
        <div
          className={`rounded-2xl px-4 py-2 break-words ${
            isFromMe ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
          }`}
        >
          {message}
        </div>

        {showTime && (
          <div className={`flex items-center text-xs mt-1 text-gray-500 dark:text-gray-400 ${isFromMe ? "justify-end" : "justify-start"}`}>
            <span>{format(new Date(created_at), "h:mm a")}</span>
            {/* {isFromMe && message.status && (
              <span className="ml-1">
                {message.status === "read" ? (
                  <CheckCheck className="h-3 w-3 text-blue-500" />
                ) : message.status === "delivered" ? (
                  <CheckCheck className="h-3 w-3" />
                ) : null}
              </span>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
}
