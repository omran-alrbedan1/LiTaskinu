
import { Metadata } from "next";
import dynamic from "next/dynamic";

const Sidebar = dynamic(
  () => import("@/components/admin/sidebar/Sidebar"),
  { ssr: false }
);

const MainHeader = dynamic(
  () => import("@/components/admin/parts/MainHeader"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "LITASKUNU-Admin-Dashboard",
  icons: {
    icon: "/images/logo.png",
  },
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen hide-scrollbar">
      <Sidebar>
        <div className="flex-1 flex flex-col overflow-hidden">
          <MainHeader />
          <main className="p-2">{children}</main>
        </div>
      </Sidebar>
    </div>
  );
}
