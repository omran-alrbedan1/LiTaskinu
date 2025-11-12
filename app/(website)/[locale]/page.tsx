//@ts-nocheck
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { images } from "@/constants/images";
import { ICONS } from "@/constants/icons";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

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

const whyLitaskunuCards = [
  {
    icon: (
      <svg
        className="w-8 h-8 text-[#A1AA8A]"
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
    ),
    title: "Unique user experience",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus imperdiet sed id elementum.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-[#A1AA8A]"
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
    ),
    title: "Data integrity",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus imperdiet sed id elementum.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-[#A1AA8A]"
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
    ),
    title: "Isimic vibes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus imperdiet sed id elementum.",
  },
];

interface FeatureCardProps {
  icon: StaticImport | string;
  title: string;
  description: string;
  align: "left" | "right";
}

function FeatureCard({ icon, title, description, align }: FeatureCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center lg:items-start lg:text-start space-y-4 group"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-2 group-hover:shadow-xl transition-all duration-300 border border-pink-100"
        whileHover={{
          scale: 1.1,
          rotate: 5,
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image src={icon} height={44} width={44} alt="feature icon" />
      </motion.div>
      <motion.h3
        className="text-xl font-semibold text-gray-800 max-w-xs leading-tight"
        whileHover={{ color: "#A1AA8A" }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-gray-600 text-sm leading-relaxed max-w-xs"
        whileHover={{ scale: 1.02 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

function WaveTransition() {
  return (
    <div className="relative -mt-10 lg:-mt-24">
      <svg
        viewBox="0 0 1428 174"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            transform="translate(-2.000000, 44.000000)"
            fill="#ffffff"
            fillRule="nonzero"
          >
            <path
              d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
              opacity="0.5"
            />
            <path
              d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
              opacity="0.5"
            />
            <path
              d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
              opacity="0.5"
            />
          </g>
          <g
            transform="translate(-4.000000, 76.000000)"
            fill="#ffffff"
            fillRule="nonzero"
          >
            <path
              d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
              opacity="1"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className=" ">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[90vh] w-full">
          <Image src={images.landingPage} alt="Happy couple" fill priority />
        </div>

        <motion.header
          className="absolute top-0 left-0 right-0 z-50 bg-transparent"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={images.logo2}
                  alt="Litaskunu Logo"
                  height={80}
                  width={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                  priority
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/en/sign-in"
                  className="bg-[#A1AA8A] text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-[#8f9978] transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  Login
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Features Section */}
      <motion.section
        className="py-16 sm:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            {/* Left Features */}
            <div className="space-y-12 lg:space-y-16 order-2 lg:order-1">
              {features.slice(0, 2).map((feature, index) => (
                <motion.div key={index} variants={slideInLeft}>
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    align="right"
                  />
                </motion.div>
              ))}
            </div>

            {/* Center Phone Mockup */}
            <motion.div
              className="flex justify-center items-center order-1 lg:order-2 mb-8 lg:mb-0"
              variants={pulseAnimation}
              initial="initial"
              animate="animate"
            >
              <div className="relative w-64 sm:w-80 md:w-96 lg:w-full max-w-md">
                <Image
                  src={images.landingPage2}
                  alt="App preview"
                  width={400}
                  height={600}
                  className="rounded-2xl w-full h-auto"
                />
              </div>
            </motion.div>

            {/* Right Features */}
            <div className="space-y-12 lg:space-y-16 order-3">
              {features.slice(2, 4).map((feature, index) => (
                <motion.div key={index + 2} variants={slideInRight}>
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    align="left"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Why Litaskunu Section */}
      <section className="relative bg-[#e8ebe4]">
        <div className="py-8 pb-36 sm:py-36 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              WHY LITASKUNU
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {whyLitaskunuCards.map((card, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#e8ebe4] rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                    {card.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-3 sm:mb-4">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed text-sm sm:text-base">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="-mt-40">
        <WaveTransition />
      </div>

      {/* CTA Section */}
      <motion.section
        className="py-16 sm:py-20 px-4 sm:px-6 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Ready to Find Your Perfect Match?
          </motion.h2>
          <motion.p
            className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of singles who found their life partners through our
            platform
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              href="/en/sign-in"
              className="bg-[#A1AA8A] text-white px-8 sm:px-14 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#8f9978] transition-all duration-300 shadow-xl hover:shadow-2xl inline-block"
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
