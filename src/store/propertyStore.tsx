import { create } from 'zustand';
import { Property, Pagination, FiltersData, SearchFilters } from '@/lib/types';
import { fetchFilters, fetchProperties } from '@/lib/api';

interface PropertyStore {
  properties: Property[];
  filters: FiltersData;
  searchFilters: SearchFilters;
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;

  setSearchFilters: (filters: SearchFilters) => void;
  loadFilters: (params?: { state?: string; city?: string }) => Promise<void>;
  loadProperties: (page?: number) => Promise<void>;
  resetFilters: () => void;
}

export const usePropertyStore = create<PropertyStore>((set, get) => ({
  properties: [],
  filters: {
    states: [],
    cities: [],
    localities: [],
    property_types: [],
  },
  searchFilters: {},
  pagination: null,
  loading: false,
  error: null,

  setSearchFilters: (filters) => {
    set({ searchFilters: filters });
    get().loadProperties(1);
  },

  loadFilters: async (params) => {
    try {
      const data = await fetchFilters(params);
      set({ filters: data });
    } catch (error) {
      set({ error: 'Failed to load filters' });
    }
  },

  loadProperties: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const { data, pagination } = await fetchProperties(
        get().searchFilters,
        page,
        10
      );
      set({
        properties: data,
        pagination,
        loading: false
      });
    } catch (error) {
      set({
        error: 'Failed to load properties',
        loading: false
      });
    }
  },

  resetFilters: () => {
    set({ searchFilters: {} });
    get().loadProperties(1);
  },
}));
