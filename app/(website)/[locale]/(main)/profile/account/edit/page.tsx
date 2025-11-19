import React from "react";
import { ProfileHeader } from "../../_components";
import EditProfileForm from "./_components/EditProfileForm";

const EditProfilePage = () => {
  return (
    <div className="mx-auto max-h-[85vh] overflow-y-auto sidebar-scrollbar p-4 pb-12">
      <ProfileHeader
        title="Edit Personal Information"
        description="Update your personal information"
        backLink="../account"
        showBackButton={true}
      />
      <EditProfileForm />
    </div>
  );
};

export default EditProfilePage;
