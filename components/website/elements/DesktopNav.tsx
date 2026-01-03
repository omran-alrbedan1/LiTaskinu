"use client";

import React from "react";

interface DesktopNavProps {
  links: Array<{ title: string; link: string }>;
  isActiveLink: (link: string) => boolean;
}

export const DesktopNav: React.FC<DesktopNavProps> = React.memo(({ 
  links, 
  isActiveLink 
}) => {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      {links.map((link) => {
        const isActive = isActiveLink(link.link);
        return (
          <a
            key={link.link}
            href={link.link}
            className={`transition-colors duration-300 font-medium relative group ${
              isActive 
                ? "text-primary-color1 dark:text-primary-color1-dark" 
                : "text-gray-700 dark:text-gray-300 hover:text-primary-color1 dark:hover:text-primary-color1-dark"
            }`}
          >
            {link.title}
            <span
              className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                isActive 
                  ? "w-full bg-primary-color1 dark:bg-primary-color1-dark" 
                  : "w-0 bg-primary-color1 dark:bg-primary-color1-dark group-hover:w-full"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
});

DesktopNav.displayName = 'DesktopNav';