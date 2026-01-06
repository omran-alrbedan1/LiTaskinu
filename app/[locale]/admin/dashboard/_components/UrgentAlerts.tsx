import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileText, ShieldAlert, Clock } from "lucide-react";

interface StatsData {
  pendingVerifications: number;
  newComplaints: number;
}

interface UrgentAlertsProps {
  stats: StatsData;
}

const UrgentAlerts: React.FC<UrgentAlertsProps> = ({ stats }) => {
  const hasUrgentTasks =
    stats.pendingVerifications > 0 || stats.newComplaints > 0;

  if (!hasUrgentTasks) return null;

  const totalUrgent = stats.pendingVerifications + stats.newComplaints;

  return (
    <Card className="relative overflow-hidden border-none bg-gradient-to-br from-rose-50 via-red-50 to-orange-50 dark:from-rose-950/30 dark:via-red-950/30 dark:to-orange-950/30 shadow-xl">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-red-500/5 animate-pulse"></div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full"></div>

      <CardHeader className="relative pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-xl blur-md opacity-50 animate-pulse"></div>
              <div className="relative p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg">
                <AlertTriangle
                  className="h-6 w-6 text-white"
                  strokeWidth={2.5}
                />
              </div>
            </div>
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
                Urgent Action Required
              </CardTitle>
              <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-0.5 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {totalUrgent} {totalUrgent === 1 ? "task" : "tasks"} need
                immediate attention
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Alert items */}
        <div className="space-y-3">
          {stats.pendingVerifications > 0 && (
            <div className="group p-4 bg-white/70 dark:bg-gray-900/40 rounded-xl border border-red-200/50 dark:border-red-800/30 shadow-sm hover:shadow-md hover:border-red-300 dark:hover:border-red-700/50 transition-all duration-200">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative">
                    <span className="absolute inset-0 bg-red-500 rounded-full blur-sm opacity-50"></span>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {stats.pendingVerifications} Verification{" "}
                      {stats.pendingVerifications === 1
                        ? "Request"
                        : "Requests"}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      Pending review and approval
                    </p>
                  </div>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  asChild
                >
                  <a href="/admin/verification">
                    <FileText className="h-4 w-4" />
                    Review Now
                  </a>
                </Button>
              </div>
            </div>
          )}

          {stats.newComplaints > 0 && (
            <div className="group p-4 bg-white/70 dark:bg-gray-900/40 rounded-xl border border-orange-200/50 dark:border-orange-800/30 shadow-sm hover:shadow-md hover:border-orange-300 dark:hover:border-orange-700/50 transition-all duration-200">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative">
                    <span className="absolute inset-0 bg-orange-500 rounded-full blur-sm opacity-50"></span>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {stats.newComplaints} New{" "}
                      {stats.newComplaints === 1 ? "Complaint" : "Complaints"}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      Awaiting investigation and response
                    </p>
                  </div>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  asChild
                >
                  <a href="/admin/complaints">
                    <ShieldAlert className="h-4 w-4" />
                    Handle Now
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UrgentAlerts;
