"use client";
import React, { useState, useEffect } from "react";
import { Search, ArrowUpRight, ChevronDown } from "lucide-react";
import { people } from "@/constants/temporary";
import { EmptyResult } from "./_components";
import { Button } from "antd";
import { useTranslations } from "next-intl";

export default function PersonFilterPage() {
  const t = useTranslations("persons");
  const ft = useTranslations("fields");

  const [filters, setFilters] = useState({
    gender: "",
    maritalStatus: "",
    religion: "",
    jobTitle: "",
    place: "",
    age: "",
    occupation: "",
    education: "",
    weight: "",
    height: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPeople, setFilteredPeople] = useState(people);
  const [showResults, setShowResults] = useState(false);

  const recentSearches = [
    "Lorem ipsum dolor sit amet consectetur",
    "Lorem ipsum dolor sit amet consectetur",
    "Lorem ipsum dolor sit amet consectetur",
    "Lorem ipsum dolor sit amet consectetur",
    "Lorem ipsum dolor sit amet consectetur",
    "Lorem ipsum dolor sit amet consectetur",
    "Lorem ipsum dolor sit amet consectetur",
  ];

  useEffect(() => {
    let results = people;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (person) =>
          person.name.toLowerCase().includes(query) ||
          person.occupation.toLowerCase().includes(query) ||
          person.city.toLowerCase().includes(query) ||
          person.education.toLowerCase().includes(query)
      );
    }

    // Apply other filters
    if (filters.age) {
      results = results.filter((person) => {
        const ageRange = filters.age;
        const personAge = person.age;

        if (ageRange === "18-25") return personAge >= 18 && personAge <= 25;
        if (ageRange === "26-35") return personAge >= 26 && personAge <= 35;
        if (ageRange === "36-45") return personAge >= 36 && personAge <= 45;
        if (ageRange === "46-55") return personAge >= 46 && personAge <= 55;
        if (ageRange === "56+") return personAge >= 56;
        return true;
      });
    }

    if (filters.jobTitle) {
      results = results.filter((person) =>
        person.occupation.toLowerCase().includes(filters.jobTitle.toLowerCase())
      );
    }

    if (filters.education) {
      results = results.filter((person) =>
        person.education.toLowerCase().includes(filters.education.toLowerCase())
      );
    }

    // Add more filter conditions as needed...

    setFilteredPeople(results);
  }, [searchQuery, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const handleReset = () => {
    setFilters({
      gender: "",
      maritalStatus: "",
      religion: "",
      jobTitle: "",
      place: "",
      age: "",
      occupation: "",
      education: "",
      weight: "",
      height: "",
    });
    setSearchQuery("");
    setShowResults(false);
  };

  const handleContinue = () => {
    setShowResults(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white p-6 border-r border-gray-200">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">{t('sidebar_title')}</h2>

        <div className="space-y-4">
          {/* The Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {ft('gender')}
            </label>
            <div className="relative">
              <select
                value={filters.gender}
                onChange={(e) =>
                  setFilters({ ...filters, gender: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">{t('select_opt')}</option>
                <option value="male">{t('options.male')}</option>
                <option value="female">{t('options.female')}</option>
                <option value="other">{t('options.other')}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('marital_status')}
            </label>
            <div className="relative">
              <select
                value={filters.maritalStatus}
                onChange={(e) =>
                  setFilters({ ...filters, maritalStatus: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">{t('select_opt')}</option>
                <option value="single">{t('options.single')}</option>
                <option value="married">{t('options.married')}</option>
                <option value="divorced">{t('options.divorced')}</option>
                <option value="widowed">{t('options.widowed')}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Religion */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('religion')}
            </label>
            <div className="relative">
              <select
                value={filters.religion}
                onChange={(e) =>
                  setFilters({ ...filters, religion: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">{t('select_opt')}</option>
                <option value="christianity">{t('options.christianity')}</option>
                <option value="islam">{t('options.islam')}</option>
                <option value="hinduism">{t('options.hinduism')}</option>
                <option value="buddhism">{t('options.buddhism')}</option>
                <option value="other">{t('options.other')}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Job title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('job_title')}
            </label>
            <input
              type="text"
              value={filters.jobTitle}
              onChange={(e) =>
                setFilters({ ...filters, jobTitle: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder={t('job_placeholder')}
            />
          </div>

          {/* Place */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('place')}
            </label>
            <div className="relative">
              <select
                value={filters.place}
                onChange={(e) =>
                  setFilters({ ...filters, place: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">{t('select_opt')}</option>
                <option value="urban">{t('options.urban')}</option>
                <option value="suburban">{t('options.suburban')}</option>
                <option value="rural">{t('options.rural')}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('age')}
            </label>
            <div className="relative">
              <select
                value={filters.age}
                onChange={(e) =>
                  setFilters({ ...filters, age: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">{t('select_opt')}</option>
                <option value="18-25">18-25</option>
                <option value="26-35">26-35</option>
                <option value="36-45">36-45</option>
                <option value="46-55">46-55</option>
                <option value="56+">56+</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('occupation')}
            </label>
            <div className="relative">
              <select
                value={filters.occupation}
                onChange={(e) =>
                  setFilters({ ...filters, occupation: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">{t('select_opt')}</option>
                <option value="employed">{t('options.employed')}</option>
                <option value="self-employed">{t('options.self_employed')}</option>
                <option value="unemployed">{t('options.unemployed')}</option>
                <option value="student">{t('options.student')}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('education')}
            </label>
            <div className="relative">
              <select
                value={filters.education}
                onChange={(e) =>
                  setFilters({ ...filters, education: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">{t('select_opt')}</option>
                <option value="high-school">{t('options.high_school')}</option>
                <option value="bachelors">{t('options.bachelors')}</option>
                <option value="masters">{t('options.masters')}</option>
                <option value="phd">{t('options.phd')}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('weight')}
            </label>
            <div className="relative">
              <select
                value={filters.weight}
                onChange={(e) =>
                  setFilters({ ...filters, weight: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">{t('select_opt')}</option>
                <option value="under-50">Under 50kg</option>
                <option value="50-70">50-70kg</option>
                <option value="70-90">70-90kg</option>
                <option value="over-90">Over 90kg</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('height')}
            </label>
            <div className="relative">
              <select
                value={filters.height}
                onChange={(e) =>
                  setFilters({ ...filters, height: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">{t('select_opt')}</option>
                <option value="under-150">Under 150cm</option>
                <option value="150-170">150-170cm</option>
                <option value="170-190">170-190cm</option>
                <option value="over-190">Over 190cm</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-3">
          <Button onClick={handleContinue} type="primary" className="w-full !py-5">{t('continue_btn')}</Button>
          <Button onClick={handleContinue} type="dashed" className="w-full text-primary-color1 !py-5">{t('reset_btn')}</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Search Bar */}
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              className="w-full pl-12 pr-4 py-4 bg-red-50 border-none rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>
        </form>

        {showResults || searchQuery ? (
          // Results Section
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {t('results_title', { count: filteredPeople.length })}
              </h2>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-400 mb-4">
              {t('recent_search')}
            </h3>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <span className="text-gray-600">{search}</span>
                  <ArrowUpRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
