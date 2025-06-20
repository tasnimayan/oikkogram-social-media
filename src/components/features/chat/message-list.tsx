"use client";
import { useEffect, useRef, useState } from "react";
import { MessageBubble } from "./message-bubble";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { MESSAGE_SUBSCRIPTION, GET_MESSAGES } from "@/lib/api/api-chat";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";
import { ResultOf } from "gql.tada";
import { useGqlSubscription } from "@/lib/api/gql-subscription";
import { useSession } from "next-auth/react";

type MessageType = ResultOf<typeof GET_MESSAGES>["messages"][number];

const MessageList = () => {
  const [newMessages, setNewMessages] = useState<MessageType[]>([]);
  const { data } = useSession();
  const userId = data?.user?.id;
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const toggleEl = target.closest("[data-toggle-time]");
      if (!toggleEl) return;

      const messageBubble = toggleEl.closest("[data-message-bubble]");
      if (!messageBubble) return;

      const timeElement = messageBubble.querySelector("[data-time]");
      if (!timeElement) return;

      // Toggle the timestamp visibility
      timeElement.classList.toggle("hidden");
    };

    container.addEventListener("click", handleClick);
    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, []);

  const { conversationId } = useParams();
  const [initialTimestamp, setInitialTimestamp] = useState(new Date().toISOString());

  // Fetching old messages
  const { data: messages, isLoading } = useQuery({
    queryKey: [QK.MESSAGES, { conversationId, initialTimestamp }],
    queryFn: async () => useFetchGql(GET_MESSAGES, { conversation_id: +conversationId }),
    select: data => data?.messages,
  });

  const addNewMessages = (incomingMessages: MessageType[]) => {
    setNewMessages(prevMessages => [...incomingMessages, ...prevMessages]);
  };

  useGqlSubscription(
    {
      query: MESSAGE_SUBSCRIPTION,
      variables: {
        created_at: initialTimestamp,
        conversation_id: +conversationId,
      },
    },
    (data: any) => {
      addNewMessages(data.messages_stream);
    }
  );

  const messageEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages?.length]);

  if (!messages) return null;

  return (
    <div className="h-full scroll-container px-4 py-4">
      <div className="flex flex-col-reverse gap-y-2" ref={containerRef}>
        <div ref={messageEndRef} />
        {[...newMessages, ...messages].map(message => {
          const isFromMe = message.sender_id === userId;
          return (
            <MessageBubble
              key={message.id}
              id={message.id}
              message={message.content || ""}
              isFromMe={isFromMe}
              created_at={message.created_at}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MessageList;
