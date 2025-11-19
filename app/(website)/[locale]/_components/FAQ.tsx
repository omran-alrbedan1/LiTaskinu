"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import FAQCard from "./FAQCard";
import { animationVariants, faqItems } from "@/constants/landingData";
import SectionHeader from "./SectionHeader";

export default function FAQ() {
  return (
    <motion.section
      className="py-16 sm:py-20 bg-primary-light3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={animationVariants.container}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Frequently Asked Questions"
            description="Everything you need to know about our online Litaskunu services"
          />

          <div className="grid md:grid-cols-2 gap-8">
            {faqItems.map((faq, index) => (
              <FAQCard key={index} faq={faq} index={index} />
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            variants={animationVariants.item}
          >
            <p className="text-gray-600 mb-6">
              Still have questions? We're here to help!
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="bg-transparent border border-[#A1AA8A] text-[#8B9475] hover:bg-[#A1AA8A] hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                Contact Support
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
