import { TbLoader2 } from "react-icons/tb";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "success" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  isLoading = false,
  disabled = false,
}: ButtonProps) => {
  const sizeClasses = {
    sm: "py-1 px-3 text-xs",
    md: "py-2 px-4 text-sm",
    lg: "py-3 px-6 text-base",
  };

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-100",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-100",
    success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 disabled:bg-green-100",
    outline: "border-2 border-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:border-blue-100 disabled:text-blue-100",
    ghost: "text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:text-blue-100",
    link: "text-blue-600 hover:underline active:text-blue-800 disabled:text-blue-100",
  };

  const baseClasses = [
    "text-gray-700",
    "font-semibold",
    "rounded-lg",
    "transition-colors",
    "flex",
    "items-center",
    "justify-center",
    "gap-2",
    "w-auto",
    sizeClasses[size],
    variantClasses[variant],
    className,
  ].join(" ");

  return (
    <button className={baseClasses} type={type} onClick={onClick} disabled={disabled || isLoading}>
      {isLoading && <TbLoader2 className="h-6 w-6 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
