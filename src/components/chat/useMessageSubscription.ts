import { useEffect, useRef } from "react";
import { useSubscription } from "@apollo/client";
import { messageSubscription } from "@/lib/queries";
import { useChat } from "./ChatProvider";

const useMessageSubscription = (conversationId: string, createdAt: string) => {
  const { messages, setMessages } = useChat();
  const messageIdsRef = useRef(new Set(messages.map((msg) => msg.id)));

  const { data: subscriptionData } = useSubscription(messageSubscription, {
    variables: { conversation_id: conversationId, created_at: createdAt },
  });

  useEffect(() => {
    if (subscriptionData) {
      const newMessages = subscriptionData.messages_stream.filter((message) => {
        if (!messageIdsRef.current.has(message.id)) {
          messageIdsRef.current.add(message.id);
          return true;
        }
        return false;
      });

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, ...newMessages];
        return updatedMessages.slice(-100); // Limit to the most recent 100 messages
      });
    }
  }, [subscriptionData, setMessages]);
};

export default useMessageSubscription;
