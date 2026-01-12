import React from "react";
import { Check, Users, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { images } from "@/constants/images";
import { getTranslations } from "next-intl/server";

// Constants for hardcoded values
const IMAGES = {
  FAMILY: images.aboutUs1,
  WEDDING: images.aboutUs2,
};

const Page = async () => {
  const t = await getTranslations("about");

  const CHECKLIST_ITEMS = [
    t("checklist.strict_adherence"),
    t("checklist.privacy_dignity"),
    t("checklist.family_involvement"),
  ];

  const SERVICES = [
    {
      icon: Users,
      title: t("services.unique_experience.title"),
      description: t("services.unique_experience.description"),
    },
    {
      icon: Shield,
      title: t("services.data_integrity.title"),
      description: t("services.data_integrity.description"),
    },
    {
      icon: Sparkles,
      title: t("services.islamic_vibes.title"),
      description: t("services.islamic_vibes.description"),
    },
  ];

  const STATS = [
    { value: "5,000+", label: t("stats.successful_matches") },
    { value: "50+", label: t("stats.countries_served") },
    { value: "95%", label: t("stats.success_rate") },
    { value: "24/7", label: t("stats.support_available") },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 text-center">
        <div className="inline-block mb-4 sm:mb-6">
          <span className="px-4 sm:px-6 py-2 bg-white dark:bg-gray-800 rounded-full text-xs sm:text-sm text-gray-600 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700">
            {t("header.platform_name")}
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6">
          {t("header.about_title")}
        </h1>
        
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
          {t("header.about_description")}
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-block mb-4 sm:mb-6">
                <span className="px-4 sm:px-5 py-2 bg-white dark:bg-gray-800 rounded-full text-xs sm:text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                  {t("mission.purpose")}
                </span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
                {t("mission.title")}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                {t("mission.description")}
              </p>
              
              {/* Check List */}
              <div className="space-y-3 sm:space-y-4">
                {CHECKLIST_ITEMS.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2 relative w-full">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl dark:shadow-gray-900">
                <Image
                  src={IMAGES.FAMILY}
                  alt={t("mission.family_image_alt")}
                  className="h-96 w-full object-cover"
                  loading="lazy"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="px-4 sm:px-6 py-2 bg-white dark:bg-gray-800 rounded-full text-xs sm:text-sm text-gray-600 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700">
              {t("services.section_title")}
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
            {t("services.title")}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base px-4">
            {t("services.description")}
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-md dark:shadow-gray-900 hover:shadow-lg dark:hover:shadow-gray-800 transition-shadow border border-gray-100 dark:border-gray-700">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-color1/10 dark:bg-primary-color1/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-color1 dark:text-primary-color1" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trusted by Community Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="px-4 sm:px-6 py-2 bg-white dark:bg-gray-800 rounded-full text-xs sm:text-sm text-gray-600 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700">
              {t("impact.section_title")}
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
            {t("impact.title")}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base px-4">
            {t("impact.description")}
          </p>
        </div>

        {/* Success Stories */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Image */}
            <div className="order-1 lg:order-1 relative w-full">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl dark:shadow-gray-900">
                <Image
                  src={IMAGES.WEDDING}
                  alt="Wedding rings symbolizing successful matches"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="order-2 lg:order-2">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
                {t("impact.success_stories_title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                {t("impact.success_stories_description")}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {STATS.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
            {t("cta.title")}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base px-4">
            {t("cta.description")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button className="w-full sm:w-auto px-6 sm:px-8 py-5 rounded-full bg-primary-color1 hover:bg-primary-color2 dark:hover:bg-primary-color2 text-white font-medium transition-colors">
              {t("cta.create_profile")}
            </Button>
            <Button className="w-full sm:w-auto px-6 sm:px-8 py-5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-full transition-colors border border-gray-300 dark:border-gray-600">
              {t("cta.learn_more")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
