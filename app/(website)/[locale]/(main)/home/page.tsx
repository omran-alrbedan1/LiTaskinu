"use client";
import React, { useState } from "react";
import { Heart, MessageCircle, Camera, User } from "lucide-react";

const DatingAppPage = () => {
  const [filters, setFilters] = useState({
    seeking: "Male",
    ageFrom: "",
    ageTo: "",
    country: "Jordan",
    city: "Amman",
  });

  // Sample profile data
  const profiles = [
    {
      id: 1,
      gender: "male",
      age: 30,
      location: "Amman, Jordan",
      seeking: "Female 18 - 24",
      time: "2 weeks ago",
    },
    {
      id: 2,
      gender: "male",
      age: 30,
      location: "Amman, Jordan",
      seeking: "Female 18 - 24",
      time: "2 weeks ago",
    },
    {
      id: 3,
      gender: "male",
      age: 30,
      location: "Amman, Jordan",
      seeking: "Female 18 - 24",
      time: "2 weeks ago",
    },
    {
      id: 4,
      gender: "male",
      age: 30,
      location: "Amman, Jordan",
      seeking: "Female 18 - 24",
      time: "2 weeks ago",
    },
    {
      id: 5,
      gender: "female",
      age: 30,
      location: "Amman, Jordan",
      seeking: "male 18 - 24",
      time: "Now",
    },
    {
      id: 6,
      gender: "female",
      age: 30,
      location: "Amman, Jordan",
      seeking: "male 18 - 24",
      time: "Now",
    },
    {
      id: 7,
      gender: "female",
      age: 30,
      location: "Amman, Jordan",
      seeking: "male 18 - 24",
      time: "Now",
    },
    {
      id: 8,
      gender: "female",
      age: 30,
      location: "Amman, Jordan",
      seeking: "male 18 - 24",
      time: "Now",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* User Info Bar */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="bg-primary-color1 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Seeking
              </label>
              <select
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-sm"
                value={filters.seeking}
                onChange={(e) =>
                  setFilters({ ...filters, seeking: e.target.value })
                }
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Age
              </label>
              <div className="flex gap-2">
                <select className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-sm">
                  <option>From</option>
                  {[...Array(63)].map((_, i) => (
                    <option key={i}>{18 + i}</option>
                  ))}
                </select>
                <select className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-sm">
                  <option>To</option>
                  {[...Array(63)].map((_, i) => (
                    <option key={i}>{18 + i}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Country
              </label>
              <select
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-sm"
                value={filters.country}
                onChange={(e) =>
                  setFilters({ ...filters, country: e.target.value })
                }
              >
                <option>Jordan</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                City
              </label>
              <select
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-sm"
                value={filters.city}
                onChange={(e) =>
                  setFilters({ ...filters, city: e.target.value })
                }
              >
                <option>Amman</option>
              </select>
            </div>
          </div>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square bg-gray-200">
                {profile.gender === "male" ? (
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-2 left-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      profile.time === "Now" ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      profile.gender === "male" ? "bg-blue-500" : "bg-pink-500"
                    }`}
                  ></div>
                  <span className="font-medium text-gray-800 text-sm">
                    user name
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1">
                  age: {profile.age} · {profile.location}
                </p>
                <p className="text-xs text-gray-600 mb-1">
                  Seeking: {profile.seeking}
                </p>
                <p className="text-xs text-gray-500 mb-3">{profile.time}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                      <MessageCircle className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatingAppPage;
