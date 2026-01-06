import React from "react";
import { Users, FileText, ShieldAlert, Heart } from "lucide-react";
import Image from "next/image";

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "user":
        return Users;
      case "verification":
        return FileText;
      case "complaint":
        return ShieldAlert;
      case "marriage":
        return Heart;
      default:
        return Users;
    }
  };

  const getBgColor = (type: Activity["type"]) => {
    switch (type) {
      case "user":
        return "bg-blue-100";
      case "verification":
        return "bg-orange-100";
      case "complaint":
        return "bg-red-100";
      case "marriage":
        return "bg-pink-100";
      default:
        return "bg-blue-100";
    }
  };

  const Icon = getIcon(activity.type);
  const bgColor = getBgColor(activity.type);

  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div className="flex items-center space-x-4">
        <Image
          src={activity.avatar}
          alt={activity.user}
          width={48}
          height={48}
          className="object-cover rounded-full "
        />
        <div>
          <p className="text-sm font-medium">{activity.user}</p>
          <p className="text-sm text-muted-foreground">{activity.action}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs text-muted-foreground">{activity.time}</span>
      </div>
    </div>
  );
};

export default ActivityItem;
