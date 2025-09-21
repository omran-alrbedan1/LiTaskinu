import React from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

  interface ButtonProps {
    isLoading: boolean;
    loadingText?: string;
    className?: string;
    children: React.ReactNode;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
    size?: "default" | "sm" | "lg" | "icon";
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
  }

const SubmitButton = ({
  isLoading,
  loadingText = "Loading...",
  className,
  children,
  variant = "default",
  size = "default",
  type = "submit",
  onClick,
}: ButtonProps) => {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      disabled={isLoading}
      className={className ?? "w-full"}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader className="animate-spin h-4 w-4" />
          {loadingText}
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
