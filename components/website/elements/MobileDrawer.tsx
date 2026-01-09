"use client";

import React from "react";
import { X, Check, Bell } from "lucide-react";
import Image from "next/image";
import { Drawer } from "antd";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLanguage } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";
import { images } from "@/constants/images";
import { Badge } from "@/components/ui/badge";
import { LANGUAGE_OPTIONS } from "@/constants/options";
import { useRouter } from "next/navigation";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ title: string; link: string }>;
  isActiveLink: (link: string) => boolean;
  currentLocale: string;
  changeLanguage: (lang: string) => void;
  router: ReturnType<typeof useRouter>;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
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