export interface Restaurant {
  id: string;
  name: string;
  lat: number | null;
  long: number | null;
  city: number;
  craving: string;
  tags: string[];
  addresse: string;
}

export interface RestaurantFilters {
  cravings: string[];
  cities: string[];
  tags: string[];
}

/** A reference option (craving/city/tag) with a human-readable label, used to render filter toggles. */
export interface FilterOption {
  id: string;
  label: string;
}
