import { Heart, User } from "lucide-react";
import { InfoCard } from "./InfoCard";

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  icon,
  personalData,
  seekingData,
  fields,
}) => {
  const transformValue = (value: any, transformFn?: (value: any) => any) => {
    if (transformFn) {
      return transformFn(value);
    }
    
    if (value === 0 || value === '0') return 'No';
    if (value === 1 || value === '1') return 'Yes';
    
    return value;
  };

  // Process fields for personal data
  const personalFields = fields
    .filter(field => !field.section || field.section !== "preference")
    .map(field => ({
      ...field,
      value: transformValue(personalData[field.key], field.transform)
    }));

  // Process fields for preference data
  const seekingFields = fields
    .filter(field => field.section === "preference")
    .map(field => ({
      ...field,
      value: transformValue(seekingData[field.key], field.transform)
    }));

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
          transformValue={transformValue}
        />
        {seekingFields.length > 0 && (
          <InfoCard
            title="Seeking in Partner"
            icon={<Heart className="w-4 h-4 text-primary-color1" />}
            data={seekingData}
            fields={seekingFields}
            variant="preference"
            transformValue={transformValue}
          />
        )}
      </div>
    </div>
  );
};