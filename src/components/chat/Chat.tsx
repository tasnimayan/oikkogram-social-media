"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

import MessageList from "./MessageList";
import { useChatContext } from "./ChatContext";

const Chat = () => {
  const { messages } = useChatContext();

  const { data: session } = useSession();
  const userId = session?.user.id;

  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full mb-4 overflow-auto">
      <MessageList userId={userId} messages={messages} isNew={false} />
      <div ref={messageEndRef} />
    </div>
  );
};

export default Chat;
