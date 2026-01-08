'use client'
import { profileSectionsConfig } from "@/constants/profileSections";
import { ProfileSection } from "./_components/ProfileSection";
import { User, Heart } from "lucide-react";
import CustomHeader from "@/components/shared/CustomHeader";
import useGetData from "@/hooks/useGetData";

const OverviewPage = () => {
  const {
    data: profileInfo,
    loading: isFetchingAds,
    error: fetchError,
    refetch: refetchAds,
  } = useGetData({
    url: "/api/website/profile/info",
    enabled: true,
  });
  const {
    data: preferenceInfo,
  } = useGetData({
    url: "/api/website/profile/preferences",
    enabled: true,
  });


  if (isFetchingAds) {
    return (
      <div className="space-y-6">
        <CustomHeader
          title="Personal Overview"
          description="Manage your profile information and partner preferences"
          action={[
            {
              label: "Edit Profile",
              href: "./overview/edit",
              icon: User,
              variant: "outline",
            },
            {
              label: "Update Preferences",
              href: "./overview/preferenceEdit",
              icon: Heart,
              variant: "default",
            },
          ]}
        />
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color1 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile information...</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="space-y-6">
        <CustomHeader
          title="Personal Overview"
          description="Manage your profile information and partner preferences"
          action={[
            {
              label: "Edit Profile",
              href: "./overview/edit",
              icon: User,
              variant: "outline",
            },
            {
              label: "Update Preferences",
              href: "./overview/preferenceEdit",
              icon: Heart,
              variant: "default",
            },
          ]}
        />
        <div className="text-center py-12">
          <p className="text-red-600">Error loading profile: {fetchError.message}</p>
          <button 
            onClick={() => refetchAds()} 
            className="mt-4 px-4 py-2 bg-primary-color1 text-white rounded hover:bg-primary-color2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const profileData = profileInfo?.data || {};
  const preferenceData = preferenceInfo?.data || {};



  console.log(preferenceData)
  return (
    <div className="space-y-6">
      <CustomHeader
        title="Personal Overview"
        description="Manage your profile information and partner preferences"
        action={[
          {
            label: "Edit Profile",
            href: "./overview/edit",
            icon: User,
            variant: "outline",
          },
          {
            label: "Update Preferences",
            href: "./overview/preferenceEdit",
            icon: Heart,
            variant: "default",
          },
        ]}
      />

      {profileSectionsConfig.map((section) => {
        
        return (
          <ProfileSection
            key={section.title}
            title={section.title}
            icon={section.icon}
            personalData={profileData}
            seekingData={preferenceData}
            fields={section.fields}
          />
        );
      })}
    </div>
  );
};

export default OverviewPage;