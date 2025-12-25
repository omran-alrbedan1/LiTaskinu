 interface SocialMedia {
  id: number;
  name: string;
  type: "social" | "contact";
  value: string;
  icon: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}
