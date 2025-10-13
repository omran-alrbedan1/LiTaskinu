import { Clock, Eye, CheckCircle, XCircle, LucideIcon } from "lucide-react";

export const getStatusVariant = (
  status: VerificationStatus
): "default" | "destructive" | "secondary" | "outline" => {
  switch (status) {
    case "approved":
      return "default";
    case "rejected":
      return "destructive";
    case "pending":
      return "secondary";
    case "under_review":
      return "outline";
    default:
      return "default";
  }
};

export const getStatusIcon = (status: VerificationStatus): LucideIcon => {
  switch (status) {
    case "pending":
      return Clock;
    case "under_review":
      return Eye;
    case "approved":
      return CheckCircle;
    case "rejected":
      return XCircle;
    default:
      return Clock;
  }
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
