// src/app/profile/_components/ProfileHeader.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface ProfileHeaderProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  title,
  description,
  children,
}) => (
  <div className="flex justify-between items-center mb-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
    <div>{children}</div>
  </div>
);

export default ProfileHeader;
