"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/constants/images";

export default function Header() {
  return (
    <motion.header
      className="bg-transparent fixed -top-6 flex bg-white w-full shadow-sm shadow-primary-light -left-3.5 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src={images.litaskunuLogo}
            alt="Litaskunu Logo"
            height={50}
            width={80}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-36 md:h-16 mt-2"
            priority
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mt-4"
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/en/sign-in"
            className="bg-[#A1AA8A] text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-[#8f9978] transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Login
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
}
