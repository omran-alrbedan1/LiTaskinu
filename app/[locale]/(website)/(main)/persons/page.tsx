"use client";
import React, { useState, useEffect } from "react";
import { Search, ArrowUpRight, ChevronDown } from "lucide-react";
import { people } from "@/constants/temporary";
import { EmptyResult } from "./_components";
import { Button } from "antd";

export default function PersonFilterPage() {
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
        <h2 className="text-xl font-semibold mb-6 text-gray-800">The Filers</h2>

        <div className="space-y-4">
          {/* The Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              The Gender
            </label>
            <div className="relative">
              <select
                value={filters.gender}
                onChange={(e) =>
                  setFilters({ ...filters, gender: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marital Status
            </label>
            <div className="relative">
              <select
                value={filters.maritalStatus}
                onChange={(e) =>
                  setFilters({ ...filters, maritalStatus: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">Select</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Religion */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Religion
            </label>
            <div className="relative">
              <select
                value={filters.religion}
                onChange={(e) =>
                  setFilters({ ...filters, religion: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">Select</option>
                <option value="christianity">Christianity</option>
                <option value="islam">Islam</option>
                <option value="hinduism">Hinduism</option>
                <option value="buddhism">Buddhism</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Job title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job title
            </label>
            <input
              type="text"
              value={filters.jobTitle}
              onChange={(e) =>
                setFilters({ ...filters, jobTitle: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Enter job title"
            />
          </div>

          {/* Place */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Place
            </label>
            <div className="relative">
              <select
                value={filters.place}
                onChange={(e) =>
                  setFilters({ ...filters, place: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">Select</option>
                <option value="urban">Urban</option>
                <option value="suburban">Suburban</option>
                <option value="rural">Rural</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <div className="relative">
              <select
                value={filters.age}
                onChange={(e) =>
                  setFilters({ ...filters, age: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">Select</option>
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
              Occupation
            </label>
            <div className="relative">
              <select
                value={filters.occupation}
                onChange={(e) =>
                  setFilters({ ...filters, occupation: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">Select</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="student">Student</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Education
            </label>
            <div className="relative">
              <select
                value={filters.education}
                onChange={(e) =>
                  setFilters({ ...filters, education: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">Select</option>
                <option value="high-school">High School</option>
                <option value="bachelors">Bachelor's</option>
                <option value="masters">Master's</option>
                <option value="phd">PhD</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight
            </label>
            <div className="relative">
              <select
                value={filters.weight}
                onChange={(e) =>
                  setFilters({ ...filters, weight: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">Select</option>
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
              Height
            </label>
            <div className="relative">
              <select
                value={filters.height}
                onChange={(e) =>
                  setFilters({ ...filters, height: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">Select</option>
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
          <Button
            onClick={handleContinue}
            type="primary"
            className="w-full !py-5"
          >
            Continue
          </Button>
          <Button
            onClick={handleContinue}
            type="dashed"
            className="w-full text-primary-color1 !py-5"
          >
            reset filter
          </Button>
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
              placeholder="Search now..."
              className="w-full pl-12 pr-4 py-4 bg-red-50 border-none rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>
        </form>

        {showResults || searchQuery ? (
          // Results Section
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Search Results ({filteredPeople.length})
              </h2>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-400 mb-4">
              Recent search
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
