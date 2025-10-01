import React from "react";

interface Header {
  title: string;
  description: string;
}

const Header: React.FC<Header> = ({ title, description }) => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-primary-color1 bg-clip-text text-transparent dark:from-gray-100 dark:to-primary-color1">
        {title}
      </h1>
      <p className="text-muted-foreground mt-2">{description}</p>
    </div>
  </div>
);

export default Header;
