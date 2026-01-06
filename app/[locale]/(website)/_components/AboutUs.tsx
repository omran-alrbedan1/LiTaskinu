"use client";

import { aboutFeatures, animationVariants } from "@/constants/landingData";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

export default function AboutUs() {
  return (
    <motion.section
      className="py-12 sm:py-16 lg:py-20 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={animationVariants.container}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-8 sm:mb-10 lg:mb-12 flex flex-col lg:flex-row items-start lg:items-center gap-4 sm:gap-6 lg:gap-8"
            variants={animationVariants.item}
          >
            <div className="flex-1 w-full">
              <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
                ABOUT US
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[#8B9475] leading-snug sm:leading-tight">
                Litaskunu is an Islamic
                <br className="hidden sm:block" />
                marriage platform
              </h2>
            </div>

            <p className="flex-1 w-full text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed sm:leading-loose">
              is designed to be a safe and legitimate environment that brings
              together those seeking marriage according to Islamic principles.
              The platform focuses on transparency, trust, and respect for the
              family by involving the guardian in the communication process to
              ensure seriousness and commitment.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-10 lg:mt-12"
            variants={animationVariants.item}
          >
            {aboutFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
