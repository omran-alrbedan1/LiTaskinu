"use client";
import React from "react";
import { Select, InputNumber, Button } from "antd";
import { images } from "@/constants/images";
import Image from "next/image";

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
  logoUrl?: string; // Optional logo URL prop
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFiltersChange,
  logoUrl = "/logo.png", // Default logo path
}) => {
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

  // Handle number input changes (convert number to string)
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
    <div className="bg-primary-light rounded-lg shadow-md p-6 mb-6 relative">
      {/* Company Logo - Top Right Corner */}
      <div className="absolute top-4 right-4 z-10">
        <Image
          src={images.logo2}
          alt="Company Logo"
          className="h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
        />
      </div>

      <div className="flex justify-between items-center mb-4 pr-20">
        <Button
          onClick={handleResetFilters}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors bg-white"
        >
          Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Seeking Filter */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Looking for
          </label>
          <Select
            value={filters.seeking || undefined}
            onChange={(value) => handleFilterChange("seeking", value)}
            placeholder="Select gender"
            className="w-full"
            options={[
              { value: "Female", label: "Female" },
              { value: "Male", label: "Male" },
              { value: "Both", label: "Both" },
            ]}
          />
        </div>

        {/* Age From Filter */}
        <div className="">
          <label className="block text-sm  font-medium text-white mb-2">
            Age From
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
            Age To
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
            Country
          </label>
          <Select
            value={filters.country || undefined}
            onChange={(value) => handleFilterChange("country", value)}
            placeholder="Select country"
            className="w-full"
            options={[
              { value: "Jordan", label: "Jordan" },
              { value: "USA", label: "USA" },
              { value: "UK", label: "UK" },
              { value: "Canada", label: "Canada" },
              { value: "UAE", label: "UAE" },
            ]}
          />
        </div>

        {/* City Filter */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            City
          </label>
          <Select
            value={filters.city || undefined}
            onChange={(value) => handleFilterChange("city", value)}
            placeholder="Select city"
            className="w-full"
            options={[
              { value: "Amman", label: "Amman" },
              { value: "Irbid", label: "Irbid" },
              { value: "Zarqa", label: "Zarqa" },
              { value: "Aqaba", label: "Aqaba" },
              { value: "Madaba", label: "Madaba" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
