"use client";
import NavBar from "@/components/layout/NavBar";
import { SessionProvider } from "next-auth/react";
import AuthWrapper from "./AuthWrapper";

export default function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SessionProvider>
        <AuthWrapper>
          <div className="relative">
            <NavBar />
            {children}
          </div>
        </AuthWrapper>
      </SessionProvider>
    </>
  );
}
