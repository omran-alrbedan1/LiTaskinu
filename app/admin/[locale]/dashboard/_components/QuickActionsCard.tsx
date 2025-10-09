import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";
import Image from "next/image";

interface QuickAction {
  label: string;
  href: string;
  icon: string;
  bgColor: string;
  count?: number;
}

interface QuickActionsCardProps {
  quickActions: QuickAction[];
}

const QuickActionsCard: React.FC<QuickActionsCardProps> = ({
  quickActions,
}) => (
  <Card className="lg:col-span-2  transition-all duration-500 border-0 group dark:bg-gray-800">
    {/* Decorative background element */}

    <CardHeader className="pb-6 relative">
      <CardTitle className="flex items-center gap-3 text-xl">
        <div className="p-2.5 bg-gradient-to-br from-primary-color1/20 to-primary-color1/10 dark:from-primary-color1/30 dark:to-primary-color1/15 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
          <Activity className="h-6 w-6 text-primary-color1" />
        </div>
        <span className=" font-semibold">Quick Actions</span>
      </CardTitle>
    </CardHeader>

    <CardContent className="relative">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <Button
            key={action.label}
            variant="outline"
            className="h-44 flex flex-col items-center justify-center p-5 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-gray-200/60 dark:border-gray-700/60 hover:border-primary-color1/40 dark:hover:border-primary-color1/60 rounded-2xl bg-white/50 dark:bg-gray-700/30 shadow-xs hover:shadow-xl group/button relative overflow-hidden backdrop-blur-sm"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
            asChild
          >
            <a href={action.href}>
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-color1/0 via-primary-color1/0 to-primary-color1/0 group-hover/button:from-primary-color1/5 group-hover/button:via-primary-color1/3 group-hover/button:to-primary-color1/8 dark:group-hover/button:from-primary-color1/10 dark:group-hover/button:via-primary-color1/5 dark:group-hover/button:to-primary-color1/15 transition-all duration-500" />

              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`p-4 rounded-2xl mb-3 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm group-hover/button:scale-110 transition-all duration-300 border border-gray-100/50 dark:border-gray-700/50`}
                >
                  <Image
                    src={action.icon}
                    height={58}
                    width={58}
                    alt={action.label}
                    className="group-hover/button:rotate-6 transition-transform duration-300 "
                  />
                </div>

                <span className="text-sm font-semibold mb-1.5 text-gray-800 dark:text-gray-200 group-hover/button:text-primary-color1 transition-colors duration-300 text-center">
                  {action.label}
                </span>

                {action.count && (
                  <Badge
                    variant="secondary"
                    className="mt-1 bg-gradient-to-r bg-primary-color1 text-white px-3 py-1 text-xs font-semibold shadow-md  group-hover/button:scale-110 transition-all duration-300 border-0"
                  >
                    {action.count}
                  </Badge>
                )}
              </div>
            </a>
          </Button>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default QuickActionsCard;
