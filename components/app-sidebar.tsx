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
        url: `/${locale}/admin/dashboard`,
        icon: Home,
        isActive: true,
      },
      {
        title: "User Management",
        url: `/${locale}/admin/users`,
        icon: Users,
        items: [
          {
            title: "All Users",
            url: `/${locale}/admin/users`,
          },
          {
            title: "New Registrations",
            url: `/${locale}/admin/users?filter=new`,
          },
          {
            title: "Verified Users",
            url: `/${locale}/admin/users?filter=verified`,
          },
          {
            title: "Pending Verification",
            url: `/${locale}/admin/users?filter=pending`,
          },
          {
            title: "Banned Users",
            url: `/${locale}/admin/users?filter=banned`,
          },
        ],
      },
      {
        title: "Countries Management",
        url: `/${locale}/admin/countries`,
        icon: Globe,
        items: [
          {
            title: " Countries",
            url: `/${locale}/admin/countries`,
          },

          {
            title: "Regions/Cities",
            url: `/${locale}/admin/cities`,
          },
        ],
      },
      {
        title: "Parent Management",
        url: `/${locale}/admin/parents`,
        icon: UserCog,
        items: [
          {
            title: "All Parents",
            url: `/${locale}/admin/parents`,
          },
          {
            title: "Parent Messages",
            url: `/${locale}/admin/parents/messages`,
          },
        ],
      },
      {
        title: "Verification System",
        url: `/${locale}/admin/verification`,
        icon: UserCheck,
        items: [
          {
            title: "verification Requests",
            url: `/${locale}/admin/verification?status=pending`,
          },

          {
            title: "Required Documents",
            url: `/${locale}/admin/verification/required-documents`,
          },
        ],
      },
      {
        title: "Consultation Management",
        url: `/${locale}/admin/consultation`,
        icon: HelpCircle,
        items: [
       {
            title: "Sheikhes",
            url: `/${locale}/admin/consultations/sheikhs`,
          },
          {
            title: "Psychiatrist ",
            url: `/${locale}/admin/consultations/psychiatrists`,
          },
        ],
      },
    ],

    // Marriage & Matching System
    matching: [
      {
        title: "Marriage Requests",
        url: `/${locale}/admin/marriage-requests`,
        icon: Heart,
        items: [
          {
            title: "New Requests",
            url: `/${locale}/admin/marriage-requests?status=new`,
          },
          {
            title: "In Progress",
            url: `/${locale}/admin/marriage-requests?status=progress`,
          },
          {
            title: "Approved Requests",
            url: `/${locale}/admin/marriage-requests?status=approved`,
          },
          {
            title: "Completed Matches",
            url: `/${locale}/admin/marriage-requests?status=completed`,
          },
          {
            title: "Parent Approvals",
            url: `/${locale}/admin/marriage-requests/parent-approvals`,
          },
          {
            title: "Track Status",
            url: `/${locale}/admin/marriage-requests/tracking`,
          },
          {
            title: "Chat Approvals",
            url: `/${locale}/admin/marriage-requests/chat-approvals`,
          },
        ],
      },
      {
        title: "Matching System",
        url: `/${locale}/admin/matching`,
        icon: Calendar,
        items: [
          {
            title: "Manual Matching",
            url: `/${locale}/admin/matching/manual`,
          },
          {
            title: "Success Stories",
            url: `/${locale}/admin/matching/success-stories`,
          },
        ],
      },
    ],

    // Communication & Monitoring
    communication: [
      {
        title: "Chat Management",
        url: `/${locale}/admin/chats`,
        icon: MessageSquare,
        items: [
          {
            title: " Conversations",
            url: `/${locale}/admin/chats?status=active`,
          },
        ],
      },
    ],

    // Security & Compliance
    security: [
      {
        title: "Complaints System",
        url: `/${locale}/admin/complaints`,
        icon: ShieldAlert,
        items: [
          {
            title: "All Complaints",
            url: `/${locale}/admin/complaints`,
          },
          {
            title: "Under Review",
            url: `/${locale}/admin/complaints?status=review`,
          },
          {
            title: "Resolved Complaints",
            url: `/${locale}/admin/complaints?status=resolved`,
          },
          {
            title: "Complaint Statistics",
            url: `/${locale}/admin/complaints/statistics`,
          },
        ],
      },
    ],

    // Content & System Management
    management: [
      {
        title: "Website Management",
        url: `/${locale}/admin/content`,
        icon: FileText,
        items: [
          {
            title: "About Us",
            url: `/${locale}/admin/content/about-us`,
          },
          {
            title: "Social Media Links",
            url: `/${locale}/admin/content/social-media`,
          },

          {
            title: "Terms & Conditions",
            url: `/${locale}/admin/content/terms`,
          },
          {
            title: "Privacy Policy",
            url: `/${locale}/admin/content/privacy`,
          },
          {
            title: "FAQ Management",
            url: `/${locale}/admin/content/faq`,
          },
          {
            title: "Success Stories",
            url: `/${locale}/admin/content/success-stories`,
          },
          {
            title: "Advertisements",
            url: `/${locale}/admin/ads`,
          },
          {
            title: "How It Works",
            url: `/${locale}/admin/content/how-it-works`,
          },
          {
            title: "Landing Page Hero",
            url: `/${locale}/admin/content/hero`,
          },
        ],
      },
      {
        title: "Analytics & Reports",
        url: `/${locale}/admin/analytics`,
        icon: PieChart,
        items: [
          {
            title: "Platform Analytics",
            url: `/${locale}/admin/analytics/platform`,
          },
          {
            title: "User Statistics",
            url: `/${locale}/admin/analytics/users`,
          },
          {
            title: "Matching Reports",
            url: `/${locale}/admin/analytics/matching`,
          },
          {
            title: "Parent Engagement", // إضافة جديدة
            url: `/${locale}/admin/analytics/parent-engagement`,
          },
        ],
      },
      {
        title: "Notification System",
        url: `/${locale}/admin/notifications`,
        icon: Bell,
        items: [
          {
            title: "Push Notifications",
            url: `/${locale}/admin/notifications/push`,
          },
          {
            title: "Email Templates",
            url: `/${locale}/admin/notifications/email`,
          },
          {
            title: "SMS Notifications",
            url: `/${locale}/admin/notifications/sms`,
          },
          {
            title: "Parent Notifications", // إضافة جديدة
            url: `/${locale}/admin/notifications/parent`,
          },
          {
            title: "Notification Settings",
            url: `/${locale}/admin/notifications/settings`,
          },
        ],
      },
    ],

    // Settings & Support
    settings: [
      {
        title: "System Settings",
        url: `/${locale}/admin/settings`,
        icon: Settings,
        items: [
          {
            title: "General Settings",
            url: `/${locale}/admin/settings/general`,
          },
          {
            title: "Payment Settings",
            url: `/${locale}/admin/settings/payment`,
          },
          {
            title: "Parent Settings", // إضافة جديدة
            url: `/${locale}/admin/settings/parent`,
          },
        ],
      },
      {
        title: "Support Center",
        url: `/${locale}/admin/support`,
        icon: HelpCircle,
        items: [
          {
            title: "System Documentation",
            url: `/${locale}/admin/support/docs`,
          },
          {
            title: "Contact Management",
            url: `/${locale}/admin/support/contacts`,
          },
          {
            title: "Parent Support", 
            url: `/${locale}/admin/support/parent`,
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
