import { Heart, User } from "lucide-react";
import { InfoCard } from "./InfoCard";

interface ProfileSectionProps {
  title: string;
  icon: React.ReactNode;
  personalData: Record<string, string>;
  seekingData: Record<string, string>;
  fields: FieldConfig[];
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  icon,
  personalData,
  seekingData,
  fields,
}) => {
  const personalFields = fields.filter((field) => field.section === "personal");
  const seekingFields = fields.filter((field) => field.section === "seeking");

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-primary-light/30 p-2 rounded-md">{icon}</div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InfoCard
          title="My Information"
          icon={<User className="w-4 h-4 text-gray-600" />}
          data={personalData}
          fields={personalFields}
          variant="personal"
        />
        <InfoCard
          title="Seeking in Partner"
          icon={<Heart className="w-4 h-4 text-primary-color1" />}
          data={seekingData}
          fields={seekingFields}
          variant="seeking"
        />
      </div>
    </div>
  );
};
