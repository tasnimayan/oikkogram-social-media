import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Column({ children, className }: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <div className={cn("h-full flex flex-col overflow-hidden", className)}>
      <div className="flex-1 scroll-container px-2 md:px-4">{children}</div>
    </div>
  );
}
