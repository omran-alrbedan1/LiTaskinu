"use client";
import LoginForm from "@/components/user/forms/loginForm";
import { images } from "@/constants/images";
import Image from "next/image";
import React, { useState } from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-2/5 bg-primary-color1 items-center justify-center relative">
        <div className="flex ">
          <p>test</p>
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

      <div className="w-full lg:w-3/6  mx-auto flex items-center justify-center p-8 bg-white">
        <div className="  w-full space-y-8">
          {/* Login Form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
