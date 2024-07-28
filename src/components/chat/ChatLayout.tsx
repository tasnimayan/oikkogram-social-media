"use client";

import MessageForm from "./MessageForm";
import UserCard from "../UserCard";
import { ApolloProvider } from "@apollo/client";
import { useMemo } from "react";
import createApolloClient from "@/lib/apolloClient";
import Conversation from "./Conversation";

const ChatLayout = () => {
  const client = useMemo(() => {
    return createApolloClient();
  }, []);


  return (
    <ApolloProvider client={client}>
      <div className="flex flex-col flex-auto h-[calc(100dvh-120px)] p-6">
        <div className="flex justify-between items-center mb-3">
          <UserCard user={{ id: "", name: "", image: "" }} />
        </div>

        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 px-4 pb-4 relative h-full">
          <Conversation />
          <MessageForm />
        </div>
      </div>
    </ApolloProvider>
  );
};

export default ChatLayout;
