import { FEATURES } from '@/constants/website';
import SheikhCard from './_components/SheikhCard';
import { REAL_SHEIKHS } from '@/constants/temporary';
import Image from 'next/image';
import { images } from '@/constants/images';
import FeatureCard from '@/components/website/shared/FeatureCard';

export default function SheikhsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient min-h-[60vh]">
        <div className="absolute inset-0 z-0 ">
          <Image
            src={images.sheikhBackground}
            alt="background"
            fill
            priority
            className="object-cover"
            quality={90}
          />

          {/* Dark Overlay - Black/Gray only */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-gray-900/40 to-gray-800/30 dark:from-black/90 dark:via-gray-900/80 dark:to-gray-800/70"></div>

        </div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Islamic Sharia Consultation Sheikhs
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Choose from an elite group of sheikhs and sharia consultants specialized in family and marital affairs
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute -bottom-32 left-0 right-0">
          <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="currentColor"
              className="text-white dark:text-background"
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Sheikhs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {REAL_SHEIKHS.map((sheikh) => (
            <SheikhCard key={sheikh.id} sheikh={sheikh} />
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-32 mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-[#8B9475]/10 to-[#6B7355]/10 dark:from-[#6B7355]/20 dark:to-[#4A5237]/20 border border-[#8B9475]/20 dark:border-[#6B7355]/30 mb-4">
              <span className="text-sm font-semibold text-[#6B7355] dark:text-[#8B9475]">
                WHY CHOOSE OUR SHEIKHS
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Excellence in Islamic Guidance
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the perfect blend of traditional Islamic scholarship and modern counseling expertise
            </p>
          </div>

          {/* Features Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}