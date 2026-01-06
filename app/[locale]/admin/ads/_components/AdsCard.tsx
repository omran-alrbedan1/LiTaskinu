// app/admin/ads/_components/AdsCard.tsx
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pause, Play, MoreVertical, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { Image } from "antd";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomPremiumIcon from "@/components/shared/PremiumIcon";

interface AdsCardProps {
  ad: Ad;
  onToggleStatus: () => void;
  onDelete: (ad: Ad, id: number) => void;
  isToggling?: boolean;
}

export default function AdsCard({
  ad,
  onToggleStatus,
  onDelete,
  isToggling = false,
}: AdsCardProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleToggleClick = async () => {
    setIsLoading(true);
    try {
      await onToggleStatus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card key={ad.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Ad Image */}
          <div className="md:w-48 h-48 relative bg-gray-100 flex items-center justify-center border-b md:border-b-0 md:border-r">
            <div className="flex items-center absolute top-0 left-0 z-50 gap-2 m-2">
              {
                ad.is_premium &&
                <CustomPremiumIcon
                  size={28}
                  variant={'floating'}
                  animation={'sparkle'}
                  intensity={'strong'}
                />
              }
            </div>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${ad.image}`}
              alt={ad.title.en}
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
                  <CardTitle className="text-xl">{ad.title.en}</CardTitle>
                  <Badge
                    variant={ad.status === "active" ? "default" : "secondary"}
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
                  {ad.content.en}
                </CardDescription>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium">Period:</span>
                  <span>
                    {
                      new Date(ad.start_date).toLocaleDateString()} to {new Date(ad.end_date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Status Toggle and Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleClick}
                  disabled={isLoading || isToggling}
                  className={
                    ad.status === "active"
                      ? "text-red-600 hover:text-red-600 border-orange-200 hover:bg-red-50"
                      : "text-green-600 hover:text-green-600 border-green-200 hover:bg-green-50"
                  }
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : ad.status === "active" ? (
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
                    {/* View Ad Link */}
                    <DropdownMenuItem>
                      <Link
                        href={`./ads/${ad.id}`}
                        className="flex items-center w-full"
                      >
                        <Eye className="w-4 h-4 mr-2 text-blue-500" />
                        View Ad Details
                      </Link>
                    </DropdownMenuItem>

                    {/* Edit Ad Link */}
                    <DropdownMenuItem>
                      <Link
                        href={`./ads/${ad.id}/edit`}
                        className="flex items-center w-full"
                      >
                        <Edit className="w-4 h-4 mr-2 text-green-500" />
                        Edit Ad
                      </Link>
                    </DropdownMenuItem>

                    {/* Delete Action */}
                    <DropdownMenuItem
                      onClick={() => onDelete(ad, ad.id)}
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
  );
}