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
  <Card className="lg:col-span-2 shadow-xl hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-gray-50/50 overflow-hidden relative group">
    {/* Decorative background element */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-color1/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />

    <CardHeader className="pb-6 relative">
      <CardTitle className="flex items-center gap-3 text-xl">
        <div className="p-2.5 bg-gradient-to-br from-primary-color1/20 to-primary-color1/10 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
          <Activity className="h-6 w-6 text-primary-color1" />
        </div>
        <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-semibold">
          Quick Actions
        </span>
      </CardTitle>
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </CardHeader>

    <CardContent className="relative">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <Button
            key={action.label}
            variant="outline"
            className="h-44 flex flex-col items-center justify-center p-5 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-gray-200/60 hover:border-primary-color1/40 rounded-2xl   shadow-xs hover:shadow-xl group/button relative overflow-hidden"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
            asChild
          >
            <a href={action.href}>
              {/* Hover gradient effect */}

              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`p-4 rounded-2xl mb-3 shadow-md  group-hover/button:scale-110 transition-all duration-300`}
                >
                  <Image
                    src={action.icon}
                    height={58}
                    width={58}
                    alt={action.label}
                    className="group-hover/button:rotate-6 transition-transform duration-300"
                  />
                </div>

                <span className="text-sm font-semibold mb-1.5 text-gray-800 group-hover/button:text-primary-color1 transition-colors duration-300 text-center">
                  {action.label}
                </span>

                {action.count && (
                  <Badge
                    variant="secondary"
                    className="mt-1 bg-gradient-to-r from-primary-color1 to-primary-color1/90 text-white px-3 py-1 text-xs font-semibold shadow-md group-hover/button:shadow-lg group-hover/button:scale-110 transition-all duration-300"
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
