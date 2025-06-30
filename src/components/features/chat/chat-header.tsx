"use client";

import UserSkeleton from "@/components/skeletons/UserSkeleton";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { GET_CHAT_USER } from "@/lib/api/api-chat";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const ChatHeader = () => {
  const { conversationId } = useParams();
  const router = useRouter();

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: conversation } = useQuery({
    queryKey: [QK.MESSAGES, { conversationId }],
    queryFn: async () => useFetchGql(GET_CHAT_USER, { conversation_id: +conversationId, userId: userId! }),
    select: data => data?.data,
    enabled: !!userId,
  });

  if (!conversation) return <UserSkeleton />;
  const chatUser = conversation?.participants[0].user;

  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => router.push("/chats")}>
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <Avatar src={chatUser?.profile_photo_url || "/placeholder.png"} name={chatUser?.name} />
        <div>
          <div className="font-medium">{chatUser?.name}</div>
          {/* <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <span className={`h-2 w-2 rounded-full mr-1 ${isOnline ? "bg-green-500" : "bg-gray-400"}`}></span>
            {isOnline ? "Online" : "Offline"}
          </div> */}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/profile/${chatUser?.user_id}`}>View profile</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChatHeader;
