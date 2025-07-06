import { useState, useEffect } from 'react';
import apiClient from '@/services/apiClient';
import { type Store } from '@/components/ProductsPage/types';

interface Filters {
  priceRange: { min: number; max: number };
  selectedStore: string;
  sortBy: string;
}

export const useFilters = (initialFilters: Filters) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [minPrice, setMinPrice] = useState(initialFilters.priceRange.min);
  const [maxPrice, setMaxPrice] = useState(initialFilters.priceRange.max);

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    setMinPrice(initialFilters.priceRange.min);
    setMaxPrice(initialFilters.priceRange.max);
  }, [initialFilters.priceRange.min, initialFilters.priceRange.max]);

  const fetchStores = async () => {
    try {
      const response = await apiClient.get('/stores');
      setStores(response.data);
    } catch (error) {
      console.error('Error fetching stores:', error);
      setStores([]);
    }
  };

  const handlePriceChange = (type: 'min' | 'max', value: number, onFilterChange: (filters: Filters) => void, currentFilters: Filters) => {
    const newRange = {
      min: type === 'min' ? value : minPrice,
      max: type === 'max' ? value : maxPrice
    };
    
    if (type === 'min') setMinPrice(value);
    if (type === 'max') setMaxPrice(value);
    
    onFilterChange({
      ...currentFilters,
      priceRange: newRange
    });
  };

  const handleStoreChange = (storeId: string, onFilterChange: (filters: Filters) => void, currentFilters: Filters) => {
    onFilterChange({
      ...currentFilters,
      selectedStore: storeId
    });
  };

  const resetFilters = (onFilterChange: (filters: Filters) => void) => {
    const defaultFilters = {
      priceRange: { min: 0, max: 25000 },
      selectedStore: '',
      sortBy: 'popularity'
    };
    setMinPrice(0);
    setMaxPrice(25000);
    onFilterChange(defaultFilters);
  };

  return {
    stores,
    minPrice,
    maxPrice,
    fetchStores,
    handlePriceChange,
    handleStoreChange,
    resetFilters
  };
};
