interface SectionHeaderProps {
  title: string;
  icon: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon,
}) => (
  <div className="flex items-center gap-2 mb-6">
    {icon}
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
  </div>
);
