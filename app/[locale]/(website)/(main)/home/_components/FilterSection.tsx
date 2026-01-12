"use client";
import React from "react";
import { Select, InputNumber, Button } from "antd";
import { images } from "@/constants/images";
import Image from "next/image";
import { useTranslations } from "next-intl";

export interface FilterState {
  seeking: string;
  ageFrom: string;
  ageTo: string;
  country: string;
  city: string;
}

interface FilterSectionProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFiltersChange,
}) => {
  const t = useTranslations("home.filters");

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleResetFilters = () => {
    onFiltersChange({
      seeking: "Both",
      ageFrom: "",
      ageTo: "",
      country: "",
      city: "",
    });
  };

  const handleNumberChange = (
    key: "ageFrom" | "ageTo",
    value: number | null
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value ? value.toString() : "",
    });
  };

  return (
    <div className=" bg-primary-light dark:bg-gradient-to-br from-[#8B9475] to-[#6B7355] rounded-lg shadow-md p-6 mb-6 relative">
      {/* Company Logo - Top Right Corner */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Seeking Filter */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            {t("looking_for")}
          </label>
          <Select
            value={filters.seeking || undefined}
            onChange={(value) => handleFilterChange("seeking", value)}
            placeholder={t("select_gender")}
            className="w-full"
            options={[
              { value: "Female", label: t("female") },
              { value: "Male", label: t("male") },
              { value: "Both", label: t("both") },
            ]}
          />
        </div>

        {/* Age From Filter */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            {t("age_from")}
          </label>
          <InputNumber
            value={filters.ageFrom ? parseInt(filters.ageFrom) : undefined}
            onChange={(value) => handleNumberChange("ageFrom", value)}
            placeholder="18"
            min={18}
            max={100}
            className="!w-full"
            controls={false}
          />
        </div>

        {/* Age To Filter */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            {t("age_to")}
          </label>
          <InputNumber
            value={filters.ageTo ? parseInt(filters.ageTo) : undefined}
            onChange={(value) => handleNumberChange("ageTo", value)}
            placeholder="99"
            min={18}
            max={100}
            className="!w-full"
            controls={false}
          />
        </div>

        {/* Country Filter */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            {t("country")}
          </label>
          <Select
            value={filters.country || undefined}
            onChange={(value) => handleFilterChange("country", value)}
            placeholder={t("select_country")}
            className="w-full"
            options={[
              { value: "Jordan", label: t("countries.jordan") },
              { value: "USA", label: t("countries.usa") },
              { value: "UK", label: t("countries.uk") },
              { value: "Canada", label: t("countries.canada") },
              { value: "UAE", label: t("countries.uae") },
            ]}
          />
        </div>

        {/* City Filter */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            {t("city")}
          </label>
          <Select
            value={filters.city || undefined}
            onChange={(value) => handleFilterChange("city", value)}
            placeholder={t("select_city")}
            className="w-full"
            options={[
              { value: "Amman", label: t("cities.amman") },
              { value: "Irbid", label: t("cities.irbid") },
              { value: "Zarqa", label: t("cities.zarqa") },
              { value: "Aqaba", label: t("cities.aqaba") },
              { value: "Madaba", label: t("cities.madaba") },
            ]}
          />
        </div>

        <div className="flex justify-between items-center mt-7">
          <Button
            onClick={handleResetFilters}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors bg-white"
          >
            {t("reset_filters")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
