"use client";

import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/admin/shared";
import usePostData from "@/hooks/usePostData";
import { formatDateForSubmission } from "@/utils/format";
import { AdForm, AdFormSubmitData } from "../_components/AdForm";

export default function CreateAdPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const {
    postData,
    loading: isLoading,
    error,
  } = usePostData<Ad>("/api/admin/ads", {
    showNotifications: true,
    successMessage: "Advertisement created successfully",
    errorMessage: "Failed to create advertisement",
    onSuccess: () => {
      router.push(`/admin/ads`);
    },
  });

  const handleSubmit = async (data: AdFormSubmitData) => {
    const formData = new FormData();

    // Append multilingual title and content
    formData.append("title[en]", data.formValues.title_en);
    formData.append("content[en]", data.formValues.content_en);
    formData.append("title[ar]", data.formValues.title_ar);
    formData.append("content[ar]", data.formValues.content_ar);

    // Append schedule and settings
    formData.append(
      "start_date",
      formatDateForSubmission(data.formValues.start_date || "")
    );
    formData.append(
      "end_date",
      formatDateForSubmission(data.formValues.end_date || "")
    );
    formData.append("status", data.formValues.status);

    formData.append("is_premium", data.formValues.is_premium);

    if (data.formValues.country_ids && data.formValues.country_ids.length > 0) {
      data.formValues.country_ids.forEach((countryId: string) => {
        formData.append("country_ids[]", countryId);
      });
    } else {
      formData.append("country_ids[]", "");
    }

    // Append image file if exists
    if (data.imageFile) {
      formData.append("image", data.imageFile);
    }

    await postData(formData);
  };

  return (
    <div className="max-h-[90vh] overflow-auto sidebar-scrollbar p-8">
      <div className="mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Header
            title="Create New Advertisement"
            description="Add a new advertisement to reach your audience"
          />
        </div>

        <AdForm
          mode="create"
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
