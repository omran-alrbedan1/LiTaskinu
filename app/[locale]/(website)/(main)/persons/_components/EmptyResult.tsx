import { images } from "@/constants/images";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

const EmptyResult = async () => {
  const t = await getTranslations("person_detail");

  return (
    <div className="text-center py-12">
      <Image
        src={images.emptyResultSearch}
        height={200}
        width={200}
        alt="search"
        className="mx-auto"
      />
      <p className="text-gray-500 text-lg">{t('title')}</p>
      <p className="text-gray-400 text-lg mt-2">
        {t('description')}
      </p>
    </div>
  );
};

export default EmptyResult;
