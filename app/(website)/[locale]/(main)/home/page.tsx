"use client";
import { useState, useEffect } from "react";
import { FilterState } from "./_components/FilterSection";
import FilterSection from "./_components/FilterSection";
import { motion } from "framer-motion";
import { EmptyState } from "@/components/shared";
import { images } from "@/constants/images";
import ProfileCard, { Profile } from "./_components/ProfileCard";
import useGetData from "@/hooks/useGetData";

interface UserProfile {
  id: number;
  user_id: number;
  Country_id: number | null;
  city_id: number | null;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: "male" | "female";
    email_verified_at: string | null;
    is_verified: number;
    phone: number;
    image:string;
    birth_day: string | null;
    account_status: string;
    created_at: string;
    updated_at: string;
  };
  personal_info: any | null;
}

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

  const {
    data: usersData,
    loading: isFetching,
    error: fetchError,
    refetch: refetchUsers,
  } = useGetData<UserProfile[]>({
    url: '/api/website/home-users',
    enabled: true,
  });


  const usersList = usersData || [];

  const convertToProfileCardData = (userProfile: UserProfile) => {
    const name = `${userProfile.user.first_name || ''} ${userProfile.user.last_name || ''}`.trim() || 'Unknown User';
    
    return {
      id: userProfile.id,
      name: name,
      gender: userProfile.user.gender.toLowerCase() as "male" | "female",
      location: `City ID: ${userProfile.city_id || "Unknown"}`,
      image: userProfile.user.image, 
    };
  };


  // Show loading state
  if (isFetching) {
    return (
      <div className="pb-32 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <FilterSection filters={filters} onFiltersChange={setFilters} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 gap-6 mt-6">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="animate-pulse bg-white rounded-2xl shadow-md border border-gray-200">
                <div className="h-40 bg-gray-200 rounded-t-2xl"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (fetchError) {
    return (
      <div className="pb-32 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <FilterSection filters={filters} onFiltersChange={setFilters} />
          <div className="text-center py-12">
            <p className="text-red-500">Error loading profiles. Please try again.</p>
            <button
              className="mt-4 px-6 py-2 bg-primary-color1 text-white rounded-md"
              onClick={() => refetchUsers()}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <FilterSection filters={filters} onFiltersChange={setFilters} />

        {/* Profile Cards Grid */}
        {usersList.length > 0 ? (
          <motion.div
            initial={isMounted ? { opacity: 0, y: 20 } : false}
            animate={isMounted ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 gap-6 mt-6"
          >
            {usersList.map((userProfile) => (
              <ProfileCard
                key={userProfile.id}
                profile={convertToProfileCardData(userProfile)}
              />
            ))}
          </motion.div>
        ) : (
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