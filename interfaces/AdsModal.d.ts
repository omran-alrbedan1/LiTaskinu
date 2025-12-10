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
  target_audience: "all" | "premium" | "new";
  is_premium: "0" | "1";
  country_ids: string[];
  created_at: string;
  updated_at: string;
}

declare interface CreateAdRequest {
  title: AdTitle;
  content: AdContent;
  image?: string;
  status?: "active" | "inactive";
  start_date: string;
  end_date: string;
}

declare interface UpdateAdRequest extends Partial<CreateAdRequest> {
  id: number;
}
