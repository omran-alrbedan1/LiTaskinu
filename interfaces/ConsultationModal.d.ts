
  declare interface Psychiatrist {
    id: number;
    name: string;
    email: string;
    username: string;
    phone?: string;
    image: string|StaticImageData;
    experience: string;
    specialization: string[];
    languages: string[];
    rating?: number;
    bio: string;
    created_at: string;
    updated_at?: string;
  }


  interface Sheikh {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    phone: string | number | null;
    birth_day: string | null;
    account_status: string;
    sheikh?: {
      id: number;
      user_id: number;
      experience: string;
      specialization: string;
      languages: string[];
      bio: string;
      country_id: number;
      city_id: number;
    };
  }
  
  interface SheikhResponse {
    status: boolean;
    message: string;
    data: {
      data: Sheikh[];
      meta?: {
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
      };
    };
  }
  