/**
 * Format timestamp to relative time (e.g., "2m ago", "3h ago", "1d ago")
 */
export const formatTimeAgo = (timestamp: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - timestamp.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  return `${diffInYears}y ago`;
};

/**
 * Format date to localized string
 */
export const formatDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  };
  return date.toLocaleDateString("en-US", defaultOptions);
};

/**
 * Format date and time to localized string
 */
export const formatDateTime = (
  date: Date,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  };
  return date.toLocaleDateString("en-US", defaultOptions);
};

export const formatDateForSubmission = (dateString: any): string => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  } catch (error) {
    return dateString;
  }
};

/**
 * Format number with commas (e.g., 1000 -> 1,000)
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};

/**
 * Format currency amount
 */
export const formatCurrency = (
  amount: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

/**
 * Format file size to human readable format
 */
export const formatFileSize = (bytes: number): string => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
};

/**
 * Format phone number to (XXX) XXX-XXXX format
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return phoneNumber;
};

/**
 * Format percentage with specified decimal places
 */
export const formatPercentage = (
  value: number,
  decimals: number = 1
): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Format duration in seconds to HH:MM:SS format
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Format social media numbers (e.g., 1500 -> 1.5K)
 */
export const formatSocialNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};



// Replace the calculateDaysRemaining function with a utility-based approach
export const calculateDaysRemaining = (endDate: string) => {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// You can simplify this using a more modular approach
export const formatRemainingTime = (endDate: string) => {
  const end = new Date(endDate);
  const now = new Date();
  const diffInMs = end.getTime() - now.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);

  // Use your formatDuration utility for consistent formatting
  if (diffInSeconds < 60) return "Less than a minute";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours`;
  return `${Math.floor(diffInSeconds / 86400)} days`;
};

// transfer data : 
export const toBoolean = (value: any) => {
  if (value === "1" || value === 1 || value === true) return 1;
  if (value === "0" || value === 0 || value === false) return 0;
  return 0;
};

export const toNumber = (value: any) => {
  if (value === null || value === undefined) return 0;
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};
