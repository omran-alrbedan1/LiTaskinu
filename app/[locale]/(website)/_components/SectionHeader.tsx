"use client";
import React from "react";
import { motion } from "framer-motion";
import { animationVariants } from "@/constants/landingData";

const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <motion.div className="text-center mb-16" variants={animationVariants.item}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-color1">
        {title}
      </h2>
      <p className="text-lg text-gray-600">{description}</p>
    </motion.div>
  );
};

export default SectionHeader;
