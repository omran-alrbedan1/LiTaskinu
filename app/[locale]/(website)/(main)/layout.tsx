import Header from "@/components/website/elements/Header";
import React from "react";
import Footer from "../_components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-h-screen overflow-auto sidebar-scrollbar">
      <Header />

      <main className="flex-1 ">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
