import Image, { StaticImageData } from "next/image";
import {
  FaStar,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCamera,
} from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PhotoGallery } from "@/components/shared";
import { images } from "@/constants/images";

interface UserProfileCardProps {
  userData: {
    name: string;
    email: string;
    phone: string;
    photo?: string | StaticImageData;
    introduction: string;
    details: {
      place: string;
      maritalStatus: string;
      age: string;
    };
  };
  photos: Photo[];
}

const UserProfileCard = ({ userData, photos }: UserProfileCardProps) => {
  return (
    <Card className="mt-6  dark:shadow-darkMod">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Profile Image and Basic Info */}
          <div className="flex flex-col lg:flex-row items-start gap-6 flex-1">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                <Image
                  src={userData.photo || images.Unknown}
                  height={100}
                  width={100}
                  alt={userData.name}
                  className="rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-400 text-white rounded-full p-1">
                  <FaStar className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold  mb-2">{userData.name}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <FaEnvelope className="w-4 h-4 text-primary-color1" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaPhone className="w-4 h-4 text-primary-color1" />
                      <span>{userData.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="w-4 h-4 text-primary-color1" />
                      <span>{userData.details.place}</span>
                    </div>
                  </div>
                </div>

                {/* Account Status */}
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    {userData.details.maritalStatus}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800"
                  >
                    {userData.details.age} years
                  </Badge>
                </div>
              </div>

              {/* Introduction */}
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed p-3 rounded-lg">
                  {userData.introduction}
                </p>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="w-full lg:w-80">
            <div className="flex items-center gap-2 mb-3">
              <FaCamera className="text-primary-color1 w-4 h-4" />
              <span className="text-sm font-medium text-gray-700">
                Personal Photos
              </span>
            </div>
            <div className="h-full overflow-hidden rounded-lg">
              <PhotoGallery photos={photos} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
