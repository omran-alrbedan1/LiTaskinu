"use client";
import LoginForm from "@/components/forms/loginForm";
import { images } from "@/constants/images";
import Image from "next/image";
import React, { useState } from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-2/5 bg-primary-color1 items-center justify-center relative">
        <div className="flex ">
          <Image
            src={images.logo}
            height={200}
            width={200}
            alt="logo"
            className=" top-4 absolute right-52"
          />
          <Image
            src={images.couple}
            height={400}
            width={400}
            alt="couple"
            className="absolute   left-24 bottom-0 "
          />
        </div>
      </div>

      <div className="w-full lg:w-3/6 flex items-center justify-center p-8 bg-white">
        <div className=" w-full space-y-8">
          {/* Login Form */}
          <LoginForm />

          <div className="lg:hidden mt-8 flex justify-center">
            <Image
              src={images.couple}
              height={400}
              width={600}
              alt="couple"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
