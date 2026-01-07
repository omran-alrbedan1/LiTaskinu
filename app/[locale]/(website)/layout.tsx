import { Metadata } from "next";
import Header from "@/components/website/elements/Header";

export const metadata: Metadata = {
  title: "LITASKUNU",
  description: "",
  icons: {
    icon: "/images/logo2.png",
  },
};

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="min-h-screen overflow-y-auto hide-scrollbar">
        {children}
      </div>
    </>
  );
}
