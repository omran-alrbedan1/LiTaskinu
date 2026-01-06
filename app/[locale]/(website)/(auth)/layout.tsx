import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // Add "dark" class to force dark mode
    <div className="dark">
      <div className="max-h-screen dark:bg-gray-900 bg-gray-900 -mb-32 overflow-clip">
        {children}
      </div>
    </div>
  );
};

export default Layout;