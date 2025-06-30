"use client";

import ChatSidebar from "@/components/features/chat/chat-sidebar";
import Column from "@/components/layout/feed/column";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isRootChats = pathname === "/chats" || pathname.endsWith("/chats");

  return (
    <div className="bg-white flex-1 grid grid-cols-1 md:grid-cols-4 gap-0 h-[calc(var(--vh)_*100_-_4rem)] overflow-hidden">
      {/* Sidebar: visible on mobile only on /chats, always on desktop */}
      <Column className={cn("border-r bg-white md:flex md:col-span-1", isRootChats ? "" : "hidden")}>
        <ChatSidebar />
      </Column>
      {/* Chat Content: visible on mobile only on /chats/[id], always on desktop */}
      <div className={cn("h-full overflow-hidden", isRootChats ? "hidden" : "", "md:col-span-3 md:block")}>
        {children}
      </div>
    </div>
  );
}
