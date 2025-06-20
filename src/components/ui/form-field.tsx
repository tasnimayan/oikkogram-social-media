import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  id: string;
  label: string;
  register?: any;
  error?: string;
  placeholder?: string;
  isTextarea?: boolean;
  type?: string;
  icon?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  labelClassName?: string;
  inputClassName?: string;
};

export const FormField = ({
  id,
  label,
  register,
  error,
  placeholder,
  isTextarea = false,
  type = "text",
  icon,
  onChange,
  labelClassName,
  inputClassName,
}: Props) => (
  <div>
    <Label htmlFor={id} className={cn("mb-1", labelClassName)}>
      {label}
    </Label>
    <div className="relative">
      {icon}
      {isTextarea ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          className={cn("min-h-[120px] pl-8", error && "border-red-500")}
          {...register}
        />
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className={cn(inputClassName, error && "border-red-500")}
          {...register}
          onChange={onChange}
        />
      )}
    </div>
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);
