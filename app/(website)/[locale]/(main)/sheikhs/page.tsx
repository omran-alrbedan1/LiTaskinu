import { FEATURES } from '@/constants/website';
import SheikhCard from './_components/SheikhCard';
import { REAL_SHEIKHS } from '@/constants/temporary';

export default function SheikhsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient">
        
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
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  
                  <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Icon Container */}
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-light/40 mb-6`}>
                      <div className={`relative w-8 h-8 text-primary-color1`}>
                        <Icon className="w-full h-full" />
                        <div className="absolute inset-0 bg-gradient-to-br opacity-10 blur-md from-current to-transparent"></div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Decorative Line */}
                    <div className="mt-6">
                      <div className={`h-1 w-16 rounded-full bg-gradient-to-r bg-primary-color1 opacity-70`}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
     
        </div>
      </div>
    </div>
  );
}