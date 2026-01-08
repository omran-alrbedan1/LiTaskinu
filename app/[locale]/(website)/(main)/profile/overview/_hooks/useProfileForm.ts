import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import { useEffect } from "react";
import usePostData from "@/hooks/usePostData";
import useGetData from "@/hooks/useGetData";
import { ProfileFormData, profileSchema } from "@/validation/profile-schema";
import { toBoolean, toNumber } from "@/utils/format";

export const useProfileForm = () => {
  // Fetch existing profile data
  const {
    data: profileInfo,
    loading: isFetching,
    error: fetchError,
    refetch: refetchProfile,
  } = useGetData({
    url: "/api/website/profile/info",
    enabled: true,
  });

  const {
    postData,
    loading: isPosting,
    error: postError,
    success,
  } = usePostData("/api/website/profile/info", {
    showNotifications: true,
    onSuccess:()=>{
      refetchProfile()
    },
    successMessage: "Profile updated successfully",
    errorMessage: "Failed to update profile",
  });


  const form = useForm<ProfileFormData>({
    //@ts-ignore
    resolver: zodResolver(profileSchema),
    defaultValues: {
      // Basic Information
      religion: "",
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
      
      // Lifestyle
      is_sporty: 0,
      is_smoker: 0,
      has_house: 0,
      house_type: "",
      has_vehicle: 0,
      willing_to_relocate: 0,
      
      // Career & Education
      job: "",
      education: "",
      employment_status: "",
      living_situation: "",
      
      // Family & Preferences
      want_more_children: "not_sure",
      wear_hijab: "no",
      polygamy: "do_not_accept",
      profile_creator: "self",
      
      // Languages & About
      languages_spoken: "",
      bio: "",
      partner_description: "",
      partner_preferences: "",
    },
  });

  useEffect(() => {
    if (profileInfo?.data && !isFetching) {
      const profileData = profileInfo.data;
      
   
      form.reset({
        // Basic Information
        religion: profileData.religion || "",
        religious_commitment: profileData.religious_commitment || "medium",
        marital_status: profileData.marital_status || "single",
        children_count: toNumber(profileData.children_count),
        born_reverted: profileData.born_reverted || "born_muslim",
        
        // Appearance
        hair_color: profileData.hair_color || "",
        eye_color: profileData.eye_color || "",
        height: profileData.height || "",
        weight: profileData.weight || "",
        body_style: profileData.body_style || "",
        
        // Lifestyle
        is_sporty: toBoolean(profileData.is_sporty),
        is_smoker: toBoolean(profileData.is_smoker),
        has_house: toBoolean(profileData.has_house),
        house_type: profileData.house_type || "",
        has_vehicle: toBoolean(profileData.has_vehicle),
        willing_to_relocate: toBoolean(profileData.willing_to_relocate),
        
        // Career & Education
        job: profileData.job || "",
        education: profileData.education || "",
        employment_status: profileData.employment_status || "",
        living_situation: profileData.living_situation || "",
        
        // Family & Preferences
        want_more_children: profileData.want_more_children || "not_sure",
        wear_hijab: profileData.wear_hijab || "no",
        polygamy: profileData.polygamy || "do_not_accept",
        profile_creator: profileData.profile_creator || "self",
        
        // Languages & About
        languages_spoken: profileData.languages_spoken || "",
        bio: profileData.bio || "",
        partner_description: profileData.partner_description || "",
        partner_preferences: profileData.partner_preferences || "",
      });
    }
  }, [profileInfo, isFetching, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    // Convert boolean-like fields back to numbers for backend
    const formattedData = {
      ...data,
      is_sporty: data.is_sporty ? 1 : 0,
      is_smoker: data.is_smoker ? 1 : 0,
      has_house: data.has_house ? 1 : 0,
      has_vehicle: data.has_vehicle ? 1 : 0,
      willing_to_relocate: data.willing_to_relocate ? 1 : 0,
      children_count: Number(data.children_count) || 0,
    };
    
    await postData(formattedData);
  });

  return {
    form,
    isLoading: isFetching || isPosting,
    error: postError || fetchError,
    success,
    handleSubmit,
    refetchProfile,
  };
};
export type ProfileFormControl = Control<ProfileFormData>;