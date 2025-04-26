"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, BookMarked, Compass, Home, LogOut, LucideProps, Menu, MessageSquare, Search, Settings, User, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LogoLink from "../../utility/logo-link";
import SignOutBtn from "@/components/utility/signout-button";

const NAVIGATION_ITEMS = [
  { href: "/", label: "Home", icon: Home, isActive: true },
  { href: "/network", label: "Network", icon: Users },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/bookmarks", label: "Bookmarks", icon: BookMarked },
];

const USER_MENU_ITEMS = [
  { href: "/profile", label: "Your Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export default function Navbar() {
  const [searchFocused, setSearchFocused] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center px-12">
        {/* Logo */}
        <div className="flex items-center">
          <LogoLink />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:ml-8 md:flex md:space-x-6">
          {NAVIGATION_ITEMS.map((item) => (
            <NavigationLink key={item.href} {...item} />
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Search */}
          <div className="relative mx-2">
            <div
              className={cn(
                "relative flex items-center rounded-full transition-all duration-300",
                searchFocused ? "w-48 md:w-64 bg-background shadow-sm ring-1 ring-input" : "w-9 md:w-40 bg-muted"
              )}
            >
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search"
                className={cn("h-9 w-full border-none bg-transparent pl-8 shadow-none focus-visible:ring-0", searchFocused ? "pr-3" : "pr-0")}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Link href="/notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive"></span>
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>

          {/* Messages */}
          <Button variant="ghost" size="icon" className="relative">
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
                <Avatar className="h-8 w-8 bg-gradient-to-r from-purple-400 to-pink-500">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
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

const UserMenuContent = () => (
  <PopoverContent align="end" className="w-56 p-0">
    <div className="px-4 py-3">
      <p className="text-sm font-medium">John Doe</p>
      <p className="text-xs text-muted-foreground truncate">john.doe@example.com</p>
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

const MobileMenu = () => (
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
          <Avatar className="h-10 w-10 bg-gradient-to-r from-purple-400 to-pink-500">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john.doe@example.com</p>
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-md border-l-4 px-4 py-2 text-sm font-medium",
                item.isActive
                  ? "border-primary text-foreground bg-accent"
                  : "border-transparent text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

type NavigationItemProps = {
  href: string;
  label: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  isActive?: boolean;
};

const NavigationLink = ({ href, label, icon: Icon, isActive }: NavigationItemProps) => (
  <Link
    href={href}
    className={cn(
      "inline-flex items-center border-b-2 px-3 pt-1 pb-2 text-sm font-medium",
      isActive ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
    )}
  >
    <Icon className="mr-2 h-5 w-5" />
    {label}
  </Link>
);
