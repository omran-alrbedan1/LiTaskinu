import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { Metadata } from "next";
import AppProvider from "@/components/providers/AppProvider";
import Header from "@/components/user/elements/Header";

export const metadata: Metadata = {
  title: "LITASKUNU",
  description: "",
  icons: {
    icon: "/images/logo.png",
  },
};

export default async function WebsiteLayout({
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
    <html lang={locale}>
      <body className="font-sans text-base">
        {" "}
        <NextIntlClientProvider messages={messages}>
          <div className="max-h-screen overflow-y-auto  ">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
