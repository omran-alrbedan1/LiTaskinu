"use client";
import RegisterForm from "@/components/user/forms/RegisterForm";
import { images } from "@/constants/images";
import Image from "next/image";
import React from "react";

const SignUpPage = () => {
  return (
    <div className=" flex">
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
            className="absolute   left-24 bottom-16 "
          />
        </div>
      </div>

      <div className="w-full lg:w-3/6 flex flex-1 items-center justify-center p-8 ">
        <div className=" w-full  space-y-8  !mx-auto">
          <div className="max-h-svh md:px-10 overflow-scroll hide-scrollbar">
            <RegisterForm />
          </div>

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

export default SignUpPage;
