"use client";
import React from "react";
import { motion } from "framer-motion";
import SelectLanguageForm from "@/components/user/forms/SelectLanguageForm";
import AuthLayout from "@/components/user/layouts/AuthLayout";

const SelectLanguage = () => {
  return (
    <AuthLayout
      title="Welcome Aboard!"
      description="Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur."
      customFormClasses=" -mt-32 "
      showLanguageSwitch={false}
    >
      {/* Select Language Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="w-full mx-auto"
      >
        <SelectLanguageForm />
      </motion.div>
    </AuthLayout>
  );
};

export default SelectLanguage;
