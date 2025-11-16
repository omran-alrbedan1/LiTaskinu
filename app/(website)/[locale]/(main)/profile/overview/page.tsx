import React from "react";
import { ProfileHeader } from "../_components";
import { mockUserData, seekingPreferences } from "@/constants/temporary";
import { profileSectionsConfig } from "@/constants/profileSections";
import { ProfileSection } from "./_components/ProfileSection";
import { User, Heart } from "lucide-react";

const OverviewPage = () => {
  return (
    <div className="space-y-6">
      <ProfileHeader
        title="Personal Overview"
        description="Manage your profile information and partner preferences"
        action={[
          {
            label: "Edit Profile",
            href: "./overview/edit",
            icon: User,
            variant: "outline", // Optional: makes it a secondary button
          },
          {
            label: "Update Preferences",
            href: "./overview/preferenceEdit",
            icon: Heart,
            variant: "default", // Primary button
          },
        ]}
      />

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
