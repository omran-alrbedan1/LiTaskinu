'use client'
import { profileSectionsConfig } from "@/app/[locale]/(website)/(main)/profile/overview/_components/profileSectionsConfig";
import { ProfileSection } from "./_components/ProfileSection";
import { User, Heart } from "lucide-react";
import CustomHeader from "@/components/shared/CustomHeader";
import useGetData from "@/hooks/useGetData";
import Loader from "@/components/shared/Loader";
import { EmptyState } from "@/components/shared";
import { images } from "@/constants/images";
import Link from "next/link";

const OverviewPage = () => {
  const {
    data: profileInfo,
    loading: isFetchingProfileInfo,
    error: fetchError,
    refetch: refetchProfileInfo,
  } = useGetData({
    url: "/api/website/profile/info",
    enabled: true,
  });
  
  const {
    data: preferenceInfo,
    loading: isFetchingPreferenceInfo,
    error: preferenceError,
    refetch: refetchPreferenceInfo,
  } = useGetData({
    url: "/api/website/profile/preferences",
    enabled: true,
  });

  // Check for any errors
  const hasError = fetchError || preferenceError;
  
  if (isFetchingProfileInfo || isFetchingPreferenceInfo) {
    return (
      <div className="space-y-6">
        <CustomHeader
          title="Personal Overview"
          description="Manage your profile information and partner preferences"
    
        />
        <Loader />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="space-y-6">
        <CustomHeader
          title="Personal Overview"
          description="Manage your profile information and partner preferences"
        />
        
         <EmptyState
          title="No Profile Information"
          description="You haven't set up your profile yet. Start by adding your basic information and preferences."
          image={images.emptyProfile}
          action={
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Link 
                href="./overview/edit"
                className="bg-primary-color1 hover:bg-primary-color2 flex items-center text-white p-2 rounded-sm"
              >
                <User className="w-4 h-4 mr-2" />
                Set Profile Info
              </Link>
            </div>
          }
        />
      </div>
    );
  }


  const profileData = profileInfo?.data || {};
  const preferenceData = preferenceInfo?.data || {};
  
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

 

      {profileSectionsConfig.map((section) => (
        <ProfileSection
          key={section.title}
          title={section.title}
          icon={section.icon}
          personalData={profileData}
          seekingData={preferenceData}
          fields={section.fields}
        />
      ))}
    </div>
  );
};

export default OverviewPage;