declare interface FAQ {
  id?: number;
  question: string;
  answer: string;
  is_active: boolean | number | string|undefined;
  created_at?: string;
  updated_at?: string;
}

declare interface FAQPayload {
  question: string;
  answer: string;
  is_active: number; 
}