import React from "react";
import { Heart, MessageCircle, Sparkles, Key } from "lucide-react";
import Image from "next/image";
import { images } from "@/constants/images";
import { IconBaseProps } from "react-icons/lib";
import { ICONS } from "@/constants/icons";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";

export default function LandingPage() {
  const features = [
    {
      icon: ICONS.userHeart,
      title: "Love can happen anywhere",
      description:
        "Connect with potential partners from around the world. Our platform brings people together regardless of distance.",
    },
    {
      icon: ICONS.loveLetter,
      title: "Get Chatting",
      description:
        "Start meaningful conversations with our easy-to-use chat system. Break the ice and build connections naturally.",
    },
    {
      icon: ICONS.loveLetterHeart,

      title: "Everything At A Glance",
      description:
        "Quickly view profiles, interests, and compatibility scores. Make informed decisions with comprehensive profiles.",
    },
    {
      icon: ICONS.key,
      title: "More Than Just A Swipe",
      description:
        "Serious relationships start with meaningful connections. Our platform focuses on compatibility and long-term potential.",
    },
  ];

  return (
    <div className="min-h-screen overflow-y-auto">
      {/* Header */}

      {/* Hero Section with Background Image */}
      <div className="relative h-[90vh] w-full">
        <Image src={images.landingPage} alt="Happy couple" fill priority />
        <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <Image
                  src={images.logo2}
                  alt="Happy couple"
                  height={94}
                  width={94}
                  priority
                />
              </div>

              {/* Login Button */}
              <Link
                href={"/en/sign-in"}
                className="bg-[#A1AA8A] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#8f9978] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Login
              </Link>
            </div>
          </div>
        </header>
      </div>

      {/* Features Section */}
      <div className=" py-10 mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Features */}
            <div className="space-y-16">
              {features.slice(0, 2).map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  align="right"
                />
              ))}
            </div>

            {/* Center Phone Mockup */}
            <div className="flex justify-center items-center px-4 order-first lg:order-none">
              <Image
                src={images.landingPage2}
                height={300}
                width={400}
                alt="landing page 2"
              />
            </div>

            {/* Right Features */}
            <div className="space-y-16">
              {features.slice(2, 4).map((feature, index) => (
                <FeatureCard
                  key={index + 2}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  align="left"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen relative">
        {/* Wave Transition */}
        <div className="relative -mt-1">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              fill="#e8ebe4"
            />
          </svg>
        </div>

        {/* Why Litaskunu Section */}
        <div className="py-20 px-4 bg-[#e8ebe4]">
          <div className="max-w-6xl mx-auto">
            {/* Section Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
              WHY LITASKUNU
            </h1>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 - Unique user experience */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#e8ebe4] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg
                    className="w-8 h-8 text-primary-color1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
                  Unique user experience
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Cursus imperdiet sed id elementum.
                </p>
              </div>

              {/* Card 2 - Data integrity */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#e8ebe4] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg
                    className="w-8 h-8 text-primary-color1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
                  Data integrity
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Cursus imperdiet sed id elementum.
                </p>
              </div>

              {/* Card 3 - Isimic vibes */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#e8ebe4] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg
                    className="w-8 h-8 text-primary-color1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
                  Isimic vibes
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Cursus imperdiet sed id elementum.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Shape Transition */}

        {/* CTA Section */}
        <div className=" py-20 px-4 -mt-1">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of singles who found their life partners through
              our platform
            </p>
            <Link
              href={"/en/sign-in"}
              className="bg-[#A1AA8A] text-white px-14 py-4 rounded-full text-lg font-semibold hover:bg-[#8f9978] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  align = "left",
}: {
  icon: StaticImport | string;
  title: string;
  description: string;
  align: string;
}) {
  return (
    <div
      className={`flex flex-col  items-center text-center lg:text-start space-y-4 group`}
    >
      <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-2 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 border border-pink-100">
        <Image src={icon} height={44} width={44} alt={"icon"} />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 max-w-xs leading-tight">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
        {description}
      </p>
    </div>
  );
}
