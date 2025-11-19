"use client";

import { aboutFeatures, animationVariants } from "@/constants/landingData";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FeatureCard from "./FeatureCard";

export default function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4, once: false });

  return (
    <motion.section
      ref={ref}
      className="py-16 sm:py-20 bg-white"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animationVariants.container}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-12 flex flex-col lg:flex-row items-start lg:items-center gap-6"
            variants={animationVariants.item}
          >
            <div className="flex-1">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-3">
                ABOUT US
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#8B9475] leading-tight">
                Litaskunu is an Islamic
                <br />
                marriage platform
              </h2>
            </div>

            <p className="flex-1 text-base text-gray-600 leading-relaxed">
              is designed to be a safe and legitimate environment that brings
              together those seeking marriage according to Islamic principles.
              The platform focuses on transparency, trust, and respect for the
              family by involving the guardian in the communication process to
              ensure seriousness and commitment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {aboutFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
