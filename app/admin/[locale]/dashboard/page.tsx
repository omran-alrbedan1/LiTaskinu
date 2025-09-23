import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

import {
  INITIAL_STATS,
  RECENT_ACTIVITIES,
  QUICK_ACTIONS,
} from "@/constants/admin";
import {
  QuickActionsCard,
  RecentActivitiesCard,
  StatsGrid,
  UrgentAlerts,
  UserTable,
} from "@/components/admin/dashboard";
import { Header } from "@/components/admin/shared";

const AdminDashboard = () => {
  const statsData = INITIAL_STATS;
  const recentActivities = RECENT_ACTIVITIES;
  const quickActions = QUICK_ACTIONS(statsData);

  return (
    <div className="p-6 space-y-6 max-h-screen overflow-y-auto pb-32 hide-scrollbar bg-gradient-to-br from-gray-50/50 to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20">
      <Header
        title="Dashboard"
        subtitle="Platform overview and performance metrics"
      />

      <StatsGrid stats={statsData} />

      <div className="grid gap-6 lg:grid-cols-3">
        <QuickActionsCard quickActions={quickActions} />
        <RecentActivitiesCard activities={recentActivities} />
      </div>

      <Card className="shadow-sm hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="flex items-center gap-3">
            <Users className="h-6 w-6 text-primary-color1" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <UserTable />
        </CardContent>
      </Card>

      <UrgentAlerts stats={statsData} />
    </div>
  );
};

export default AdminDashboard;
