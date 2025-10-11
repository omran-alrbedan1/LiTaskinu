"use client";

import * as React from "react";
import {
  Users,
  UserCheck,
  MessageSquare,
  Heart,
  ShieldAlert,
  FileText,
  Settings,
  PieChart,
  Home,
  Ban,
  Bell,
  BookOpen,
  HelpCircle,
  Shield,
  Calendar,
  Flag,
  Archive,
  Eye,
  Mail,
  Phone,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { images } from "@/constants/images";
import Image from "next/image";
import { cn } from "@/lib/utils";

const user = {
  name: "System Admin",
  email: "admin@admin.com",
  avatar: "/images/logo.png",
};

const data = {
  // Main Platform Sections
  platform: [
    {
      title: "Dashboard",
      url: "/admin/en/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "User Management",
      url: "/admin/users",
      icon: Users,
      items: [
        {
          title: "All Users",
          url: "/admin/en/users",
        },
        {
          title: "New Registrations",
          url: "/admin/users?filter=new",
        },
        {
          title: "Verified Users",
          url: "/admin/users?filter=verified",
        },
        {
          title: "Pending Verification",
          url: "/admin/users?filter=pending",
        },
        {
          title: "Banned Users",
          url: "/admin/users?filter=banned",
        },
        {
          title: "Account Activation/Deactivation",
          url: "/admin/users/account-status",
        },
        {
          title: "Document Review",
          url: "/admin/users/documents",
        },
        {
          title: "Email & Phone Bans",
          url: "/admin/users/contact-bans",
        },
      ],
    },
    {
      title: "Verification System",
      url: "/admin/verification",
      icon: UserCheck,
      items: [
        {
          title: "Pending Requests",
          url: "/admin/verification?status=pending",
        },
        {
          title: "Approved Requests",
          url: "/admin/verification?status=approved",
        },
        {
          title: "Rejected Requests",
          url: "/admin/verification?status=rejected",
        },
        {
          title: "Document Review",
          url: "/admin/verification/documents",
        },
        {
          title: "Verification Settings",
          url: "/admin/verification/settings",
        },
      ],
    },
    {
      title: "Ad Management",
      url: "/admin/ads",
      icon: Eye,
      items: [
        {
          title: "Active Ads",
          url: "/admin/ads/active",
        },
        {
          title: "Ad Approval",
          url: "/admin/ads/approval",
        },
        {
          title: "Ad Statistics",
          url: "/admin/ads/statistics",
        },
        {
          title: "Ad Campaigns",
          url: "/admin/ads/campaigns",
        },
      ],
    },
  ],

  // Marriage & Matching System
  matching: [
    {
      title: "Marriage Requests",
      url: "/admin/marriage-requests",
      icon: Heart,
      items: [
        {
          title: "New Requests",
          url: "/admin/marriage-requests?status=new",
        },
        {
          title: "In Progress",
          url: "/admin/marriage-requests?status=progress",
        },
        {
          title: "Approved Requests",
          url: "/admin/marriage-requests?status=approved",
        },
        {
          title: "Completed Matches",
          url: "/admin/marriage-requests?status=completed",
        },
        {
          title: "Parent Approvals",
          url: "/admin/marriage-requests/parent-approvals",
        },
        {
          title: "Track Status",
          url: "/admin/marriage-requests/tracking",
        },
        {
          title: "Chat Approvals",
          url: "/admin/marriage-requests/chat-approvals",
        },
      ],
    },
    {
      title: "Matching System",
      url: "/admin/matching",
      icon: Calendar,
      items: [
        {
          title: "Manual Matching",
          url: "/admin/matching/manual",
        },
        {
          title: "Success Stories",
          url: "/admin/matching/success-stories",
        },
      ],
    },
  ],

  // Communication & Monitoring
  communication: [
    {
      title: "Chat Management",
      url: "/admin/chats",
      icon: MessageSquare,
      items: [
        {
          title: "Active Conversations",
          url: "/admin/chats?status=active",
        },
        {
          title: "Chat Monitoring",
          url: "/admin/chats/monitoring",
        },
        {
          title: "Message Logs",
          url: "/admin/chats/logs",
        },
        {
          title: "Parent Notifications",
          url: "/admin/chats/parent-notifications",
        },
        {
          title: "Chat Analytics",
          url: "/admin/chats/analytics",
        },
      ],
    },
    {
      title: "Reported Content",
      url: "/admin/reported",
      icon: Flag,
      items: [
        {
          title: "Reported Chats",
          url: "/admin/reported/chats",
        },
        {
          title: "Chat Content Review",
          url: "/admin/reported/chat-review",
        },
        {
          title: "Reported Profiles",
          url: "/admin/reported/profiles",
        },
      ],
    },
  ],

  // Security & Compliance
  security: [
    {
      title: "Complaints System",
      url: "/admin/complaints",
      icon: ShieldAlert,
      items: [
        {
          title: "New Complaints",
          url: "/admin/complaints?status=new",
        },
        {
          title: "Under Investigation",
          url: "/admin/complaints?status=investigation",
        },
        {
          title: "Under Review",
          url: "/admin/complaints?status=review",
        },
        {
          title: "Resolved Complaints",
          url: "/admin/complaints?status=resolved",
        },
        {
          title: "Complaint Statistics",
          url: "/admin/complaints/statistics",
        },
        {
          title: "Complaint Tracking",
          url: "/admin/complaints/tracking",
        },
      ],
    },
    {
      title: "Ban Management",
      url: "/admin/banned",
      icon: Ban,
      items: [
        {
          title: "Banned Emails",
          url: "/admin/banned/emails",
        },
        {
          title: "Banned Phone Numbers",
          url: "/admin/banned/phones",
        },
        {
          title: "IP Address Blocks",
          url: "/admin/banned/ips",
        },
        {
          title: "Ban History & Appeals",
          url: "/admin/banned/history",
        },
      ],
    },
  ],

  // Content & System Management
  management: [
    {
      title: "Content Management",
      url: "/admin/content",
      icon: FileText,
      items: [
        {
          title: "Static Pages",
          url: "/admin/content/pages",
        },
        {
          title: "About Us",
          url: "/admin/content/about-us",
        },
        {
          title: "Terms & Conditions",
          url: "/admin/content/terms",
        },
        {
          title: "Privacy Policy",
          url: "/admin/content/privacy",
        },
        {
          title: "FAQ Management",
          url: "/admin/content/faq",
        },
        {
          title: "Success Stories",
          url: "/admin/content/success-stories",
        },
      ],
    },
    {
      title: "Analytics & Reports",
      url: "/admin/analytics",
      icon: PieChart,
      items: [
        {
          title: "Platform Analytics",
          url: "/admin/analytics/platform",
        },
        {
          title: "User Statistics",
          url: "/admin/analytics/users",
        },
        {
          title: "Matching Reports",
          url: "/admin/analytics/matching",
        },
      ],
    },
    {
      title: "Notification System",
      url: "/admin/notifications",
      icon: Bell,
      items: [
        {
          title: "Push Notifications",
          url: "/admin/notifications/push",
        },
        {
          title: "Email Templates",
          url: "/admin/notifications/email",
        },
        {
          title: "SMS Notifications",
          url: "/admin/notifications/sms",
        },

        {
          title: "Notification Settings",
          url: "/admin/notifications/settings",
        },
      ],
    },
  ],

  // Settings & Support
  settings: [
    {
      title: "System Settings",
      url: "/admin/settings",
      icon: Settings,
      items: [
        {
          title: "General Settings",
          url: "/admin/settings/general",
        },
        {
          title: "Payment Settings",
          url: "/admin/settings/payment",
        },
      ],
    },
    {
      title: "Support Center",
      url: "/admin/support",
      icon: HelpCircle,
      items: [
        {
          title: "System Documentation",
          url: "/admin/support/docs",
        },
        {
          title: "Contact Management",
          url: "/admin/support/contacts",
        },
      ],
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props} className="hide-scrollbar">
      <SidebarHeader>
        <div
          className={cn(
            "flex items-center justify-center transition-all duration-300",
            state === "collapsed" ? "p-2" : "p-4"
          )}
        >
          <Image
            src={images.logo}
            alt="Islamic Marriage Platform"
            width={state === "collapsed" ? 40 : 100}
            height={state === "collapsed" ? 40 : 100}
            className={cn(
              "rounded-md transition-all duration-300",
              state === "collapsed" ? "w-10 h-10" : "w-28 h-28 -my-6"
            )}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Platform Management */}
        <NavMain items={data.platform} title="Platform Management" />

        {/* Marriage & Matching */}
        <NavMain items={data.matching} title="Marriage & Matching" />

        {/* Communication & Monitoring */}
        <NavMain
          items={data.communication}
          title="Communication & Monitoring"
        />
        {/* Security & Compliance */}
        <NavMain items={data.security} title="Security & Compliance" />

        {/* Content & System Management */}
        <NavMain items={data.management} title="Content & System Management" />

        {/* Settings & Support */}
        <NavMain items={data.settings} title="Settings & Support" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
