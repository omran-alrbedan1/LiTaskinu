"use client";

import { motion } from "framer-motion";
import { animationVariants } from "@/constants/landingData";

interface TestimonialCardProps {
  index: number;
}

export default function TestimonialCard({ index }: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md sm:shadow-lg border border-gray-100 hover:shadow-lg sm:hover:shadow-xl transition-all duration-500 group"
      variants={animationVariants.item}
      whileHover={{
        y: -4,
        scale: 1.01,
        transition: { duration: 0.3 },
      }}
    >
      <div className="flex justify-center mb-3 sm:mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <blockquote className="text-gray-600 text-center mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed italic">
        "We loved the idea of having a parent or guardian in control every step
        of the way."
      </blockquote>

      <div className="text-center">
        <p className="font-semibold text-[#8B9475] text-sm sm:text-base">
          Ahmed & Fatima
        </p>
        <p className="text-xs sm:text-sm text-gray-500">London, UK</p>
      </div>

      <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-[#A1AA8A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
