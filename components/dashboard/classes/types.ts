/* export interface Course {
  title: string;
  city: string;
  country: string;
  category_id: string;
  currency: string;
  price: number;
  min_age: number;
  max_age: number;
  level: string[];
  languages: string[];
  description: string;
  format: string;
  availabilities: {
    day: string;
    hour: string;
  }[];
} */

export type Course = {
  id: number;
  title: string;
  description: string;
  category_id: number;
  professor_id: number;
  level: string[];
  more_info: null | string;
  available_durations: null | string[];
  allowed_ages: null | number[];
  location: null | string;
  time_zone: null | string;
  price: string;
  published: number;
  created_at: string;
  updated_at: string;
  min_age: number;
  max_age: number;
  currency: string;
  format: string;
  languages: string[];
  category: {
    id: number;
    name_fr: string;
    name_en: string;
    created_at: string;
    updated_at: string;
  };
  topics: any[];
  reviews: any[];
  favorites: any[];
};
