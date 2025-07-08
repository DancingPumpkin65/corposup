import type { StoreFormData } from '@/components/Seller/Shops/types';

export const createStoreFormData = (storeData: StoreFormData, method?: string): FormData => {
  const formDataToSend = new FormData();
  formDataToSend.append('store_name', storeData.store_name);
  formDataToSend.append('store_description', storeData.store_description);
  formDataToSend.append('store_status', storeData.store_status);
  
  if (method) {
    formDataToSend.append('_method', method);
  }
  
  if (storeData.store_image) {
    formDataToSend.append('store_image', storeData.store_image);
  }

  return formDataToSend;
};

export const getImageUrl = (imagePath?: string): string => {
  if (!imagePath) return '';
  if (imagePath.startsWith('stores/')) {
    return `http://127.0.0.1:8000/storage/${imagePath}`;
  }
  return imagePath;
};
