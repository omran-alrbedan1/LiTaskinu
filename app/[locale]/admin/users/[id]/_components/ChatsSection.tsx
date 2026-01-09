import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaUser, FaEnvelope, FaPhone, FaComments } from "react-icons/fa";
import Image from "next/image";
import { images } from "@/constants/images";
import SectionHeader from "./SectionHeader";

interface ChatsSectionProps {
  users: User[];
}

const ChatsSection = ({ users }: ChatsSectionProps) => {
  const handleViewProfile = (userId: number) => {
    console.log("View profile for user:", userId);
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        {/* Header */}
        <SectionHeader
          title="Active Conversations"
          description="Users currently chatting with this user"
          icon={<FaComments className="w-8 h-8 text-primary-color1" />}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users.map((user) => (
            <Card
              key={user.id}
              className="group hover:shadow-lg transition-all dark:bg-gray-800 duration-300 hover:border-primary-color1 cursor-pointer border-2"
            >
              <CardContent className="p-4">
                {/* User Avatar and Status */}
                <div className="flex flex-col items-center text-center">
                  {/* Avatar Container */}
                  <div className="relative mb-3">
                    <Image
                      src={user.avatar ? user.avatar : images.Unknown}
                      alt={user.name}
                      width={44}
                      height={44}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 group-hover:border-primary-color1 transition-colors"
                    />
                  </div>

                  {/* User Name and Status */}
                  <h3 className="font-semibold truncate w-full mb-1">
                    {user.name}
                  </h3>

                  {/* Contact Information */}
                  <div className="space-y-4 mt-2 w-full mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <FaEnvelope className="w-3 h-3 text-primary-color1 flex-shrink-0" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <FaPhone className="w-3 h-3 text-primary-color1 flex-shrink-0" />
                      <span className="truncate">{user.phone}</span>
                    </div>
                  </div>

                  {/* View Profile Button */}
                  <Button
                    size="sm"
                    onClick={() => handleViewProfile(user.id)}
                    className="w-full bg-primary-color1 text-white transition-colors"
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatsSection;
