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
  Home, Bell, HelpCircle, Calendar, UserCog, Globe
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const data = {
    // Main Platform Sections
    platform: [
      {
        title: "Dashboard",
        url: `/admin/dashboard`,
        icon: Home,
        isActive: true,
      },
      {
        title: "User Management",
        url: `/admin/users`,
        icon: Users,
        items: [
          {
            title: "All Users",
            url: `/admin/users`,
          },
          {
            title: "New Registrations",
            url: `/admin/users?filter=new`,
          },
          {
            title: "Verified Users",
            url: `/admin/users?filter=verified`,
          },
          {
            title: "Pending Verification",
            url: `/admin/users?filter=pending`,
          },
          {
            title: "Banned Users",
            url: `/admin/users?filter=banned`,
          },
        ],
      },
      {
        title: "Countries Management",
        url: `/admin/countries`,
        icon: Globe,
        items: [
          {
            title: " Countries",
            url: `/admin/countries`,
          },

          {
            title: "Regions/Cities",
            url: `/admin/cities`,
          },
        ],
      },
      {
        title: "Parent Management",
        url: `/admin/parents`,
        icon: UserCog,
        items: [
          {
            title: "All Parents",
            url: `/admin/parents`,
          },
          {
            title: "Parent Messages",
            url: `/admin/parents/messages`,
          },
        ],
      },
      {
        title: "Verification System",
        url: `/admin/verification`,
        icon: UserCheck,
        items: [
          {
            title: "verification Requests",
            url: `/admin/verification?status=pending`,
          },

          {
            title: "Required Documents",
            url: `/admin/verification/required-documents`,
          },
        ],
      },
      {
        title: "Consultation Management",
        url: `/admin/consultation`,
        icon: HelpCircle,
        items: [
       {
            title: "Sheikhes",
            url: `/admin/consultations/sheikhs`,
          },
          {
            title: "Psychiatrist ",
            url: `/admin/consultations/psychiatrists`,
          },
        ],
      },
    ],

    // Marriage & Matching System
    matching: [
      {
        title: "Marriage Requests",
        url: `/admin/marriage-requests`,
        icon: Heart,
        items: [
          {
            title: "New Requests",
            url: `/admin/marriage-requests?status=new`,
          },
          {
            title: "In Progress",
            url: `/admin/marriage-requests?status=progress`,
          },
          {
            title: "Approved Requests",
            url: `/admin/marriage-requests?status=approved`,
          },
          {
            title: "Completed Matches",
            url: `/admin/marriage-requests?status=completed`,
          },
          {
            title: "Parent Approvals",
            url: `/admin/marriage-requests/parent-approvals`,
          },
          {
            title: "Track Status",
            url: `/admin/marriage-requests/tracking`,
          },
          {
            title: "Chat Approvals",
            url: `/admin/marriage-requests/chat-approvals`,
          },
        ],
      },
      {
        title: "Matching System",
        url: `/admin/matching`,
        icon: Calendar,
        items: [
          {
            title: "Manual Matching",
            url: `/admin/matching/manual`,
          },
          {
            title: "Success Stories",
            url: `/admin/matching/success-stories`,
          },
        ],
      },
    ],

    // Communication & Monitoring
    communication: [
      {
        title: "Chat Management",
        url: `/admin/chats`,
        icon: MessageSquare,
        items: [
          {
            title: " Conversations",
            url: `/admin/chats?status=active`,
          },
        ],
      },
    ],

    // Security & Compliance
    security: [
      {
        title: "Complaints System",
        url: `/admin/complaints`,
        icon: ShieldAlert,
        items: [
          {
            title: "All Complaints",
            url: `/admin/complaints`,
          },
          {
            title: "Under Review",
            url: `/admin/complaints?status=review`,
          },
          {
            title: "Resolved Complaints",
            url: `/admin/complaints?status=resolved`,
          },
          {
            title: "Complaint Statistics",
            url: `/admin/complaints/statistics`,
          },
        ],
      },
    ],

    // Content & System Management
    management: [
      {
        title: "Website Management",
        url: `/admin/content`,
        icon: FileText,
        items: [
          {
            title: "About Us",
            url: `/admin/content/about-us`,
          },
          {
            title: "Social Media Links",
            url: `/admin/content/social-media`,
          },

          {
            title: "Terms & Conditions",
            url: `/admin/content/terms`,
          },
          {
            title: "Privacy Policy",
            url: `/admin/content/privacy`,
          },
          {
            title: "FAQ Management",
            url: `/admin/content/faq`,
          },
          {
            title: "Success Stories",
            url: `/admin/content/success-stories`,
          },
          {
            title: "Advertisements",
            url: `/admin/ads`,
          },
          {
            title: "How It Works",
            url: `/admin/content/how-it-works`,
          },
          {
            title: "Landing Page Hero",
            url: `/admin/content/hero`,
          },
        ],
      },
      {
        title: "Analytics & Reports",
        url: `/admin/analytics`,
        icon: PieChart,
        items: [
          {
            title: "Platform Analytics",
            url: `/admin/analytics/platform`,
          },
          {
            title: "User Statistics",
            url: `/admin/analytics/users`,
          },
          {
            title: "Matching Reports",
            url: `/admin/analytics/matching`,
          },
          {
            title: "Parent Engagement", // إضافة جديدة
            url: `/admin/analytics/parent-engagement`,
          },
        ],
      },
      {
        title: "Notification System",
        url: `/admin/notifications`,
        icon: Bell,
        items: [
          {
            title: "Push Notifications",
            url: `/admin/notifications/push`,
          },
          {
            title: "Email Templates",
            url: `/admin/notifications/email`,
          },
          {
            title: "SMS Notifications",
            url: `/admin/notifications/sms`,
          },
          {
            title: "Parent Notifications", // إضافة جديدة
            url: `/admin/notifications/parent`,
          },
          {
            title: "Notification Settings",
            url: `/admin/notifications/settings`,
          },
        ],
      },
    ],

    // Settings & Support
    settings: [
      {
        title: "System Settings",
        url: `/admin/settings`,
        icon: Settings,
        items: [
          {
            title: "General Settings",
            url: `/admin/settings/general`,
          },
          {
            title: "Payment Settings",
            url: `/admin/settings/payment`,
          },
          {
            title: "Parent Settings", // إضافة جديدة
            url: `/admin/settings/parent`,
          },
        ],
      },
      {
        title: "Support Center",
        url: `/admin/support`,
        icon: HelpCircle,
        items: [
          {
            title: "System Documentation",
            url: `/admin/support/docs`,
          },
          {
            title: "Contact Management",
            url: `/admin/support/contacts`,
          },
          {
            title: "Parent Support", 
            url: `/admin/support/parent`,
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
