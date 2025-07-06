import { type Product } from '@/components/ProductsPage/types';

interface ApiResponse {
  data: Product[] | { data: Product[] } | { products: Product[] };
}

// Define proper types for type guards
type UnknownData = unknown;
type DataWithNestedData = { data: Product[] };
type DataWithProducts = { products: Product[] };

// Decompose complex conditionals with proper typing
const hasNestedDataProperty = (data: UnknownData): data is DataWithNestedData => {
  return data !== null && 
         typeof data === 'object' && 
         data !== undefined &&
         'data' in data &&
         Array.isArray((data as DataWithNestedData).data);
};

const hasProductsProperty = (data: UnknownData): data is DataWithProducts => {
  return data !== null && 
         typeof data === 'object' && 
         data !== undefined &&
         'products' in data &&
         Array.isArray((data as DataWithProducts).products);
};

const isValidProductArray = (data: UnknownData): data is Product[] => {
  return Array.isArray(data);
};

export const processApiResponse = (response: ApiResponse): Product[] => {
  let fetchedProducts: UnknownData = response.data;
  
  // Handle different response structures with clear business rules
  if (hasNestedDataProperty(fetchedProducts)) {
    fetchedProducts = fetchedProducts.data;
  }
  
  if (hasProductsProperty(fetchedProducts)) {
    fetchedProducts = fetchedProducts.products;
  }
  
  // Ensure we have a valid product array
  if (!isValidProductArray(fetchedProducts)) {
    console.error('Expected array of products, got:', fetchedProducts);
    return [];
  }

  return fetchedProducts;
};
