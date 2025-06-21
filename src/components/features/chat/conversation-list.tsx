"use client";

import Link from "next/link";
import { ConversationType } from "@/lib/interfaces";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";
import { UserCardSkeleton } from "@/components/skeletons/user-card-skeleton";
import ChatPreview from "./chat-preview";
import { useQuery } from "@tanstack/react-query";
import { GET_CONVERSATIONS } from "@/lib/api/api-chat";
import { MessageSquareWarning } from "lucide-react";
import { useParams } from "next/navigation";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";

const ConversationList = ({ filters }: { filters: any[] }) => {
  const { user } = useSessionContext();
  const { conversationId } = useParams();

  const { data, isError, isLoading } = useQuery({
    queryKey: [QK.CONVERSATION, { filters }],
    queryFn: async () => {
      const variables =
        filters.length > 0
          ? {
              where: {
                _or: filters,
              },
            }
          : {};

      return useFetchGql(GET_CONVERSATIONS, variables);
    },
  });

  if (isLoading) return <UserCardSkeleton />;
  if (isError) return <p>Something went wrong</p>;
  if (data?.data?.length === 0)
    return (
      <div className="text-muted-foreground p-2 mt-8 h-full flex flex-col items-center">
        <MessageSquareWarning className="size-10 mb-3" />
        <p>No conversation available</p>
      </div>
    );

  const conversations = data?.data;

  return (
    <div className="p-2 flex flex-col gap-y-2">
      {conversations?.map((conversation: ConversationType) => {
        const isCurrentUser = conversation.user1?.id === user?.id;
        const chatUser = isCurrentUser ? conversation.user2 : conversation.user1;
        return (
          <Link key={conversation.id} href={`/chats/${conversation.id}`}>
            <ChatPreview
              id={chatUser.id}
              name={chatUser.name}
              image={chatUser.image}
              message="Hey, are you coming to the community cleanup?"
              timestamp="2m ago"
              isActive={conversation.id.toString() === conversationId}
              unread={2}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default ConversationList;
