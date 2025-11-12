import React from "react";
import { ProfileHeader } from "../_components";
import Link from "next/link";
import { mockUserData, seekingPreferences } from "@/constants/temporary";
import { profileSectionsConfig } from "@/constants/profileSections";
import { ProfileSection } from "./_components/ProfileSection";
import { User, Heart } from "lucide-react";

const OverviewPage = () => {
  return (
    <div className="space-y-6 ">
      <ProfileHeader
        title="Personal Overview"
        description="Manage your profile information and partner preferences"
      >
        <div className="flex justify-end space-x-4 mt-8">
          <Link href="./overview/edit">
            <button className="px-2 py-1.5 border border-primary-color1 text-primary-color1 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-primary-color1" />
              Edit Profile
            </button>
          </Link>
          <Link href="./overview/preferenceEdit">
            <button className="px-2 py-1.5 bg-primary-color1 text-white rounded-lg hover:bg-primary-color1/90 transition-colors  flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Update Preferences
            </button>
          </Link>
        </div>
      </ProfileHeader>

      {profileSectionsConfig.map((section) => (
        <ProfileSection
          key={section.title}
          title={section.title}
          icon={section.icon}
          personalData={
            mockUserData[section.personalData as keyof typeof mockUserData]
          }
          seekingData={
            seekingPreferences[
              section.seekingData as keyof typeof seekingPreferences
            ]
          }
          // @ts-ignore
          fields={section.fields}
        />
      ))}
    </div>
  );
};

export default OverviewPage;
