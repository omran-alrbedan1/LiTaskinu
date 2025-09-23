import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Noto_Kufi_Arabic } from "next/font/google";
import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import AppProvider from "@/components/providers/AppProvider";
import "@/app/globals.css";
import Sidebar from "@/components/admin/sidebar/Sidebar";
import Header from "@/components/admin/parts/Header";

export const metadata: Metadata = {
  title: "LITASKUNU-Admin-Dashboard",
  description: "",
  icons: {
    icon: "/images/logo.png",
  },
};

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  adjustFontFallback: false,
});

interface AdminLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const { locale } = params;

  const messages = await getMessages();

  return (
    <html lang={locale} className={notoKufiArabic.variable}>
      <body className="font-sans text-base">
        <AppProvider>
          <NextIntlClientProvider messages={messages}>
            <Sidebar>
              <Header />
              <main className="p-6">{children}</main>
            </Sidebar>
          </NextIntlClientProvider>
        </AppProvider>
      </body>
    </html>
  );
}
