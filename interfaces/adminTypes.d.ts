interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  type: "user" | "verification" | "complaint" | "marriage";
  avatar: any;
}

interface QuickAction {
  icon: any;
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

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info" | "user" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  userId?: string;
  userName?: string;
}

interface NotificationFilters {
  type: string;
  readStatus: string;
}

interface User {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  status?: "active" | "pending" | "banned" | "inactive";
  verification?: "verified" | "pending" | "unverified";
  registrationDate?: string;
  lastLogin?: string;
  reportsCount?: number;
  marriageRequests?: number;
  activeChats?: number;
  avatar?: string;
}

interface Photo {
  id: string;
  url: string;
}

interface PhotoGalleryProps {
  photos?: Photo[];
  maxDisplayPhotos?: number;
}
