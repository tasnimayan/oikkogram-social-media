"use client";

import { ApolloProvider } from "@apollo/client";
import { ReactNode, useMemo } from "react";
import createApolloClient from "@/lib/apolloClient";
import { ChatProvider } from "@/components/features/chat/ChatContext";

const ChatLayoutProviders = ({ children }: Readonly<{ children: ReactNode }>) => {
  const client = useMemo(() => {
    return createApolloClient();
  }, []);

  return (
    <ApolloProvider client={client}>
      <ChatProvider>{children}</ChatProvider>
    </ApolloProvider>
  );
};

export default ChatLayoutProviders;
