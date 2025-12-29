import Image, { StaticImageData } from "next/image";
import React from "react";
interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  image?: StaticImageData;
  hasFilters?: any;
  action?: React.ReactNode;
  imageClassName?: string;
  iconClassName?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No items found",
  description,
  icon,
  image,
  hasFilters = false,
  action,
  imageClassName = "w-48 h-48 mx-auto mb-4",
  iconClassName = "w-12 h-12 text-gray-400 mx-auto mb-4",
}) => {
  const defaultDescription = hasFilters
    ? "Try adjusting your search or filters"
    : "No items have been added yet";
  return (
    <div className="text-center py-12">
      <div className="w-fit mx-auto">
        {image && <Image src={image} className={imageClassName} alt="state" />}
      </div>
      {icon && icon}
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        {description || defaultDescription}
      </p>
      <div className=" flex  justify-center">

      {action}
      </div>
    </div>
  );
};

export default EmptyState;
