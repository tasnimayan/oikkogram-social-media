import LogoLink from "@/components/utility/logo-link";
import { SessionProvider } from "../../context/SessionContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="bg-gray-100">
        <nav className="my-4 mx-12 px-8 py-2 flex justify-between items-center">
          <LogoLink />
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="flex items-center gap-1 px-5 py-2 rounded-lg font-medium text-gray-700 bg-indigo-50 hover:bg-indigo-500 hover:text-white transition-colors shadow-sm border border-transparent hover:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Login
            </a>
            <a
              href="/signup"
              className="flex items-center gap-1 px-5 py-2 rounded-lg font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition-colors shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-300"
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
