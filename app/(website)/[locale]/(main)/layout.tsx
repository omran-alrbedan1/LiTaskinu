import Header from "@/components/user/elements/Header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-h-screen -mb-32 overflow-clip">
      <Header />
      {children}
    </div>
  );
};

export default layout;
