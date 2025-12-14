// components/layout/AuthLayout.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { images } from "@/constants/images";
import Link from "next/link";
import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  mobileContainerVariants,
  mobileItemVariants,
  desktopContainerVariants,
  desktopItemVariants,
  fadeInUpVariants,
  scaleVariants,
} from "@/constants/animation-variants";
import { socialMediaLinks } from "@/constants/userTemporary";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  showLanguageSwitch?: boolean;
  customFormClasses?: string;
  showSocialMedia?: boolean;
}

const AuthLayout = ({
  children,
  title,
  description,
  showLanguageSwitch = true,
  customFormClasses = "",
  showSocialMedia = true,
}: AuthLayoutProps) => {
  const router = useRouter();

  const handleLanguageSwitch = () => {
    router.push("./select-language");
  };

  // Common content for both sides
  const welcomeContent = (
    <motion.div
      variants={desktopContainerVariants}
      initial="hidden"
      animate="visible"
      className="hidden lg:flex lg:w-2/3 flex-col items-start justify-between p-4 sm:p-6 lg:p-8 xl:p-12"
    >
      {/* Logo and Welcome Text */}
      <motion.div
        variants={desktopItemVariants}
        className="flex-1 flex lg:ml-16 xl:ml-24 2xl:ml-32 flex-col lg:-mt-16 xl:-mt-24 2xl:-mt-32 items-start justify-center text-start w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          variants={scaleVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="mb-6 lg:mb-8"
        >
          <Image
            src={images.logo2}
            alt="logo"
            width={160}
            height={160}
            className="object-cover lg:w-[180px] lg:h-[180px] xl:w-[200px] xl:h-[200px]"
            quality={100}
          />
        </motion.div>

        {/* Welcome Text */}
        <motion.h1
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="text-2xl lg:text-3xl xl:text-4xl font-bold text-yellow-400 mb-4 lg:mb-6"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="text-yellow-400 text-sm lg:text-base leading-relaxed"
        >
          {description}
        </motion.p>
      </motion.div>

      {/* Social Media Icons */}
      {showSocialMedia && (
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
          className="flex gap-4 lg:gap-6 pb-4 lg:pb-6 lg:ml-16 xl:ml-24 2xl:ml-32 lg:-mt-16 xl:-mt-24 2xl:-mt-32"
        >
          {socialMediaLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <motion.button
                key={social.name}
                whileHover={{
                  scale: 1.2,
                  y: -5,
                  transition: { type: "spring", stiffness: 400 },
                }}
                whileTap={{ scale: 0.9 }}
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 ${social.color} backdrop-blur-sm border border-white/20`}
                title={social.name}
              >
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full h-full"
                >
                  <IconComponent className="w-4 h-4 lg:w-5 lg:h-5" />
                </Link>
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );

  const mobileHeader = (
    <motion.div
      variants={mobileContainerVariants}
      initial="hidden"
      animate="visible"
      className="lg:hidden flex flex-col items-center p-3 sm:p-4 pt-4 sm:pt-6"
    >
      {/* Mobile Logo */}
      <motion.div variants={mobileItemVariants} className="mb-3 sm:mb-4">
        <Image
          src={images.logo2}
          alt="logo"
          width={70}
          height={70}
          className="object-cover sm:w-[90px] sm:h-[90px]"
          quality={100}
        />
      </motion.div>

      {/* Mobile Welcome Text */}
      <motion.div
        variants={mobileItemVariants}
        className="text-center mb-4 sm:mb-6 px-2"
      >
        <h1 className="text-lg sm:text-xl font-bold text-yellow-400 mb-2 sm:mb-3">
          {title}
        </h1>
        <p className="text-yellow-400 text-xs sm:text-sm leading-relaxed max-w-xs sm:max-w-md">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );

  const formSection = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`w-full lg:w-1/3 flex items-center justify-center p-3 sm:p-4 lg:p-6 xl:p-8 2xl:p-10 bg-black/30 min-h-screen lg:min-h-0 ${customFormClasses}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-xs sm:max-w-sm lg:max-w-md lg:w-[400px] xl:w-[450px] space-y-4 sm:space-y-5 lg:space-y-6"
      >
        {/* Language Selector */}
        {showLanguageSwitch && (
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="flex justify-end"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLanguageSwitch}
              className="flex items-center gap-2 text-white text-xs sm:text-sm hover:text-gray-300 transition bg-white/10 rounded-full px-3 py-1.5 sm:px-3 sm:py-2 backdrop-blur-sm"
            >
              <Globe className="text-primary-color1 size-3 sm:size-4" />
              <span className="text-xs sm:text-sm">EN</span>
            </motion.button>
          </motion.div>
        )}

        {/* Form Content */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
          className="w-full"
        >
          {children}
        </motion.div>

        {/* Mobile Social Media Icons */}
        {showSocialMedia && (
          <motion.div
            variants={mobileContainerVariants}
            initial="hidden"
            animate="visible"
            className="lg:hidden mt-6 sm:mt-8"
          >
            <motion.div
              variants={mobileItemVariants}
              className="text-center mb-4"
            >
              <p className="text-white text-xs sm:text-sm mb-3">Follow us on</p>
              <div className="flex justify-center gap-3 sm:gap-4">
                {socialMediaLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.button
                      key={social.name}
                      variants={mobileItemVariants}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 ${social.color} backdrop-blur-sm border border-white/20`}
                      title={social.name}
                    >
                      <Link
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full h-full"
                      >
                        <IconComponent className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </Link>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen  z-50 relative overflow-hidden">
      {/* Full Screen Background Image with Blur */}
      <div className="absolute inset-0">
        <Image
          src={images.authBackground}
          alt="background"
          fill
          className="object-cover blur-sm"
          priority
          quality={100}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Mobile Header */}
        {mobileHeader}

        {/* Desktop Layout */}
        <>
          {welcomeContent}
          {formSection}
        </>
      </div>
    </div>
  );
};

export default AuthLayout;
