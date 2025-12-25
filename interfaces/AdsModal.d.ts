declare interface CountryName {
  en: string;
  ar: string;
  fr?: string;
  es?: string;
  ru?: string;
}

declare interface Country {
  id: number;
  name: CountryName;
  code: string;
  created_at: string;
  updated_at: string;
  pivot: {
    ad_id: number;
    country_id: number;
  };
}

declare interface AdTitle {
  en: string;
  ar: string;
}

declare interface AdContent {
  en: string;
  ar: string;
}

declare interface Ad {
  id: number;
  title: AdTitle;
  content: AdContent;
  image: string;
  status: "active" | "inactive";
  start_date: string;
  end_date: string;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
  countries: Country[];
}

declare interface CreateAdRequest {
  title: AdTitle;
  content: AdContent;
  image?: string;
  status?: "active" | "inactive";
  start_date: string;
  end_date: string;
  is_premium?: boolean;
  country_ids?: number[];
}

declare interface UpdateAdRequest extends Partial<Omit<CreateAdRequest, 'country_ids'>> {
  id: number;
  country_ids?: number[];
}

// API Response Types
declare interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

declare interface AdsListResponse {
  data: Ad[];
}

declare interface AdDetailResponse {
  data: Ad;
}

// For form handling
declare interface AdFormData {
  title_en: string;
  title_ar: string;
  content_en: string;
  content_ar: string;
  image: File | string | null;
  status: "active" | "inactive";
  start_date: string;
  end_date: string;
  is_premium: boolean;
  country_ids: number[];
}