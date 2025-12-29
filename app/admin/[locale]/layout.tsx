// // src/app/admin/[locale]/layout.tsx
// import { NextIntlClientProvider } from "next-intl";
// import { getMessages } from "next-intl/server";
// import { Metadata } from "next";
// import Sidebar from "@/components/admin/sidebar/Sidebar";
// import MainHeader from "@/components/admin/parts/MainHeader";

// export const metadata: Metadata = {
//   title: "LITASKUNU-Admin-Dashboard",
//   description: "",
//   icons: {
//     icon: "/images/logo.png",
//   },
// };

// interface AdminLayoutProps {
//   children: React.ReactNode;
//   params: { locale: string };
// }

// export default async function AdminLayout({
//   children,
//   params,
// }: AdminLayoutProps) {
//   const { locale } = params;

//   return (
//     <NextIntlClientProvider locale={locale}>
//       <div className="flex h-screen hide-scrollbar">
//         <Sidebar>
//           <div className="flex-1 flex flex-col overflow-hidden ">
//             <MainHeader />
//             <main className="p-2 ">{children}</main>
//           </div>
//         </Sidebar>
//       </div>
//     </NextIntlClientProvider>
//   );
// }


// src/app/admin/[locale]/layout.tsx
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
