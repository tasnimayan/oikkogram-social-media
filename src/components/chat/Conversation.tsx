"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import fetchGraphql from "@/lib/fetchGraphql";
import { getMessages, messageSubscription } from "@/lib/queries";
import { useEffect, useRef, useState } from "react";
import { useSubscription } from "@apollo/client";

const Conversation = () => {
  const params = useParams();
  const conversationId = params.convId;
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [initialTimestamp, setInitialTimestamp] = useState("");
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      setInitialTimestamp(
        oldMessage[oldMessage.length - 1]?.created_at ||
          new Date().toISOString()
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
    <div className="flex flex-col h-full mb-4 overflow-auto">
      <MessageList userId={userId} messages={messages} isNew={false} />
      <div ref={messageEndRef} />

      {/* <MessageList userId={userId} messages={newMessages} isNew={true} /> */}
    </div>
  );
};

export default Conversation;

// import { useSession } from "next-auth/react";
// import { useParams } from "next/navigation";
// import { ChatProvider } from "./chat/ChatProvider";
// import useMessageSubscription from "./chat/useMessageSubscription";
// import useFetchMessages from "./chat/useFetchMessages";
// import MessageList from "./chat/MessageList";
import { Message } from "@/utils/Interface";
import { MessageType } from "@/lib/Interface";
import MessageList from "./MessageList";

// const Conversation = () => {
//   const params = useParams();
//   const convId = params.convId;
//   const { data: session } = useSession();
//   const userId = session?.user.id;

//   const createdAt = new Date().toISOString();

//   useFetchMessages(convId);
//   // useMessageSubscription(convId, createdAt);

//   return (
//     <ChatProvider>
//     <MessageList userId={userId} conversationId={convId} />
//     </ChatProvider>
//   );
// };

// export default Conversation;
