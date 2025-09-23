import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileText, ShieldAlert } from "lucide-react";

interface UrgentAlertsProps {
  stats: StatsData;
}

const UrgentAlerts: React.FC<UrgentAlertsProps> = ({ stats }) => {
  const hasUrgentTasks =
    stats.pendingVerifications > 0 || stats.newComplaints > 0;

  if (!hasUrgentTasks) return null;

  return (
    <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-3">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
            <AlertTriangle className="h-5 w-5" />
          </div>
          Attention Required! Urgent Tasks Need Review
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            {stats.pendingVerifications > 0 && (
              <p className="text-red-700 dark:text-red-400 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                {stats.pendingVerifications} verification requests pending
                review
              </p>
            )}
            {stats.newComplaints > 0 && (
              <p className="text-red-700 dark:text-red-400 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                {stats.newComplaints} new complaints awaiting processing
              </p>
            )}
          </div>
          <div className="flex gap-3">
            {stats.pendingVerifications > 0 && (
              <Button
                variant="destructive"
                size="sm"
                className="gap-2 shadow-md"
                asChild
              >
                <a href="/admin/verification">
                  <FileText className="h-4 w-4" />
                  Review
                </a>
              </Button>
            )}
            {stats.newComplaints > 0 && (
              <Button
                variant="destructive"
                size="sm"
                className="gap-2 shadow-md"
                asChild
              >
                <a href="/admin/complaints">
                  <ShieldAlert className="h-4 w-4" />
                  Handle
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UrgentAlerts;
