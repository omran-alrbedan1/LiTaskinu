"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/admin/shared";
import { Download } from "lucide-react";
import {
  StatCard,
  ComplaintTypeRadial,
  MonthlyTrendChart,
} from "./_components";
import { Flag, Clock, CheckCircle, TrendingUp } from "lucide-react";
import { MOCK_STATISTICS } from "@/constants/temporary";

const ComplaintStatisticsPage = () => {
  const [exportLoading, setExportLoading] = useState(false);

  const handleExport = async () => {
    setExportLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setExportLoading(false);
    console.log("Exporting statistics data...");
  };

  return (
    <div className="mx-auto pb-32 p-6 max-h-screen sidebar-scrollbar overflow-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Header
          title="Complaint Statistics"
          description="Comprehensive analytics and insights about user complaints"
        />
        <Button
          onClick={handleExport}
          disabled={exportLoading}
          className="flex items-center  bg-primary-color1 text-white gap-2"
        >
          <Download className="w-4 h-4" />
          {exportLoading ? "Exporting..." : "Export Report"}
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Complaints"
          value={MOCK_STATISTICS.overview.totalComplaints.toLocaleString()}
          icon={Flag}
          iconBgColor="from-blue-400 to-blue-500"
        />
        <StatCard
          title="Pending Review"
          value={MOCK_STATISTICS.overview.pending}
          icon={Clock}
          description="Awaiting action"
          iconBgColor="from-orange-400 to-orange-500"
        />
        <StatCard
          title="Resolved"
          value={MOCK_STATISTICS.overview.resolved}
          icon={CheckCircle}
          iconBgColor="from-green-400 to-green-500"
        />
        <StatCard
          title="Resolution Rate"
          value={`${MOCK_STATISTICS.overview.resolutionRate}%`}
          icon={TrendingUp}
          description="Avg: 2.3 days"
          iconBgColor="from-purple-400 to-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {/* Complaints by Type with Radial Chart */}
        <ComplaintTypeRadial />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Monthly Trend with Line Chart */}
        <MonthlyTrendChart />
      </div>
    </div>
  );
};

export default ComplaintStatisticsPage;
