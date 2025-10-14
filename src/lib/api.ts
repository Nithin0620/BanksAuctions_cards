import axios from 'axios';
import { Property, PropertyMedia, Pagination, FiltersData, SearchFilters } from './types';

const API_BASE_URL = 'http://93.127.166.99:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});


export const fetchFilters = async (params?: { state?: string; city?: string }) => {
  const response = await api.get('/properties/filters', { params });
  return response.data.data;
};

export const fetchProperties = async (
  filters: SearchFilters = {},
  page = 1,
  limit = 10,
  sortBy = 'bn_auction_start_date',
  sortOrder: 'ASC' | 'DESC' = 'DESC'
) => {
  const response = await api.get('/properties', {
    params: {
      ...filters,
      page,
      limit,
      sort_by: sortBy,
      sort_order: sortOrder,
    },
  });
  console.log("data is,:",response.data);
  return response.data;
};

export const fetchPropertyMedia = async (
  propertyId: number,
  includeThumbnails = true
) => {
  try {
    const response = await api.get(`/properties/${propertyId}/media`, {
      params: { include_thumbnails: includeThumbnails },
    });
    return response.data.data;
  } catch (error) {
    return { images: [], videos: [], total_count: 0 };
  }
};
