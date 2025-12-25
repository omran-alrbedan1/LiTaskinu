"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Eye, Plus, Pause, Play } from "lucide-react";
import { Header, StatsCard } from "@/components/admin/shared";
import Link from "next/link";
import { EmptyState } from "@/components/shared";
import { images } from "@/constants/images";
import useGetData from "@/hooks/useGetData";
import useDeleteData from "@/hooks/useDeleteData";
import DeleteModal from "@/components/admin/shared/DeleteModal";
import { AdsCard, AdsCardSkeleton } from "./_components";
import StatsCardSkeleton from "@/components/shared/StatsCardSkeleton";
import useToggleStatus from "@/hooks/useToggleStatus";

export default function AdsManagementPage() {

  const {
    data: ads,
    loading: isFetchingAds,
    error: fetchError,
    refetch: refetchAds,
  } = useGetData<Ad[]>({
    url: "/api/admin/ads",
    enabled: true,
  });

  const {
    handleDelete,
    confirmDelete,
    cancelDelete,
    loading: isDeleting,
    error: deleteError,
    isDeleteModalOpen,
    selectedItem,
  } = useDeleteData<Ad>("/api/admin/ads", {
    showNotifications: true,
    successMessage: "Advertisement deleted successfully",
    errorMessage: "Failed to delete advertisement",
    autoRefetch: true,
    onDeleteSuccess: () => {
      refetchAds();
    },
  });

  // toggle status  function  ality: 
  const { 
    toggleStatus, 
    loading: isToggling 
  } = useToggleStatus("/api/admin/ads/change-status", {
    showNotifications: true,
    successMessage: "Ad status updated successfully",
    errorMessage: "Failed to update ad status",
    onSuccess: () => {
      refetchAds();
    },
  });

  const handleToggleStatus = async (adId: number, currentStatus: string) => {
    await toggleStatus(currentStatus, adId.toString());
  };



  // Statistics
  const totalAds = ads?.length || 0;
  const activeAdsCount =
    ads?.filter((ad) => ad.status === "active").length || 0;
  const pausedAdsCount =
    ads?.filter((ad) => ad.status === "inactive").length || 0;


  return (
    <div className="space-y-6 p-8 max-h-[90vh] overflow-auto sidebar-scrollbar">
      {/* Custom Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Delete Advertisement"
        itemName={selectedItem?.title?.en || "this advertisement"}
        description="This action cannot be undone. All associated data will be permanently removed from the system."
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <Header
          title="Advertisements Management"
          description="Manage and control all platform advertisements"
        />
        <Link href="./ads/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create New Ad
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isFetchingAds ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <StatsCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            <StatsCard
              title="Total Ads"
              value={totalAds}
              icon={Eye}
              description="All platform ads"
              iconBgColor="from-blue-500 to-blue-600"
            />

            <StatsCard
              title="Active Ads"
              value={activeAdsCount}
              icon={Play}
              description="Currently running"
              iconBgColor="from-green-500 to-green-600"
            />

            <StatsCard
              title="Paused Ads"
              value={pausedAdsCount}
              icon={Pause}
              description="Temporarily stopped"
              iconBgColor="from-yellow-500 to-yellow-600"
            />
          </>
        )}
      </div>

      {/* Ads List - Show skeleton when loading */}
      <div className="space-y-4 !mt-8">
        {isFetchingAds
          ? Array.from({ length: 3 }).map((_, index) => (
              <AdsCardSkeleton key={index} />
            ))
          : ads?.map((ad) => (
              <AdsCard
                key={ad.id}
                ad={ad}
                onToggleStatus={() => handleToggleStatus(ad.id, ad.status)}
                onDelete={handleDelete}
                isToggling={isToggling}
              />
            ))}
      </div>

      {/* Empty State - Only show when not loading and no ads */}
      {!isFetchingAds && ads?.length === 0 && (
        <EmptyState
          title={ "No advertisements yet"}
          description={
            "Get started by creating your first advertisement to reach your audience."
          }
          image={images.emptyAds}
          action={
            <Link href="./ads/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create New Ad
              </Button>
            </Link>
          }
        />
      )}
    </div>
  );
}