declare interface SuccessStory {
  id: string;
  order: number;

  name_male: string;
  name_female: string;

  description: string;
  testimonial: string;

  rating: number;
  country_id: number;
  city_id: number;

  created_at?: string;
}
