import React from "react";
import { Heart, MessageCircle, MapPin, Briefcase } from "lucide-react";

// Types
export interface Profile {
  id: number;
  name: string;
  gender: "male" | "female";
  age: number;
  location: string;
  seeking: string;
  time: string;
  occupation: string;
  interests: string[];
  image: string;
}

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white max-w-sm flex flex-col">
      {/* Image Section */}
      <div className="relative h-40 bg-gray-100 overflow-hidden">
        <img
          src={profile.image}
          alt={`${profile.name}'s profile`}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        {/* Name and Age */}
        <div className="absolute bottom-3 left-3">
          <h3 className="font-bold text-white text-xl drop-shadow-lg">
            {profile.name}, {profile.age}
          </h3>
        </div>
      </div>

      {/* Content Section - Flex-grow to push buttons to bottom */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Content that can vary in height */}
        <div className="flex-grow">
          {/* Occupation and Location */}
          <div className="space-y-1.5 mb-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase className="w-4 h-4 text-primary-color1" />
              <span className="text-sm">{profile.occupation}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-primary-color1" />
              <span className="text-sm">{profile.location}</span>
            </div>
          </div>

          {/* Seeking */}
          <div className="mb-3">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Seeking:</span> {profile.seeking}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <button className=" h-10 w-10 flex items-center justify-center  rounded-xl bg-primary-color1 hover:opacity-90 text-white font-medium transition-all duration-200 text-sm">
            <MessageCircle className="w-4 h-4" />
          </button>
          <button className="h-10 w-10 rounded-xl border-2 border-primary-color1 hover:bg-primary-color1 flex items-center justify-center transition-all duration-200 group/btn">
            <Heart className="w-4 h-4 text-primary-color1 group-hover/btn:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
