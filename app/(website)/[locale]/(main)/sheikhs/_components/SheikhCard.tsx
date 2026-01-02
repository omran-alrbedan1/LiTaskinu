import React from 'react';
import { BookOpen, MessageCircle, Globe, User, Eye } from 'lucide-react';
import Image from 'next/image';

interface SheikhCardProps {
  sheikh: {
    id: number;
    name: string;
    title: string;
    image: any;
    experience: string;
    specialization: string[];
    languages: string[];
    bio: string;
  };
}

const SheikhCard: React.FC<SheikhCardProps> = ({ sheikh }) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-color1 dark:hover:border-primary-color1 transform hover:-translate-y-1">
      {/* Card Content */}
      <div className="flex p-4">
        {/* Image Section - Left Side */}
        <div className="flex-shrink-0 mr-4">
          <div className="relative">
            <div className="h-20 w-20 rounded-xl overflow-hidden border-2 border-primary-color1/20 dark:border-primary-color1/30 shadow-md group-hover:shadow-lg transition-shadow">
              {/* صورة حقيقية للشيخ */}
              <div className="h-full w-full relative">
                <Image
                  src={sheikh.image}
                  alt={sheikh.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                {/* Fallback إذا فشل تحميل الصورة */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-color1/10 to-primary-color1/5 dark:from-primary-color1/20 dark:to-primary-color1/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary-color1" />
                </div>
              </div>
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary-color1 to-primary-color1/90 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md transform group-hover:scale-110 transition-transform z-10">
              {sheikh.experience}
            </div>
          </div>
        </div>

        {/* Info Section - Right Side */}
        <div className="flex-1 min-w-0">
          {/* Name and Title */}
          <div className="mb-2">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate group-hover:text-primary-color1 dark:group-hover:text-primary-color1 transition-colors">
              {sheikh.name}
            </h3>
            <p className="text-sm text-primary-color1 dark:text-primary-color1/90 font-medium truncate">
              {sheikh.title}
            </p>
          </div>

          {/* Specializations */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {sheikh.specialization.slice(0, 2).map((spec, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary-color1/5 dark:bg-primary-color1/10 text-primary-color1 dark:text-primary-color1/90 rounded-lg text-xs font-medium border border-primary-color1/10 dark:border-primary-color1/20"
                >
                  <BookOpen className="h-3 w-3" />
                  {spec}
                </span>
              ))}
              {sheikh.specialization.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs border border-gray-200 dark:border-gray-600">
                  +{sheikh.specialization.length - 2}
                </span>
              )}
            </div>
          </div>

          {/* Languages */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
            <Globe className="h-4 w-4 text-primary-color1" />
            <span className="truncate">{sheikh.languages.join(', ')}</span>
          </div>

          {/* Bio - Truncated */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {sheikh.bio}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-color1/5 dark:bg-primary-color1/10 text-primary-color1 dark:text-primary-color1/90 rounded-lg text-sm font-medium hover:bg-primary-color1/10 dark:hover:bg-primary-color1/20 transition-colors border border-primary-color1/10 dark:border-primary-color1/20">
              <MessageCircle className="h-4 w-4" />
              Chat
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-primary-color1 to-primary-color1/80 text-white rounded-lg text-sm font-medium hover:from-primary-color1/90 hover:to-primary-color1/70 transition-all transform hover:scale-105 shadow-md shadow-primary-color1/20">
              <Eye className="h-4 w-4" />
              View
            </button>
          </div>
        </div>
      </div>

      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-color1 via-primary-color1/80 to-primary-color1/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

export default SheikhCard;