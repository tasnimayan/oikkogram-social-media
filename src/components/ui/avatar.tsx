"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string | null;
  name?: string | null;
  showStatus?: boolean;
  status?: "ONLINE" | "OFFLINE";
}

export const statusOptions = {
  ONLINE: { label: "Online", color: "bg-green-500" },
  OFFLINE: { label: "Offline", color: "bg-gray-500" },
} as const;

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, src, name, showStatus, status, ...props }, ref) => (
    <AvatarPrimitive.Root ref={ref} className={cn("relative flex size-10 shrink-0 rounded-full", className)} {...props}>
      {src && <AvatarImage src={src} alt={name || "Avatar"} className="overflow-hidden rounded-full" />}
      <AvatarFallback className="font-semibold rounded-full  overflow-hidden">
        {name ? name.charAt(0).toUpperCase() : <User />}
      </AvatarFallback>
      {showStatus && (
        <span
          className={cn(
            "absolute bottom-0 right-0 size-2.5 rounded-full border border-background",
            statusOptions[status || "OFFLINE"].color
          )}
        />
      )}
    </AvatarPrimitive.Root>
  )
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full object-cover", className)} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
