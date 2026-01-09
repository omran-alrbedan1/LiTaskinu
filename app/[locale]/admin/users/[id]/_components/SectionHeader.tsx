import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

const SectionHeader = ({
  title,
  description,
  icon,
  className = "",
}: SectionHeaderProps) => {
  return (
    <div className={`text-center  mb-8 ${className}`}>
      <div className="flex items-center justify-center gap-3 mb-3">
        {icon && <div className="flex items-center justify-center">{icon}</div>}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
