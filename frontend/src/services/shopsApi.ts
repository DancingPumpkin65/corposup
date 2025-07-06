import apiClient from '@/services/apiClient';
import type { Store } from '@/components/SellerPage/Shops/types';

export const fetchStores = async (): Promise<Store[]> => {
  const response = await apiClient.get('/my-store');
  
  if (Array.isArray(response.data)) {
    return response.data;
  }
  if (response.data?.stores) {
    return response.data.stores;
  }
  if (response.data?.id) {
    return [response.data];
  }
  return [];
};

export const createStore = async (data: FormData) => {
  return apiClient.post('/my-store', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const updateStore = async (id: number, data: FormData) => {
  return apiClient.post(`/my-store/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const deleteStore = async (id: number) => {
  return apiClient.delete(`/my-store/${id}`);
};
