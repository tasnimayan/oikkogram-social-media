"use client";

import ChatHeader from "@/components/features/chat/chat-header";
import MessageList from "@/components/features/chat/message-list";
import MessageSendForm from "@/components/features/chat/message-send-form";

const ConversationById = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <ChatHeader />

      <div className="flex-1 overflow-hidden sm:p-4 bg-gray-50">
        <MessageList />
      </div>

      <div className="mb-2 border-t border-gray-100 dark:border-gray-700">
        <MessageSendForm />
      </div>
    </div>
  );
};

export default ConversationById;
