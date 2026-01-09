"use client";
import React from "react";
import { Heart, MessageCircle, MapPin, Briefcase, User } from "lucide-react";
import Image from "next/image";
import { images } from "@/constants/images";
import { ICONS } from "@/constants/icons";

// Types
export interface Profile {
  id: number;
  name: string;
  gender: "male" | "female";
  age: number;
  location: string;
  time: string;
  occupation: string;
  image: string;
}

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const handleMessageClick = () => {
    console.log(`Message ${profile.name}`);
  };

  const handleLikeClick = () => {
    console.log(`Like ${profile.name}`);
  };

  const handleCardClick = () => {
    console.log(`View profile ${profile.id}`);
  };

  return (
    <div
      className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 max-w-sm flex flex-col cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <Image
          src={profile.image ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${profile.image}` : images.Unknown}
          alt={`${profile.name}'s profile`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          width={400}
          height={192}
        />


        {/* Name and Age */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-xl drop-shadow-lg">
                {profile.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <User className="w-3 h-3 text-white/80" />
                <span className="text-white/90 text-sm">{profile.age} years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gender Badge */}
        <div className={`absolute top-3 right-3`}>
          {profile.gender === 'male' ? 
            <Image
              src={ICONS.male}
              height={32}
              width={32}
              alt="male"
              className="dark:invert-0"
            /> :
            <Image
              src={ICONS.female}
              height={32}
              width={32}
              alt="female"
              className="dark:invert-0" 
            />
          }
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Occupation and Location */}
        <div className="space-y-3 mb-4 flex-grow">
          <div className="flex items-start gap-2">
            <Briefcase className="w-4 h-4 text-primary-color1 dark:text-primary-color1 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Occupation</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{profile.occupation}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-primary-color1 dark:text-primary-color1 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Location</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{profile.location}</p>
            </div>
          </div>

          {/* Time Section */}
          <div className="flex items-start gap-2">
            <Briefcase className="w-4 h-4 text-primary-color1 dark:text-primary-color1 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Available Time</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{profile.time}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMessageClick();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-color1 hover:bg-primary-color2 dark:hover:bg-primary-color2 text-white font-medium transition-all duration-200 text-sm hover:shadow-md dark:hover:shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            Message
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLikeClick();
            }}
            className="h-12 w-12 rounded-xl border-2 border-primary-color1 dark:border-primary-color1 hover:border-primary-color2 dark:hover:border-primary-color2 flex items-center justify-center transition-all duration-200 hover:shadow-md dark:hover:shadow-lg group/btn"
          >
            <Heart className="w-5 h-5 text-primary-color1 dark:text-primary-color1 group-hover/btn:text-primary-color2 dark:group-hover/btn:text-primary-color2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;