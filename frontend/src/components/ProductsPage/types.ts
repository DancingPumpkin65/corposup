export interface Product {
  id: number;
  product_name: string;
  product_price: number;
  product_description: string;
  product_stock: number;
  // Make these optional since they might not be included in API responses
  seller?: {
    firstname: string;
    lastname: string;
  };
  store?: {
    store_name: string;
  };
  category?: {
    category_name: string;
  };
  // These might be the actual field names from your API
  seller_id?: number;
  store_id?: number;
  category_id?: number;
}

export interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

export interface ProductsComponentProps {
  categoryId: string | null;
  filters: {
    priceRange: { min: number; max: number };
    selectedStore: string;
    sortBy: string;
  };
}

export interface Category {
  id: number;
  name: string;
  subcategories?: string[];
}

export interface CategoriesDropdownProps {
  categories: Category[];
  loading?: boolean;
  error?: string | null;
}

export interface Store {
  id: number;
  store_name: string;
}

export interface Filters {
  priceRange: { min: number; max: number };
  selectedStore: string;
  sortBy: string;
}

export interface FilterComponentProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export interface ProductsHeaderProps {
  productsCount: number;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}
