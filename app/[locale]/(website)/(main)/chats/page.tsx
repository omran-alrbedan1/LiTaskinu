"use client";
import React, { useState } from "react";
import { Search, Shield, Heart, Users } from "lucide-react";
import Image from "next/image";
import { images } from "@/constants/images";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("chats");

  const [conversations] = useState([]);

  return (
    <div className="flex flex-col h-full">
      {/* Header - Matches the chat page structure */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <Image src={images.logo2} height={60} width={60} alt="logo" />
          <div>
            <h2 className="font-semibold text-gray-900">{t('header.title')}</h2>
            <p className="text-xs text-primary-color1">
              {conversations.length === 0 ? t('header.subtitleStart') : t('header.subtitleContinue')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4"></div>
      </div>

      {/* Content Area - Fills the remaining space without being too long */}
      <div className="flex-1 -mt-2 flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full text-center space-y-6">
          {/* Main Content */}
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary-color1 rounded-xl flex items-center justify-center shadow-lg">
              {conversations.length === 0 ? (
                <Search className="w-8 h-8 text-white" />
              ) : (
                <Users className="w-8 h-8 text-white" />
              )}
            </div>

            <h1 className="text-xl font-bold text-gray-900">
              {conversations.length === 0 ? t('main.titleStart') : t('main.titleContinue')}
            </h1>

            <p className="text-gray-600 text-sm">
              {conversations.length === 0 ? t('main.descStart') : t('main.descContinue')}
            </p>
          </div>

          {/* Quranic Verse */}
          <div className="bg-white rounded-lg p-3 border border-primary-color1 border-opacity-20">
            <p className="text-xs text-primary-color1 italic">
              {t('quran.verse')}
            </p>
            <p className="text-xs text-primary-color1 text-opacity-70 mt-1">
              {t('quran.reference')}
            </p>
          </div>

          {/* Action Button */}
          <button className="w-full px-4 py-3 bg-primary-color1 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 hover:scale-105">
            <Search className="w-4 h-4" />
            <span>
              {conversations.length === 0 ? t('actions.findFirst') : t('actions.findNew')}
            </span>
          </button>

          {/* Safety Notice */}
          <div className="bg-white rounded-lg p-3 border border-primary-color1 border-opacity-20">
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-primary-color1 bg-opacity-10 rounded flex items-center justify-center flex-shrink-0">
                <Shield className="w-3 h-3 text-primary-color1" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900 text-sm">
                  {t('safety.title')}
                </h3>
                <p className="text-xs text-gray-600">
                  {conversations.length === 0 ? t('safety.descStart') : t('safety.descContinue')}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Guidance */}
          <div className=" bg-opacity-5 -mt-12 rounded-lg p-3">
            <p className="text-xs font-medium text-primary-color1 mb-2">
              {conversations.length === 0 ? t('guidance.labelStart') : t('guidance.labelContinue')}
            </p>
            <div className="flex flex-wrap gap-1 justify-center">
              {conversations.length === 0 ? (
                <>
                  <span className="px-2 py-1 bg-white text-primary-color1 rounded text-xs font-medium">
                    {t('guidance.steps.preferences')}
                  </span>
                  <span className="px-2 py-1 bg-white text-primary-color1 rounded text-xs font-medium">
                    {t('guidance.steps.browse')}
                  </span>
                  <span className="px-2 py-1 bg-white text-primary-color1 rounded text-xs font-medium">
                    {t('guidance.steps.startChat')}
                  </span>
                </>
              ) : (
                <>
                  <span className="px-2 py-1 bg-white text-primary-color1 rounded text-xs font-medium">
                    {t('guidance.steps.continueChat')}
                  </span>
                  <span className="px-2 py-1 bg-white text-primary-color1 rounded text-xs font-medium">
                    {t('guidance.steps.explore')}
                  </span>
                  <span className="px-2 py-1 bg-white text-primary-color1 rounded text-xs font-medium">
                    {t('guidance.steps.family')}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
