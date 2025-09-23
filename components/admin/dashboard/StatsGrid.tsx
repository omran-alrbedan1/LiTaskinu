import React from "react";
import {
  Users,
  CheckCircle,
  AlertTriangle,
  ShieldAlert,
  MessageSquare,
  Heart,
  Clock,
} from "lucide-react";
import StatCard from "./StatCard";

interface StatsGridProps {
  stats: StatsData;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => (
  <>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={Users}
        title="Total Users"
        value={stats.totalUsers.toLocaleString()}
      />
      <StatCard
        icon={CheckCircle}
        title="Verified Users"
        value={stats.verifiedUsers.toLocaleString()}
      />
      <StatCard
        icon={AlertTriangle}
        title="Pending Verifications"
        value={stats.pendingVerifications}
      />
      <StatCard
        icon={ShieldAlert}
        title="New Complaints"
        value={stats.newComplaints}
      />
    </div>

    <div className="grid gap-6 md:grid-cols-3">
      <StatCard
        icon={MessageSquare}
        title="Active Chats"
        value={stats.activeChats}
      />
      <StatCard
        icon={Heart}
        title="Marriage Requests"
        value={stats.marriageRequests}
      />
      <StatCard icon={Clock} title="Banned Users" value={stats.bannedUsers} />
    </div>
  </>
);

export default StatsGrid;
