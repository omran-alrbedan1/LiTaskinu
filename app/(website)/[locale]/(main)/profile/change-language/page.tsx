"use client";
import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { Check, Globe2 } from "lucide-react";
import { ProfileHeader } from "../_components";
import { languageOptions } from "@/constants/options";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const LanguagePage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const router = useRouter();

  const handleLanguageSelect = (value: string) => {
    setSelectedLanguage(value);
    console.log("Selected language:", value);
  };

  const handleContinue = () => {
    // Redirect to the same page with the selected language
    router.push(`/${selectedLanguage}/profile/change-language`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <ProfileHeader
          title="Choose Language"
          description="Select your preferred language"
        />

        {/* Info Card */}
        <div className="mb-6 p-4 bg-gradient-to-r from-primary-color1/5 to-primary-color1/10 rounded-2xl border border-primary-color1/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <Globe2 className="h-5 w-5 text-primary-color1" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {languageOptions.length} Languages Available
              </p>
              <p className="text-xs text-gray-600">
                You can change this anytime in settings
              </p>
            </div>
          </div>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {languageOptions.map((language) => {
            const isSelected = selectedLanguage === language.value;

            return (
              <button
                key={language.value}
                onClick={() => handleLanguageSelect(language.value)}
                className={`
                  group relative p-3 rounded-xl transition-all duration-300 
                  ${
                    isSelected
                      ? "bg-primary-color1 shadow-xl shadow-primary-color1/20"
                      : "bg-white hover:shadow-md border-2 border-gray-100 hover:border-primary-color1/30"
                  }
                `}
              >
                {/* Glow Effect */}
                {isSelected && (
                  <div className="absolute inset-0 bg-primary-color1 rounded-2xl blur-xl opacity-20 -z-10" />
                )}

                {/* Check Icon */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 animate-in zoom-in duration-300">
                    <div className="bg-white rounded-full p-1.5 shadow-lg">
                      <Check
                        className="h-4 w-4 text-primary-color1"
                        strokeWidth={3}
                      />
                    </div>
                  </div>
                )}

                {/* Flag */}
                <div className="flex justify-center mb-4">
                  <div
                    className={`
                    relative transition-transform duration-300
                    ${isSelected ? "scale-110" : "group-hover:scale-110"}
                  `}
                  >
                    <div className="absolute inset-0 bg-primary-color1/10 rounded-xl blur-md" />
                    <ReactCountryFlag
                      countryCode={language.code}
                      svg
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                      title={language.label}
                    />
                  </div>
                </div>

                {/* Language Name */}
                <div className="space-y-1">
                  <p
                    className={`
                      text-sm font-bold text-center transition-colors duration-300
                      ${isSelected ? "text-white" : "text-gray-900"}
                    `}
                  >
                    {language.label}
                  </p>
                  <p
                    className={`
                      text-xs font-medium text-center transition-colors duration-300
                      ${isSelected ? "text-white/80" : "text-gray-500"}
                    `}
                  >
                    {language.native}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue Button // */}
        <div className="flex justify-center">
          <Button
            type="primary"
            size="large"
            onClick={handleContinue}
            className="!p-6"
          >
            Continue with{" "}
            {languageOptions.find((l) => l.value === selectedLanguage)?.label}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LanguagePage;
