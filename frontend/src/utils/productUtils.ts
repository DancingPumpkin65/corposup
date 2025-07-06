import { type Product } from '@/components/ProductsPage/types';

export const applyPriceFilter = (products: Product[], minPrice: number, maxPrice: number): Product[] => {
  return products.filter((product) => 
    product.product_price >= minPrice && 
    product.product_price <= maxPrice
  );
};

export const applySorting = (products: Product[], sortBy: string): Product[] => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sortedProducts.sort((a, b) => a.product_price - b.product_price);
    case 'price-high':
      return sortedProducts.sort((a, b) => b.product_price - a.product_price);
    case 'name':
      return sortedProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
    default:
      // Keep original order for popularity
      return sortedProducts;
  }
};

export const buildApiUrl = (categoryId?: string | null, selectedStore?: string | null): string => {
  if (categoryId) {
    return `/categories/${categoryId}/products`;
  } else if (selectedStore) {
    return `/stores/${selectedStore}/products`;
  }
  return '/all-products';
};
