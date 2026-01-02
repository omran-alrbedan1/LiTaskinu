"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bell, Menu } from "lucide-react";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { images } from "@/constants/images";
import { TooltipButton } from "@/components/admin/parts";
import { Badge } from "@/components/ui/badge";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { NAV_LINKS } from "@/constants/website";
import { useNavigation } from "@/hooks/useNavigation";
import { DesktopNav } from "./DesktopNav";
import { MobileDrawer } from "./MobileDrawer";
import { LanguageDropdown } from "./LanguageDropdown";

const SearchBar: React.FC<{
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}> = ({ searchQuery, onSearchChange, onSearchSubmit }) => (
  <div className="hidden sm:block bg-gray-100 dark:bg-gray-800 rounded-full relative">
    <form onSubmit={onSearchSubmit} className="relative">
      <FaSearch className="absolute z-20 text-primary-color1 dark:text-primary-color1-dark mt-2.5 ml-3" />
      <input
        type="text"
        placeholder="Search Here"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="bg-white/15 dark:bg-gray-700/30 backdrop-blur-sm border-none text-black dark:text-white rounded-full pl-10 pr-4 py-1.5 placeholder-gray-300 dark:placeholder-gray-400 focus:bg-white/25 dark:focus:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-primary-color1 dark:focus:ring-primary-color1-dark transition-all duration-300 w-48 focus:w-64"
      />
    </form>
  </div>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    currentLocale,
    router,
    isActiveLink,
    getLocalizedPath,
    changeLanguage,
  } = useNavigation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const links = useMemo(
    () =>
      NAV_LINKS.map((link) => ({
        ...link,
        link: getLocalizedPath(link.path),
      })),
    [getLocalizedPath]
  );

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
    closeMenu();
  };


  return (
    <header className="shadow-sm sticky top-0 z-50 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
  <div className="flex items-center -my-6 space-x-2 relative">
  <div className="relative h-[130px] w-[130px]">
    <Image
      src={images.litaskunuLogo}
      fill
      alt="logo"
      priority
      className="object-contain"
      sizes="130px"
    />
  </div>
</div>
          <DesktopNav links={links} isActiveLink={isActiveLink} />

          <div className="flex items-center space-x-4">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchSubmit={handleSearch}
            />

            <div className="hidden md:flex items-center space-x-2">
              <TooltipButton
                tooltipContent="notifications"
                className="!relative"
                variant="ghost"
                onClick={() =>
                  router.push(getLocalizedPath("profile/notifications"))
                }
              >
                <Bell className="size-5 text-gray-500 dark:text-gray-300" />
                <Badge className="!rounded-full text-center text-xs !h-4 !w-4 bg-red-400 dark:bg-red-500 absolute top-0 left-6">
                  3
                </Badge>
              </TooltipButton>

              <TooltipButton
                tooltipContent="profile"
                variant="ghost"
                onClick={() => router.push(getLocalizedPath("profile/account"))}
              >
                <CgProfile className="size-5 text-gray-500 dark:text-gray-300" />
              </TooltipButton>
              
      <AnimatedThemeToggler />
              
              <LanguageDropdown
                currentLocale={currentLocale}
                onChange={changeLanguage}
              />
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <Menu size={24} className="text-primary-color1 dark:text-primary-color1-dark" />
            </button>
          </div>
        </div>
      </div>

      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={closeMenu}
        links={links}
        isActiveLink={isActiveLink}
        currentLocale={currentLocale}
        changeLanguage={handleLanguageChange}
        router={router}
      />
    </header>
  );
};

export default Header;