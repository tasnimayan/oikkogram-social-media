import dynamic from "next/dynamic";
const RightAside = dynamic(() => import("@/components/layout/feed/right-sidebar"));

import Column from "@/components/layout/feed/column";
import Sidebar from "@/components/layout/feed/sidebar";

export default function ThreeColumnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container mx-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 h-[calc(100vh-4rem)] overflow-hidden ">
      <div className="md:col-span-3 h-full overflow-hidden border-r hidden md:block">
        <Column>
          <Sidebar />
        </Column>
      </div>
      <div className="md:col-span-9 lg:col-span-6 h-full overflow-hidden py-4">
        <Column>{children}</Column>
      </div>
      <div className="lg:col-span-3 h-full overflow-hidden border-l hidden lg:block">
        <Column>
          <RightAside />
        </Column>
      </div>
    </div>
  );
}
