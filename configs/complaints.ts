import {
  MoreOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";

export const complaintTypeConfig = {
  harassment: {
    color: "#f87171", // Tailwind red-400
    text: "Harassment",
    icon: ExclamationCircleOutlined,
    badgeColor: "destructive",
    textColor: "#ffffff", // White text for better contrast
  },
  inappropriate: {
    color: "#fb923c", // Tailwind orange-400
    text: "Inappropriate Content",
    icon: FileTextOutlined,
    badgeColor: "secondary",
    textColor: "#ffffff",
  },
  fake: {
    color: "#c084fc", // Tailwind purple-400
    text: "Fake Profile",
    icon: UserOutlined,
    badgeColor: "default",
    textColor: "#ffffff",
  },
  spam: {
    color: "#60a5fa", // Tailwind blue-400
    text: "Spam",
    icon: MessageOutlined,
    badgeColor: "outline",
    textColor: "#ffffff",
  },
  other: {
    color: "#9ca3af", // Tailwind gray-400
    text: "Other",
    icon: MoreOutlined,
    badgeColor: "secondary",
    textColor: "#ffffff",
  },
};

// Helper function to get complaint config by type
export const getComplaintConfig = (type: string) => {
  const typeMap: { [key: string]: keyof typeof complaintTypeConfig } = {
    Harassment: "harassment",
    "Inappropriate Content": "inappropriate",
    "Fake Profile": "fake",
    Spam: "spam",
    Other: "other",
  };

  const key = typeMap[type] || "other";
  return complaintTypeConfig[key];
};

// Export for use in options
export const complaintOptions = Object.entries(complaintTypeConfig).map(
  ([key, config]) => ({
    value: key,
    label: config.text,
    color: config.color,
    textColor: config.textColor,
    icon: config.icon,
    badgeColor: config.badgeColor,
  })
);
