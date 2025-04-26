import ChatSidebar from "@/components/features/chat/chat-sidebar";
import ChatLayoutProviders from "./chat-layout-providers";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChatLayoutProviders>
      <div className="ps-8 bg-white flex-1 grid grid-cols-1 md:grid-cols-4 gap-0 h-[calc(100vh-4rem)] overflow-hidden">
        <div className="hidden md:flex md:col-span-1 h-full overflow-hidden border-r">
          <div className="flex-1 scroll-container bg-white">
            <ChatSidebar />
          </div>
        </div>
        <div className="md:col-span-3 h-full overflow-hidden">{children}</div>
      </div>
    </ChatLayoutProviders>
  );
}
