declare interface Sheikh {
  id: number;
  name: string;
  image: string;
  experience: string;
  specialization: string[];
  languages: string[];
  bio: string;
  email: string;
  phone?: string;
  username: string;
  password?: string;
  created_at: string;
  updated_at?: string;
}

declare interface Psychiatrist {
  id: number;
  name: string;
  email: string;
  username: string;
  phone?: string;
  image: string;
  experience: string;
  specialization: string[];
  languages: string[];
  rating?: number;
  bio: string;
  created_at: string;
  updated_at?: string;
}