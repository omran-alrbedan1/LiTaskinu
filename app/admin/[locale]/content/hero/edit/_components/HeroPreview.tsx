// app/admin/hero/edit/_components/HeroPreview.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ImageIcon } from "lucide-react";

interface HeroPreviewProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  overlayOpacity: number;
  textColor: string;
  buttons: HeroButton[];
  previewMode: "desktop" | "tablet" | "mobile";
}

// Animation variants for preview
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const HeroPreview: React.FC<HeroPreviewProps> = ({
  title,
  subtitle,
  backgroundImage,
  overlayOpacity,
  textColor,
  buttons,
  previewMode,
}) => {
  const getButtonClass = (variant: string) => {
    switch (variant) {
      case "default":
        return "bg-[#A1AA8A] hover:bg-[#8f9978] text-white";
      case "outline":
        return "bg-transparent border border-white hover:bg-white hover:text-black text-white";
      case "secondary":
        return "bg-gray-200 hover:bg-gray-300 text-gray-800";
      case "ghost":
        return "bg-transparent hover:bg-gray-100 text-gray-800";
      case "link":
        return "bg-transparent hover:underline text-gray-800";
      default:
        return "bg-[#A1AA8A] hover:bg-[#8f9978] text-white";
    }
  };

  const previewStyles = {
    desktop: "w-full h-[500px]",
    tablet: "w-[768px] h-[500px] border-8 border-gray-800 rounded-3xl",
    mobile: "w-[375px] h-[600px] border-8 border-gray-800 rounded-3xl",
  };

  return (
    <div
      className={`relative ${previewStyles[previewMode]} overflow-hidden mx-auto`}
    >
      {/* Background Image */}
      <motion.div className="absolute inset-0">
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt="Hero background preview"
            className="object-cover w-full h-full"
            style={{
              filter: `brightness(${100 - overlayOpacity / 2}%)`,
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <ImageIcon className="h-16 w-16 text-gray-500" />
          </div>
        )}
      </motion.div>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})`,
        }}
      />

      {/* Content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          color: textColor === "light" ? "white" : "#1f2937",
        }}
      >
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg"
          variants={fadeUp}
        >
          {title || "Your Hero Title"}
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg mb-8 max-w-2xl drop-shadow-sm opacity-90"
          variants={fadeUp}
          style={{
            color:
              textColor === "light"
                ? "rgba(255,255,255,0.9)"
                : "rgba(31,41,55,0.9)",
          }}
        >
          {subtitle || "Your hero subtitle will appear here"}
        </motion.p>

        <motion.div
          className="flex gap-4 flex-wrap justify-center"
          variants={fadeUp}
        >
          {buttons.map((button, index) => (
            <motion.div
              key={button.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${getButtonClass(
                  button.variant
                )}`}
              >
                {button.text}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Glow Orbs */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-16 h-16 bg-[#A1AA8A] rounded-full opacity-20 blur-3xl"
        animate={{
          y: [0, 30, 0],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-[#8B9475] rounded-full opacity-10 blur-3xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
};

export default HeroPreview;
