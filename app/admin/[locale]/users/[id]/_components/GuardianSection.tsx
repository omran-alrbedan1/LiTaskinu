import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FaUserShield,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaHeart,
  FaEdit,
} from "react-icons/fa";
import { IoChatbubbles } from "react-icons/io5";
import Image from "next/image";
import { images } from "@/constants/images";
import SectionHeader from "./SectionHeader";

interface GuardianInfo {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  avatar?: any;
  status?: string;
}

interface GuardianSectionProps {
  guardianInfo: GuardianInfo;
}

const GuardianSection = ({ guardianInfo }: GuardianSectionProps) => {
  return (
    <Card className="mt-6 p-6">
      <CardContent className="">
        <SectionHeader
          title="Guardian Information"
          description="Personal details and contact information"
          icon={<FaUserShield className="w-8 h-8 text-primary-color1" />}
        />

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          {/* Left: Guardian Profile */}
          <div className="flex-1 flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative mb-6">
              <Image
                src={guardianInfo.avatar ? guardianInfo.avatar : images.Unknown}
                width={60}
                height={60}
                alt={guardianInfo.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary-color1 shadow-lg"
              />
            </div>

            {/* Name and Relationship */}
            <h3 className="text-2xl font-bold  mb-2">{guardianInfo.name}</h3>
            <div className="flex items-center gap-2 text-lg text-primary-color1 mb-4">
              <FaHeart className="w-5 h-5" />
              <span className="font-semibold">{guardianInfo.relationship}</span>
            </div>
          </div>

          {/* Right: Contact Information */}
          <div className="flex-1 w-full max-w-md">
            <Card className="">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold  mb-6 text-center">
                  Contact Details
                </h4>

                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-center gap-4 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Email Address
                      </div>
                      <div className="font-medium  truncate">
                        {guardianInfo.email}
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaPhone className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Phone Number
                      </div>
                      <div className="font-medium">{guardianInfo.phone}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button className="flex-1 bg-primary-color1">
                    <FaEnvelope className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <IoChatbubbles className="w-4 h-4 mr-2" />
                    Chat Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuardianSection;
