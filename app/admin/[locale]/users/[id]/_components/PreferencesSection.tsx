import { Card, CardContent } from "@/components/ui/card";
import { ICONS } from "@/constants/icons";
import { images } from "@/constants/images";
import Image from "next/image";
import {
  FaHeart,
  FaGraduationCap,
  FaPray,
  FaMapMarkerAlt,
  FaUser,
  FaRulerVertical,
  FaWeight,
  FaQuestion,
  FaUserShield,
} from "react-icons/fa";
import { RiUserSearchFill } from "react-icons/ri";
import SectionHeader from "./SectionHeader";

interface PreferencesSectionProps {
  preferences: Record<string, string>;
}

const PreferencesSection = ({ preferences }: PreferencesSectionProps) => {
  const preferenceConfig: Record<
    string,
    { label: string; icon: React.ReactNode; color: string }
  > = {
    ageRange: {
      label: "Age Range",
      icon: <FaHeart className="w-5 h-5" />,
      color: "text-pink-500 bg-pink-50",
    },
    education: {
      label: "Education Level",
      icon: <FaGraduationCap className="w-5 h-5" />,
      color: "text-blue-500 bg-blue-50",
    },
    religion: {
      label: "Religion",
      icon: <FaPray className="w-5 h-5" />,
      color: "text-purple-500 bg-purple-50",
    },
    location: {
      label: "Geographic Location",
      icon: <FaMapMarkerAlt className="w-5 h-5" />,
      color: "text-green-500 bg-green-50",
    },
    maritalStatus: {
      label: "Marital Status",
      icon: <FaUser className="w-5 h-5" />,
      color: "text-orange-500 bg-orange-50",
    },
    height: {
      label: "Height",
      icon: <FaRulerVertical className="w-5 h-5" />,
      color: "text-indigo-500 bg-indigo-50",
    },
    weight: {
      label: "Weight",
      icon: <FaWeight className="w-5 h-5" />,
      color: "text-cyan-500 bg-cyan-50",
    },
  };

  return (
    <Card className="mt-6 ">
      <CardContent className="p-6">
        {/* Header - Similar to GuardianSection */}
        <SectionHeader
          title="Partner Preferences"
          description="Desired characteristics in a potential partner"
          icon={<RiUserSearchFill className="w-8 h-8 text-primary-color1" />}
        />

        {/* Split Layout: Unknown Person + Preferences */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Left Side: Unknown Person */}
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="relative w-48 h-48 flex items-center justify-center mb-4">
              <Image
                src={images.Unknown}
                height={200}
                width={200}
                alt="Ideal Partner"
                className="rounded-full"
              />
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary-color1   rounded-full flex items-center justify-center animate-pulse">
                <FaQuestion className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold  mb-2">Ideal Partner</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
              Looking for someone who matches these preferences
            </p>
          </div>

          {/* Right Side: Preferences Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(preferences).map(([key, value]) => {
                const config = preferenceConfig[key];
                if (!config) return null;

                return (
                  <div
                    key={key}
                    className="group relative  border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-gray-300"
                  >
                    {/* Icon and Content */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                      >
                        {config.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                          {config.label}
                        </div>
                        <div className="text-lg font-bold truncate">
                          {value}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesSection;
