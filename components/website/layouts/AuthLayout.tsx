// components/layout/AuthLayout.tsx
"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import { images } from "@/constants/images";
import {
  mobileContainerVariants,
  mobileItemVariants,
  desktopContainerVariants,
  desktopItemVariants,
  fadeInUpVariants,
  scaleVariants,
} from "@/constants/animation-variants";
import { socialMediaLinks } from "@/constants/userTemporary";

type AuthLayoutProps = {
  // children: ReactNode;

  /** Pass raw text (no translation) */
  title?: string;
  description?: string;

  /** Pass translation keys (will use t("auth") inside layout) */
  titleKey?: string;
  descriptionKey?: string;

  /** Optional switches if you pass title/description but still want translation */
  translateTitle?: boolean; // default false
  translateDescription?: boolean; // default false

  customFormClasses?: string;
  showSocialMedia?: boolean;
};

export default function AuthLayout({
  children,
  title,
  description,
  titleKey,
  descriptionKey,
  translateTitle = false,
  translateDescription = false,
  customFormClasses = "",
  showSocialMedia = true,
}: AuthLayoutProps) {
  const t = useTranslations("auth");

  // Resolve displayed text
  const resolvedTitle =
    titleKey ? t(titleKey) : title ? (translateTitle ? t(title) : title) : "";

  const resolvedDescription =
    descriptionKey
      ? t(descriptionKey)
      : description
      ? translateDescription
        ? t(description)
        : description
      : "";

  const SocialIcons = ({ size = "desktop" }: { size?: "desktop" | "mobile" }) => (
    <div
      className={
        size === "desktop"
          ? "flex gap-4 lg:gap-6 pb-4 lg:pb-6 lg:ml-16 xl:ml-24 2xl:ml-32 lg:-mt-16 xl:-mt-24 2xl:-mt-32"
          : "flex justify-center gap-3 sm:gap-4"
      }
    >
      {socialMediaLinks.map((social) => {
        const IconComponent = social.icon;
        const base =
          size === "desktop" ? "w-10 h-10 lg:w-12 lg:h-12" : "w-8 h-8 sm:w-9 sm:h-9";

        return (
          <motion.div
            key={social.name}
            whileHover={
              size === "desktop"
                ? { scale: 1.12, y: -4, transition: { type: "spring", stiffness: 400 } }
                : { scale: 1.1 }
            }
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`${base} rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 ${social.color} backdrop-blur-sm border border-white/20`}
            >
              <IconComponent
                className={
                  size === "desktop"
                    ? "w-4 h-4 lg:w-5 lg:h-5"
                    : "w-3 h-3 sm:w-3.5 sm:h-3.5"
                }
              />
              <span className="sr-only">{social.name}</span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );

  const welcomeContent = (
    <motion.div
      variants={desktopContainerVariants}
      initial="hidden"
      animate="visible"
      className="hidden lg:flex lg:w-2/3 flex-col items-start justify-between p-4 sm:p-6 lg:p-8 xl:p-12"
    >
      <motion.div
        variants={desktopItemVariants}
        className="flex-1 flex lg:ml-16 xl:ml-24 2xl:ml-32 flex-col lg:-mt-16 xl:-mt-24 2xl:-mt-32 items-start justify-center text-start w-full max-w-md"
      >
        <motion.div
          variants={scaleVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="mb-6 lg:mb-8"
        >
          <Link href="/" aria-label="Home">
            <Image
              src={images.logo2}
              alt="logo"
              width={160}
              height={160}
              className="object-cover lg:w-[180px] lg:h-[180px] xl:w-[200px] xl:h-[200px]"
              quality={100}
              priority
            />
          </Link>
        </motion.div>

        <motion.h1
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-color3 mb-4 lg:mb-6"
        >
          {resolvedTitle}
        </motion.h1>

        <motion.p
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="text-primary-color3 text-sm lg:text-base leading-relaxed"
        >
          {resolvedDescription}
        </motion.p>
      </motion.div>

      {showSocialMedia && (
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          <SocialIcons size="desktop" />
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
      <motion.div variants={mobileItemVariants} className="mb-3 sm:mb-4">
        <Link href="/" aria-label="Home">
          <Image
            src={images.logo2}
            alt="logo"
            width={70}
            height={70}
            className="object-cover sm:w-[90px] sm:h-[90px]"
            quality={100}
            priority
          />
        </Link>
      </motion.div>

      <motion.div variants={mobileItemVariants} className="text-center mb-4 sm:mb-6 px-2">
        <h1 className="text-lg sm:text-xl font-bold text-primary-color3 mb-2 sm:mb-3">
          {resolvedTitle}
        </h1>
        <p className="text-primary-color3 text-xs sm:text-sm leading-relaxed max-w-xs sm:max-w-md">
          {resolvedDescription}
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
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
          className="w-full"
        >
          {children}
        </motion.div>

        {showSocialMedia && (
          <motion.div
            variants={mobileContainerVariants}
            initial="hidden"
            animate="visible"
            className="lg:hidden mt-6 sm:mt-8"
          >
            <motion.div variants={mobileItemVariants} className="text-center mb-4">
              <p className="text-white text-xs sm:text-sm mb-3">
                {t("follow_us_on")}
              </p>
              <SocialIcons size="mobile" />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen z-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={images.authBackground}
          alt="background"
          fill
          className="object-cover blur-sm"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {mobileHeader}
        {welcomeContent}
        {formSection}
      </div>
    </div>
  );
}
