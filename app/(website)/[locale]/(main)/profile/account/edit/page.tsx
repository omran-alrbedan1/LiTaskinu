import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ProfileHeader } from "../../_components";
import EditProfileForm from "./_components/EditProfileForm";

const EditProfilePage = () => {
  return (
    <div className="mx-auto max-h-[85vh] overflow-y-auto sidebar-scrollbar  pb-12">
      <div className="flex items-center gap-4 ">
        <Link
          href="../account"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-primary-color1" />
        </Link>
        <ProfileHeader
          title="Edit Personal Information"
          description="Update your personal  information"
        />
      </div>
      <EditProfileForm />
    </div>
  );
};

export default EditProfilePage;
