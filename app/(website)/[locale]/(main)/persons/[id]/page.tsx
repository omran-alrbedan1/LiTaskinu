"use client";

import React, { useState } from "react";
import { Button } from "antd";
import { images } from "@/constants/images";
import Image from "next/image";
import { useParams } from "next/navigation";
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
  FaCamera,
} from "react-icons/fa";
import { mockPhotos, userData } from "@/constants/temporary";
import { MdBlock } from "react-icons/md";
import { DetailItem, PhotoGallery } from "@/components/shared";
import { ChatRequestModal } from "../_components";

const PersonDetailPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const personData = userData;

  const handleSendRequest = () => {
    setIsModalOpen(true);
    console.log("send request to " + personData.name);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen pt-8 pb-32 bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              {/* Profile Header */}
              <div className="text-center gap-8 flex mb-6">
                <div className="relative inline-block mb-4">
                  <Image
                    src={personData.photo || images.Unknown}
                    height={100}
                    width={100}
                    alt={personData.name}
                    className="rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>

                <div className="flex flex-col items-center justify-center gap-2 mb-2">
                  <h1 className="text-xl font-bold text-gray-900">
                    {personData.name}
                  </h1>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">
                      {personData.phone}
                    </p>
                    <p className="text-gray-600 text-sm">{personData.email}</p>
                  </div>
                </div>
              </div>

              {/* Photos Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FaCamera className="text-primary-color1 w-4 h-4" />
                  <span className="text-sm font-medium text-gray-700">
                    The Photos
                  </span>
                </div>
                <PhotoGallery photos={mockPhotos} />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  icon={<FaHeart />}
                  type="primary"
                  className="w-full !py-4"
                >
                  Send Interest
                </Button>

                <Button
                  icon={<MdBlock />}
                  variant="solid"
                  color="danger"
                  className="w-full !py-4"
                >
                  Send Interest
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                The Information :
              </h2>

              {/* Introduction */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Introduction
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {personData.introduction}
                </p>
              </div>

              {/* Personal Details */}
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

              {/* Chat Section */}
              <div className="border-t pt-6">
                <div className="flex items-center gap-4">
                  <Button
                    icon={<FaHeart />}
                    type="primary"
                    className="!w-14  !py-5"
                  />

                  <Button
                    onClick={handleSendRequest}
                    type="primary"
                    className="w-full !py-5"
                  >
                    Chat with {personData.name}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Request Modal */}
      <ChatRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userName={personData.name}
      />
    </div>
  );
};

export default PersonDetailPage;
