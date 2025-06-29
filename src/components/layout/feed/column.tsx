import type { ReactNode } from "react";

export default function Column({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 scroll-container md:px-4">{children}</div>
    </div>
  );
}
