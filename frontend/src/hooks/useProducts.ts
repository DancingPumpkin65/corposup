import { useState, useEffect, useCallback } from 'react';
import apiClient from '@/services/apiClient';
import { type Product } from '@/components/ProductsPage/types';
import { processApiResponse } from '@/utils/apiResponseUtils';
import { applyPriceFilter, applySorting, buildApiUrl } from '@/utils/productUtils';

interface ApiResponse {
  data: Product[] | { data: Product[] } | { products: Product[] };
}

interface UseProductsProps {
  categoryId?: string | null;
  filters: {
    selectedStore?: string | null;
    priceRange: {
      min: number;
      max: number;
    };
  };
}

export const useProducts = ({ categoryId, filters }: UseProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');

  const processProducts = useCallback((rawProducts: Product[]): Product[] => {
    let processedProducts = applyPriceFilter(
      rawProducts, 
      filters.priceRange.min, 
      filters.priceRange.max
    );
    
    processedProducts = applySorting(processedProducts, sortBy);
    
    return processedProducts;
  }, [filters.priceRange.min, filters.priceRange.max, sortBy]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const url = buildApiUrl(categoryId, filters.selectedStore);
      const response = await apiClient.get<ApiResponse>(url);
      
      const rawProducts = processApiResponse(response.data);
      const processedProducts = processProducts(rawProducts);

      setProducts(processedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId, filters.selectedStore, processProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy
  };
};
