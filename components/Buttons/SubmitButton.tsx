import React from "react";
import { Button } from "@/components/ui/button";
import { Loader, LucideIcon } from "lucide-react";

interface ButtonProps {
  isLoading?: boolean;
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
  icon?: any;
  iconPosition?: "left" | "right";
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
  icon: Icon, // Destructure with alias
  iconPosition = "left", // Default icon position
}: ButtonProps) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center gap-2">
          <Loader className="animate-spin h-4 w-4" />
          {loadingText}
        </div>
      );
    }

    if (Icon) {
      return (
        <div
          className={`flex items-center justify-center gap-2 ${
            iconPosition === "right" ? "flex-row-reverse" : ""
          }`}
        >
          <Icon className="h-4 w-4" />
          {children}
        </div>
      );
    }

    return children;
  };

  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      disabled={isLoading}
      className={className ?? "w-full"}
      onClick={onClick}
    >
      {renderContent()}
    </Button>
  );
};

export default SubmitButton;
