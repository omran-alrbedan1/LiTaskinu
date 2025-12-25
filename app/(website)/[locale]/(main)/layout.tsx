import Header from "@/components/user/elements/Header";
import React from "react";
import Footer from "../_components/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-h-screen overflow-auto sidebar-scrollbar ">
      <Header />
      {children}
      <Footer/>
    </div>
  );
};

export default layout;
