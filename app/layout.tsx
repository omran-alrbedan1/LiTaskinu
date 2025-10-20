import React from "react";
import "@/app/globals.css";
import { Noto_Kufi_Arabic } from "next/font/google";
import AppProvider from "@/components/providers/AppProvider";

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  adjustFontFallback: false,
});

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className=" text-base">
        {" "}
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
