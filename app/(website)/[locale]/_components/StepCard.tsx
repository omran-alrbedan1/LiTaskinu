"use client";

import { animationVariants } from "@/constants/landingData";
import { motion } from "framer-motion";

interface StepCardProps {
  step: {
    number: string;
    title: string;
    description: string;
  };
  index: number;
}

export default function StepCard({ step, index }: StepCardProps) {
  return (
    <motion.div
      className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm sm:shadow-md border border-gray-100 hover:shadow-lg sm:hover:shadow-xl transition-all duration-500 relative overflow-hidden"
      custom={index}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#A1AA8A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />

      <div className="flex items-start relative z-10">
        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#A1AA8A] to-[#8B9475] flex items-center justify-center text-white font-bold text-sm sm:text-lg mr-3 sm:mr-4 flex-shrink-0 shadow-sm sm:shadow-md">
          {step.number}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-[#8B9475] mb-1 sm:mb-2 group-hover:text-[#A1AA8A] transition-colors duration-300 leading-tight">
            {step.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed sm:leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 w-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#A1AA8A] to-[#8B9475] rounded-full"
        whileHover={{
          width: "100%",
          transition: { duration: 0.4 },
        }}
      />
    </motion.div>
  );
}
