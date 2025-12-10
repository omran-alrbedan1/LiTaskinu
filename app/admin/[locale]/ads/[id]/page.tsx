"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/admin/shared";
import useGetData from "@/hooks/useGetData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Globe,
  Eye,
  Image as ImageIcon,
  Crown,
  Edit,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { useLocale } from "next-intl";
import useDeleteData from "@/hooks/useDeleteData";

const AdDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const adId = params.id as string;

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

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

  // Delete ad mutation
  const {
    deleteData,
    loading: isDeleting,
    error: deleteError,
  } = useDeleteData(`/api/admin/ads/${adId}`, {
    showNotifications: true,
    successMessage: "Advertisement deleted successfully",
    errorMessage: "Failed to delete advertisement",
    onSuccess: () => {
      router.push(`/admin/${locale}/ads`);
    },
  });

  // Set ad for deletion confirmation
  useEffect(() => {
    if (ad) {
      setSelectedAd(ad);
    }
  }, [ad]);

  const handleDelete = async () => {
    if (selectedAd) {
      await deleteData();
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not set";
    try {
      return format(new Date(dateString), "PPP");
    } catch {
      return "Invalid date";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-500">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="secondary" className="bg-gray-500">
            Inactive
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPremiumBadge = (isPremium: boolean | number) => {
    const isPremiumValue = Boolean(isPremium);
    return (
      <Badge
        variant={isPremiumValue ? "default" : "outline"}
        className={isPremiumValue ? "bg-yellow-500" : ""}
      >
        <Crown className="w-3 h-3 mr-1" />
        {isPremiumValue ? "Premium Only" : "All Users"}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">
              Loading advertisement details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <Eye className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Advertisement Not Found
          </h3>
          <p className="text-gray-600 text-center max-w-md">
            {error ||
              "The advertisement you're looking for doesn't exist or has been removed."}
          </p>
          <Link href={`/admin/${locale}/ads`}>
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Ads
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!ad) {
    return null;
  }

  return (
    <div className="max-h-[90vh] overflow-auto sidebar-scrollbar p-8">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Link href={`/admin/${locale}/ads`}>
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <Header
              title={locale === "ar" ? ad.title.ar : ad.title.en}
              description={`Advertisement ID: ${ad.id}`}
            />
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/admin/${locale}/ads/edit/${adId}`}>
              <Button variant="outline" className="gap-2">
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            </Link>
            <Button
              variant="destructive"
              className="gap-2"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={isDeleting}
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Ad Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Ad Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  {ad.image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${ad.image}`}
                      alt={locale === "ar" ? ad.title.ar : ad.title.en}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Content Card */}
            <Card>
              <CardHeader>
                <CardTitle>Ad Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      English Version
                    </h4>
                    <h3 className="text-xl font-semibold mb-2">
                      {ad.title.en}
                    </h3>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {ad.content.en}
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Arabic Version
                    </h4>
                    <h3
                      className="text-xl font-semibold mb-2 text-right"
                      dir="rtl"
                    >
                      {ad.title.ar}
                    </h3>
                    <p
                      className="text-gray-700 text-right whitespace-pre-wrap"
                      dir="rtl"
                    >
                      {ad.content.ar}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Metadata */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Status & Visibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  {getStatusBadge(ad.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Target Users</span>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-500">
                    Created: {formatDate(ad.created_at)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Last Updated: {formatDate(ad.updated_at)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Start Date
                  </p>
                  <p className="font-medium">{formatDate(ad.start_date)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    End Date
                  </p>
                  <p className="font-medium">{formatDate(ad.end_date)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Countries Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Target Countries
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetailPage;
