import AuthWrapper from "./auth-wrapper";
import Navbar from "@/components/layout/feed/navbar";

export default function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-dvh w-full overflow-hidden">
      <AuthWrapper>
        <Navbar />
        <main className="bg-[#EFF6FF]">{children}</main>
      </AuthWrapper>
    </div>
  );
}
