// app/admin/en/login/page.tsx
import Image from "next/image";
import { images } from "@/constants/images";
import { LoginForm } from "./_components/loginForm";

export default function LoginPage() {
  return (
    <div className="absolute w-screen min-h-screen top-0 -left-64 z-50 bg-white">
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <Image
                src={images.litaskunuLogo}
                height={182}
                width={182}
                alt="logo"
              />
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  Admin Login
                </h1>
                <p className="mt-2 text-gray-600">
                  Enter your administrator credentials
                </p>
              </div>
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <Image
            src={images.adminLogin}
            alt="Admin Login"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            priority
          />
        </div>
      </div>
    </div>
  );
}
