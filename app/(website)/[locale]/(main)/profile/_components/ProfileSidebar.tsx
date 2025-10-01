"use client";

import React, { useState } from "react";
import {
  Bell,
  HelpCircle,
  Info,
  Shield,
  LogOut,
  Trash2,
  Globe,
  User,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IoSettingsOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { images } from "@/constants/images";
import {
  MdSwitchAccount,
  MdOutlinePrivacyTip,
  MdSettings,
} from "react-icons/md";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import LogoutModal from "./LogoutModal";

const ProfileSidebar = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      id: "account",
      label: "Profile Information",
      icon: User,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      badge: 3,
    },
    {
      id: "technical-support",
      label: "Technical Support",
      icon: HelpCircle,
    },
    {
      id: "privacy-policy",
      label: "Privacy Policy",
      icon: MdOutlinePrivacyTip,
    },
  ];

  const accountActions = [
    {
      id: "language",
      label: "Language",
      icon: Globe,
    },
    {
      id: "logout",
      label: "Log Out",
      icon: LogOut,
      variant: "ghost" as const,
    },
  ];

  const user = {
    name: "Abdullah",
    avatar: images.avatar,
  };

  // Handle logout confirmation
  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Simulate API call for logout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Your actual logout logic here
      console.log("Logging out...");

      // Redirect to login page or home page after logout
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  // Handle account actions click
  const handleAccountAction = (actionId: string) => {
    if (actionId === "logout") {
      setIsLogoutModalOpen(true);
    } else if (actionId === "language") {
      router.push("./change-language");
    }
  };

  return (
    <>
      <div className="bg-white pb-12 rounded-xl shadow-sm border border-gray-200/60 p-6 sticky top-8">
        {/* User Info Header */}
        <div className="text-center mb-6 pb-6 ">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Image
              src={user.avatar || images.Unknown}
              height={84}
              width={84}
              alt="User Avatar"
              className="rounded-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1 mb-6 -mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.includes(item.id);

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-between items-center px-3 py-6 mb-1 ${
                  isActive
                    ? "bg-primary-color1 text-white border border-primary-color1"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => {
                  setActiveSection(item.id);
                  router.push(`./${item.id}`);
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "h-4 w-4 text-primary-color1",
                      isActive ? "text-white" : ""
                    )}
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <Badge className="bg-primary-color2/30 text-primary-color2 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Button>
            );
          })}
        </nav>

        {/* Account Actions */}
        <div className="space-y-1 border-t pt-4">
          {accountActions.map((item) => {
            const Icon = item.icon;

            return (
              <Button
                key={item.id}
                variant={item.variant || "ghost"}
                className={`w-full justify-start items-center px-3 py-2 mb-1 gap-3 ${
                  item.id === "logout"
                    ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                    : ""
                }`}
                onClick={() => handleAccountAction(item.id)}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    item.id === "logout"
                      ? "text-red-600"
                      : "text-primary-color1"
                  )}
                />
                <span
                  className={`text-sm font-medium ${
                    item.id === "logout" ? "text-red-600" : ""
                  }`}
                >
                  {item.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
      />
    </>
  );
};

export default ProfileSidebar;
