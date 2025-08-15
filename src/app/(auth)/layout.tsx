import { Button } from "@/components/ui/button";
import LogoLink from "@/components/utility/logo-link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 h-dvh">
      <nav className="mx-4lg:mx-12 px-8 py-2 h-16 flex justify-between items-center">
        <LogoLink />
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <a href="/login">Login</a>
          </Button>
          <Button variant="default">
            <a href="/signup">Signup</a>
          </Button>
        </div>
      </nav>
      <main className="h-[calc(var(--vh)_*100_-_4rem)] overflow-y-auto">{children}</main>
    </div>
  );
}
