"use client"

import dynamic from "next/dynamic";
import { useState } from "react";

const RightAside = dynamic(() => import("@/components/layout/RightAside"));
const LeftAside = dynamic(() => import("@/components/layout/LeftAside"));

export default function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isLeftAsideOpen, setIsLeftAsideOpen] = useState(false);

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

      {/* Mobile Left Aside Modal */}
      {isLeftAsideOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsLeftAsideOpen(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-4/6 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
            <LeftAside />
          </div>
        </div>
      )}
    </main>
  );
}
