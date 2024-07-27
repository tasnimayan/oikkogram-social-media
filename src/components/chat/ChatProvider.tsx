import { createContext, ReactNode, useContext, useState } from "react";
interface Message {
  id: string;
  message: string;
  sender_id: string;
  created_at: string;
}

interface ChatContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}
const ChatContext = createContext<ChatContextType>({messages:[],setMessages:});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <ChatContext.Provider value={{ messages, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
