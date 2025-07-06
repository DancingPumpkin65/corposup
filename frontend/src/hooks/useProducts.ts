import { useState, useEffect, useCallback } from 'react';
import apiClient from '@/services/apiClient';
import { type Product } from '@/components/ProductsPage/types';

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

  const processApiResponse = useCallback((response: ApiResponse): Product[] => {
    let fetchedProducts = response.data;
    
    // Handle different response structures
    if (fetchedProducts && typeof fetchedProducts === 'object' && 'data' in fetchedProducts) {
      fetchedProducts = fetchedProducts.data;
    }
    
    if (fetchedProducts && typeof fetchedProducts === 'object' && 'products' in fetchedProducts) {
      fetchedProducts = fetchedProducts.products;
    }
    
    // Ensure we have an array
    if (!Array.isArray(fetchedProducts)) {
      console.error('Expected array of products, got:', fetchedProducts);
      return [];
    }

    return fetchedProducts;
  }, []);

  const applyFilters = useCallback((products: Product[]): Product[] => {
    return products.filter((product: Product) => 
      product.product_price >= filters.priceRange.min && 
      product.product_price <= filters.priceRange.max
    );
  }, [filters.priceRange.min, filters.priceRange.max]);

  const applySorting = useCallback((products: Product[]): Product[] => {
    const sortedProducts = [...products];
    
    switch (sortBy) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.product_price - b.product_price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.product_price - a.product_price);
        break;
      case 'name':
        sortedProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
        break;
      default:
        // Keep original order for popularity
        break;
    }

    return sortedProducts;
  }, [sortBy]);

  const buildApiUrl = useCallback((): string => {
    if (categoryId) {
      return `/categories/${categoryId}/products`;
    } else if (filters.selectedStore) {
      return `/stores/${filters.selectedStore}/products`;
    }
    return '/all-products';
  }, [categoryId, filters.selectedStore]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const url = buildApiUrl();
      const response = await apiClient.get<ApiResponse>(url);
      
      let processedProducts = processApiResponse(response.data);
      processedProducts = applyFilters(processedProducts);
      processedProducts = applySorting(processedProducts);

      setProducts(processedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [buildApiUrl, processApiResponse, applyFilters, applySorting]);

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
