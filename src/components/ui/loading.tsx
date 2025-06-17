import { Loader } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

const Loading = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center w-full h-full", className)}>
      <Loader className="animate-spin" />
    </div>
  );
};

export { Loading };
