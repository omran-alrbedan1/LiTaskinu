// app/edit-profile/page.tsx
"use client";

import EditProfileForm from "@/components/user/forms/EditProfileForm";
import React from "react";

const EditProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-h-screen overflow-y-auto hide-scrollbar pb-12">
        <EditProfileForm />
      </div>
    </div>
  );
};

export default EditProfilePage;
