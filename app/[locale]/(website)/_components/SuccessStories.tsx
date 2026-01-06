"use client";

import { motion } from "framer-motion";
import { animationVariants } from "@/constants/landingData";
import TestimonialCard from "./TestimonialCard";
import SectionHeader from "./SectionHeader";

export default function SuccessStories() {
  return (
    <motion.section
      className="py-16 sm:py-20 dark:bg-black "
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={animationVariants.container}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Success Stories"
          description="Real stories from couples who chose our online Nikah service"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((_, index) => (
            <TestimonialCard key={index} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}