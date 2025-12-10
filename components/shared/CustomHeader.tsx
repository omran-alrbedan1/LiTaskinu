import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";

interface ActionType {
  label: string;
  href: string;

  icon?: React.ComponentType<any>;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  show?: boolean;
  disabled?: boolean;
}

interface CustomHeaderProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  backLink?: string;
  action?: ActionType | ActionType[];
  showBackButton?: boolean;
  condition?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  description,
  children,
  backLink,
  action,
  showBackButton = true,
  condition = true,
}) => {
  // Normalize actions to always be an array
  const actions = Array.isArray(action) ? action : action ? [action] : [];

  // Filter actions based on conditions
  const visibleActions = actions.filter(
    (actionItem) => condition && actionItem.show !== false
  );

  return (
    <div className="flex mb-8 px-4 flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
      {/* Left side - Title and back button */}
      <div className="flex items-start gap-4 flex-1">
        {showBackButton && backLink && (
          <Link
            href={backLink}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mt-1 flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-primary-color1" />
          </Link>
        )}

        <div className="flex-1">
          {title && (
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Right side - Action buttons */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {children}

        {visibleActions.map((actionItem, index) => {
          const ActionIcon = actionItem.icon || Edit;
          return (
            <Link key={index} href={actionItem.href}>
              <Button
                variant={actionItem.variant || "default"}
                className="flex items-center gap-2"
                disabled={actionItem.disabled}
              >
                <ActionIcon className="h-4 w-4" />
                {actionItem.label}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CustomHeader;
