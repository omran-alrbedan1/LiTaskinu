import { images } from "@/constants/images";
import Image from "next/image";
import React from "react";

const EmptyResult = () => {
  return (
    <div className="text-center py-12">
      <Image
        src={images.emptyResultSearch}
        height={200}
        width={200}
        alt="search"
        className="mx-auto"
      />
      <p className="text-gray-500 text-lg">No results found</p>
      <p className="text-gray-400 text-lg mt-2">
        The search result is not avaliable , re-search again for something new
        and explore
      </p>
    </div>
  );
};

export default EmptyResult;
