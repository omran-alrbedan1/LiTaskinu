import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-800",
    Accepted: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    "Under Review": "bg-yellow-100 text-yellow-800",
    Resolved: "bg-green-100 text-green-800",
    Verified: "bg-green-100 text-green-800",
    Required: "bg-gray-100 text-gray-800",
  };

  return (
    <Badge className={statusConfig[status] || "bg-gray-100 text-gray-800"}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
