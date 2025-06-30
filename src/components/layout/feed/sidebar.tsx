"use client";
import { Calendar, Home, MessageSquare, Users, Heart, MapPin, Badge, Trash, LucideProps } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import UserCard from "@/components/shared/user-card";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <aside className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        {user && (
          <div className="mb-4">
            <UserCard user={user} />
          </div>
        )}

        <NavigationList />

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">My Causes</h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <span className="h-4 w-4 mr-2 rounded-sm bg-yellow-500" />
              Park Cleanup
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <span className="h-4 w-4 mr-2 rounded-sm bg-red-500" />
              Food Drive
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              asChild
            >
              <Link href="/causes">+ Support a cause</Link>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}

const NAVIGATION_ITEMS = [
  { path: "/", label: "Home", icon: Home },
  { path: "/network", label: "Network", icon: Users },
  { path: "/chats", label: "Messages", icon: MessageSquare },
  { path: "/events", label: "Events", icon: Calendar },
  { path: "/connections", label: "Connections", icon: Users },
  { path: "/causes", label: "Causes", icon: Heart },
  { path: "/neighborhoods", label: "Neighborhoods", icon: MapPin },
  { path: "/bookmarks", label: "Bookmarks", icon: Badge },
  { path: "/trash", label: "Trash Bin", icon: Trash },
];

interface NavItemProps {
  path: string;
  label: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  isActive?: boolean;
}

const NavItem = ({ path, label, icon: Icon, isActive }: NavItemProps) => {
  return (
    <Link
      href={path}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600 rounded-md",
        isActive ? "bg-secondary text-blue-600" : ""
      )}
    >
      <Icon className="size-5 shrink-0" />
      {label}
    </Link>
  );
};

export const NavigationList = () => {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return path === "/" ? pathname === "/" : pathname.startsWith(path) && path !== "/";
  };

  return (
    <div className="px-3 py-2 flex flex-col gap-2">
      {NAVIGATION_ITEMS.map(item => (
        <NavItem key={item.path} {...item} isActive={isActive(item.path)} />
      ))}
    </div>
  );
};
