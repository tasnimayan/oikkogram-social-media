"use client";
import { Calendar, Home, MessageSquare, Users, Heart, Settings, HelpCircle, MapPin, Badge, Trash } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";
import UserCard from "@/components/UserCard";
import { useIsMobile } from "@/lib/hooks/use-mobile";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const { user } = useSessionContext();
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
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Feed
              </Button>
            </Link>
            <Link href="/network">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Network
              </Button>
            </Link>

            <Link href="/chats">
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Events
              </Button>
            </Link>
            <Link href="/connections">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Connections
              </Button>
            </Link>
            <Link href="/causes">
              <Button variant="ghost" className="w-full justify-start">
                <Heart className="mr-2 h-4 w-4" />
                Causes
              </Button>
            </Link>
            <Link href="/neighborhoods">
              <Button variant="ghost" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                Neighborhoods
              </Button>
            </Link>

            <Link href="/bookmarks">
              <Button variant="ghost" className="w-full justify-start">
                <Badge className="mr-2 h-4 w-4" />
                Bookmarks
              </Button>
            </Link>
            <Link href="/trash">
              <Button variant="ghost" className="w-full justify-start">
                <Trash className="mr-2 h-4 w-4" />
                Trash Bin
              </Button>
            </Link>
          </div>
        </div>

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
            >
              + Support a cause
            </Button>
          </div>
        </div>
      </div>
      <div className="px-3 py-2 mt-auto">
        <div className="space-y-1">
          <Link href="/settings">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Link href="/help">
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
