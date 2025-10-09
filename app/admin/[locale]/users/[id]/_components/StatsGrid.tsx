import { Card, CardContent } from "@/components/ui/card";
import {
  FaEye,
  FaHeart,
  FaEnvelope,
  FaComments,
  FaClock,
  FaStar,
} from "react-icons/fa";

interface Stat {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface StatsGridProps {
  stats: Stat[];
}

const colorMap = {
  blue: "text-blue-500",
  red: "text-red-500",
  green: "text-green-500",
  purple: "text-purple-500",
  orange: "text-orange-500",
  yellow: "text-yellow-500",
};

const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        const colorClass = colorMap[stat.color as keyof typeof colorMap];

        return (
          <Card key={index} className="dark:shadow-darkMod-300">
            <CardContent className="p-4 text-center">
              <div className={`flex justify-center mb-2 ${colorClass}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="text-xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsGrid;
