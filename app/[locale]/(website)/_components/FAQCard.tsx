"use client";

import { motion } from "framer-motion";
import { animationVariants } from "@/constants/landingData";

interface FAQCardProps {
  faq: {
    question: string;
    answer: string;
  };
  index: number;
}

export default function FAQCard({ faq, index }: FAQCardProps) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md sm:shadow-lg dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700 hover:shadow-lg sm:hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-300 group relative overflow-hidden"
      variants={animationVariants.item}
      whileHover={{
        y: -2,
        borderColor: "#A1AA8A",
        transition: { duration: 0.2 },
      }}
      custom={index}
    >
      {/* Background overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent to-[#A1AA8A]/5 dark:to-[#8B9475]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />

      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-[#8B9475] dark:text-[#A1AA8A] mb-2 sm:mb-3 group-hover:text-[#A1AA8A] dark:group-hover:text-[#8B9475] transition-colors duration-300 leading-tight">
            {faq.question}
          </h3>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed sm:leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
            {faq.answer}
          </p>
        </div>
      </div>

      {/* Left accent indicator */}
      <motion.div
        className="absolute left-0 top-1/2 w-0.5 h-0 bg-gradient-to-b from-[#A1AA8A] to-[#8f9978] dark:from-[#8B9475] dark:to-[#6E775D] rounded-full -translate-y-1/2"
        whileHover={{
          height: "60%",
          transition: { duration: 0.3 },
        }}
      />

      {/* Optional: Icon indicator */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg
          className="w-5 h-5 text-[#A1AA8A] dark:text-[#8B9475]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </motion.div>
  );
}