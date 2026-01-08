
declare type FieldType = "input" | "textarea" | "radio" | "number" | "select" | "checkbox" | "multiSelect";

declare type SectionType = "personal" | "preference";

declare interface FieldConfig {
  key: string;
  label: string;
  icon?: ReactNode;
  section?: SectionType;
  type?: FieldType;
  options?: Array<{ value: string | number; label: string }>;
  placeholder?: string;
  transform?: (value: any) => any;
  value?: string | number | boolean;
  name?: string;
  required?: boolean;
  validation?: Record<string, any>;
}

declare interface ProfileSectionConfig {
  title: string;
  icon: ReactNode;
  fields: FieldConfig[];
  id?: string;
  description?: string;
}

declare interface ProfileData {
  // Basic Information
  religion?: string;
  marital_status?: string;
  willing_to_relocate?: number | boolean | string;
  
  // Appearance
  hair_color?: string;
  eye_color?: string;
  height?: string;
  weight?: string;
  body_style?: string;
  
  // Lifestyle
  job?: string;
  is_smoker?: number | boolean | string;
  children_count?: number | string;
  want_more_children?: string;
  employment_status?: string;
  living_situation?: string;
  has_house?: number | boolean | string;
  house_type?: string;
  has_vehicle?: number | boolean | string;
  is_sporty?: number | boolean | string;
  
  // Education & Language
  education?: string;
  language?: string;
  languages_spoken?: string;
  
  // Religious & Cultural
  religious_commitment?: string;
  born_reverted?: string;
  wear_hijab?: string;
  polygamy?: string;
  profile_creator?: string;
  bio?: string;
  partner_description?: string;
  partner_preferences?: string;
  
  // Additional fields that might exist
  [key: string]: any;
}

declare interface InfoCardProps {
  title: string;
  icon: ReactNode;
  data: Record<string, any>;
  fields: FieldConfig[];
  variant: "personal" | "preference";
  transformValue: (value: any, transformFn?: (value: any) => any) => any;
}

// Props for ProfileSection component
declare interface ProfileSectionProps {
  title: string;
  icon: ReactNode;
  personalData: Record<string, any>;
  seekingData: Record<string, any>;
  fields: FieldConfig[];
}

// Props for EditPersonalDataPage sections
declare interface EditProfileSection {
  id: string;
  title: string;
  icon: ComponentType; 
  description: string;
  fields: EditProfileField[];
}

declare interface EditProfileField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: Array<{ value: string |boolean| number; label: string }>;
  section?: "personal" | "preference";
}

declare interface ProfileFormData {
  // Basic Information
  religion?: string;
  religious_commitment: "low" | "medium" | "high";
  marital_status: "single" | "married" | "widowed" | "divorced";
  children_count: number;
  born_reverted: "born_muslim" | "reverted";
  
  // Appearance
  hair_color?: string;
  eye_color?: string;
  height?: string;
  weight?: string;
  body_style?: string;
  
  // Lifestyle
  is_sporty: number;
  is_smoker: number;
  has_house: number;
  house_type?: string;
  has_vehicle: number;
  willing_to_relocate: number;
  
  // Career & Education
  job?: string;
  education?: string;
  employment_status?: string;
  living_situation?: string;
  
  // Family & Preferences
  want_more_children: "yes" | "no" | "not_sure";
  wear_hijab: "yes" | "sometimes" | "no";
  polygamy: "accept" | "maybe" | "do_not_accept";
  profile_creator?: string;
  
  // Languages & About
  languages_spoken?: string;
  bio?: string;
  partner_description?: string;
  partner_preferences?: string;
}

// UseForm control type
declare type ProfileFormControl = Control<ProfileFormData>;

// API response types
declare interface ProfileApiResponse {
  data: ProfileData;
  message?: string;
  success?: boolean;
}

declare interface PreferencesApiResponse {
  data: ProfileData;
  message?: string;
  success?: boolean;
}

// Helper function types
declare type TransformFunction = (value: any) => any;
declare type ValueTransformer = (value: any, transformFn?: TransformFunction) => any;

