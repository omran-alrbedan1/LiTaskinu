// app/(website)/[locale]/(main)/sheikhs/[id]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
    Mail,
    Phone,
    Globe,
    BookOpen,
    GraduationCap,
    MessageCircle, Award
} from 'lucide-react';
import { MOCK_SHEIKHS } from '@/constants/temporary';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SheikhDetailPageProps {
  params: {
    id: string;
    locale: string;
  };
}

export default function SheikhDetailPage({ params }: SheikhDetailPageProps) {
  const { id } = params;
  
  const sheikh = MOCK_SHEIKHS.find(s => s.id.toString() === id);
  
  if (!sheikh) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Main Profile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Compact Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Profile Image Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 hover:shadow-xl transition-shadow">
                <div className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src={sheikh.image}
                    alt={sheikh.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Compact Contact Info Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-2 hover:shadow-xl transition-shadow">
                <div className="space-y-3">
                  {/* Email */}
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                    <div className="h-9 w-9 rounded-lg bg-primary-color1/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-color1/20 transition-colors">
                      <Mail className="h-4 w-4 text-primary-color1" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <a 
                        href={`mailto:${sheikh.email}`}
                        className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-color1 transition-colors truncate block font-medium"
                        title={sheikh.email}
                      >
                        {sheikh.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  {sheikh.phone && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                      <div className="h-9 w-9 rounded-lg bg-primary-color1/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-color1/20 transition-colors">
                        <Phone className="h-4 w-4 text-primary-color1" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <a 
                          href={`tel:${sheikh.phone}`}
                          className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-color1 transition-colors truncate block font-medium"
                        >
                          {sheikh.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-3 px-1">
                      <div className="h-9 w-9 rounded-lg bg-primary-color1/10 flex items-center justify-center flex-shrink-0">
                        <Globe className="h-4 w-4 text-primary-color1" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Languages
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-12">
                      {sheikh.languages.map((language, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-primary-color1/10 to-primary-color1/5 text-primary-color1 border border-primary-color1/20"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content (Seamless) */}
          <div className="lg:col-span-3">
            {/* Main Content Container */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              {/* Header Section */}
              <div className="py-3 px-6 border-b border-gray-100 dark:border-gray-800">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  {sheikh.name}
                </h1>
                <div className="h-1.5 w-20 bg-gradient-to-r from-primary-color1 to-primary-color1/40 rounded-full"></div>
              </div>

              {/* Experience Section */}
              <div className="py-3 px-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary-color1/10 flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary-color1" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Experience
                    </h3>
                    <div className="h-1 w-16 bg-gradient-to-r from-primary-color1 to-primary-color1/40 rounded-full mt-1"></div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base max-w-3xl">
                  {sheikh.experience}
                </p>
              </div>

              {/* Bio Section */}
              <div className="py-3 px-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary-color1/10 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary-color1" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      About
                    </h3>
                    <div className="h-1 w-16 bg-gradient-to-r from-primary-color1 to-primary-color1/40 rounded-full mt-1"></div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base max-w-3xl">
                  {sheikh.bio}
                </p>
              </div>

              {/* Specializations Section */}
              <div className="py-3 px-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary-color1/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary-color1" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Areas of Expertise
                    </h3>
                    <div className="h-1 w-16 bg-gradient-to-r from-primary-color1 to-primary-color1/40 rounded-full mt-1"></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
                  {sheikh.specialization.map((spec, index) => (
                    <div 
                      key={index}
                      className="group flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-color1 transition-all bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 hover:shadow-md"
                    >
                      <div className="h-8 w-8 rounded-lg bg-primary-color1/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-color1/20 transition-colors">
                        <BookOpen className="h-4 w-4 text-primary-color1" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
<div className="fixed bottom-6 right-6 z-40">
  <Link 
  href={`${id}/chat`}
    className="h-14 px-5 rounded-full bg-gradient-to-r from-primary-color1 to-primary-color1/80 shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center gap-3 hover:pr-20 overflow-hidden relative"
  >
    <MessageCircle className="h-5 text-white dark:text-black w-5 shrink-0 group-hover:animate-bounce" />
    
    <span className="text-sm font-medium text-white absolute right-5 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
      Start Chat
    </span>
    
  </Link>
</div>
    </div>
  );
}