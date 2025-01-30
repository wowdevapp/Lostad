export interface Course {
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
}
