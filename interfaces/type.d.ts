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
  onPhotoUpload: (files: File[]) => Promise<void>;
  onPhotoDelete: (photoId: string) => void;
  maxDisplayPhotos?: number;
}

interface PhotoUploadCardProps {
  title: string;
  description: string;
  onImageUpload: (file: File) => void;
  previewUrl?: string;
}
