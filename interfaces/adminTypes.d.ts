interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  type: "user" | "verification" | "complaint" | "marriage";
  urgent: boolean;
}

interface QuickAction {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  count?: number;
  color: string;
  bgColor: string;
}

interface StatsData {
  totalUsers: number;
  verifiedUsers: number;
  pendingVerifications: number;
  newComplaints: number;
  activeChats: number;
  marriageRequests: number;
  reportedChats: number;
  bannedUsers: number;
}
