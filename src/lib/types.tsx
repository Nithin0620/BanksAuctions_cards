export interface Property {
  id: number;
  title: string;
  bank_name: string;
  reserve_price: number;
  area: string;
  possession: string;
  auction_start_date: string;
  application_date: string;
  state?: string;
  city?: string;
  locality?: string;
  property_type?: string;
}

export interface PropertyMedia {
  filename: string;
  url: string;
  thumbnails?: {
    small: string;
    medium: string;
  };
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface FiltersData {
  states: string[];
  cities: string[];
  localities: string[];
  property_types: string[];
}

export interface SearchFilters {
  state?: string;
  city?: string;
  locality?: string;
  property_type?: string;
  budget_min?: number;
  budget_max?: number;
  query?: string;
}
