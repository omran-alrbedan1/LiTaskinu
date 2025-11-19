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
      className="group bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
      custom={index}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#A1AA8A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />

      <div className="flex items-start relative z-10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A1AA8A] to-[#8B9475] flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0 shadow-md">
          {step.number}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#8B9475] mb-2 group-hover:text-[#A1AA8A] transition-colors duration-300">
            {step.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#A1AA8A] to-[#8B9475] rounded-full"
        whileHover={{
          width: "100%",
          transition: { duration: 0.4 },
        }}
      />
    </motion.div>
  );
}
