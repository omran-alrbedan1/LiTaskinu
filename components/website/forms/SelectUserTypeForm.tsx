"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ICONS } from "@/constants/icons";
import SubmitButton from "@/components/Buttons/SubmitButton";

interface UserTypeCardProps {
  title: string;
  description: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
}

const UserTypeCard: React.FC<UserTypeCardProps> = ({
  title,
  description,
  icon,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-primary-color1 bg-primary-color1/20 shadow-md"
          : "border-gray-700 bg-gray-800 hover:border-gray-600"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isSelected ? "bg-primary-color1/20" : "bg-gray-700"
          }`}
        >
          <Image src={icon} alt={title} width={24} height={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white text-lg mb-2">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            isSelected
              ? "border-primary-color1"
              : "border-gray-300 dark:border-gray-600"
          }`}
        >
          {isSelected && (
            <Image src={ICONS.selected} height={33} width={33} alt="selected" />
          )}
        </div>
      </div>
    </div>
  );
};

const SelectUserTypeForm = () => {
  const [selectedUserType, setSelectedUserType] = useState<string>("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userTypes = [
    {
      id: "regular",
      title: "Regular user",
      description: "I'm registering for myself as a regular user",
      icon: ICONS.user,
    },
    {
      id: "guardian",
      title: "Guardian",
      description: "I'm registering as a guardian for someone else",
      icon: ICONS.guardian,
    },
  ];

  const handleContinue = () => {
    if (!selectedUserType) return;

    router.push("./sign-up");
  };

  return (
    <div className="w-full max-w-md mx-auto p-6bg-gray-900 rounded-lg shadow-sm -mt-28 md:-mt-0">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Select user type</h1>
        <p className="text-gray-300 text-sm">
          Please select the user type you want to complete the process
          correctly.
        </p>
      </div>

      {/* User Type Cards */}
      <div className="space-y-4 mb-8">
        {userTypes.map((userType) => (
          <UserTypeCard
            key={userType.id}
            title={userType.title}
            description={userType.description}
            icon={userType.icon}
            isSelected={selectedUserType === userType.id}
            onClick={() => setSelectedUserType(userType.id)}
          />
        ))}
      </div>

      <SubmitButton
        onClick={handleContinue}
        isLoading={isLoading}
        className="w-full"
      >
        Continue
      </SubmitButton>
    </div>
  );
};

export default SelectUserTypeForm;
