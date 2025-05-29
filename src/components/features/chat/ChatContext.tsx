import React, { createContext, useContext, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSubscription } from "@apollo/client";
import { MESSAGE_SUBSCRIPTION, GET_MESSAGES } from "@/lib/api/api-chat";
import { UserType } from "@/lib/interfaces";
import { useFetchGql } from "@/lib/api/graphql";
import { ResultOf } from "gql.tada";
import { QK } from "@/lib/constants/query-key";

type MessageType = ResultOf<typeof GET_MESSAGES>["messages"][number];
type ConversationType = ResultOf<typeof GET_MESSAGES>["conversations"];

interface ChatContextProps {
  messages: MessageType[] | undefined;
  isLoading: boolean;
  conversations: ConversationType | undefined;
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
  const { conversationId } = useParams();
  const [initialTimestamp, setInitialTimestamp] = useState("");

  // Fetching old messages
  const { data, isLoading } = useQuery({
    queryKey: [QK.MESSAGES, { conversationId }],
    queryFn: async () => useFetchGql(GET_MESSAGES, { conversation_id: +conversationId }),
  });

  // New messages stream
  // useSubscription(MESSAGE_SUBSCRIPTION, {
  //   variables: {
  //     created_at: initialTimestamp,
  //     conversation_id: +conversationId,
  //   },
  //   onData: response => {
  //     if (!isLoading && response.data?.data?.messages_stream) {
  //       // addNewMessages(response.data.data.messages_stream);
  //     }
  //   },
  // });

  return (
    <ChatContext.Provider value={{ messages: data?.messages, isLoading, conversations: data?.conversations }}>
      {children}
    </ChatContext.Provider>
  );
};
