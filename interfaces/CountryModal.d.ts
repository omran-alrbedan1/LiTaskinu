declare interface Country {
  id: number;
  code?: string;
  name: {
    en: string;
    ar: string;
    fr?: string;
    es?: string;
    ru?: string;
  };
}

declare interface City {
  id: number;
  name: {
    en: string;
    ar: string;
    fr?: string;
    es?: string;
    ru?: string;
  };
  country_id: number;
  country?: Country;
  created_at?: string;
  updated_at?: string;
}
