"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Link as LinkIcon } from "lucide-react";
import CustomHeader from "@/components/shared/CustomHeader";

const HeroPreviewPage = () => {
  // This would typically come from your API/database
  const [heroContent] = useState<HeroContent>({
    title: "Find Your Perfect Match",
    subtitle:
      "Join thousands of successful marriages through our trusted platform",
    backgroundImage: "/images/landing_page.jpg",
    overlayOpacity: 50,
    textColor: "light",
    buttons: [
      {
        id: "1",
        text: "Get Started",
        link: "/signup",
        order: 1,
        variant: "default",
      },
      {
        id: "2",
        text: "Learn More",
        link: "/how-it-works",
        order: 2,
        variant: "outline",
      },
    ],
  });

  return (
    <div className="container max-h-screen overflow-auto     mx-auto p-4 md:p-6">
      {/* Header */}

      <CustomHeader
        title="Hero Section"
        description="Preview and manage your website's hero section"
        action={[
          {
            label: "View Live",
            href: "https://litaskunu.com",
            icon: Eye,
            variant: "outline",
          },
          {
            label: "Edit Hero",
            href: "./hero/edit",
            icon: Edit,
          },
        ]}
      />

      <div className="grid grid-cols-1  mt-8  lg:grid-cols-3 gap-8">
        {/* Left Column - Hero Preview */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent>
              {/* Full Hero Preview */}
              <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 shadow-xl">
                {/* Background Image with Overlay */}
                <div className="relative h-[400px] md:h-[500px]">
                  <div className="absolute inset-0 ">
                    {/* In real app, show actual image */}
                    {heroContent.backgroundImage ? (
                      <img
                        src={heroContent.backgroundImage}
                        className="h-full w-full"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600" />
                    )}

                    {/* Overlay */}
                    <div
                      className={`absolute inset-0 ${
                        heroContent.textColor === "light"
                          ? "bg-black"
                          : "bg-white"
                      }`}
                      style={{ opacity: heroContent.overlayOpacity / 100 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-center items-center p-6 text-center">
                    <h1
                      className={`text-4xl md:text-6xl font-bold mb-6 max-w-3xl ${
                        heroContent.textColor === "light"
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {heroContent.title}
                    </h1>
                    <p
                      className={`text-xl md:text-2xl mb-10 max-w-2xl ${
                        heroContent.textColor === "light"
                          ? "text-gray-200"
                          : "text-gray-700"
                      }`}
                    >
                      {heroContent.subtitle}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center">
                      {heroContent.buttons.map((button) => (
                        <Button
                          key={button.id}
                          size="lg"
                          className="min-w-[140px]"
                        >
                          {button.text}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Details & Actions */}
        <div className="space-y-6">
          {/* Buttons Card */}
          <Card>
            <CardHeader>
              <CardTitle>Call-to-Action Buttons</CardTitle>
              <CardDescription>
                {heroContent.buttons.length} buttons configured
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {heroContent.buttons.map((button) => (
                  <div
                    key={button.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                        {button.order}
                      </div>
                      <div>
                        <div className="font-medium">{button.text}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <LinkIcon className="h-3 w-3" />
                          {button.link}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Background Card */}
          <Card>
            <CardHeader>
              <CardTitle>Background Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-2">Text Color</div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full border ${
                        heroContent.textColor === "light"
                          ? "bg-gray-800"
                          : "bg-white"
                      }`}
                    />
                    <span className="capitalize">
                      {heroContent.textColor} Text
                    </span>
                  </div>
                </div>

                <div>
                  <div className="font-medium mb-2">Overlay Opacity</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${heroContent.overlayOpacity}%` }}
                        />
                      </div>
                    </div>
                    <span className="font-medium">
                      {heroContent.overlayOpacity}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeroPreviewPage;
