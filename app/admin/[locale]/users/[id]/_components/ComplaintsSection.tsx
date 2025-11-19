import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from ".";
import {
  FaFlag,
  FaUser,
  FaCalendar,
  FaExclamationTriangle,
} from "react-icons/fa";
import SectionHeader from "./SectionHeader";

interface Complaint {
  from?: string;
  to?: string;
  date: string;
  type: string;
  status: string;
}

interface ComplaintsSectionProps {
  complaints: {
    received: Complaint[];
    sent: Complaint[];
  };
}

const ComplaintCard = ({
  complaint,
  type,
}: {
  complaint: Complaint;
  type: "received" | "sent";
}) => {
  const user = type === "received" ? complaint.from : complaint.to;
  const theme = type === "received" ? "orange" : "blue";

  const themeClasses = {
    orange: {
      bg: "bg-orange-50 dark:bg-orange-900/20",
      border: "border-orange-200 dark:border-orange-800",
      text: "text-orange-600 dark:text-orange-400",
      hoverBorder: "hover:border-orange-300 dark:hover:border-orange-600",
      hoverBg: "hover:bg-orange-50/30 dark:hover:bg-orange-900/20",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-600 dark:text-blue-400",
      hoverBorder: "hover:border-blue-300 dark:hover:border-blue-600",
      hoverBg: "hover:bg-blue-50/30 dark:hover:bg-blue-900/20",
    },
  };

  const currentTheme = themeClasses[theme];

  return (
    <div
      className={`group p-4 border border-gray-200 dark:border-gray-700 rounded-lg ${currentTheme.hoverBorder} ${currentTheme.hoverBg} transition-all duration-200`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 bg-white dark:bg-gray-800 border ${currentTheme.border} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}
          >
            <FaUser className={`w-4 h-4 ${currentTheme.text}`} />
          </div>
          <div className="font-semibold text-gray-900 dark:text-gray-100">
            {user}
          </div>
        </div>
        <StatusBadge status={complaint.status} />
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-lg">
          <span className="font-medium text-gray-900 dark:text-gray-100">
            Type:
          </span>{" "}
          {complaint.type}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <FaCalendar className="w-3 h-3" />
          {complaint.date}
        </div>
      </div>
    </div>
  );
};

const ComplaintsList = ({
  complaints,
  type,
  title,
  description,
}: {
  complaints: Complaint[];
  type: "received" | "sent";
  title: string;
  description: string;
}) => {
  const theme = type === "received" ? "orange" : "blue";
  const themeClasses = {
    orange: {
      bg: "bg-orange-50 dark:bg-orange-900/20",
      text: "text-orange-600 dark:text-orange-400",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
    },
  };

  const currentTheme = themeClasses[theme];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div
            className={`w-12 h-12 ${currentTheme.bg} rounded-xl flex items-center justify-center shadow-sm`}
          >
            <FaFlag className={`w-6 h-6 ${currentTheme.text}`} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {complaints.map((complaint, index) => (
            <ComplaintCard key={index} complaint={complaint} type={type} />
          ))}
        </div>

        {complaints.length === 0 && (
          <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
            <FaFlag className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400">
              No {type} complaints
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ComplaintsSection = ({ complaints }: ComplaintsSectionProps) => {
  return (
    <Card className="mt-6 p-6">
      <SectionHeader
        title="Complaints Management"
        description="Received and sent complaints overview"
        icon={<FaExclamationTriangle className="w-8 h-8 text-primary-color1" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComplaintsList
          complaints={complaints.received}
          type="received"
          title="Received Complaints"
          description={`${complaints.received.length} complaints against this user`}
        />

        <ComplaintsList
          complaints={complaints.sent}
          type="sent"
          title="Sent Complaints"
          description={`${complaints.sent.length} complaints filed by this user`}
        />
      </div>
    </Card>
  );
};

export default ComplaintsSection;
