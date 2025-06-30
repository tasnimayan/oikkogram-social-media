"use client";

import Link from "next/link";
import { UserCardSkeleton } from "@/components/skeletons/user-card-skeleton";
import ChatPreview from "./chat-preview";
import { useQuery } from "@tanstack/react-query";
import { GET_CONVERSATIONS } from "@/lib/api/api-chat";
import { MessageSquareWarning } from "lucide-react";
import { useParams } from "next/navigation";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";
import { DataState, ErrorResult } from "@/components/ui/data-message";
import { useSession } from "next-auth/react";

const ConversationList = ({ filters }: { filters: any[] }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { conversationId } = useParams();

  const where = filters.length > 0 ? { _or: filters } : {};

  const { data, isError, isLoading } = useQuery({
    queryKey: [QK.CONVERSATION, { filters }],
    queryFn: async () => useFetchGql(GET_CONVERSATIONS, { where, userId: userId! }),
    select: data => data.data,
    enabled: !!userId,
  });

  if (isLoading) return <UserCardSkeleton />;
  if (isError) return <ErrorResult />;
  if (!data?.length)
    return <DataState message="No conversation available" icon={<MessageSquareWarning className="size-10" />} />;

  return (
    <div className="p-2 flex flex-col gap-y-2">
      {data?.map(conversation => {
        const chatUser = conversation.participants[0].user;
        return (
          <Link key={conversation.id} href={`/chats/${conversation.id}`}>
            <ChatPreview
              id={chatUser.user_id}
              name={chatUser.name}
              image={chatUser.profile_photo_url}
              message={conversation.messages[0]?.content || ""}
              timestamp={conversation.messages[0]?.created_at}
              isActive={conversation.id.toString() === conversationId}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default ConversationList;
