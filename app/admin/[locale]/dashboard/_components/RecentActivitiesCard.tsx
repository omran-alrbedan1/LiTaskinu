import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import ActivityItem from "./ActivityItem";

interface RecentActivitiesCardProps {
  activities: Activity[];
}

const RecentActivitiesCard: React.FC<RecentActivitiesCardProps> = ({
  activities,
}) => (
  <Card className="shadow-md hover:shadow-lg transition-all duration-300">
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center justify-between">
        <span className="flex items-center gap-3">
          <div className="p-2 bg-primary-color1/10 rounded-lg">
            <Clock className="h-5 w-5 text-primary-color1" />
          </div>
          Recent Activities
        </span>
        <Badge
          variant="outline"
          className="bg-primary-color1/10 text-primary-color1 border-primary-color1/20"
        >
          {activities.length}
        </Badge>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </CardContent>
  </Card>
);

export default RecentActivitiesCard;
