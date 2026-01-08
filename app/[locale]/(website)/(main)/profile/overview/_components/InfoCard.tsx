interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  data: Record<string, any>;
  fields: FieldConfig[];
  variant: "personal" | "seeking";
  transformValue: (value: any, transformFn?: (value: any) => any) => any;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  icon,
  data,
  fields,
  variant,
  transformValue,
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
    <div className="overflow-hidden">
      <table className="w-full">
        <tbody className="divide-y divide-gray-200">
          {fields.map((field) => {
            const value = transformValue(data[field.key], field.transform);
            return (
              <tr key={field.key} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-500 flex-shrink-0">{field.icon}</div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        {field.label}
                      </label>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-right">
                  <span className="text-gray-900 font-medium">
                    {value || "Not specified"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);