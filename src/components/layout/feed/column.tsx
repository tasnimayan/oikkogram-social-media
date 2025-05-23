import type { ReactNode } from "react";

export default function Column({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 p-4 scroll-container">{children}</div>
    </div>
  );
}
