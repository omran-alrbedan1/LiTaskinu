import React from 'react';
import { Brain, MessageCircle, Globe, Star, Eye } from 'lucide-react';
import Image from 'next/image';
import { images } from '@/constants/images';
import Link from 'next/link';

interface DoctorCardProps {
doctor:Psychiatrist
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-color1 dark:hover:border-primary-color1 transform hover:-translate-y-1">
      <div className="flex flex-col md:flex-row p-4 md:p-4">
        {/* Image Section - Centered on mobile, left on desktop */}
        <div className="flex-shrink-0 md:mr-4 mb-4 md:mb-0">
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <div className="h-24 w-24 md:h-20 md:w-20 rounded-xl overflow-hidden border-2 border-primary-color1/20 dark:border-primary-color1/30 shadow-md group-hover:shadow-lg transition-shadow">
                <div className="h-full w-full relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800">
                  {doctor.image && (
                    <Image
                      src={doctor.image||images.Unknown}
                      alt={doctor.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 96px, 80px"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 min-w-0">
          {/* Name and Title with Rating */}
          <div className="mb-2 md:mb-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start text-center md:text-left">
              <div className="md:mb-0 mb-2">
                <h3 className="text-xl md:text-lg font-bold text-gray-800 dark:text-white md:truncate group-hover:text-primary-color1 dark:group-hover:text-primary-color1 transition-colors">
                  {doctor.name}
                </h3>
              </div>
              <div className="flex justify-center md:justify-start items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {doctor.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Specializations */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-1 justify-center md:justify-start">
              {doctor.specialization.slice(0, 2).map((spec, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary-color1/5 dark:bg-primary-color1/10 text-primary-color1 dark:text-primary-color1/90 rounded-lg text-xs font-medium border border-primary-color1/10 dark:border-primary-color1/20"
                >
                  <Brain className="h-3 w-3" />
                  {spec}
                </span>
              ))}
              {doctor.specialization.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs border border-gray-200 dark:border-gray-600">
                  +{doctor.specialization.length - 2}
                </span>
              )}
            </div>
          </div>

          {/* Languages */}
          <div className="mb-3 flex justify-center md:justify-start">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Globe className="h-4 w-4 text-primary-color1" />
              <span className="md:truncate text-center md:text-left">{doctor.languages.join(', ')}</span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:line-clamp-2 text-center md:text-left">
            {doctor.bio}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link
              href={`./mental-health/${doctor.id}/chat`}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-color1/5 dark:bg-primary-color1/10 text-primary-color1 dark:text-primary-color1/90 rounded-lg text-sm font-medium hover:bg-primary-color1/10 dark:hover:bg-primary-color1/20 transition-colors border border-primary-color1/10 dark:border-primary-color1/20">
              <MessageCircle className="h-4 w-4" />
              Chat
            </Link>
                <Link
              href={`./mental-health/${doctor.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-primary-color1 to-primary-color1/80 text-white rounded-lg text-sm font-medium hover:from-primary-color1/90 hover:to-primary-color1/70 transition-all transform hover:scale-105 shadow-md shadow-primary-color1/20">
              <Eye className="h-4 w-4" />
              View
            </Link>
          </div>
        </div>
      </div>

      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-color1 via-primary-color1/80 to-primary-color1/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

export default DoctorCard;