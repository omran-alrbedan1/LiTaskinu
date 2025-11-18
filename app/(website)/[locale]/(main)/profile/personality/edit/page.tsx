import React from "react";
import { ProfileHeader } from "../../_components";
import EditPersonalityForm from "./_components/EditPersonalityForm";

const EditPersonalityPage = () => {
  return (
    <div className="max-h-[85vh] overflow-y-auto sidebar-scrollbar  pb-12">
      <ProfileHeader
        title="Edit Personality Profile"
        description="Let your personality shine. Express yourself in your own words to give other users a better understanding of who you are. Answer at least 7 questions below to complete this section."
        backLink="../personality"
        showBackButton={true}
      />
      <EditPersonalityForm />
    </div>
  );
};

export default EditPersonalityPage;
