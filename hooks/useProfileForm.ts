
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import usePostData from "@/hooks/usePostData";
import { ProfileFormData, profileSchema } from "@/validation/profile-schema";

export const useProfileForm = () => {
  const {
    postData,
    loading: isLoading,
    error,
    success,
  } = usePostData("/api/website/profile/info", {
    showNotifications: true,
    successMessage: "Profile updated successfully",
    errorMessage: "Failed to update profile",
  });

  const form = useForm<ProfileFormData>({
    //@ts-ignore
    resolver: zodResolver(profileSchema),
    defaultValues: {
      religion: "Islam",
      religious_commitment: "high",
      marital_status: "single",
      children_count: 0,
      born_reverted: "born_muslim",
      
      hair_color: "Brown",
      eye_color: "Brown",
      height: "175.50",
      weight: "70.25",
      body_style: "Slim",
      
      // Lifestyle
      is_sporty: 1,
      is_smoker: 0,
      has_house: 1,
      house_type: "ownership",
      has_vehicle: 1,
      willing_to_relocate: 1,
      
      // Career & Education
      job: "Software Engineer",
      education: "Bachelor's Degree",
      employment_status: "Full Time",
      living_situation: "Live Alone",
      
      // Family & Preferences
      want_more_children: "yes",
      wear_hijab: "yes",
      polygamy: "maybe",
      profile_creator: "self",
      
      // Languages & About
      languages_spoken: "English, Arabic",
      bio: "Passionate about technology and fitness. I enjoy coding, reading, and outdoor adventures.",
      partner_description: "Looking for someone supportive, caring, and open-minded to build a strong future together.",
      partner_preferences: "Kind, family-oriented, educated, and willing to travel.",
    },
  });

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
    isLoading,
    error,
    success,
    handleSubmit,
  };
};