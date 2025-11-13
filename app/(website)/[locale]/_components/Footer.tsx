"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { images } from "@/constants/images";
import { animationVariants } from "@/constants/landingData";
import {
  FaEnvelope,
  FaPhone,
  FaFileContract,
  FaShieldAlt,
  FaGlobe,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import { TiHeartFullOutline } from "react-icons/ti";
export default function Footer() {
  return (
    <motion.footer
      className="bg-gradient-to-br from-[#8B9475] to-[#6B7355] text-white pt-16 pb-8 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={animationVariants.container}
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-2"
              variants={animationVariants.item}
            >
              <div className="flex items-center mb-6">
                <Image
                  src={images.logo2}
                  priority
                  alt="litaskunu logo light"
                  className="h-16 w-20 mr-4"
                />
                <div>
                  <h3 className="text-2xl font-bold">Litaskunu</h3>
                  <p className="text-white/70 text-sm">
                    Islamic Marriage Platform
                  </p>
                </div>
              </div>

              <p className="text-white/90 leading-relaxed mb-6 text-lg">
                Making halal marriages accessible worldwide through modern
                technology while honoring Islamic traditions.
              </p>

              {/* Social Media */}
              <div className="flex gap-4">
                {[
                  {
                    icon: FaInstagram,
                    href: "#",
                    color: "hover:text-pink-400",
                  },
                  { icon: FaTwitter, href: "#", color: "hover:text-blue-400" },
                  {
                    icon: FaFacebookF,
                    href: "#",
                    color: "hover:text-blue-600",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className={`text-sm ${social.color}`} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div variants={animationVariants.item}>
              <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FaEnvelope className="text-white" />
                Contact Us
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-[#A1AA8A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaEnvelope className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-white/90 font-medium">Email</p>
                    <p className="text-white/70 text-sm">
                      om.alrbedan100@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-[#A1AA8A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaPhone className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-white/90 font-medium">Phone</p>
                    <p className="text-white/70 text-sm">009929929992</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-[#A1AA8A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaGlobe className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-white/90 font-medium">Global</p>
                    <p className="text-white/70 text-sm">Available Worldwide</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Legal Section */}
            <motion.div variants={animationVariants.item}>
              <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FaShieldAlt className="text-white  " />
                Legal
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-[#A1AA8A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaFileContract className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-white/90 font-medium">
                      Terms & Conditions
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-[#A1AA8A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaShieldAlt className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-white/90 font-medium">Privacy Policy</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mission Statement & Copyright */}
          <motion.div
            className="pt-8 border-t border-white/20"
            variants={animationVariants.item}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  It is also an incredibly affordable platform for those seeking
                  meaningful relationships through traditional values, respect,
                  and honesty. With cultural authenticity at its core, Litaskunu
                  connects millions of users worldwide who are ready for serious
                  commitments.
                </p>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <TiHeartFullOutline className="text-red-500 " />
                  <span>
                    Building meaningful Islamic relationships since 2024
                  </span>
                </div>
              </div>

              <div className="text-center lg:text-right">
                <p className="text-white/70 text-md">
                  © {new Date().getFullYear()} Litaskunu. All rights reserved.
                </p>
                <motion.p
                  className="text-white/50 text-sm mt-1 flex items-center justify-center lg:justify-end gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Made with
                  <motion.span
                    animate={{
                      scale: [1.2, 1.6, 1.2],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <TiHeartFullOutline className="text-red-600" />
                  </motion.span>
                  for the Muslim Ummah
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-10 right-10 w-4 h-4 bg-[#A1AA8A] rounded-full opacity-30"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-6 h-6 bg-white rounded-full opacity-20"
        animate={{
          y: [0, 15, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.footer>
  );
}
