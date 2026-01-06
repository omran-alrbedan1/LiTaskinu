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
      className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md sm:shadow-lg border border-gray-100 hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 group"
      variants={animationVariants.item}
      whileHover={{
        y: -2,
        borderColor: "#A1AA8A",
        transition: { duration: 0.2 },
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-[#8B9475] mb-2 sm:mb-3 group-hover:text-[#A1AA8A] transition-colors duration-300 leading-tight">
            {faq.question}
          </h3>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed sm:leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
