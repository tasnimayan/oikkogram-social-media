"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, Flag, Home, LucideProps, Menu, MessageSquare, Search, User, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar } from "@/components/ui/avatar";
import LogoLink from "../../utility/logo-link";
import SignOutBtn from "@/components/utility/signout-button";
import { useSession } from "next-auth/react";
import { NavigationList } from "./sidebar";

const NAVIGATION_ITEMS = [
  { path: "/", label: "Home", icon: Home },
  { path: "/causes", label: "Causes", icon: Flag },
  { path: "/network", label: "Network", icon: Users },
];

const isNavActive = (path: string, pathname: string) => {
  if (path === "/") return pathname === "/";
  return pathname.startsWith(path);
};

export default function Navbar() {
  const [searchFocused, setSearchFocused] = React.useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center px-4 sm:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <LogoLink />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:ml-8 md:flex md:space-x-6">
          {NAVIGATION_ITEMS.map(item => (
            <NavigationLink key={item.path} {...item} isActive={isNavActive(item.path, pathname)} />
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 ">
          {/* Search */}
          <div className="relative ms-2">
            <div
              className={cn(
                "relative flex items-center rounded-full transition-all duration-300",
                searchFocused ? "w-40 md:w-64 bg-background shadow-sm ring-1 ring-input" : "w-9 md:w-40 bg-muted"
              )}
            >
              <Search
                className="absolute left-2.5 h-4 w-4 text-muted-foreground"
                onClick={() => setSearchFocused(true)}
              />
              <Input
                type="search"
                placeholder="Search"
                className={cn(
                  "h-9 w-full border-none bg-transparent pl-8 shadow-none focus-visible:ring-0",
                  searchFocused ? "pr-3" : "pr-0"
                )}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative hover:bg-secondary rounded-full">
            <Link href="/notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive"></span>
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>

          {/* Messages */}
          <Button variant="ghost" size="icon" className="relative hover:bg-secondary rounded-full">
            <Link href="/chats">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive"></span>
              <span className="sr-only">Messages</span>
            </Link>
          </Button>

          {/* Profile Menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full p-0" aria-label="Open user menu">
                <Avatar src={session?.user?.image} name={session?.user?.name} className="size-8 shrink-0" />
              </Button>
            </PopoverTrigger>
            <UserMenuContent />
          </Popover>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

const UserMenuContent = () => {
  const { data: session } = useSession();

  const USER_MENU_ITEMS = [
    { href: `/profile/${session?.user?.id}`, label: "Your Profile", icon: User },
    // { href: "/settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <PopoverContent align="end" className="w-56 p-0">
      <div className="px-4 py-3">
        <h3 className="text-center font-medium">{session?.user?.name}</h3>
      </div>
      <div className="border-t border-border">
        <div className="flex flex-col py-1">
          {USER_MENU_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex cursor-pointer items-center px-4 py-2 text-sm hover:bg-accent">
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>
        <div className="border-t border-border py-1">
          <SignOutBtn />
        </div>
      </div>
    </PopoverContent>
  );
};

const MobileMenu = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px]">
        <div className="flex flex-col gap-6 py-4">
          <div className="flex items-center gap-3 px-2">
            <Avatar src={session?.user?.image} name={session?.user?.name} />
            <div>
              <p className="text-sm font-medium">{session?.user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
            </div>
          </div>

          <NavigationList />
        </div>
      </SheetContent>
    </Sheet>
  );
};

type NavigationItemProps = {
  path: string;
  label: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  isActive?: boolean;
};

const NavigationLink = ({ path, label, icon: Icon, isActive }: NavigationItemProps) => (
  <Link
    href={path}
    className={cn(
      "inline-flex items-center border-b-2 gap-2 px-3 py-2 text-sm font-medium transition-colors",
      isActive ? "border-blue-600 text-blue-600" : "border-transparent text-muted-foreground hover:text-foreground"
    )}
  >
    <Icon className="size-5 shrink-0" />
    {label}
  </Link>
);
