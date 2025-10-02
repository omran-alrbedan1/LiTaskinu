"use client";
import LoginForm from "@/components/user/forms/loginForm";
import { images } from "@/constants/images";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Image Section */}
      <div className="hidden lg:flex lg:w-2/5 xl:w-1/3 2xl:w-2/5 bg-primary-color1 items-center justify-center relative min-h-[300px] lg:min-h-screen">
        <div className="flex flex-col items-center justify-center w-full h-full relative">
          {/* Logo */}
          <div className="absolute top-8 xl:top-12 2xl:top-16 z-10">
            <Image
              src={images.logo}
              height={120}
              width={120}
              alt="logo"
              className="object-contain"
              priority
            />
          </div>

          {/* Couple Image */}
          <div className="relative w-full h-full flex items-end justify-center px-4 xl:px-8 2xl:px-16">
            <Image
              src={images.couple}
              height={600}
              width={600}
              alt="couple"
              className="object-contain max-w-[90%] xl:max-w-[90%] 2xl:max-w-[80%]"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right side - Form Section */}
      <div className="w-full lg:w-3/5 xl:w-2/3 2xl:w-3/5 flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12 2xl:p-16 bg-white flex-1">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-md xl:max-w-lg 2xl:max-w-xl space-y-6 sm:space-y-8">
          {/* Login Form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
