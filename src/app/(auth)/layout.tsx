import LogoLink from "@/components/utility/logo-link";
import { SessionProvider } from "../../context/SessionContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div>
        <nav className="px-12 flex justify-between py-2 shadow-md">
          <LogoLink />
          <div className="flex items-center ">
            <a
              href="/login"
              className="flex items-center px-4 h-full rounded-md  hover:bg-indigo-100 hover:text-blue-700"
            >
              Login
            </a>
            <a
              href="/signup"
              className="flex items-center px-4 h-full rounded-md hover:bg-indigo-100 hover:text-blue-700"
            >
              Signup
            </a>
          </div>
        </nav>
        <main>{children}</main>
      </div>
    </SessionProvider>
  );
}
