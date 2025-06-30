"use client";

import { SessionProvider } from "next-auth/react";
import AuthWrapper from "./auth-wrapper";
import Navbar from "@/components/layout/feed/navbar";
import { useViewportHeight } from "@/lib/hooks/useViewportHeight";

export default function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  useViewportHeight();

  return (
    <div className="flex flex-col h-[calc(var(--vh)_*100)] w-full overflow-hidden">
      <SessionProvider>
        <AuthWrapper>
          <Navbar />
          <main className="bg-[#EFF6FF]">{children}</main>
        </AuthWrapper>
      </SessionProvider>
    </div>
  );
}
