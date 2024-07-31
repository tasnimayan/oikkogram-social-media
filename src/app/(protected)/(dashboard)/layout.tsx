
import dynamic from "next/dynamic";
const RightAside = dynamic(() => import("@/components/layout/RightAside"));
const LeftAside = dynamic(() => import("@/components/layout/LeftAside"));

export default function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="mt-[70px] h-[calc(100dvh-70px)]">
      <div className="grid grid-cols-12 gap-x-4 px-12 pt-4 h-[calc(100dvh-70px)]">
        {/* Left Column starts from here */}
        <LeftAside />

        <div className="col-span-6 bg-gray-50 p-4 rounded h-[calc(100dvh-70px)] overflow-y-auto">{children}</div>
        
        <RightAside />
      </div>
    </main>
  );
}
