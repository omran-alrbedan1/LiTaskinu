"use client";

import React, { useMemo } from "react";
import { Check } from "lucide-react";
import { Dropdown } from "antd";
import { MdOutlineLanguage } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";
import { LANGUAGE_OPTIONS } from "@/constants/options";

interface LanguageDropdownProps {
  currentLocale: string;
  onChange: (lang: string) => void;
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  currentLocale,
  onChange,
}) => {
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