"use client";

import { useParams, useRouter } from "next/navigation";
import useGetData from "@/hooks/useGetData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Globe,
  Image as ImageIcon,
  Clock, TrendingUp, Globe2, MoreVertical,
  Edit,
  Trash2
} from "lucide-react";
import Image from "next/image";
import { useLocale } from "next-intl";
import useDeleteData from "@/hooks/useDeleteData";
import Loader from "@/components/shared/Loader";
import { Separator } from "@/components/ui/separator";
import ReactCountryFlag from "react-country-flag";
import { calculateDaysRemaining, formatDate, formatDateTime } from "@/utils/format";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import DeleteModal from "@/components/admin/shared/DeleteModal";
import CustomPremiumIcon from "@/components/shared/PremiumIcon";
import CustomHeader from "@/components/shared/CustomHeader";
import StatusBadge from "@/components/shared/StatusBadge";

const AdDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const adId = params.id as string;

  // Fetch ad data
  const {
    data: ad,
    loading: isLoading,
    error,
    refetch,
  } = useGetData<Ad>({
    url: `/api/admin/ads/${adId}`,
    enabled: !!adId,
  });

  // Use the delete hook
  const {
    handleDelete,
    confirmDelete,
    cancelDelete,
    loading: isDeleting,
    error: deleteError,
    isDeleteModalOpen,
    selectedItem,
  } = useDeleteData<Ad>(`/api/admin/ads`, {
    showNotifications: true,
    successMessage: "Advertisement deleted successfully",
    errorMessage: "Failed to delete advertisement",
    onDeleteSuccess: () => {
      router.push(`/admin/ads`);
    },
  });

  // Initialize delete for this ad
  const handleDeleteClick = () => {
    if (ad) {
      handleDelete(ad, ad.id);
    }
  };

  if (isLoading) return <Loader />;
  if (!ad) {
    return null;
  }

  return (
    <div className="max-h-[90vh] overflow-auto sidebar-scrollbar p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Delete Modal */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          isLoading={isDeleting}
          title="Delete Advertisement"
          itemName={selectedItem?.title?.en || "this advertisement"}
          description="This action cannot be undone. All associated data will be permanently removed from the system."
        />

        <CustomHeader
          title="Advertisement Details"
          description="View and manage the details of this advertisement"
          backLink={`/admin/ads`}

        >
          {/* Dropdown Menu for Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-46">


              <DropdownMenuItem asChild>
                <Link href={`/admin/ads/${adId}/edit`} className="flex items-center cursor-pointer">
                  <Edit className="w-4 h-4 mr-2 text-green-500" />
                  Edit Advertisement
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleDeleteClick}
                className="text-red-600 focus:text-red-600 cursor-pointer"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Advertisement
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CustomHeader>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Image & Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Card */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ImageIcon className="w-5 h-5 text-primary-color1" />
                    Advertisement Visual
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
                  {ad.image ? (
                    <>
                      <div className="absolute top-0 left-0 z-50 m-2">
                        {
                          ad.is_premium &&
                          <CustomPremiumIcon
                            size={58}
                            variant={'floating'}
                            animation={'sparkle'}
                            intensity={'strong'}
                          />
                        }
                      </div>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${ad.image}`}
                        alt={locale === "ar" ? ad.title.ar : ad.title.en}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                      />
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full space-y-3">
                      <ImageIcon className="w-16 h-16 text-gray-400" />
                      <p className="text-gray-500">No image available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Content Card */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Content Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* English Version */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      English Version
                    </h3>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-6 space-y-4">
                    <div>
                      <p className="text-sm font-medium text-blue-600 mb-2">
                        Title
                      </p>
                      <h4 className="text-xl font-bold text-gray-900">
                        {ad.title.en}
                      </h4>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-600 mb-2">
                        Content
                      </p>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap bg-white p-4 rounded-lg border border-blue-100">
                        {ad.content.en}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Arabic Version */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-green-500" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Arabic Version
                    </h3>
                  </div>
                  <div
                    className="bg-green-50 rounded-xl p-6 space-y-4"
                    dir="rtl"
                  >
                    <div>
                      <p className="text-sm font-medium text-green-600 mb-2 text-right">
                        العنوان
                      </p>
                      <h4 className="text-xl font-bold text-gray-900 text-right">
                        {ad.title.ar}
                      </h4>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-600 mb-2 text-right">
                        المحتوى
                      </p>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-right bg-white p-4 rounded-lg border border-green-100">
                        {ad.content.ar}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Metadata */}
          <div className="space-y-6">
            {/* Schedule Card */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-color1" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Start Date
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {formatDate(new Date(ad.start_date))}
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        End Date
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {formatDate(new Date(ad.end_date))}
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  </div>

                  <div className="pt-4 border-t">

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Remaining Days
                      </span>
                      <span className="text-sm font-semibold text-primary-color1">
                        {calculateDaysRemaining(ad.end_date)}{" "}
                        days
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Countries Card */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary-color1" />
                  Target Countries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ad.countries?.map((country:Country) => (
                    <div
                      key={country.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center">
                          <ReactCountryFlag
                            countryCode={country.code}
                            svg
                            style={{ width: "1.6em", height: "1.6em" }}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {country.name.en}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ad Information Card */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-color1" />
                  Advertisement Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Advertisement ID</p>
                    <p className="font-mono font-bold text-gray-900">{ad.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Type</p>
                    <StatusBadge
                      status={ad.is_premium ? "Premium" : "Standard"}
                      variant={ad.is_premium ? "premium" : "standard"}
                      size="sm"
                      showIcon
                      className="px-3 py-1.5"
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Created At</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">
                        {formatDateTime(new Date(ad.created_at))}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Last Updated</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">
                        {formatDateTime(new Date(ad.updated_at))}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Current Status
                    </span>
                    <StatusBadge
                      status={ad.status}
                      size="sm"
                      showIcon
                      className="px-3 py-1.5"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetailPage;