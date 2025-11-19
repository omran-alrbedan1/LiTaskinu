interface InfoTableProps {
  data: Record<string, string>;
  fields: FieldConfig[];
}

export const InfoTable: React.FC<InfoTableProps> = ({ data, fields }) => (
  <div className="overflow-hidden">
    <table className="w-full">
      <tbody className="divide-y divide-gray-200">
        {fields.map((field) => (
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
                {data[field.key] || "Not specified"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
