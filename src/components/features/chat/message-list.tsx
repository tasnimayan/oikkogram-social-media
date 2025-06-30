"use client";
import { useEffect, useRef, useState } from "react";
import { MessageBubble } from "./message-bubble";
import { useParams } from "next/navigation";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { MESSAGE_SUBSCRIPTION, GET_MESSAGES } from "@/lib/api/api-chat";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";
import { ResultOf } from "gql.tada";
import { useGqlSubscription } from "@/lib/api/gql-subscription";
import { useSession } from "next-auth/react";
import { Loading } from "@/components/ui/loading";
import { MessagesSkeleton } from "@/components/skeletons/messages-skeleton";

type MessageType = ResultOf<typeof GET_MESSAGES>["data"][number];
const ROW_LIMIT = 20;

const useMessages = (conversationId: number) => {
  return useInfiniteQuery({
    queryKey: [QK.MESSAGES, { conversationId }],
    queryFn: async ({ pageParam = 0 }) => {
      const variables = {
        limit: ROW_LIMIT,
        offset: pageParam * ROW_LIMIT,
        conversation_id: conversationId,
      };
      return useFetchGql(GET_MESSAGES, variables);
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.length === ROW_LIMIT ? pages.length : undefined;
    },
    initialPageParam: 0,
    select: data => data.pages.map(page => page.data).flat(),
    enabled: !!conversationId,
  });
};

const MessageList = () => {
  const [newMessages, setNewMessages] = useState<MessageType[]>([]);
  const { data } = useSession();
  const userId = data?.user?.id;

  const { conversationId } = useParams();
  const [initialTimestamp] = useState(new Date().toISOString());

  const addNewMessages = (incomingMessages: MessageType[]) => {
    setNewMessages(prevMessages => [...incomingMessages, ...prevMessages]);
  };

  const { data: messages, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useMessages(+conversationId);

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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const top = e.currentTarget.scrollTop;
    if (top === 0 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) return <MessagesSkeleton />;

  if (!messages?.length) return <p className="text-center text-muted-foreground">Start your conversation</p>;

  return (
    <div className="h-full scroll-container sm:px-4 py-4" onScroll={handleScroll}>
      <div className="flex flex-col-reverse gap-y-2">
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
        {isFetchingNextPage && <Loading />}
        {!hasNextPage && <p className="text-center py-2 text-muted-foreground">Conversation started</p>}
      </div>
    </div>
  );
};

export default MessageList;
