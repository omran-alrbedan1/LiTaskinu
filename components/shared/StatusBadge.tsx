// components/shared/StatusBadge.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Shield,
  UserCheck,
  UserX,
  Eye,
  EyeOff,
  Ban,
  Lock,
  Star,
  Crown,
  Zap,
} from "lucide-react";

export type StatusVariant = 
  | "active" | "inactive" | "pending" | "suspended" 
  | "banned" | "verified" | "unverified" | "expired"
  | "completed" | "failed" | "refunded" | "cancelled"
  | "under_review" | "resolved" | "rejected" | "accepted"
  | "premium" | "standard" | "basic" | "pro"
  | "high" | "medium" | "low" | "critical";

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  rounded?: "full" | "md" | "lg";
  className?: string;
  iconClassName?: string;
}

const StatusBadge = ({
  status,
  variant,
  showIcon = true,
  size = "md",
  rounded = "full",
  className = "",
  iconClassName = "",
}: StatusBadgeProps) => {
  // Determine variant from status if not explicitly provided
  const statusVariant = variant || status.toLowerCase() as StatusVariant;

  const config = {
    // Active states
    active: {
      bg: "bg-green-50 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
      icon: CheckCircle,
      iconColor: "text-green-600 dark:text-green-400",
    },
    verified: {
      bg: "bg-emerald-50 dark:bg-emerald-900/30",
      text: "text-emerald-700 dark:text-emerald-400",
      border: "border-emerald-200 dark:border-emerald-800",
      icon: Shield,
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    completed: {
      bg: "bg-green-50 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
      icon: CheckCircle,
      iconColor: "text-green-600 dark:text-green-400",
    },
    
    // Inactive/Pending states
    inactive: {
      bg: "bg-gray-50 dark:bg-gray-900/30",
      text: "text-gray-700 dark:text-gray-400",
      border: "border-gray-200 dark:border-gray-800",
      icon: EyeOff,
      iconColor: "text-gray-600 dark:text-gray-400",
    },
    pending: {
      bg: "bg-yellow-50 dark:bg-yellow-900/30",
      text: "text-yellow-700 dark:text-yellow-400",
      border: "border-yellow-200 dark:border-yellow-800",
      icon: Clock,
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
    under_review: {
      bg: "bg-blue-50 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      icon: Eye,
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    
    // Negative states
    banned: {
      bg: "bg-red-50 dark:bg-red-900/30",
      text: "text-red-700 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
      icon: Ban,
      iconColor: "text-red-600 dark:text-red-400",
    },
    suspended: {
      bg: "bg-red-50 dark:bg-red-900/30",
      text: "text-red-700 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
      icon: Lock,
      iconColor: "text-red-600 dark:text-red-400",
    },
    rejected: {
      bg: "bg-red-50 dark:bg-red-900/30",
      text: "text-red-700 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
      icon: XCircle,
      iconColor: "text-red-600 dark:text-red-400",
    },
    failed: {
      bg: "bg-red-50 dark:bg-red-900/30",
      text: "text-red-700 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
      icon: XCircle,
      iconColor: "text-red-600 dark:text-red-400",
    },
    expired: {
      bg: "bg-gray-50 dark:bg-gray-900/30",
      text: "text-gray-700 dark:text-gray-400",
      border: "border-gray-200 dark:border-gray-800",
      icon: Clock,
      iconColor: "text-gray-600 dark:text-gray-400",
    },
    
    // Resolved/Accepted states
    resolved: {
      bg: "bg-green-50 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
      icon: CheckCircle,
      iconColor: "text-green-600 dark:text-green-400",
    },
    accepted: {
      bg: "bg-green-50 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
      icon: UserCheck,
      iconColor: "text-green-600 dark:text-green-400",
    },
    
    // Severity levels
    critical: {
      bg: "bg-red-50 dark:bg-red-900/30",
      text: "text-red-700 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
      icon: AlertCircle,
      iconColor: "text-red-600 dark:text-red-400",
    },
    high: {
      bg: "bg-orange-50 dark:bg-orange-900/30",
      text: "text-orange-700 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-800",
      icon: AlertCircle,
      iconColor: "text-orange-600 dark:text-orange-400",
    },
    medium: {
      bg: "bg-yellow-50 dark:bg-yellow-900/30",
      text: "text-yellow-700 dark:text-yellow-400",
      border: "border-yellow-200 dark:border-yellow-800",
      icon: Clock,
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
    low: {
      bg: "bg-blue-50 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      icon: Clock,
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    
    // Plan/Subscription types
    premium: {
      bg: "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20",
      text: "text-amber-700 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      icon: Crown,
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    pro: {
      bg: "bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
      text: "text-purple-700 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      icon: Zap,
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    standard: {
      bg: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      text: "text-blue-700 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      icon: Star,
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    basic: {
      bg: "bg-gray-50 dark:bg-gray-900/30",
      text: "text-gray-700 dark:text-gray-400",
      border: "border-gray-200 dark:border-gray-800",
      icon: Shield,
      iconColor: "text-gray-600 dark:text-gray-400",
    },
    
    // Default fallback
    default: {
      bg: "bg-gray-50 dark:bg-gray-900/30",
      text: "text-gray-700 dark:text-gray-400",
      border: "border-gray-200 dark:border-gray-800",
      icon: Clock,
      iconColor: "text-gray-600 dark:text-gray-400",
    },
  };

  //@ts-ignore
  const statusConfig = config[statusVariant] || config.default;
  const IconComponent = statusConfig.icon;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
    lg: "px-4 py-1.5 text-base gap-2",
  };

  const roundedClasses = {
    full: "rounded-full",
    md: "rounded-md",
    lg: "rounded-lg",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center font-medium border",
        statusConfig.bg,
        statusConfig.text,
        statusConfig.border,
        sizeClasses[size],
        roundedClasses[rounded],
        className
      )}
    >
      {showIcon && IconComponent && (
        <IconComponent className={cn("w-3 h-3 flex-shrink-0", statusConfig.iconColor, iconClassName)} />
      )}
      <span className="capitalize">{status}</span>
    </div>
  );
};

// Also export a simple Badge component for comparison
export const SimpleBadge = ({ children, variant = "default", ...props }: any) => (
  <StatusBadge status={children} variant={variant} {...props} />
);

export default StatusBadge;