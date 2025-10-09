import React from "react";

const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="bg-gray-50/50 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-100/50 transition-colors">
      <div className="flex items-center  gap-2 mb-2">
        <span className="text-primary-color1 text-lg">{icon}</span>
        <span className="text-sm font-medium tracking-wide">{label}</span>
      </div>
      <p className="text-gray-500 text-sm ml-2">{value}</p>
    </div>
  );
};

export default DetailItem;
