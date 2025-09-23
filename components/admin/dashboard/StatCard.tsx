import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value }) => (
  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary-color1">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <div className="p-3 rounded-xl bg-gradient-to-br bg-primary-color1 text-white group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-4 w-4" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold mb-2">{value}</div>
    </CardContent>
  </Card>
);

export default StatCard;
