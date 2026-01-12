"use client";

import { Mail, Calendar, MapPin, User, Camera, Edit, Phone } from "lucide-react";
import Image from "next/image";
import useGetData from "@/hooks/useGetData";
import Loader from "@/components/shared/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomHeader from "@/components/shared/CustomHeader";
import { images } from "@/constants/images";


const ProfilePage = () => {


  // Fetch user data
  const { data: userData, loading: dataLoading } = useGetData<BasicProfileInfo>({
    url: "/api/website/profile/basic",
  });

  const userInfo = userData?.data || {};
  const personalPhoto = userInfo?.documents?.personal_photo;
  const additionalImagesData = userInfo?.documents?.images || [];


  if (dataLoading) {
    return (
      <div className="mx-auto max-h-[85vh] overflow-y-auto sidebar-scrollbar p-4 pb-12">
        <CustomHeader
          title="Personal Information"
          description="View and manage your personal information"

        />
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-auto ">
      {/* Header */}
      <CustomHeader
        title="Personal Information"
        description="View and manage your personal information"
        action={{
          label: "Edit Profile",
          href: "./account/edit",
          icon: Edit,
        }}
      />

      {/* Personal Photo Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Camera className="w-5 h-5" />
            <CardTitle>Profile Photo</CardTitle>
          </div>
          <CardDescription>Your personal profile image</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              {personalPhoto ? (
                <AvatarImage
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${personalPhoto}`}
                  alt={`${userInfo.first_name || 'User'} profile`}
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                  <Image
                    src={images.Unknown}
                    alt={`unknown`}
                    className="object-cover"
                  />
                </AvatarFallback>
              )}
            </Avatar>
            <p className="text-sm text-muted-foreground text-center">
              This photo appears on your profile and in communications
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5" />
            <CardTitle>Basic Information</CardTitle>
          </div>
          <CardDescription>Your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem
              label="First Name"
              value={userInfo.first_name || "Not specified"}
            />
            <InfoItem
              label="Last Name"
              value={userInfo.last_name || "Not specified"}
            />
            <InfoItem
              label="Gender"
              value={userInfo.gender}
            />
            <InfoItem
              label="Date of Birth"
              value={userInfo.birth_day}
              icon={<Calendar className="w-4 h-4" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Location Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5" />
            <CardTitle>Location</CardTitle>
          </div>
          <CardDescription>Your geographic information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem
              label="Country"
              value={userInfo.country.name}
            />
            <InfoItem
              label="City"
              value={userInfo.city.name}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5" />
            <CardTitle>Contact Information</CardTitle>
          </div>
          <CardDescription>How to reach you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <InfoItem
            label="Email Address"
            value={userInfo.email || "Not specified"}
            icon={<Mail className="w-4 h-4" />}
            isEmail
          />
          <InfoItem
            label="Phone Number"
            value={userInfo.phone}
            icon={<Phone className="w-4 h-4" />}
          />
        </CardContent>
      </Card>

      {additionalImagesData?.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Camera className="w-5 h-5" />
              <CardTitle>Additional Images</CardTitle>
            </div>
            <CardDescription>Your uploaded images ({additionalImagesData?.length})</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {additionalImagesData?.map((image: string, index: number) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden border"
                >
                  <img
                    src={image}
                    alt={`Additional image ${index + 1}`}
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
};

interface InfoItemProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  isEmail?: boolean;
}

const InfoItem = ({ label, value, icon, isEmail }: InfoItemProps) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
    {isEmail ? (
      <a
        href={`mailto:${value}`}
        className="text-lg font-medium hover:text-primary transition-colors"
      >
        {value}
      </a>
    ) : (
      <p className="text-lg font-medium">{value}</p>
    )}
  </div>
);

export default ProfilePage;