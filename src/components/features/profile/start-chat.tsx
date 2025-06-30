"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useGetConversation } from "@/lib/hooks/use-get-conversation";
import { useRouter } from "next/navigation";

const StartChat = ({ chatUserId }: { chatUserId: string }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data, isLoading, isError, mutateAsync } = useGetConversation({ userId1: userId!, userId2: chatUserId });

  const handleRedirect = async () => {
    if (!isLoading && !isError && data?.id) {
      router.push(`/chats/${data.id}`);
    } else {
      const result = await mutateAsync();
      router.push(`/chats/${result.data?.id}`);
    }
  };

  return (
    <Button variant="outline" className="rounded-full" onClick={handleRedirect}>
      <MessageCircle className="h-4 w-4" />
      Message
    </Button>
  );
};

export default StartChat;
