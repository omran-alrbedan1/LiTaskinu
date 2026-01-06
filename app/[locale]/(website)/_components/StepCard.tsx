"use client";

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
      className="group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm sm:shadow-md dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700 hover:shadow-lg sm:hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-500 relative overflow-hidden"
      custom={index}
    >
      {/* Background gradient overlay - light/dark mode variants */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#A1AA8A]/5 to-transparent dark:from-[#8B9475]/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />

      {/* Subtle glow effect for dark mode */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-[#A1AA8A]/5 to-[#8B9475]/5 dark:from-[#8B9475]/15 dark:to-[#6E775D]/15 rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />

      <div className="flex items-start relative z-10">
        {/* Step number badge */}
        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#A1AA8A] to-[#8B9475] dark:from-[#8B9475] dark:to-[#6E775D] flex items-center justify-center text-white font-bold text-sm sm:text-lg mr-3 sm:mr-4 flex-shrink-0 shadow-sm sm:shadow-md dark:shadow-gray-900/50 group-hover:scale-105 transition-transform duration-300">
          {step.number}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-[#8B9475] dark:text-[#A1AA8A] mb-1 sm:mb-2 group-hover:text-[#A1AA8A] dark:group-hover:text-[#8B9475] transition-colors duration-300 leading-tight">
            {step.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed sm:leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
            {step.description}
          </p>
        </div>
      </div>

      {/* Bottom progress indicator */}
      <motion.div
        className="absolute bottom-0 left-0 w-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#A1AA8A] to-[#8B9475] dark:from-[#8B9475] dark:to-[#6E775D] rounded-full"
        whileHover={{
          width: "100%",
          transition: { duration: 0.4 },
        }}
      />

      <div className="absolute top-0 right-0 w-2 h-2 bg-gradient-to-br from-transparent to-[#8B9475]/20 dark:to-[#A1AA8A]/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}