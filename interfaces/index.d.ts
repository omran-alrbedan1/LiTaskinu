interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  type: "user" | "verification" | "complaint" | "marriage";
  avatar: any;
}

interface QuickAction {
  icon: any;
  label: string;
  href: string;
  count?: number;
  color: string;
  bgColor: string;
}

interface StatsData {
  totalUsers: number;
  verifiedUsers: number;
  pendingVerifications: number;
  newComplaints: number;
  activeChats: number;
  marriageRequests: number;
  reportedChats: number;
  bannedUsers: number;
}

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info" | "user" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  userId?: string;
  userName?: string;
}

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "error" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface NotificationFilters {
  type: string;
  readStatus: string;
}

interface User {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  status?: "active" | "pending" | "banned" | "inactive";
  verification?: "verified" | "pending" | "unverified";
  registrationDate?: string;
  lastLogin?: string;
  reportsCount?: number;
  marriageRequests?: number;
  activeChats?: number;
  avatar?: string;
}

interface Photo {
  id: string;
  url: string;
}

interface PhotoGalleryProps {
  photos?: Photo[];
  maxDisplayPhotos?: number;
}

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  required?: boolean;
  options?: SelectOption[];
  searchPlaceholder?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}

interface SelectOption {
  value: string;
  label: string;
  icon?: string;
  code?: string;
}

interface Photo {
  id: string;
  url: string;
}

interface GalleryProps {
  photos: Photo[];
  onPhotoUpload: (files: File[]) => void;
  onPhotoDelete: (photoId: string) => void;
  onSetPrimary: (photoId: string) => void;
  maxPhotos?: number;
  isEditable?: boolean;
}

interface PhotoGalleryProps {
  photos: Photo[];
  onPhotoUpload?: (files: File[]) => Promise<void>;
  onPhotoDelete?: (photoId: string) => void;
  maxDisplayPhotos?: number;
}

interface PhotoUploadCardProps {
  title: string;
  description: string;
  onImageUpload: (file: File) => void;
  previewUrl?: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  dateOfBirth: string;
  country: string;
  email: string;
  phone: string;
  religion: string;
  jobTitle: string;
  occupation: string;
  place: string;
  weight: string;
  height: string;
  introduction: string;
}

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "error" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}
interface Person {
  id: number;
  age: number;
  name: string;
  age: string;
  city: string;
  occupation: string;
  image: string;
  status: string;
  education: string;
}

interface Complaint {
  id: string;
  type: "harassment" | "inappropriate" | "fake" | "spam" | "other";
  date: string;
  status: "pending" | "resolved" | "rejected";
  description: string;
  id: string;
  reporter: User;
  reportedUser: User;
  type: string;
  date: string;
  status: "pending" | "resolved" | "rejected";
  description: string;
  attachments: string[];
  wasBanned: boolean;
}

// types/faq.ts
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

interface FAQManagementProps {
  initialFaqs?: FAQItem[];
}

interface FAQItemProps {
  faq: FAQItem;
  index: number;
  isEditing: boolean;
  totalFaqs: number;
  onUpdate: (id: string, field: keyof FAQItem, value: unknown) => void;
  onRemove: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

interface FAQListProps {
  faqs: FAQItem[];
  isEditing: boolean;
  onAddFAQ: () => void;
  onUpdateFAQ: (id: string, field: keyof FAQItem, value: unknown) => void;
  onRemoveFAQ: (id: string) => void;
  onMoveFAQUp: (index: number) => void;
  onMoveFAQDown: (index: number) => void;
}



// terms and condations : 

interface TermsContent {
  title: string;
  lastUpdated: string;
  introduction: string;
  acceptance: string;
  eligibility: string;
  userResponsibilities: string;
  islamicGuidelines: string;
  platformServices: string;
  privacyCommunication: string;
  prohibitedActivities: string;
  termination: string;
  intellectualProperty: string;
  disclaimer: string;
  limitationLiability: string;
  changes: string;
  governingLaw: string;
  contact: string;
}


// privacy policy : 

interface PrivacyContent {
  title: string;
  lastUpdated: string;
  introduction: string;
  informationCollection: string;
  informationUsage: string;
  informationSharing: string;
  dataSecurity: string;
  userRights: string;
  retention: string;
  changes: string;
  contact: string;
}