"use client";

import type React from "react";

import { Ban, FolderX, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type sizeType = "default" | "sm" | "md" | "lg";

interface DataResultProps {
  icon?: React.ReactNode;
  message?: string;
  action?: React.ReactNode;
  size?: sizeType;
}

const sizeConfig = {
  default: { iconSize: "w-12 h-12" },
  sm: { iconSize: "w-8 h-8" },
  md: { iconSize: "w-12 h-12" },
  lg: { iconSize: "w-16 h-16" },
};

const variantConfig = {
  default: {
    icon: ShieldAlert,
    message: "No Data Found",
  },
};

export const DataState = ({ icon, message, action, size = "md" }: DataResultProps) => {
  const config = variantConfig.default;

  return (
    <div className="relative grid place-items-center">
      <div className="flex flex-col items-center justify-center p-4 text-center text-muted-foreground/50">
        <div className="mb-2">{icon || <config.icon className={sizeConfig[size].iconSize} />}</div>
        <h3 className="mb-2">{message || config.message}</h3>
        {action && action}
      </div>
    </div>
  );
};

export const EmptyResult = ({ message = "No results found", size = "md" }: { message?: string; size?: sizeType }) => {
  return <DataState message={message} icon={<FolderX className={sizeConfig[size].iconSize} />} />;
};
export const ErrorResult = ({
  message = "Something went wrong",
  size = "md",
}: {
  message?: string;
  size?: sizeType;
}) => {
  return <DataState message={message} icon={<Ban className={cn("text-destructive", sizeConfig[size].iconSize)} />} />;
};
