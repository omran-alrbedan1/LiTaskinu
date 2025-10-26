import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-h-screen dark -mb-32 overflow-clip">{children}</div>
  );
};

export default layout;
