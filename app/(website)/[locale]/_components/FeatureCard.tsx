"use client";

import { motion } from "framer-motion";

interface FeatureCardProps {
  feature: {
    icon: React.ReactNode;
    title: string;
    description: string;
  };
  index: number;
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <motion.div
      className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-[#A1AA8A] transition-all duration-500 overflow-hidden relative"
      variants={{
        hidden: {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      whileHover={{
        y: -8,
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      }}
      viewport={{ once: true }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#A1AA8A]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        initial={false}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#A1AA8A]/10 to-[#8f9978]/10 rounded-xl transition-all duration-500 group-hover:from-[#A1AA8A]/20 group-hover:to-[#8f9978]/20"
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.5 },
            }}
          >
            <motion.span
              className="text-primary-color2 transition-colors duration-500 group-hover:text-[#8f9978]"
              whileHover={{ scale: 1.1 }}
            >
              {feature.icon}
            </motion.span>
          </motion.div>
          <motion.h3
            className="text-lg font-bold text-[#8B9475] transition-colors duration-500 group-hover:text-[#A1AA8A]"
            whileHover={{ x: 2 }}
          >
            {feature.title}
          </motion.h3>
        </div>

        <motion.p
          className="text-gray-600 text-sm leading-relaxed pl-1 transition-colors duration-500 group-hover:text-gray-700"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {feature.description}
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-[#A1AA8A] to-[#8f9978] rounded-full"
        whileHover={{
          width: "80%",
          x: "-40%",
          transition: { duration: 0.4 },
        }}
      />
    </motion.div>
  );
}
