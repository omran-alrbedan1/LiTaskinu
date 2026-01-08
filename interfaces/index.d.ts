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
  id: number | string;
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
  className?: string;
  inputClassName?: string;
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

// success story :
interface SuccessStory {
  id: string;
  title: string;
  coupleNames: string;
  marriageDate: string;
  location: string;
  story: string;
  testimonial: string;
  order: number;
}

interface RequiredDocument {
  id: string;
  title: string;
  description: string;
  fileTypes: string[];
  isRequired: boolean;
  forUserType: "all" | "male" | "female";
  instructions: string;
}
type VerificationStatus = "pending" | "approved" | "rejected" | "under_review";
type DocumentStatus = "pending" | "verified" | "rejected";

interface User {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  address?: string;
  dateOfBirth?: string;
}

// Renamed from Document to VerificationDocument to avoid conflict
interface VerificationDocument {
  id: number;
  type: string;
  name: string;
  url: string;
  uploadedAt: string;
  status: DocumentStatus;
  previewUrl?: string;
  notes?: string;
  fileType?: "image" | "pdf";
}

interface VerificationRequest {
  id: number;
  user: User;
  submittedAt: string;
  status: VerificationStatus;
  documents: VerificationDocument[];
  notes?: string;
}

interface RequiredDocument {
  id: string;
  title: string;
  description: string;
  fileTypes: string[];
  isRequired: boolean;
  forUserType: "all" | "male" | "female";
  instructions: string;
}

interface TermsSectionType {
  id: string;
  order: number;
  title: string;
  content: string;
}

interface UserType {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface BlockedChatType {
  id: string;
  user1: UserType;
  user2: UserType;
  complainant: UserType;
  reportedUser: UserType;
  reason: string;
  date: string;
  blockedBy: string;
  blockDuration: string;
  blockExpiry: string;
}
interface ParentType {
  key: string;
  parent: {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    relationship: string;
  };
  member: {
    name: string;
    age: number;
    gender: string;
    avatar: string;
    maritalStatus: string;
    education: string;
  };
  contact: {
    primaryPhone: string;
    secondaryPhone?: string;
    city: string;
  };
  registrationDate: string;
}

/// profile page :

interface Profile {
  id: number;
  name: string;
  gender: string;
  age: number;
  location: string;
  seeking: string;
  time: string;
  occupation: string;
  interests: string[];
  image: string;
}

interface FormData {
  basicInfo: BasicInfo;
  appearance: Appearance;
  lifestyle: Lifestyle;
  education: Education;
  religious: Religious;
}

interface BasicInfo {
  gender: string;
  age: string;
  livesIn: string;
  relocate: string;
}

interface Appearance {
  hairColor: string;
  eyeColor: string;
  height: string;
  weight: string;
  bodyStyle: string;
  ethnicity: string;
}

interface Lifestyle {
  occupation: string;
  smoke: string;
  eatingHabits: string;
  maritalStatus: string;
  haveChildren: string;
  wantMoreChildren: string;
  employmentStatus: string;
  annualIncome: string;
  livingSituation: string;
}

interface Education {
  education: string;
}

interface Religious {
  religion: string;
  nationality: string;
  languagesSpoken: string[];
  bornReverted: string;
  religiousValues: string;
  attendReligiousServices: string;
  readQuran: string;
  familyValues: string;
}

interface FieldConfig {
  key: string;
  label: string;
  type?: string;
  options?: string[];
  value?: any;
}

// types/profile.ts
interface UserData {
  basicInfo: {
    gender: string;
    age: string;
    livesIn: string;
    relocate: string;
  };
  appearance: {
    hairColor: string;
    eyeColor: string;
    height: string;
    weight: string;
    bodyStyle: string;
    ethnicity: string;
  };
  lifestyle: {
    occupation: string;
    smoke: string;
    eatingHabits: string;
    maritalStatus: string;
    haveChildren: string;
    wantMoreChildren: string;
    employmentStatus: string;
    livingSituation: string;
  };
  education: {
    education: string;
  };
  religious: {
    religion: string;
    nationality: string;
    education: string;
    languagesSpoken: string;
    bornReverted: string;
    religiousValues: string;
    attendReligiousServices: string;
    readQuran: string;
    familyValues: string;
  };
}

interface SectionConfig {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  personalData?: string;
  seekingData?: string;
  fields: FieldConfig[];
}

interface FieldConfig {
  key: string;
  label: string;
  icon?: React.ReactNode;
  section?: string;
}
