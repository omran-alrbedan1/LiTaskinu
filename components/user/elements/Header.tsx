"use client";

import React, { useState } from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import Image from "next/image";
import { images } from "@/constants/images";
import { TooltipButton } from "@/components/admin/parts";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { MdOutlineLanguage } from "react-icons/md";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Drawer, Button } from "antd";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  const Links = [
    {
      title: "Home",
      link: `/${locale}/home`,
    },
    {
      title: "Chats",
      link: `/${locale}/chats`,
    },
    {
      title: "Subscribe",
      link: `/${locale}/subscribe`,
    },
    {
      title: "About Us",
      link: `/${locale}/about-us`,
    },
    {
      title: "Contact Us",
      link: `/${locale}/contact-us`,
    },
  ];

  // Function to check if a link is active
  const isActiveLink = (link: string) => {
    return pathname === link || pathname.startsWith(link + "/");
  };

  return (
    <header className="shadow-sm sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center -my-6 space-x-2">
            <Image src={images.logo2} height={80} width={80} alt="logo" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {Links.map((link, index) => {
              const isActive = isActiveLink(link.link);
              return (
                <a
                  key={index}
                  href={link.link}
                  className={`transition-colors duration-300 font-medium relative group ${
                    isActive
                      ? "text-primary-color1"
                      : "hover:text-primary-color1"
                  }`}
                >
                  {link.title}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary-color1 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </a>
              );
            })}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden sm:block bg-gray-100 rounded-full relative">
              <form onSubmit={handleSearch} className="relative">
                <FaSearch className="absolute z-20 text-primary-color1 mt-2.5 ml-3" />
                <input
                  type="text"
                  placeholder="Search Here"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/15 backdrop-blur-sm border-none text-black rounded-full pl-10 pr-4 py-1.5  placeholder-gray-300 focus:bg-white/25 focus:outline-none focus:ring-2 focus:ring-primary-color1 transition-all duration-300 w-48 focus:w-64"
                />
              </form>
            </div>

            {/* Desktop Actions - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-2">
              <TooltipButton
                tooltipContent="notifications"
                className="!relative"
                variant={"ghost"}
                onClick={() => router.push(`/${locale}/profile/notifications`)}
              >
                <Bell className="!size-5 text-gray-500" />
                <Badge className="!rounded-full text-center text-xs !h-4 !w-4 bg-red-400 absolute top-0 left-6">
                  3
                </Badge>
              </TooltipButton>
              <TooltipButton
                tooltipContent="profile"
                variant={"ghost"}
                onClick={() => router.push(`/${locale}/profile/account`)}
              >
                <CgProfile className="!size-5 text-gray-500" />
              </TooltipButton>
              <TooltipButton
                tooltipContent="language"
                variant={"ghost"}
                onClick={() =>
                  router.push(`/${locale}/profile/change-language`)
                }
              >
                <MdOutlineLanguage className="!size-5 text-gray-500" />
              </TooltipButton>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={toggleMenu}
            >
              <Menu size={24} className="text-primary-color1" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <Drawer
        title={
          <div className="flex items-center space-x-2">
            <Image src={images.logo} height={40} width={40} alt="logo" />
            <span className="font-semibold text-primary-color1">LITASKUNU</span>
          </div>
        }
        placement={locale === "en" ? "left" : "right"}
        onClose={toggleMenu}
        open={isMenuOpen}
        width={300}
        closable={false}
        extra={
          <button onClick={toggleMenu} className="p-1">
            <X size={20} className="text-primary-color1" />
          </button>
        }
      >
        {/* Mobile Navigation Links */}
        <nav className="flex flex-col space-y-2">
          {Links.map((link, index) => {
            const isActive = isActiveLink(link.link);
            return (
              <a
                key={index}
                href={link.link}
                onClick={toggleMenu}
                className={`transition-colors duration-300 font-medium py-3 px-2 ${
                  isActive
                    ? "text-primary-color1 bg-primary-color1/10 border-l-2 border-primary-color1"
                    : "hover:text-primary-color1 hover:bg-gray-100"
                }`}
              >
                {link.title}
              </a>
            );
          })}

          {/* Mobile Action Links */}
          <div className="pt-4 mt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {/* Notifications */}
              <a
                href="#"
                onClick={toggleMenu}
                className="flex items-center space-x-3 py-3 px-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
              >
                <div className="relative">
                  <Bell className="size-5 text-gray-600" />
                  <Badge className="!rounded-full text-center text-xs !h-4 !w-4 bg-red-400 absolute -top-1 -right-1">
                    3
                  </Badge>
                </div>
                <span className="font-medium text-gray-700">Notifications</span>
              </a>

              {/* Profile */}
              <a
                href="#"
                onClick={toggleMenu}
                className="flex items-center space-x-3 py-3 px-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
              >
                <CgProfile className="size-5 text-gray-600" />
                <span className="font-medium text-gray-700">Profile</span>
              </a>

              {/* Language */}
              <a
                href="#"
                onClick={toggleMenu}
                className="flex items-center space-x-3 py-3 px-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
              >
                <MdOutlineLanguage className="size-5 text-gray-600" />
                <span className="font-medium text-gray-700">Language</span>
              </a>
            </div>
          </div>
        </nav>
      </Drawer>
    </header>
  );
};

export default Header;
