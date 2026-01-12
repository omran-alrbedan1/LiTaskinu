'use client'
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Heart,
  UtensilsCrossed,
  Music,
  Dumbbell,
  Plus,
  Film,
} from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/shared";
import { images } from "@/constants/images";
import CustomHeader from "@/components/shared/CustomHeader";
import useGetData from "@/hooks/useGetData";
import Loader from "@/components/shared/Loader";

const InterestsPage = () => {
  // Fetch user's selected interests from the "my" endpoint
  const {
    data: myInterests,
    loading: isFetchingInterests,
    error: fetchError,
    refetch: refetchInterests,
  } = useGetData<InterestData>({
    url: "/api/website/profile/interests/my",
    enabled: true,
  });

  // Extract category names from the API response
  const categoryNames: InterestCategory[] = myInterests?.data?.interests ? 
    Object.keys(myInterests.data.interests) as InterestCategory[] : [];

  // Check if any category has items
  const hasAnyInterests = categoryNames.some(
    (category: InterestCategory) => {
      const categoryData = myInterests?.data?.interests[category];
      return categoryData && Object.keys(categoryData).length > 0;
    }
  );

  // Get icon for each category
  const getCategoryIcon = (category: InterestCategory) => {
    switch (category) {
      case "Entertainment":
        return Film;
      case "Music":
        return Music;
      case "Food":
        return UtensilsCrossed;
      case "Sports":
        return Dumbbell;
      default:
        return Heart;
    }
  };

  const Section = ({
    category,
  }: {
    category: InterestCategory;
  }) => {
    const categoryData = myInterests?.data?.interests[category];
    const items: string[] = categoryData ? Object.values(categoryData) : [];

    if (items.length === 0) return null;

    const Icon = getCategoryIcon(category);

    return (
      <Card className="hover:shadow-md shadow-sm transition-shadow duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-primary-color1">
                {category}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {items.length} {items.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {items.map((item: string, index: number) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 text-sm font-normal"
              >
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Show loading state
    if (isFetchingInterests) return <Loader />;

  // Show error state
  if (fetchError) {
    return (
      <div className="min-h-screen">
        <CustomHeader
          title="My Interests"
          description="Discover my hobbies, preferences, and passions"
          action={{
            label: "Edit Interests",
            href: "./interest/edit",
            icon: Edit,
          }}
        />
        <div className="text-center py-12">
          <p className="text-destructive mb-4">Failed to load interests</p>
          <Button onClick={() => refetchInterests()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="space-y-8">
        {/* Header Section */}
        <CustomHeader
          title="My Interests"
          description="Discover my hobbies, preferences, and passions"
          action={{
            label: hasAnyInterests ? "Edit Interests" : "Add Interests",
            href: "./interest/edit",
            icon: hasAnyInterests ? Edit : Plus,
          }}
        />

        {hasAnyInterests ? (
          <div className="grid gap-6">
            {categoryNames.map((category: InterestCategory) => (
              <Section 
                key={category} 
                category={category} 
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Interests Added"
            description="Share your interests to connect with like-minded people"
            image={images.interest}
            action={
              <Link href="./interest/edit">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your Interests
                </Button>
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
};

export default InterestsPage;