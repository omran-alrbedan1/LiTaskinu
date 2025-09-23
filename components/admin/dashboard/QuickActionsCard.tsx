import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

interface QuickActionsCardProps {
  quickActions: QuickAction[];
}

const QuickActionsCard: React.FC<QuickActionsCardProps> = ({
  quickActions,
}) => (
  <Card className="lg:col-span-2 shadow-md hover:shadow-lg transition-all duration-300">
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center gap-3 text-xl">
        <div className="p-2 bg-primary-color1/10 rounded-lg">
          <Activity className="h-6 w-6 text-primary-color1" />
        </div>
        Quick Actions
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            className="h-36 flex flex-col items-center justify-center p-4 hover:scale-105 transition-transform duration-200 border-2 hover:border-primary-color1/30"
            asChild
          >
            <a href={action.href}>
              <div className={`p-3 rounded-full ${action.bgColor} mb-3`}>
                <action.icon className={`h-6 w-6 ${action.color}`} />
              </div>
              <span className="text-sm font-medium mb-1">{action.label}</span>
              {action.count && (
                <Badge
                  variant="secondary"
                  className="mt-1 bg-primary-color1 text-white px-2 py-1 text-xs"
                >
                  {action.count}
                </Badge>
              )}
            </a>
          </Button>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default QuickActionsCard;
