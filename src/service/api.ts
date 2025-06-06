import { api } from 'src/boot/axios';

const API_KEY = import.meta.env.VITE_API_KEY;

export const getTrending = async (limit: number, page: number) => {
  const response = await api.get(`gifs/trending`, {
    params: {
      api_key: API_KEY,
      limit,
      page,
      rating: 'g',
      bundle: 'sticker_layering',
    },
  });
  return response.data;
};

export const getTrendingSearch = async () => {
  const response = await api.get(`trending/searches?`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
};

export const searchTerms = async (term: string, limit: number, page: number) => {
  const offset = page * limit;
  const response = await api.get(`gifs/search?`, {
    params: {
      api_key: API_KEY,
      q: term,
      limit,
      offset,
      rating: 'g',
      bundle: 'sticker_layering',
    },
  });
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get(`gifs/categories?`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
};

export const getSubCategories = async (type: string) => {
  const response = await api.get(`gifs/categories/${type}?`, {
    params: {
      api_key: API_KEY,
      pingback_id: '196249ce8184d18e',
    },
  });
  return response.data;
};

export const getFavoriteGifs = async (idsParam: string) => {
  const response = await api.get(`gifs/?`, {
    params: {
      api_key: API_KEY,
      ids: idsParam,
      rating: 'g',
    },
  });
  return response.data;
};
