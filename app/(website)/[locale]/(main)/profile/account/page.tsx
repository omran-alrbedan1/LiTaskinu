// src/app/profile/page.tsx
"use client";

import { useState } from "react";
import { Button } from "antd";
import {
  EditOutlined,
  MailOutlined,
  PhoneOutlined
} from "@ant-design/icons";
import { images } from "@/constants/images";
import Image from "next/image";
import { PhotoGallery, ProfileHeader } from "../_components";
import { useRouter } from "next/navigation";
import { mockPhotos, userData } from "@/constants/temporary";
import {
  FaGraduationCap,
  FaBriefcase,
  FaUserTie,
  FaWeight,
  FaRulerVertical,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaChurch,
  FaHeart,
  FaBook,
} from "react-icons/fa";
import { DetailItem } from "@/components/shared";

const ProfilePage = () => {
  const router = useRouter();

  const [photos, setPhotos] = useState<Photo[]>(mockPhotos);

  const handlePhotoUpload = async (files: File[]) => {
    const newPhotos: Photo[] = files.map((file, index) => ({
      id: Date.now() + index + "",
      url: URL.createObjectURL(file),
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const handlePhotoDelete = (photoId: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <ProfileHeader
        title="Personal information"
        description="manage your personal information and preferences"
      >
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => router.push("./edit")}
        >
          Edit Profile
        </Button>
      </ProfileHeader>

      <div className="bg-white max-h-screen overflow-y-scroll hide-scrollbar pb-44 rounded-xl shadow-sm border border-gray-200/60 p-6">
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
            <PhotoGallery
              photos={photos}
              onPhotoUpload={handlePhotoUpload}
              onPhotoDelete={handlePhotoDelete}
            />
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

        {/* Personal Details Grid */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DetailItem
              icon={<FaGraduationCap />}
              label="Education"
              value={userData.details.education}
            />
            <DetailItem
              icon={<FaBriefcase />}
              label="Occupation"
              value={userData.details.occupation}
            />
            <DetailItem
              icon={<FaUserTie />}
              label="Job Title"
              value={userData.details.jobTitle}
            />
            <DetailItem
              icon={<FaWeight />}
              label="Weight"
              value={userData.details.weight}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Height"
              value={userData.details.height}
            />
            <DetailItem
              icon={<FaBirthdayCake />}
              label="Age"
              value={userData.details.age}
            />
            <DetailItem
              icon={<FaMapMarkerAlt />}
              label="Place"
              value={userData.details.place}
            />
            <DetailItem
              icon={<FaChurch />}
              label="Religion"
              value={userData.details.religion}
            />
            <DetailItem
              icon={<FaHeart />}
              label="Marital Status"
              value={userData.details.maritalStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
