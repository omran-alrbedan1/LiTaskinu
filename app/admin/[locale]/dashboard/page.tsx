import { Activity } from "lucide-react";
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
  MatchSuccessRadial,
  UserGrowthChart,
} from "./_components";
import { Header } from "@/components/admin/shared";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const statsData = INITIAL_STATS;
  const recentActivities = RECENT_ACTIVITIES;
  const quickActions = QUICK_ACTIONS(statsData);

  return (
    <div className="p-6 space-y-6 max-h-screen overflow-y-auto pb-32 hide-scrollbar ">
      <div className="flex justify-between items-center mb-8">
        <Header
          title="Dashboard"
          description="Platform overview and performance metrics"
        />
        <div className="flex items-center space-x-2">
          <Badge
            variant="secondary"
            className="bg-green-500/10 border-green-500"
          >
            <Activity className="h-3 w-3 mr-1 text-green-500" />
            Live
          </Badge>
          <span className="text-sm text-muted-foreground">
            Last updated: Just now
          </span>
        </div>
      </div>

      <StatsGrid stats={statsData} />

      {/* Charts Section - Line chart takes 2 cols, Radial takes 1 col */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Line Chart - Takes 2 columns */}
        <div className="md:col-span-2">
          <UserGrowthChart />
        </div>

        {/* Radial Chart - Takes 1 column */}
        <MatchSuccessRadial />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <QuickActionsCard quickActions={quickActions} />
        <RecentActivitiesCard activities={recentActivities} />
      </div>

      <UrgentAlerts stats={statsData} />
    </div>
  );
};

export default AdminDashboard;
