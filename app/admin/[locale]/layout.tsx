import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";
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
    <html lang={locale}>
      <body className="font-sans text-base">
        <NextIntlClientProvider messages={messages}>
          <Sidebar>
            <Header />
            <main className="p-6">{children}</main>
          </Sidebar>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
