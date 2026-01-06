"use client";

import { motion } from "framer-motion";
import { animationVariants } from "@/constants/landingData";

interface TestimonialCardProps {
  index: number;
}

export default function TestimonialCard({ index }: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md sm:shadow-lg dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700 hover:shadow-lg sm:hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-500 group relative overflow-hidden"
      variants={animationVariants.item}
      whileHover={{
        y: -4,
        scale: 1.01,
        transition: { duration: 0.3 },
      }}
    >
      {/* Subtle background gradient for dark mode */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#A1AA8A]/5 dark:to-[#8B9475]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />

      <div className="relative z-10">
        {/* Star ratings */}
        <div className="flex justify-center mb-3 sm:mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 dark:text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Testimonial quote */}
        <blockquote className="text-gray-600 dark:text-gray-300 text-center mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed italic group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
          "We loved the idea of having a parent or guardian in control every step
          of the way."
        </blockquote>

        {/* User info */}
        <div className="text-center">
          <p className="font-semibold text-[#8B9475] dark:text-[#A1AA8A] text-sm sm:text-base group-hover:text-[#A1AA8A] dark:group-hover:text-[#8B9475] transition-colors duration-300">
            Ahmed & Fatima
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
            London, UK
          </p>
        </div>
      </div>

      {/* Top border animation on hover */}
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-[#A1AA8A] to-transparent dark:from-transparent dark:via-[#8B9475] dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        whileHover={{
          scaleX: 1.1,
          transition: { duration: 0.5 },
        }}
      />

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-1/2 w-0 h-0.5 sm:h-0.5 bg-gradient-to-r from-[#A1AA8A] to-[#8f9978] dark:from-[#8B9475] dark:to-[#6E775D] rounded-full"
        whileHover={{
          width: "60%",
          x: "-30%",
          transition: { duration: 0.4 },
        }}
      />

      {/* Decorative corner elements */}
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#A1AA8A]/20 dark:border-[#8B9475]/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#A1AA8A]/20 dark:border-[#8B9475]/30 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}