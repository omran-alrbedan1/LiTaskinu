import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import usePostData from "@/hooks/usePostData";
import { PreferenceFormData, preferenceSchema } from "@/validation/preference-schema";
import useGetData from "@/hooks/useGetData";
import { useEffect } from "react";

export const usePreferenceForm = () => {
  // Fetch existing preference data
  const {
    data: preferenceInfo,
    loading: isFetching,
    error: fetchError,
    refetch: refetchPreferences,
  } = useGetData({
    url: "/api/website/profile/preferences",
    enabled: true,
  });

  const {
    postData,
    loading: isLoading,
    error: postError,
    success,
  } = usePostData("/api/website/profile/preferences", {
    showNotifications: true,
    successMessage: "Preferences updated successfully",
    errorMessage: "Failed to update preferences",
  });

  const form = useForm<PreferenceFormData>({
    //@ts-ignore
    resolver: zodResolver(preferenceSchema),
    defaultValues: {
      // Basic Preferences
      religion: "",
      marital_status: "single",
      born_reverted: "born_muslim",
      
      // Appearance Preferences
      hair_color: "Black",
      eye_color: "Brown",
      height: "",
      weight: "",
      body_style: "Slim",
      
      // Lifestyle Preferences
      job: "",
      is_smoker: false,
      children_count: 0,
      want_more_children: "yes",
      employment_status: "Full Time",
      living_situation: "Live Alone",
      has_house: true,
      house_type: "ownership",
      has_vehicle: true,
      is_sporty: true,
      willing_to_relocate: true,
      
      // Education & Language
      education: "Bachelor's Degree",
      language: "English, Arabic",
      languages_spoken: "English, Arabic",
      
      // Religious & Cultural
      religious_commitment: "high",
      wear_hijab: "yes",
      polygamy: "maybe",
      profile_creator: "self",
      
      // Descriptions
      partner_description: "",
      partner_preferences: "",
    },
  });

  // Populate form with existing data when fetched
  useEffect(() => {
    if (preferenceInfo?.data && !isFetching) {
      const preferenceData = preferenceInfo.data;
      
      form.reset({
        // Basic Preferences
        religion: preferenceData.religion || "Islam",
        marital_status: preferenceData.marital_status || "single",
        born_reverted: preferenceData.born_reverted || "born_muslim",
        
        // Appearance Preferences
        hair_color: preferenceData.hair_color || "Black",
        eye_color: preferenceData.eye_color || "Brown",
        height: preferenceData.height || "",
        weight: preferenceData.weight || "",
        body_style: preferenceData.body_style || "Slim",
        
        // Lifestyle Preferences
        job: preferenceData.job || "",
        is_smoker: preferenceData.is_smoker === "1" || preferenceData.is_smoker === 1,
        children_count: Number(preferenceData.children_count) || 0,
        want_more_children: preferenceData.want_more_children || "yes",
        employment_status: preferenceData.employment_status || "Full Time",
        living_situation: preferenceData.living_situation || "Live Alone",
        has_house: preferenceData.has_house === "1" || preferenceData.has_house === 1,
        house_type: preferenceData.house_type || "ownership",
        has_vehicle: preferenceData.has_vehicle === "1" || preferenceData.has_vehicle === 1,
        is_sporty: preferenceData.is_sporty === "1" || preferenceData.is_sporty === 1,
        willing_to_relocate: preferenceData.willing_to_relocate === "1" || preferenceData.willing_to_relocate === 1,
        
        // Education & Language
        education: preferenceData.education || "Bachelor's Degree",
        language: preferenceData.language || "English, Arabic",
        languages_spoken: preferenceData.languages_spoken || "English, Arabic",
        
        // Religious & Cultural
        religious_commitment: preferenceData.religious_commitment || "high",
        wear_hijab: preferenceData.wear_hijab || "yes",
        polygamy: preferenceData.polygamy || "maybe",
        profile_creator: preferenceData.profile_creator || "self",
        
        // Descriptions
        partner_description: preferenceData.partner_description || "",
        partner_preferences: preferenceData.partner_preferences || "",
      });
    }
  }, [preferenceInfo, isFetching, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    // Convert boolean-like fields back to numbers/strings for backend
    const formattedData = {
      ...data,
      is_smoker: data.is_smoker ? "1" : "0",
      has_house: data.has_house ? "1" : "0",
      has_vehicle: data.has_vehicle ? "1" : "0",
      is_sporty: data.is_sporty ? "1" : "0",
      willing_to_relocate: data.willing_to_relocate ? "1" : "0",
      children_count: String(data.children_count),
    };
    
    await postData(formattedData);
  });

  return {
    form,
    isLoading: isLoading || isFetching,
    error: postError || fetchError,
    success,
    handleSubmit,
    refetchPreferences,
  };
};