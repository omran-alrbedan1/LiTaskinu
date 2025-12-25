"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Bell, Menu, X, Check } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Drawer, Dropdown } from "antd";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { MdOutlineLanguage } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";

import { images } from "@/constants/images";
import { TooltipButton } from "@/components/admin/parts";
import { Badge } from "@/components/ui/badge";
import { LANGUAGE_OPTIONS } from "@/constants/options";

// Constants

const NAV_LINKS = [
  { title: "Home", path: "home" },
  { title: "Chats", path: "chats" },
  { title: "Subscribe", path: "subscribe" },
  { title: "About Us", path: "about-us" },
  { title: "Contact Us", path: "contact-us" },
] as const;

// Custom Hooks
const useNavigation = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = locale || "en";

  const normalizePath = (path: string) => path.replace(/\/$/, "") || "/";

  const isActiveLink = useCallback(
    (linkPath: string): boolean => {
      if (!pathname) return false;

      const fullPath = `/${currentLocale}/${linkPath}`;
      const normalizedPathname = normalizePath(pathname);
      const normalizedLink = normalizePath(fullPath);

      if (normalizedPathname === normalizedLink) return true;
      if (normalizedPathname.startsWith(`${normalizedLink}/`)) return true;

      return linkPath === "home" && normalizedPathname === `/${currentLocale}`;
    },
    [pathname, currentLocale]
  );

  const getLocalizedPath = useCallback(
    (path: string) => `/${currentLocale}/${path}`,
    [currentLocale]
  );

  const changeLanguage = useCallback(
    (newLocale: string) => {
      if (!pathname) return;

      let pathWithoutLocale = pathname;

      LANGUAGE_OPTIONS.forEach((option) => {
        const localeRegex = new RegExp(`^/${option.value}(/|$)`);
        if (localeRegex.test(pathname)) {
          pathWithoutLocale = pathname.replace(localeRegex, "/");
        }
      });

      const normalizedPath = pathWithoutLocale === "" ? "/" : pathWithoutLocale;
      const newPath = `/${newLocale}${normalizedPath}`.replace(/\/\//g, "/");

      router.push(newPath);
    },
    [pathname, router]
  );

  return {
    currentLocale,
    pathname,
    router,
    isActiveLink,
    getLocalizedPath,
    changeLanguage,
  };
};

const SearchBar: React.FC<{
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}> = ({ searchQuery, onSearchChange, onSearchSubmit }) => (
  <div className="hidden sm:block bg-gray-100 rounded-full relative">
    <form onSubmit={onSearchSubmit} className="relative">
      <FaSearch className="absolute z-20 text-primary-color1 mt-2.5 ml-3" />
      <input
        type="text"
        placeholder="Search Here"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="bg-white/15 backdrop-blur-sm border-none text-black rounded-full pl-10 pr-4 py-1.5 placeholder-gray-300 focus:bg-white/25 focus:outline-none focus:ring-2 focus:ring-primary-color1 transition-all duration-300 w-48 focus:w-64"
      />
    </form>
  </div>
);

const DesktopNav = React.memo(({ 
  links, 
  isActiveLink 
}: {
  links: Array<{ title: string; link: string }>;
  isActiveLink: (link: string) => boolean;
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

const LanguageDropdown: React.FC<{
  currentLocale: string;
  onChange: (lang: string) => void;
}> = ({ currentLocale, onChange }) => {
  const items = useMemo(
    () =>
      LANGUAGE_OPTIONS.map((lang) => ({
        key: lang.value,
        label: (
          <div
            className="flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-md cursor-pointer"
            onClick={() => onChange(lang.value)}
          >
            <div className="flex items-center gap-3">
              <ReactCountryFlag
                countryCode={lang.code}
                svg
                style={{
                  width: `1.5em`,
                  height: `1.5em`,
                  borderRadius: "2px",
                }}
              />
              <div className="flex flex-col items-start">
                <span className="font-medium">{lang.label}</span>
                <span className="text-xs text-gray-500">{lang.native}</span>
              </div>
            </div>
            {currentLocale === lang.value && (
              <Check className="h-4 w-4 text-primary-color1" />
            )}
          </div>
        ),
      })),
    [currentLocale, onChange]
  );

  const currentLanguage =
    LANGUAGE_OPTIONS.find((lang) => lang.value === currentLocale) ||
    LANGUAGE_OPTIONS[0];

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      trigger={["click"]}
      dropdownRender={(menu) => (
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 min-w-[250px]">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="font-semibold text-gray-900">Select Language</p>
          </div>
          {React.cloneElement(menu as React.ReactElement)}
        </div>
      )}
    >
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2">
        <ReactCountryFlag
          countryCode={currentLanguage.code}
          svg
          style={{
            width: `1.5em`,
            height: `1.5em`,
            borderRadius: "2px",
          }}
        />
        <MdOutlineLanguage className="size-5 text-gray-500" />
      </button>
    </Dropdown>
  );
};

const MobileDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ title: string; link: string }>;
  isActiveLink: (link: string) => boolean;
  currentLocale: string;
  changeLanguage: (lang: string) => void;
  router: ReturnType<typeof useRouter>;
}> = ({
  isOpen,
  onClose,
  links,
  isActiveLink,
  currentLocale,
  changeLanguage,
  router,
}) => {
  const currentLanguage =
    LANGUAGE_OPTIONS.find((lang) => lang.value === currentLocale) ||
    LANGUAGE_OPTIONS[0];

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <Drawer
      title={
        <div className="flex items-center space-x-2">
          <Image src={images.logo} height={40} width={40} alt="logo" priority />
          <span className="font-semibold text-primary-color1">LITASKUNU</span>
        </div>
      }
      placement={currentLocale === "en" ? "left" : "right"}
      onClose={onClose}
      open={isOpen}
      width={300}
      closable={false}
      extra={
        <button onClick={onClose} className="p-1">
          <X size={20} className="text-primary-color1" />
        </button>
      }
    >
      <nav className="flex flex-col space-y-2">
        {links.map((link) => {
          const isActive = isActiveLink(link.link);
          return (
            <a
              key={link.link}
              href={link.link}
              onClick={onClose}
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

        <div className="pt-4 mt-4 border-t border-gray-200">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() =>
                handleNavigation(`/${currentLocale}/profile/notifications`)
              }
              className="flex items-center space-x-3 py-3 px-2 hover:bg-gray-100 rounded-lg transition-colors duration-300 w-full text-left"
            >
              <div className="relative">
                <Bell className="size-5 text-gray-600" />
                <Badge className="!rounded-full text-center text-xs !h-4 !w-4 bg-red-400 absolute -top-1 -right-1">
                  3
                </Badge>
              </div>
              <span className="font-medium text-gray-700">Notifications</span>
            </button>

            <button
              onClick={() =>
                handleNavigation(`/${currentLocale}/profile/account`)
              }
              className="flex items-center space-x-3 py-3 px-2 hover:bg-gray-100 rounded-lg transition-colors duration-300 w-full text-left"
            >
              <CgProfile className="size-5 text-gray-600" />
              <span className="font-medium text-gray-700">Profile</span>
            </button>

            <div className="py-3 px-2">
              <p className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <MdOutlineLanguage className="size-5 text-gray-600" />
                Language
              </p>
              <div className="grid grid-cols-3 gap-2">
                {LANGUAGE_OPTIONS.map((language) => {
                  const isSelected = currentLocale === language.value;
                  return (
                    <button
                      key={language.value}
                      onClick={() => changeLanguage(language.value)}
                      className={`
                        relative flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200
                        ${
                          isSelected
                            ? "bg-primary-color1 text-white shadow-md"
                            : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                        }
                      `}
                    >
                      <ReactCountryFlag
                        countryCode={language.code}
                        svg
                        style={{
                          width: `1.5em`,
                          height: `1.5em`,
                          borderRadius: "2px",
                        }}
                      />
                      <span className="text-xs font-medium mt-1">
                        {language.value.toUpperCase()}
                      </span>
                      {isSelected && (
                        <Check className="h-3 w-3 absolute top-1 right-1" />
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 p-2 bg-primary-color1/5 rounded-lg">
                <p className="text-sm text-gray-600">
                  Current:{" "}
                  <span className="font-semibold">{currentLanguage.label}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Drawer>
  );
};

// Main Component
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
    <header className="shadow-sm sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center -my-6 space-x-2">
            <Image
              src={images.litaskunuLogo}
              height={130}
              width={130}
              alt="logo"
              priority
            />
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
                <Bell className="size-5 text-gray-500" />
                <Badge className="!rounded-full text-center text-xs !h-4 !w-4 bg-red-400 absolute top-0 left-6">
                  3
                </Badge>
              </TooltipButton>

              <TooltipButton
                tooltipContent="profile"
                variant="ghost"
                onClick={() => router.push(getLocalizedPath("profile/account"))}
              >
                <CgProfile className="size-5 text-gray-500" />
              </TooltipButton>

              <LanguageDropdown
                currentLocale={currentLocale}
                onChange={changeLanguage}
              />
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <Menu size={24} className="text-primary-color1" />
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
