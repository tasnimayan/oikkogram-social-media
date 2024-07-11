'use client'
import NavBar from "@/components/NavBar";
import LeftAside from "@/components/LeftAside";
import RightAside from "@/components/RightAside";
import { SessionProvider } from "next-auth/react";
import AuthWrapper from "@/components/AuthWrapper";

export default function RootLayout({children }: Readonly<{children: React.ReactNode;}>) {

  return (
    <>
      <SessionProvider>
        <AuthWrapper >
          <div className="relative">
            <NavBar />
            <main className="mt-[70px]">
              <div className="grid grid-cols-12 gap-x-4 mb-8 px-12 pt-4">
                {/* Left Column starts from here */}
                <LeftAside />
                <div className="col-span-6 bg-gray-50 p-4 rounded">
                  {children}
                </div>
                <RightAside />
                
              </div>
            </main>
          </div>
        </AuthWrapper>
      </SessionProvider>
    </>
  );
}
