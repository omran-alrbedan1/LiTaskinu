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
} from "lucide-react";
import Link from "next/link";
import { ProfileHeader } from "../_components";
import { EmptyState } from "@/components/shared";
import { images } from "@/constants/images";
import CustomHeader from "@/components/shared/CustomHeader";

const mockUserInterests = {
  interests: ["Reading", "Traveling", "Photography", "Cooking"],
  food: ["Italian", "Japanese", "Mexican", "Vegetarian"],
  music: ["Rock", "Jazz", "Classical", "Pop"],
  sports: ["Football", "Basketball", "Swimming", "Hiking"],
};

const InterestsPage = () => {
  const { interests, food, music, sports } = mockUserInterests;

  const Section = ({
    title,
    items,
    icon: Icon,
  }: {
    title: string;
    items: string[];
    icon: React.ComponentType<any>;
  }) => (
    <Card className="hover:shadow-md shadow-sm transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-primary-color1">
              {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2">
          {items.length > 0 ? (
            items.map((item, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 text-sm font-normal"
              >
                {item}
              </Badge>
            ))
          ) : (
            <div className="text-center py-6 mx-auto">
              <p className="text-muted-foreground text-sm mb-3">
                No {title.toLowerCase()} selected
              </p>
              <Link href="./interest/edit">
                <Button variant="outline" size="sm">
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const hasNoInterests =
    interests.length === 0 &&
    food.length === 0 &&
    music.length === 0 &&
    sports.length === 0;

  return (
    <div className="min-h-screen">
      <div className="   space-y-8">
        {/* Header Section */}
        <CustomHeader
          title="My Interests"
          description="Discover my hobbies, preferences, and passions"
          action={{
            label: "Edit Interests",
            href: "./interest/edit",
            icon: Edit,
          }}
          condition={!hasNoInterests}
        />

        {/* Interests Grid - Show when there ARE interests */}
        {!hasNoInterests && (
          <div className="grid gap-6">
            <Section
              title="Hobbies & Interests"
              items={interests}
              icon={Heart}
            />
            <Section
              title="Favorite Food"
              items={food}
              icon={UtensilsCrossed}
            />
            <Section title="Music Preferences" items={music} icon={Music} />
            <Section
              title="Sports & Activities"
              items={sports}
              icon={Dumbbell}
            />
          </div>
        )}

        {/* Empty State - Show when there are NO interests */}
        {hasNoInterests && (
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
