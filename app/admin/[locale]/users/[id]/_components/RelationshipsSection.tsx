import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FaUserPlus,
  FaUserMinus,
  FaHeart,
  FaBan,
  FaCalendar,
  FaHandshake,
} from "react-icons/fa";
import SectionHeader from "./SectionHeader";

interface FavoriteUser {
  name: string;
  addedDate: string;
  mutual: boolean;
}

interface BlockedUser {
  name: string;
  blockDate: string;
  reason: string;
}

interface RelationshipsSectionProps {
  favoriteUsers: FavoriteUser[];
  blockedUsers: BlockedUser[];
}

const RelationshipsSection = ({
  favoriteUsers,
  blockedUsers,
}: RelationshipsSectionProps) => {
  return (
    <Card className="mt-6 p-6">
      {/* Header */}
      <SectionHeader
        title="User Relationships"
        description="Favorite connections and blocked users"
        icon={<FaHeart className="w-8 h-8 text-primary-color1" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Favorites Card */}
        <Card className=" transition-all duration-300">
          <CardContent className="p-6">
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center shadow-sm">
                <FaUserPlus className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Favorites List
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {favoriteUsers.length} saved connections
                </p>
              </div>
            </div>

            {/* Favorites List */}
            <div className="space-y-3">
              {favoriteUsers.map((user, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-4 dark:bg-gray-800 shadow-sm  rounded-lg  hover:bg-green-50/30 dark:hover:bg-green-900/20 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <FaHeart className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {user.name}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <FaCalendar className="w-3 h-3" />
                        Added {user.addedDate}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {favoriteUsers.length === 0 && (
              <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                <FaHeart className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">
                  No favorite users yet
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Blocked Users Card */}
        <Card className="  transition-all duration-300">
          <CardContent className="p-6">
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center shadow-sm">
                <FaUserMinus className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Blocked Users
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {blockedUsers.length} blocked accounts
                </p>
              </div>
            </div>

            {/* Blocked Users List */}
            <div className="space-y-3">
              {blockedUsers.map((user, index) => (
                <div
                  key={index}
                  className="group flex flex-col p-4 shadow-sm  hover:bg-red-50/30 dark:hover:bg-red-900/20 dark:bg-gray-800   transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                        <FaBan className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {user.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <FaCalendar className="w-3 h-3" />
                      {user.blockDate}
                    </div>
                  </div>
                  <div className="text-sm text-red-700 dark:text-red-300 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
                    <span className="font-medium text-red-800 dark:text-red-300">
                      Reason:
                    </span>{" "}
                    {user.reason}
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {blockedUsers.length === 0 && (
              <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                <FaBan className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">
                  No blocked users
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Card>
  );
};

export default RelationshipsSection;
