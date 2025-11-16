"use client";

import { useState } from "react";
import { Button } from "antd";
import { EditOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { images } from "@/constants/images";
import Image from "next/image";
import { PhotoGallery, ProfileHeader } from "../_components";
import { useRouter } from "next/navigation";
import { mockPhotos, userData } from "@/constants/temporary";
import { FaBook } from "react-icons/fa";

const ProfilePage = () => {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>(mockPhotos);

  const handlePhotoDelete = (photoId: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
  };

  return (
    <div className="space-y-6 max-h-[88vh] hide-scrollbar  overflow-clip p-4">
      {/* Header */}
      <ProfileHeader
        title="Personal information"
        description="manage your personal information and preferences"
        action={{
          label: "Edit Profile",
          href: "../profile/account/edit",
          icon: EditOutlined,
        }}
      />

      <div className="bg-white max-h-[80vh] pb-4 rounded-xl shadow-sm border border-gray-200/60 p-6">
        {/* Basic Information and photos */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* User Info Card */}
          <div className="lg:w-1/3 flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
            <Image
              src={userData.photo || images.Unknown}
              height={100}
              width={100}
              alt="User Avatar"
              className="rounded-full object-cover mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {userData.name}
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 justify-center">
                <MailOutlined className="text-primary-color1" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 justify-center">
                <PhoneOutlined className="text-primary-color1" />
                <span>{userData.phone}</span>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="lg:w-2/3">
            <PhotoGallery photos={photos} onPhotoDelete={handlePhotoDelete} />
          </div>
        </div>

        {/* Introduction */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FaBook className="text-primary-color1" />
            Introduction
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {userData.introduction}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
