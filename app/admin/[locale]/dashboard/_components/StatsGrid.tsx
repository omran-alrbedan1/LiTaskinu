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
        iconBgColor="bg-blue-500"
        borderColor="border-l-blue-500"
      />
      <StatCard
        icon={CheckCircle}
        title="Verified Users"
        value={stats.verifiedUsers.toLocaleString()}
        iconBgColor="bg-green-500"
        borderColor="border-l-green-500"
      />
      <StatCard
        icon={AlertTriangle}
        title="Pending Verifications"
        value={stats.pendingVerifications}
        iconBgColor="bg-yellow-500"
        borderColor="border-l-yellow-500"
      />
      <StatCard
        icon={ShieldAlert}
        title="New Complaints"
        value={stats.newComplaints}
        iconBgColor="bg-red-500"
        borderColor="border-l-red-500"
      />
    </div>

    <div className="grid gap-6 md:grid-cols-3">
      <StatCard
        icon={MessageSquare}
        title="Active Chats"
        value={stats.activeChats}
        iconBgColor="bg-purple-500"
        borderColor="border-l-purple-500"
      />
      <StatCard
        icon={Heart}
        title="Marriage Requests"
        value={stats.marriageRequests}
        iconBgColor="bg-pink-500"
        borderColor="border-l-pink-500"
      />
      <StatCard
        icon={Clock}
        title="Banned Users"
        value={stats.bannedUsers}
        iconBgColor="bg-gray-500"
        borderColor="border-l-gray-500"
      />
    </div>
  </>
);

export default StatsGrid;
