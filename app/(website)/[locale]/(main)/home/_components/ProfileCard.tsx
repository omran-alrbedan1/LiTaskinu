"use client";
import React from "react";
import { Heart, MessageCircle, MapPin, Briefcase, Clock, User } from "lucide-react";
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
    // Handle message button click
    console.log(`Message ${profile.name}`);
  };

  const handleLikeClick = () => {
    // Handle like button click
    console.log(`Like ${profile.name}`);
  };

  const handleCardClick = () => {
    // Handle card click to view full profile
    console.log(`View profile ${profile.id}`);
  };

  return (
    <div
      className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white max-w-sm flex flex-col cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <Image
          src={profile.image ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${profile.image}` : images.Unknown}
          alt={`${profile.name}'s profile`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

        {/* Name and Age */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-xl drop-shadow-lg">
                {profile.name}
              </h3>

            </div>


          </div>
        </div>

        {/* Gender Badge */}
        <div className={`absolute top-3 right-3`}>
          {
            profile.gender === 'male' ? 
            <Image
              src={ICONS.male}
              height={32}
              width={32}
              alt="male"
            /> :
             <Image
              src={ICONS.female}
              height={32}
              width={32}
              alt="female" />
          }
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Occupation and Location */}
        <div className="space-y-3 mb-4 flex-grow">
          <div className="flex items-start gap-2 text-gray-700">
            <Briefcase className="w-4 h-4 text-primary-color1 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">Occupation</p>
              <p className="text-sm text-gray-600">test</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-gray-700">
            <MapPin className="w-4 h-4 text-primary-color1 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">Location</p>
              <p className="text-sm text-gray-600">{profile.location}</p>
            </div>
          </div>


        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMessageClick();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-color1 hover:bg-primary-color2 text-white font-medium transition-all duration-200 text-sm hover:shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            Message
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLikeClick();
            }}
            className="h-12 w-12 rounded-xl border-2 group-[hover] border-primary-color1  flex items-center justify-center transition-all duration-200 group/btn hover:shadow-md"
          >
            <Heart className={`w-5 h-5 text-primary-color1 `} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;