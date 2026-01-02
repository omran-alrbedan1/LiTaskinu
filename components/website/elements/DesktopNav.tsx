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
              isActive ? "text-primary-color1" : "hover:text-primary-color1"
            }`}
          >
            {link.title}
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-primary-color1 transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
});

DesktopNav.displayName = 'DesktopNav';