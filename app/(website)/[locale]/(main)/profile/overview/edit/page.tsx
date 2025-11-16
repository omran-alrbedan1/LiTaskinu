"use client";

import React from "react";
import Link from "next/link";
import { ProfileHeader } from "../../_components";
import { ArrowLeft, Save } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Hooks
import { useProfileForm } from "@/hooks/useProfileForm";

// Constants
import SubmitButton from "@/components/Buttons/SubmitButton";
import { SectionContent } from "../_components";
import { PROFILE_SECTIONS } from "../constants/form-sections-profile";

const EditPersonalDataPage = () => {
  const {
    formData,
    isLoading,
    error,
    handleInputChange,
    handleCheckboxChange,
    handleSubmit,
  } = useProfileForm();

  return (
    <div className="space-y-6 ">
      <div className="flex items-center gap-4 mt-3">
        <ProfileHeader
          title="Edit Personal Information"
          description="Update your personal details and information"
          backLink="../overview"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Accordion type="multiple" className="space-y-4">
          {PROFILE_SECTIONS.map((section) => (
            <AccordionItem
              key={section?.id}
              value={section?.id ?? ""}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 text-left">
                  <section.icon className="w-5 h-5 text-primary-color1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {section?.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {section?.description}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-6 pt-4">
                <SectionContent
                  section={section}
                  formData={formData}
                  onInputChange={handleInputChange}
                  onCheckboxChange={handleCheckboxChange}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-end gap-3 items-center pt-6 border-t border-gray-200">
          <Link
            href="../overview"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </Link>

          <SubmitButton
            isLoading={isLoading}
            loadingText="Saving.."
            type="submit"
            icon={Save}
            className="w-fit"
          >
            Save Changes
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default EditPersonalDataPage;
