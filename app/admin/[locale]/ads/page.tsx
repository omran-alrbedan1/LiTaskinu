"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Plus,
  Search,
  Pause,
  Play,
  Trash2,
  Edit,
  MoreVertical,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Header, StatsCard } from "@/components/admin/shared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Image } from "antd";
import Link from "next/link";
import { EmptyState } from "@/components/shared";
import { images } from "@/constants/images";

const adsData = [
  {
    id: 1,
    title: "Premium Matchmaking Service",
    description: "Find your perfect match with our premium service",
    image: "/images/ads1.jpg",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
  },
  {
    id: 2,
    title: "Islamic Marriage Workshop",
    description: "Join our workshop for successful Islamic marriage",
    image: "/images/ads2.jpg",
    status: "paused",
    startDate: "2024-01-20",
    endDate: "2024-02-20",
  },
  {
    id: 3,
    title: "Family Counseling Services",
    description: "Professional counseling for married couples",
    image: "/images/ads3.jpg",
    status: "active",
    startDate: "2024-01-25",
    endDate: "2024-03-25",
  },
];

export default function AdsManagementPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [ads, setAds] = React.useState(adsData);

  // Filter ads based on search and status
  const filteredAds = ads.filter((ad) => {
    const matchesSearch =
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ad.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const toggleAdStatus = (adId: number) => {
    setAds(
      ads.map((ad) =>
        ad.id === adId
          ? { ...ad, status: ad.status === "active" ? "paused" : "active" }
          : ad
      )
    );
  };

  const deleteAd = (adId: number) => {
    if (confirm("Are you sure you want to delete this ad?")) {
      setAds(ads.filter((ad) => ad.id !== adId));
    }
  };

  // Statistics
  const totalAds = ads.length;
  const activeAdsCount = ads.filter((ad) => ad.status === "active").length;
  const pausedAdsCount = ads.filter((ad) => ad.status === "paused").length;

  // Check if there are filters applied
  const hasFilters = searchTerm || statusFilter !== "all";

  return (
    <div className="space-y-6 p-8 max-h-[90vh] overflow-auto sidebar-scrollbar">
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
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search ads by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Ads </option>
                <option value="active">Active </option>
                <option value="paused">Paused </option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredAds.map((ad) => (
          <Card key={ad.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Ad Image */}
                <div className="md:w-48 h-48 bg-gray-100 flex items-center justify-center border-b md:border-b-0 md:border-r">
                  <Image
                    src={ad.image}
                    alt={ad.title}
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Ad Details */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <CardTitle className="text-xl">{ad.title}</CardTitle>
                        <Badge
                          variant={
                            ad.status === "active" ? "default" : "secondary"
                          }
                          className={
                            ad.status === "active"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {ad.status === "active" ? "Active" : "Paused"}
                        </Badge>
                      </div>

                      <CardDescription className="text-base mb-3">
                        {ad.description}
                      </CardDescription>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium">Period:</span>
                        <span>
                          {ad.startDate} to {ad.endDate}
                        </span>
                      </div>
                    </div>

                    {/* Status Toggle - في الزاوية اليمنى */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAdStatus(ad.id)}
                        className={
                          ad.status === "active"
                            ? "text-red-600 hover:text-red-600 border-orange-200 hover:bg-red-50"
                            : "text-green-600 hover:text-green-600 border-green-200 hover:bg-green-50"
                        }
                      >
                        {ad.status === "active" ? (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Activate
                          </>
                        )}
                      </Button>

                      {/* Dropdown Menu for other actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2 text-blue-500" />
                            Edit Ad
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteAd(ad.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Ad
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State using the EmptyState component */}
      {filteredAds.length === 0 && (
        <EmptyState
          title={hasFilters ? "No ads found" : "No advertisements yet"}
          description={
            hasFilters
              ? "Try adjusting your search or filters to find what you're looking for."
              : "Get started by creating your first advertisement to reach your audience."
          }
          image={images.emptyAds}
          hasFilters={hasFilters}
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
