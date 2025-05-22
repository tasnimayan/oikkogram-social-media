"use client"

import dynamic from "next/dynamic";
const RightAside = dynamic(() => import("@/components/layout/RightAside"));
const LeftAside = dynamic(() => import("@/components/layout/LeftAside"));

export default function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <main className="h-[calc(100dvh-70px)]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-4 px-4 md:ps-8 pt-4 h-[calc(100dvh-70px)]">

        <div className="hidden md:block md:col-span-4 lg:col-span-3">
          <LeftAside />
        </div>

        <div className="col-span-1 md:col-span-8 lg:col-span-6 bg-gray-50 p-4 rounded h-[calc(100dvh-70px)] overflow-y-auto">
          {children}
        </div>
        
        <div className="hidden lg:block lg:col-span-3">
          <RightAside />
        </div>
      </div>
    </main>
  );
}
