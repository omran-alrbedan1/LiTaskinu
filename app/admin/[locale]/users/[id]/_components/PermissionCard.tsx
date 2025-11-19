import { Card, CardContent } from "@/components/ui/card";

interface PermissionCardProps {
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
}

const PermissionCard = ({ icon, title, isActive }: PermissionCardProps) => (
  <Card
    className={`text-center p-4 ${
      isActive ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
    }`}
  >
    <CardContent className="p-0">
      <div className="w-8 h-8 mx-auto mb-2">{icon}</div>
      <div className="font-semibold text-sm mb-1">{title}</div>
      <div
        className={`text-xs ${isActive ? "text-green-600" : "text-red-600"}`}
      >
        {isActive ? "Active" : "Inactive"}
      </div>
    </CardContent>
  </Card>
);

export default PermissionCard;
