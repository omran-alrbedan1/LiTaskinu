// src/app/admin/[locale]/layout.tsx (Recommended structure)
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";
import Sidebar from "@/components/admin/sidebar/Sidebar";
import MainHeader from "@/components/admin/parts/MainHeader";

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
    <NextIntlClientProvider messages={messages}>
      <Sidebar>
        <MainHeader />
        <main className="p-6">{children}</main>
      </Sidebar>
    </NextIntlClientProvider>
  );
}
