import React, { createContext, useContext, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSubscription } from "@apollo/client";
import fetchGraphql from "@/lib/fetchGraphql";
import { getMessages, messageSubscription } from "@/lib/queries";
import { MessageType, UserType } from "@/lib/Interface";

interface ChatContextProps {
  messages: MessageType[];
  isLoading: boolean;
  conversations:{user1:UserType,user2:UserType}
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams();
  const conversationId = params.convId;


  const [messages, setMessages] = useState<MessageType[]>([]);
  const [conversations, setConversations] = useState()
  const [initialTimestamp, setInitialTimestamp] = useState("");

  const addNewMessages = (incomingMessages) => {
    const allMessages = [...messages, ...incomingMessages];
    setMessages(allMessages);
  };

  // Fetching old messages
  const { isLoading } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: async () => {
      const response = await fetchGraphql(getMessages, {
        conversation_id: conversationId,
      });
      let oldMessage = response.data.messages;
      setMessages(oldMessage);
      setConversations(response.data.conversations)
      setInitialTimestamp(
        oldMessage[oldMessage.length - 1]?.created_at || new Date().toISOString()
      );
      return oldMessage;
    },
  });

  // New messages stream
  useSubscription(messageSubscription, {
    variables: {
      created_at: initialTimestamp,
      conversation_id: conversationId,
    },
    onData: (response) => {
      if (!isLoading && response.data) {
        addNewMessages(response.data.data.messages_stream);
      }
    },
  });

  return (
    <ChatContext.Provider value={{ messages, isLoading, conversations }}>
      {children}
    </ChatContext.Provider>
  );
};
