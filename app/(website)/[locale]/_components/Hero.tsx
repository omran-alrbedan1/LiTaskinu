"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/constants/images";

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

export default function Hero() {
  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] mt-20 overflow-hidden">
      {/* Background Image */}
      <motion.div className="absolute inset-0">
        <Image
          src={images.landingPage}
          alt="Happy couple"
          fill
          className="object-cover brightness-75"
          priority
        />
      </motion.div>

      {/* Overlay Content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-xl sm:text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg"
          variants={fadeUp}
        >
          The Islamic marriage platform
        </motion.h1>

        <motion.p
          className="text-md sm:text-lg md:text-lg mb-10 max-w-2xl text-gray-100"
          variants={fadeUp}
        >
          is a safe, pure and sophisticated path towards legitimate marriage
        </motion.p>

        <motion.div
          className="flex gap-4 flex-wrap justify-center"
          variants={fadeUp}
        >
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/en/sign-up"
              className="bg-[#A1AA8A] hover:bg-[#8f9978] transition-all duration-300 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="bg-transparent border border-white hover:bg-white hover:text-black transition-all duration-300 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl"
            >
              Learn More
            </Link>
          </motion.div>
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
}
