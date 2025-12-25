import React from "react";
import { Check, Users, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { images } from "@/constants/images";

// Constants for hardcoded values
const IMAGES = {
  FAMILY: images.aboutUs1,
  WEDDING: images.aboutUs2,
};

const CHECKLIST_ITEMS = [
  "Strict adherence to Islamic principles.",
  "Privacy and dignity maintained throughout.",
  "Family involvement encouraged and supported.",
];

const SERVICES = [
  {
    icon: Users,
    title: "Unique user experience",
    description: "A platform designed with authenticity and sincerity. We maintain strict standards to protect our community.",
  },
  {
    icon: Shield,
    title: "Data integrity",
    description: "Your personal information is protected with the highest security standards, and we'll guardian implementation is facilitated.",
  },
  {
    icon: Sparkles,
    title: "Islamic vibes",
    description: "Respectful and ethical approach to help navigate the marriage process according to Shariah.",
  },
];

const STATS = [
  { value: "5,000+", label: "Successful Matches" },
  { value: "50+", label: "Countries Served" },
  { value: "95%", label: "Success Rate" },
  { value: "24/7", label: "Support Available" },
];

const Page = () => {
  return (
    <div className="">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 text-center">
        <div className="inline-block mb-4 sm:mb-6">
          <span className="px-4 sm:px-6 py-2 bg-white rounded-full text-xs sm:text-sm text-gray-600 shadow-sm border border-gray-200">
            Halal Matchmaking Platform
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
          About LITASKUNU
        </h1>
        
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
          We help Muslims find their life partners through a halal, dignified, and modern approach
          to matchmaking. For years, NikahConnect has been bringing together compatible
          individuals seeking meaningful Islamic marriages.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-block mb-4 sm:mb-6">
                <span className="px-4 sm:px-5 py-2 bg-white rounded-full text-xs sm:text-sm text-gray-600 border border-gray-200">
                  Our Purpose
                </span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Our Mission
              </h2>
              
              <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                To facilitate meaningful connections between Muslims seeking
                marriage, while upholding Islamic values and principles. We
                believe that finding a righteous spouse is half of one's faith, and
                we're honored to help you complete your deen.
              </p>
              
              {/* Check List */}
              <div className="space-y-3 sm:space-y-4">
                {CHECKLIST_ITEMS.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2 relative w-full">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl">
                <Image
                  src={IMAGES.FAMILY}
                  alt="Muslim family spending time together"
                  className=" h-96 w-full object-cover"
                  loading="lazy"
                  width={300}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="px-4 sm:px-6 py-2 bg-white rounded-full text-xs sm:text-sm text-gray-600 shadow-sm border border-gray-200">
              What We Offer
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Services
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Comprehensive support on your journey to finding a righteous spouse, guided by
            Islamic principles.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className=" rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-md hover:shadow-md transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trusted by Community Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="px-4 sm:px-6 py-2 bg-white rounded-full text-xs sm:text-sm text-gray-600 shadow-sm border border-gray-200">
              Our Impact
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Trusted by the Community
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Our platform is built on trust, dedication, and commitment to helping Muslims find
            their compatible life partners.
          </p>
        </div>

        {/* Success Stories */}
        <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Image */}
            <div className="order-1 lg:order-1 relative w-full">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl">
                <Image
                  src={IMAGES.WEDDING}
                  alt="Wedding rings symbolizing successful matches"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="order-2 lg:order-2">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Success Stories
              </h3>
              <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                Alhamdulillah, we've helped thousands of Muslims find their life partners through our halal and dignified matchmaking platform.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {STATS.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Ready to Begin Your Journey?
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base px-4">
            Take the first step towards completing half your deen. Join our trusted Islamic
            matchmaking platform today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button className="w-full sm:w-auto px-6 sm:px-8 py-5 rounded-full bg-primary-color1 hover:bg-primary-color1/20 text-white font-medium transition-colors">
              Create your profile
            </Button>
            <Button className="w-full sm:w-auto px-6 sm:px-8 py-5 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-colors border border-gray-300">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;