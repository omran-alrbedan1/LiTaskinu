declare interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  email_verified_at: string | null;
  is_verified: number;
  phone: string | null;
  birath_day: string | null;
  account_status: string;
  created_at: string;
  updated_at: string;
}

declare interface UserFilters {
  status: string;
  verification: string;
  search: string;
  page: string;
  pageSize: string;
  [key: string]: string;
}




interface UserProfile {
  id: number;
  user_id: number;
  Country_id: number | null;
  city_id: number | null;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: "male" | "female";
    email_verified_at: string | null;
    is_verified: number;
    phone: number;
    image:string;
    birth_day: string | null;
    account_status: string;
    created_at: string;
    updated_at: string;
  };
  personal_info: any | null;
}
