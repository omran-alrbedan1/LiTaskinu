import { Doctors } from '@/constants/temporary';
import DoctorCard from './_components/DoctorCard';
import { MENTAL_HEALTH_FEATURES } from '@/constants/website';
import Image from 'next/image';
import { images } from '@/constants/images';
import FeatureCard from '@/components/website/shared/FeatureCard';

export default function MentalHealthPage() {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden min-h-[60vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src={images.mentalHealth} 
            alt="Mental Health Background"
            fill
            priority
            className="object-cover"
            quality={90}
          />
          
          {/* Dark Overlay*/}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-gray-900/40 to-gray-800/30 dark:from-black/90 dark:via-gray-900/80 dark:to-gray-800/70"></div>
   
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Find Your <span className="text-primary-color1">Mental Health</span> Specialist
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Connect with licensed therapists and psychologists for confidential and professional mental health support
            </p>
        
          </div>
        </div>
        
        {/* Wave Divider*/}
        <div className="absolute -bottom-32 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path 
              d="M0,160L60,154.7C120,149,240,139,360,144C480,149,600,171,720,176C840,181,960,171,1080,149.3C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" 
              fill="currentColor" 
              className="text-white dark:text-background"
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {Doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-32 mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-800/10 to-gray-900/10 dark:from-gray-800/20 dark:to-gray-900/20 border border-gray-300 dark:border-gray-700 mb-4">
              <span className="text-sm font-semibold text-primary-color1 ">
                WHY CHOOSE OUR DOCTORS
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-color1 mb-4">
              Professional Mental Health Support
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience confidential, evidence-based therapy from licensed professionals
            </p>
          </div>

          {/* Features Grid - Neutral Colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MENTAL_HEALTH_FEATURES.map((feature, index) => (
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