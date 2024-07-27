
import dynamic from "next/dynamic";
const RightAside = dynamic(() => import("@/components/layout/RightAside"));
const LeftAside = dynamic(() => import("@/components/layout/LeftAside"));

export default function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="mt-[70px]">
      <div className="grid grid-cols-12 gap-x-4 mb-8 px-12 pt-4">
        {/* Left Column starts from here */}
        <LeftAside />
        <div className="col-span-6 bg-gray-50 p-4 rounded">{children}</div>
        <RightAside />
      </div>
    </main>
  );
}
