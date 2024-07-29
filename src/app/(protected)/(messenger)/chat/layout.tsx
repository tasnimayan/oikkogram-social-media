
import dynamic from "next/dynamic";

import Conversation from "@/components/chat/Conversation";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="mt-[70px] h-[calc(100vh-70px)] overflow-hidden">
        <div className="flex flex-row border-2 border-red-500 h-full w-full overflow-hidden bg-gray-50">
          <Conversation />
          {children}
        </div>
    </main>
  );
}
