"use client";
import { useState, useMemo, useEffect } from "react";
import { FilterState } from "./_components/FilterSection";
import FilterSection from "./_components/FilterSection";
import { motion } from "framer-motion";
import { SAMPLE_PROFILES } from "@/constants/userTemporary";
import { EmptyState } from "@/components/shared";
import { images } from "@/constants/images";
import ProfileCard from "./_components/ProfileCard";

const HomePage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [filters, setFilters] = useState<FilterState>({
    seeking: "Both",
    ageFrom: "",
    ageTo: "",
    country: "",
    city: "",
  });

  const resetFilter = () =>
    setFilters({
      seeking: "Both",
      ageFrom: "",
      ageTo: "",
      country: "",
      city: "",
    });

  const filteredProfiles = useMemo(() => {
    return SAMPLE_PROFILES.filter((profile) => {
      // Gender filter
      if (filters.seeking !== "Both" && profile.gender !== filters.seeking) {
        return false;
      }

      // Age filter
      const profileAge = profile.age;
      if (filters.ageFrom && profileAge < parseInt(filters.ageFrom)) {
        return false;
      }
      if (filters.ageTo && profileAge > parseInt(filters.ageTo)) {
        return false;
      }

      // Location filter - extract city and country from location string
      const [profileCity, profileCountry] = profile.location
        .split(", ")
        .map((part) => part.trim());

      if (filters.country && profileCountry !== filters.country) {
        return false;
      }

      if (filters.city && profileCity !== filters.city) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <FilterSection filters={filters} onFiltersChange={setFilters} />

        {/* Profile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 gap-6 mt-6">
          {filteredProfiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={isMounted ? { opacity: 0, y: 20 } : false}
              animate={isMounted ? { opacity: 1, y: 0 } : false}
              transition={{
                duration: 0.4,
                delay: isMounted ? index * 0.1 : 0,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
            >
              <ProfileCard profile={profile} />
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredProfiles.length === 0 && (
          <motion.div
            initial={isMounted ? { opacity: 0 } : false}
            animate={isMounted ? { opacity: 1 } : false}
            transition={{ duration: 0.5 }}
            className="-mt-24"
          >
            <EmptyState
              title="No profiles found"
              description="Try adjusting your search or filters to find more matches"
              hasFilters={true}
              action={
                <motion.button
                  className="mt-4 px-6 py-2 bg-primary-color1 text-white rounded-md"
                  onClick={resetFilter}
                >
                  Reset Filters
                </motion.button>
              }
              image={images.emptyProfileResults}
              imageClassName="h-80 w-80"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
