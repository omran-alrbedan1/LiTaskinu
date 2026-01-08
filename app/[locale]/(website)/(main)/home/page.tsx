"use client";
import { useState, useEffect } from "react";
import { FilterState } from "./_components/FilterSection";
import FilterSection from "./_components/FilterSection";
import { motion } from "framer-motion";
import { EmptyState } from "@/components/shared";
import { images } from "@/constants/images";
import ProfileCard from "./_components/ProfileCard";
import useGetData from "@/hooks/useGetData";
import HomeLoader from "./_components/homeLoader";
 
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
    loading: isLoading,
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

  if (isLoading)  return <HomeLoader filters={filters} onFiltersChange={setFilters}/>

  // 2. Then show error state
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
    <div className="pb-32 min-h-screen">
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