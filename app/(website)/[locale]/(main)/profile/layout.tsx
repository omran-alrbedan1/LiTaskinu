import React from "react";
import { ProfileSidebar } from "./_components";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen -mb-32 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>

          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
