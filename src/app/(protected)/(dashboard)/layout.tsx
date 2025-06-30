import dynamic from "next/dynamic";
const RightAside = dynamic(() => import("@/components/layout/feed/right-sidebar"));

import Column from "@/components/layout/feed/column";
import Sidebar from "@/components/layout/feed/sidebar";

export default function ThreeColumnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container mx-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 h-[calc(var(--vh)_*100_-_4rem)] overflow-hidden ">
      <Column className="md:col-span-3 border-r hidden md:block">
        <Sidebar />
      </Column>

      <Column className="md:col-span-9 lg:col-span-6 py-4">{children}</Column>

      <Column className="lg:col-span-3 border-l hidden lg:block">
        <RightAside />
      </Column>
    </div>
  );
}
