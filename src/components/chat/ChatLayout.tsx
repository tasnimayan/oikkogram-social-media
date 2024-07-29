
"use client";

import MessageForm from "./MessageForm";
import UserCard from "../UserCard";
import { ApolloProvider } from "@apollo/client";
import {  useMemo } from "react";
import createApolloClient from "@/lib/apolloClient";
import Chat from "./Chat";
import { ChatProvider } from "./ChatContext";
import ChatUser from "./ChatUser";



const ChatLayout = () => {
  const client = useMemo(() => {
    return createApolloClient();
  }, []);


  return (
    <ApolloProvider client={client}>
      <ChatProvider>

        <div className="flex flex-col flex-auto h-[calc(100dvh-120px)] p-6">
          <ChatUser />

          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 px-4 pb-4 relative h-full">
            <Chat />
            <MessageForm />
          </div>
        </div>

      </ChatProvider>
    </ApolloProvider>
  );
};

export default ChatLayout;
