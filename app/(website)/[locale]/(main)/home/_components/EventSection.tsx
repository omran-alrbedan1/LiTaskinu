import { images } from "@/constants/images";
import Image from "next/image";
import React from "react";

const EventSection = () => {
  const eventData = {
    title: "EVENT TRUE MASTER",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non lacus vehicula, maximus lorem malesuada condimentum. Praesent posuere quam a rutrum dignissim.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non lacus vehicula, maximus lorem malesuada Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non lacus vehicula, maximus lorem malesuada condimentum praesent posuere quam a rutrum dignissim.",
  };
  return (
    <section className="bg-gray-100 rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-primary-color1 mb-4">
            {eventData.title}
          </h1>
          <p className="text-gray-600 leading-relaxed text-sm">
            {eventData.description}
          </p>
        </div>

        <div className="w-full lg:w-60 h-32 lg:h-auto">
          <div className="w-full h-full rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="relative z-10 text-center">
              <Image
                src={images.hero}
                height={384}
                width={384}
                alt="Event visual representation"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSection;
