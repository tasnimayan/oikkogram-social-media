"use client";
// import NavBar from "@/components/layout/NavBar";

import { SessionProvider } from "next-auth/react";
import AuthWrapper from "./AuthWrapper";
import Navbar from "@/components/layout/feed/navbar";

export default function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <SessionProvider>
        <AuthWrapper>
          {/* <NavBar /> */}
          <Navbar />
          <main className="bg-[#EFF6FF]">{children}</main>
        </AuthWrapper>
      </SessionProvider>
    </div>
  );
}
