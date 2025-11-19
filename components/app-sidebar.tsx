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
  UserCog, // إضافة أيقونة جديدة لإدارة أولياء الأمور
  UserPlus,
  Contact,
  Globe,
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
        ],
      },
      {
        title: "Countries Management",
        url: `/admin/${locale}/countries`,
        icon: Globe,
        items: [
          {
            title: " Countries",
            url: `/admin/${locale}/countries`,
          },

          {
            title: "Regions/Cities",
            url: `/admin/${locale}/cities`,
          },
        ],
      },
      {
        title: "Parent Management",
        url: `/admin/${locale}/parents`,
        icon: UserCog,
        items: [
          {
            title: "All Parents",
            url: `/admin/${locale}/parents`,
          },
          {
            title: "Parent Messages",
            url: `/admin/${locale}/parents/messages`,
          },
        ],
      },
      {
        title: "Verification System",
        url: `/admin/${locale}/verification`,
        icon: UserCheck,
        items: [
          {
            title: "verification Requests",
            url: `/admin/${locale}/verification?status=pending`,
          },

          {
            title: "Required Documents",
            url: `/admin/${locale}/verification/required-documents`,
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
            title: " Conversations",
            url: `/admin/${locale}/chats?status=active`,
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
    ],

    // Content & System Management
    management: [
      {
        title: "Content Management",
        url: `/admin/${locale}/content`,
        icon: FileText,
        items: [
          {
            title: "About Us",
            url: `/admin/${locale}/content/about-us`,
          },
          {
            title: "Social Media Links",
            url: `/admin/${locale}/content/social-media`,
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
          {
            title: "Advertisements",
            url: `/admin/${locale}/ads`,
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
          {
            title: "Parent Engagement", // إضافة جديدة
            url: `/admin/${locale}/analytics/parent-engagement`,
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
            title: "Parent Notifications", // إضافة جديدة
            url: `/admin/${locale}/notifications/parent`,
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
          {
            title: "Parent Settings", // إضافة جديدة
            url: `/admin/${locale}/settings/parent`,
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
          {
            title: "Parent Support", // إضافة جديدة
            url: `/admin/${locale}/support/parent`,
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
        <NavMain items={data.communication} title="Communication " />
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
