import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Noto_Kufi_Arabic } from "next/font/google";
import "@/app/globals.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LITASKUNU",
  description: "",
  icons: {
    icon: "/images/logo.png",
  },
};

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

// const dubai = Dubai;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${notoKufiArabic.variable} font-sans`}>
      <body className={notoKufiArabic.className}>
        {" "}
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
