//@ts-nocheck
"use client";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const WhatsAppFloatingButton = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");

      // Add periodic "attention grabber" animation
      const interval = setInterval(() => {
        controls.start({
          scale: [1, 1.1, 1],
          transition: { duration: 1.5 },
        });
      }, 8000); // Every 8 seconds

      return () => clearInterval(interval);
    }
  }, [controls, inView]);

  const variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.15,
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.5,
        rotate: { duration: 0.8, repeat: 1 },
      },
    },
    tap: {
      scale: 0.9,
      transition: { duration: 0.1 },
    },
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const bounceVariants = {
    bounce: {
      y: [0, -5, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      ref={ref}
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background pulse */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={pulseVariants}
        className="absolute inset-0 rounded-full bg-primary-color1/30"
      />

      {/* Main button with multiple animations */}
      <motion.a
        href="https://wa.me/962780185759"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-color1 shadow-xl hover:shadow-2xl"
        aria-label="Chat on WhatsApp"
        variants={variants}
        initial="hidden"
        animate={["visible", "bounce"]}
        whileHover="hover"
        whileTap="tap"
      >
        <motion.div variants={bounceVariants}>
          <FaWhatsapp className="!text-white text-3xl" />
        </motion.div>
      </motion.a>

      {/* Floating label with smooth appearance */}
      <motion.span
        className="absolute right-[70px] top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-primary-color1 dark:text-white px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap shadow-md"
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
      >
        Need help? Chat with us
      </motion.span>
    </div>
  );
};

export default WhatsAppFloatingButton;
