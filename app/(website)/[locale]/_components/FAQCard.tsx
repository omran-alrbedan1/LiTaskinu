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
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
      variants={animationVariants.item}
      whileHover={{
        y: -2,
        borderColor: "#A1AA8A",
        transition: { duration: 0.2 },
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#8B9475] mb-3 group-hover:text-[#A1AA8A] transition-colors duration-300">
            {faq.question}
          </h3>
          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </motion.div>
  );
}
