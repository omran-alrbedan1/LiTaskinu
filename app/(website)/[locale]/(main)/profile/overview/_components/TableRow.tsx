interface TableRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export const TableRow: React.FC<TableRowProps> = ({ icon, label, value }) => (
  <tr className="hover:bg-gray-50/50 transition-colors">
    <td className="py-3 pr-4">
      <div className="flex items-center gap-3">
        <div className="text-gray-500 flex-shrink-0">{icon}</div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            {label}
          </label>
        </div>
      </div>
    </td>
    <td className="py-3 text-right">
      <span className="text-gray-900 font-medium">{value}</span>
    </td>
  </tr>
);
