import { InfoTable } from "./InfoTable";

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  data: Record<string, string>;
  fields: FieldConfig[];
  variant: "personal" | "seeking";
}

export const  InfoCard: React.FC<InfoCardProps> = ({
  title,
  icon,
  data,
  fields,
  variant,
}) => (
  <div
    className={`
    rounded-xl p-6 transition-all duration-300 hover:shadow-lg
    ${
      variant === "personal"
        ? "border border-primary-color1 bg-white shadow-sm hover:shadow-primary-color1/20"
        : "bg-gradient-to-br from-primary-light/30 to-primary-light/10 backdrop-blur-sm border border-primary-light/30 shadow-sm"
    }
  `}
  >
    <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-200/50">
      <div
        className={`
        p-2 rounded-lg transition-colors
        ${
          variant === "personal"
            ? "bg-primary-color1/10 text-primary-color1"
            : "bg-primary-light/40 text-primary-color1"
        }
      `}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 tracking-tight">
        {title}
      </h3>
    </div>
    <InfoTable data={data} fields={fields} />
  </div>
);
