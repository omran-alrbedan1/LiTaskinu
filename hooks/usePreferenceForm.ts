"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import usePostData from "@/hooks/usePostData";
import { PreferenceFormData, preferenceSchema } from "@/validation/preference-schema";

export const usePreferenceForm = () => {
  const {
    postData,
    loading: isLoading,
    error,
    success,
  } = usePostData("/api/preferences/update", {
    showNotifications: true,
    successMessage: "Preferences updated successfully",
    errorMessage: "Failed to update preferences",
  });

  const form = useForm<PreferenceFormData>({
    resolver: zodResolver(preferenceSchema),
    defaultValues: {
      // Basic Information
      religion: "Islam",
      religious_commitment: "medium",
      marital_status: "single",
      children_count: 0,
      born_reverted: "born_muslim",
      
      // Appearance
      hair_color: "",
      eye_color: "",
      height: "",
      weight: "",
      body_style: "",
      
      // Lifestyle - use string values for radio buttons
      is_sporty: "",
      is_smoker: "",
      has_house: "",
      house_type: "",
      has_vehicle: "",
      willing_to_relocate: "",
      
      // Career & Education
      job: "",
      education: "",
      employment_status: "",
      living_situation: "",
      
      // Family & Preferences
      want_more_children: "",
      wear_hijab: "",
      polygamy: "",
      profile_creator: "",
      
      // Languages
      languages_spoken: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    // Convert radio button string values to numbers for backend
    const formattedData = {
      ...data,
      is_sporty: data.is_sporty ? Number(data.is_sporty) : undefined,
      is_smoker: data.is_smoker ? Number(data.is_smoker) : undefined,
      has_house: data.has_house ? Number(data.has_house) : undefined,
      has_vehicle: data.has_vehicle ? Number(data.has_vehicle) : undefined,
      willing_to_relocate: data.willing_to_relocate ? Number(data.willing_to_relocate) : undefined,
    };
    
    await postData(formattedData);
  });

  return {
    form,
    isLoading,
    error,
    success,
    handleSubmit,
  };
};