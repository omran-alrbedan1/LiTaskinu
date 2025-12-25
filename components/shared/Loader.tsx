import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-6">
      {/* Existing Loader */}
      <span className="loader"></span>
      
      {/* Loading Text with Animated Dots */}
      <div className="flex items-center gap-1">
        <span className="text-lg font-medium text-primary-color1">Loading ...</span>
      </div>
    </div>
  );
};

export default Loader;