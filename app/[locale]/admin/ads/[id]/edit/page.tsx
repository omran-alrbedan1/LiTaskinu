"use client";

import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/admin/shared";
import useGetData from "@/hooks/useGetData";
import usePutData from "@/hooks/usePutData";
import { AdForm, AdFormSubmitData } from "../../_components/AdForm";
import { formatDateForSubmission } from "@/utils/format";
import Loader from "@/components/shared/Loader";

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
    
    // Append is_premium - convert string "0"/"1" to boolean
    const isPremium = data.formValues.is_premium === "1";
    formData.append("is_premium", isPremium.toString());

    if (data.formValues.country_ids && data.formValues.country_ids.length > 0) {
      data.formValues.country_ids.forEach((countryId, index) => {
        formData.append(`country_ids[${index}]`, countryId);
      });
    }
    if (data.imageFile) {
      formData.append("image", data.imageFile);
    }
    formData.append("id", adId);
    await putData(formData);
  };

  const transformAdData = (ad: Ad) => {
    const countryIds = ad.countries?.map(country => country.id.toString()) || [];
    
    const isPremiumValue = ad.is_premium ? "1" : "0";
    
    const transformed = {
      title_en: ad.title?.en || "",
      content_en: ad.content?.en || "",
      title_ar: ad.title?.ar || "",
      content_ar: ad.content?.ar || "",
      start_date: ad.start_date || "",
      end_date: ad.end_date || "",
      status: ad.status || "active",
      is_premium: isPremiumValue as "0" | "1",
      image: ad.image || "",
      id: ad.id,
      country_ids: countryIds, 
    };
    
    console.log("Transformed ad data:", transformed);
    return transformed;
  };

  if (isLoadingAd) {
    return <Loader/>
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
        />
      </div>
    </div>
  );
}