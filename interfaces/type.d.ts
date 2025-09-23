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
}

interface SelectOption {
  value: string;
  label: string;
  icon?: string;
  code?: string;
}
