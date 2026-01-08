 type FieldType = "input" | "textarea" | "radio" | "number" | "select"|'checkbox'|'multiSelect';

 type DataCategory = "personal" | "preference";

 interface ProfileField {
  key: string;           
  label: string;         
  type: FieldType;
  options?: Array<{ value: string; label: string }>;
  category: DataCategory;
  icon?: React.ComponentType;
  placeholder?: string;
}

 interface ProfileSection {
  id: string;
  title: string;
  icon: React.ComponentType;
  description: string;
  fields: string[]; 
}a