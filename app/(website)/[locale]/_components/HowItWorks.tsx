"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { images } from "@/constants/images";
import StepCard from "./StepCard";
import { steps } from "@/constants/landingData";
import SectionHeader from "./SectionHeader";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const leftCardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
    scale: 0.9,
  },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: custom * 0.2,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const rightCardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
    scale: 0.9,
  },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: 0.6 + custom * 0.2,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.4,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function HowItWorks() {
  return (
    <motion.section
      className="py-8 sm:py-16 pb-40 md:pb-20 bg-primary-light2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          title="How the Platform Works"
          description="A very easy 6-step process to find your partner"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Left Steps - Animate first, one by one */}
          <div className="space-y-8 lg:space-y-12 order-2 lg:order-1">
            {steps.slice(0, 3).map((step, index) => (
              <motion.div
                key={step.number}
                custom={index}
                variants={leftCardVariants}
              >
                <StepCard step={step} index={index} />
              </motion.div>
            ))}
          </div>

          {/* Center Image - Animate after left column starts */}
          <motion.div
            className="flex justify-center items-center order-1 lg:order-2 mb-8 lg:mb-0"
            variants={imageVariants}
          >
            <div className="relative w-64 sm:w-80 md:w-96 lg:w-full max-w-md">
              <motion.div
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.4 },
                }}
              >
                <Image
                  src={images.landingCouple}
                  alt="App preview showing the platform interface"
                  width={400}
                  height={600}
                  className="rounded-3xl w-full"
                  priority
                />
              </motion.div>

              <motion.div
                className="absolute -top-4 -left-4 w-8 h-8 bg-[#A1AA8A] rounded-full opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-6 h-6 bg-[#8B9475] rounded-full opacity-30"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </div>
          </motion.div>

          {/* Right Steps - Animate last, one by one */}
          <div className="space-y-8 lg:space-y-12 order-3">
            {steps.slice(3, 6).map((step, index) => (
              <motion.div
                key={step.number}
                custom={index}
                variants={rightCardVariants}
              >
                <StepCard step={step} index={index + 3} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
