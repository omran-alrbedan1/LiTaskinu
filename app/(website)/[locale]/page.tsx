//@ts-nocheck
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { images } from "@/constants/images";
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

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
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

  return (
    <div className="min-h-screen overflow-y-auto">
      {/* Hero Section with Background Image */}
      <div className="relative ">
        <Image
          src={images.landingPage}
          className="h-[90vh] w-full"
          alt="Happy couple"
        />

        <motion.header
          className="absolute top-0 left-0 right-0 z-50 bg-transparent"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={images.logo2}
                  alt="Litaskunu Logo"
                  height={94}
                  width={94}
                  priority
                />
              </motion.div>

              {/* Login Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={"/en/sign-in"}
                  className="bg-[#A1AA8A] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#8f9978] transition-all duration-300 shadow-lg hover:shadow-xl"
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
        className="py-10 mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Features */}
            <div className="space-y-16">
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
              className="flex justify-center items-center px-4 order-first lg:order-none"
              variants={pulseAnimation}
              initial="initial"
              animate="animate"
            >
              <Image
                src={images.landingPage2}
                height={300}
                width={400}
                alt="App preview"
                className="rounded-2xl"
              />
            </motion.div>

            {/* Right Features */}
            <div className="space-y-16">
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

      <div className="min-h-screen relative">
        {/* Wave Transition */}
        <motion.div
          className="relative -mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
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
        </motion.div>

        {/* Why Litaskunu Section */}
        <section className="py-20 px-4 bg-[#e8ebe4]">
          <div className="max-w-6xl mx-auto">
            {/* Section Title */}
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              WHY LITASKUNU
            </motion.h1>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 - Unique user experience */}
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-[#e8ebe4] rounded-2xl flex items-center justify-center mb-6 mx-auto">
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
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
                  Unique user experience
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Cursus imperdiet sed id elementum.
                </p>
              </motion.div>

              {/* Card 2 - Data integrity */}
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-[#e8ebe4] rounded-2xl flex items-center justify-center mb-6 mx-auto">
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
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
                  Data integrity
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Cursus imperdiet sed id elementum.
                </p>
              </motion.div>

              {/* Card 3 - Isimic vibes */}
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-[#e8ebe4] rounded-2xl flex items-center justify-center mb-6 mx-auto">
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
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
                  Isimic vibes
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Cursus imperdiet sed id elementum.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          className="py-20 px-4 -mt-1"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Ready to Find Your Perfect Match?
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg mb-8 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join thousands of singles who found their life partners through
              our platform
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
                href={"/en/sign-in"}
                className="bg-[#A1AA8A] text-white px-14 py-4 rounded-full text-lg font-semibold hover:bg-[#8f9978] transition-all duration-300 shadow-xl hover:shadow-2xl inline-block"
              >
                Get Started Free
              </Link>
            </motion.div>
          </div>
        </motion.section>
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
    <motion.div
      className={`flex flex-col items-center text-center lg:text-start space-y-4 group`}
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
        <Image src={icon} height={44} width={44} alt={"feature icon"} />
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
