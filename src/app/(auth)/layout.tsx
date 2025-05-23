
import LogoLink from "@/components/layout/LogoLink";
import { SessionProvider } from "../../context/SessionContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="bg-gradient-to-tr from-green-100 to-indigo-200">
        <nav className="flex justify-between py-2 shadow-md">
          <LogoLink/>
          <div className="flex items-center ">
            <a href="/login" className="flex items-center px-4 h-full rounded-md  hover:bg-indigo-100 hover:text-blue-700">Login</a>
            <a href="/signup" className="flex items-center px-4 h-full rounded-md hover:bg-indigo-100 hover:text-blue-700">Signup</a>
          </div>
        </nav>
        <main className="flex justify-center pt-28 min-h-[calc(100dvh-50px)]">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
