import React from "react";
import { ProfileHeader } from "../_components";

const PersonalityPage = () => {
  return (
    <div className="space-y-6">
      <ProfileHeader
        title="Personality Profile"
        description="Discover my personality, interests, and what makes me unique"
        backLink="/profile"
        action={{
          label: "Edit Personality",
          href: "./personality/edit",
        }}
      />
    </div>
  );
};

export default PersonalityPage;
