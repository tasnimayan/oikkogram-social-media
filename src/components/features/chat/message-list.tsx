"use client";
import { useEffect, useRef } from "react";
import { useChatContext } from "./ChatContext";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { MessageBubble } from "./message-bubble";

const MessageList = () => {
  const { messages } = useChatContext();

  const { user } = useSessionContext();
  const userId = user?.id || "";

  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!messages) return null;

  return (
    // <ScrollArea className="flex-1 h-full">
    <div className="space-y-2">
      {messages.map(message => {
        const isFromMe = message.sender_id === userId;
        return (
          <MessageBubble
            message={message.content || ""}
            id={message.id}
            isFromMe={isFromMe}
            created_at={message.created_at}
          />
        );
      })}
      <div ref={messageEndRef} />
    </div>
    // </ScrollArea>
  );
};

export default MessageList;
