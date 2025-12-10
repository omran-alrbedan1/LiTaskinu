"use client";

import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/admin/shared";
import useGetData from "@/hooks/useGetData";
import usePutData from "@/hooks/usePutData";
import { AdForm, AdFormSubmitData } from "../../_components/AdForm";
import { formatDateForSubmission } from "@/utils/format";

export default function EditAdPage() {
  const params = useParams();
  const router = useRouter();
  const adId = params.id as string;
  const locale = params.locale as string;

  // Fetch ad data
  const { data: adData, loading: isLoadingAd } = useGetData<Ad>({
    url: `/api/admin/ads/${adId}`,
    enabled: !!adId,
  }); 

  // Update ad hook
  const {
    putData,
    loading: isUpdating,
    error,
  } = usePutData<Ad>(`/api/admin/ads/${adId}`, {
    showNotifications: true,
    successMessage: "Advertisement updated successfully",
    errorMessage: "Failed to update advertisement",
    onSuccess: () => {
      router.push(`/admin/${locale}/ads`);
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

    // Append image file if exists
    if (data.imageFile) {
      formData.append("image", data.imageFile);
    }

    // Append ID for update
    formData.append("id", adId);

    await putData(formData);
  };

  // Transform API data to form format
  const transformAdData = (ad: Ad) => ({
    title_en: ad.title?.en || "",
    content_en: ad.content?.en || "",
    title_ar: ad.title?.ar || "",
    content_ar: ad.content?.ar || "",
    start_date: ad.start_date || "",
    end_date: ad.end_date || "",
    status: ad.status || "active",
    target_audience: ad.target_audience || "all",
    image: ad.image || "",
    id: ad.id,
  });

  if (isLoadingAd) {
    return (
      <div className="max-h-[90vh] overflow-auto sidebar-scrollbar p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-[90vh] overflow-auto sidebar-scrollbar p-8">
      <div className="mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Header
            title="Edit Advertisement"
            description="Update your advertisement details"
          />
        </div>

        <AdForm
          mode="edit"
          initialData={adData ? transformAdData(adData) : undefined}
          onSubmit={handleSubmit}
          isLoading={isUpdating}
          error={error ?? ""}
        />
      </div>
    </div>
  );
}
