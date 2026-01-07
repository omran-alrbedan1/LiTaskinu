import { Metadata } from "next";

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
    <div className="min-h-screen overflow-y-auto hide-scrollbar">
      {children}
    </div>
  );
}
