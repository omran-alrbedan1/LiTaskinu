import { Card } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import { images } from "@/constants/images";

const EmptyGalleryState: React.FC<{}> = () => (
  <Card className="border-2 border-dashed border-gray-300 hover:border-primary-color1 transition-colors">
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Image
        src={images.uploadImage}
        height={92}
        width={92}
        alt=" upload new image"
        className="-my-2"
      />
      <h4 className="text-lg font-semibold text-gray-700 mb-2">
        No photos yet
      </h4>
      <p className="text-gray-500 text-sm mb-4">
        Add photos to showcase your personality and interests
      </p>
    </div>
  </Card>
);

export default EmptyGalleryState;
