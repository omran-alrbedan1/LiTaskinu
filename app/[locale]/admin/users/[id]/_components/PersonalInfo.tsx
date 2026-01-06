import { DetailItem } from "@/components/shared";
import { CardContent } from "@/components/ui/card";
import { Card } from "antd";
import React from "react";
import SectionHeader from "./SectionHeader";
import { FaUser } from "react-icons/fa";

interface PersonalDetail {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface PersonalInfoProps {
  personalDetails: PersonalDetail[];
}

const PersonalInfo = ({ personalDetails }: PersonalInfoProps) => {
  return (
    <Card className="!mt-6">
      <SectionHeader
        title="Personal Information"
        description="Basic personal details and background information"
        icon={<FaUser className="w-6 h-6 text-primary-color1" />}
      />
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {personalDetails.map((detail, index) => (
            <DetailItem
              key={index}
              icon={detail.icon}
              label={detail.label}
              value={detail.value}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
