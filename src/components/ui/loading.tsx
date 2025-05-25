import { Loader } from "lucide-react";
import React from "react";

const Loading = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center w-full h-full ${className}`}>
      <Loader className="animate-spin" />
    </div>
  );
};

export { Loading };
