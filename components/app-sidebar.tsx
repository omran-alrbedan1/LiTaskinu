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
import { useLocale } from "next-intl";

const user = {
  name: "System Admin",
  email: "admin@admin.com",
  avatar: "/images/logo.png",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const locale = useLocale();
  const data = {
    // Main Platform Sections
    platform: [
      {
        title: "Dashboard",
        url: `/admin/${locale}/dashboard`,
        icon: Home,
        isActive: true,
      },
      {
        title: "User Management",
        url: `/admin/${locale}/users`,
        icon: Users,
        items: [
          {
            title: "All Users",
            url: `/admin/${locale}/users`,
          },
          {
            title: "New Registrations",
            url: `/admin/${locale}/users?filter=new`,
          },
          {
            title: "Verified Users",
            url: `/admin/${locale}/users?filter=verified`,
          },
          {
            title: "Pending Verification",
            url: `/admin/${locale}/users?filter=pending`,
          },
          {
            title: "Banned Users",
            url: `/admin/${locale}/users?filter=banned`,
          },
          {
            title: "Account Activation/Deactivation",
            url: `/admin/${locale}/users/account-status`,
          },
          {
            title: "Document Review",
            url: `/admin/${locale}/users/documents`,
          },
          {
            title: "Email & Phone Bans",
            url: `/admin/${locale}/users/contact-bans`,
          },
        ],
      },
      {
        title: "Verification System",
        url: `/admin/${locale}/verification`,
        icon: UserCheck,
        items: [
          {
            title: "Pending Requests",
            url: `/admin/${locale}/verification?status=pending`,
          },
          {
            title: "Approved Requests",
            url: `/admin/${locale}/verification?status=approved`,
          },
          {
            title: "Rejected Requests",
            url: `/admin/${locale}/verification?status=rejected`,
          },

          {
            title: "Required Documents",
            url: `/admin/${locale}/verification/required-documents`,
          },
        ],
      },
      {
        title: "Ad Management",
        url: `/admin/${locale}/ads`,
        icon: Eye,
        items: [
          {
            title: "Active Ads",
            url: `/admin/${locale}/ads/active`,
          },
          {
            title: "Ad Approval",
            url: `/admin/${locale}/ads/approval`,
          },
          {
            title: "Ad Statistics",
            url: `/admin/${locale}/ads/statistics`,
          },
          {
            title: "Ad Campaigns",
            url: `/admin/${locale}/ads/campaigns`,
          },
        ],
      },
    ],

    // Marriage & Matching System
    matching: [
      {
        title: "Marriage Requests",
        url: `/admin/${locale}/marriage-requests`,
        icon: Heart,
        items: [
          {
            title: "New Requests",
            url: `/admin/${locale}/marriage-requests?status=new`,
          },
          {
            title: "In Progress",
            url: `/admin/${locale}/marriage-requests?status=progress`,
          },
          {
            title: "Approved Requests",
            url: `/admin/${locale}/marriage-requests?status=approved`,
          },
          {
            title: "Completed Matches",
            url: `/admin/${locale}/marriage-requests?status=completed`,
          },
          {
            title: "Parent Approvals",
            url: `/admin/${locale}/marriage-requests/parent-approvals`,
          },
          {
            title: "Track Status",
            url: `/admin/${locale}/marriage-requests/tracking`,
          },
          {
            title: "Chat Approvals",
            url: `/admin/${locale}/marriage-requests/chat-approvals`,
          },
        ],
      },
      {
        title: "Matching System",
        url: `/admin/${locale}/matching`,
        icon: Calendar,
        items: [
          {
            title: "Manual Matching",
            url: `/admin/${locale}/matching/manual`,
          },
          {
            title: "Success Stories",
            url: `/admin/${locale}/matching/success-stories`,
          },
        ],
      },
    ],

    // Communication & Monitoring
    communication: [
      {
        title: "Chat Management",
        url: `/admin/${locale}/chats`,
        icon: MessageSquare,
        items: [
          {
            title: "Active Conversations",
            url: `/admin/${locale}/chats?status=active`,
          },
          {
            title: "Chat Monitoring",
            url: `/admin/${locale}/chats/monitoring`,
          },
          {
            title: "Message Logs",
            url: `/admin/${locale}/chats/logs`,
          },
          {
            title: "Parent Notifications",
            url: `/admin/${locale}/chats/parent-notifications`,
          },
          {
            title: "Chat Analytics",
            url: `/admin/${locale}/chats/analytics`,
          },
        ],
      },
      {
        title: "Reported Content",
        url: `/admin/${locale}/reported`,
        icon: Flag,
        items: [
          {
            title: "Reported Chats",
            url: `/admin/${locale}/reported/chats`,
          },
          {
            title: "Chat Content Review",
            url: `/admin/${locale}/reported/chat-review`,
          },
          {
            title: "Reported Profiles",
            url: `/admin/${locale}/reported/profiles`,
          },
        ],
      },
    ],

    // Security & Compliance
    security: [
      {
        title: "Complaints System",
        url: `/admin/${locale}/complaints`,
        icon: ShieldAlert,
        items: [
          {
            title: "All Complaints",
            url: `/admin/${locale}/complaints`,
          },
          {
            title: "Under Review",
            url: `/admin/${locale}/complaints?status=review`,
          },
          {
            title: "Resolved Complaints",
            url: `/admin/${locale}/complaints?status=resolved`,
          },
          {
            title: "Complaint Statistics",
            url: `/admin/${locale}/complaints/statistics`,
          },
        ],
      },
      {
        title: "Ban Management",
        url: `/admin/${locale}/banned`,
        icon: Ban,
        items: [
          {
            title: "Banned Emails",
            url: `/admin/${locale}/banned/emails`,
          },
          {
            title: "Banned Phone Numbers",
            url: `/admin/${locale}/banned/phones`,
          },
          {
            title: "IP Address Blocks",
            url: `/admin/${locale}/banned/ips`,
          },
          {
            title: "Ban History & Appeals",
            url: `/admin/${locale}/banned/history`,
          },
        ],
      },
    ],

    // Content & System Management
    management: [
      {
        title: "Content Management",
        url: `/admin/${locale}/content`,
        icon: FileText,
        items: [
          {
            title: "Static Pages",
            url: `/admin/${locale}/content/pages`,
          },
          {
            title: "About Us",
            url: `/admin/${locale}/content/about-us`,
          },
          {
            title: "Terms & Conditions",
            url: `/admin/${locale}/content/terms`,
          },
          {
            title: "Privacy Policy",
            url: `/admin/${locale}/content/privacy`,
          },
          {
            title: "FAQ Management",
            url: `/admin/${locale}/content/faq`,
          },
          {
            title: "Success Stories",
            url: `/admin/${locale}/content/success-stories`,
          },
        ],
      },
      {
        title: "Analytics & Reports",
        url: `/admin/${locale}/analytics`,
        icon: PieChart,
        items: [
          {
            title: "Platform Analytics",
            url: `/admin/${locale}/analytics/platform`,
          },
          {
            title: "User Statistics",
            url: `/admin/${locale}/analytics/users`,
          },
          {
            title: "Matching Reports",
            url: `/admin/${locale}/analytics/matching`,
          },
        ],
      },
      {
        title: "Notification System",
        url: `/admin/${locale}/notifications`,
        icon: Bell,
        items: [
          {
            title: "Push Notifications",
            url: `/admin/${locale}/notifications/push`,
          },
          {
            title: "Email Templates",
            url: `/admin/${locale}/notifications/email`,
          },
          {
            title: "SMS Notifications",
            url: `/admin/${locale}/notifications/sms`,
          },
          {
            title: "Notification Settings",
            url: `/admin/${locale}/notifications/settings`,
          },
        ],
      },
    ],

    // Settings & Support
    settings: [
      {
        title: "System Settings",
        url: `/admin/${locale}/settings`,
        icon: Settings,
        items: [
          {
            title: "General Settings",
            url: `/admin/${locale}/settings/general`,
          },
          {
            title: "Payment Settings",
            url: `/admin/${locale}/settings/payment`,
          },
        ],
      },
      {
        title: "Support Center",
        url: `/admin/${locale}/support`,
        icon: HelpCircle,
        items: [
          {
            title: "System Documentation",
            url: `/admin/${locale}/support/docs`,
          },
          {
            title: "Contact Management",
            url: `/admin/${locale}/support/contacts`,
          },
        ],
      },
    ],
  };

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
