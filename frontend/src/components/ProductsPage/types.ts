export interface Product {
  id: number;
  seller_id: number;
  store_id: number;
  category_id: number;
  unit_id: number;
  product_name: string;
  product_ref: string;
  product_description: string;
  product_price: number;
  product_stock: number;
  product_minimum_commande: number;
  product_status: string;
  video_path: string;
  video_description: string;
  key_words: string[];

  store: {
    id: number;
    seller_id: number;
    store_name: string;
    store_description: string;
    store_image: string;
    store_status: string;
  };

  category: {
    id: number;
    category_name: string;
    category_parent_id: number;
  };

  reviews: {
    id: number;
    product_id: number;
    buyer_id: number;
    rating: number;
    comment: string;
  };

  discount: {
    id: number;
    seller_id: number;
    product_id: number;
    discount_value: number;
    discount_start: Date;
    discount_end: Date;
    discount_active: boolean;
    discount_amount: number;
    new_price: number;
  };
  shippings: {
    id: number;
    shipping_name: string;
    shipping_description: string;
    shipping_cost: number;
    shipping_delivery_time: string;
    seller_id: number;
  };

  galleries: {
    id: number;
    product_id: number;
    image_path: string;
  };

  details: {
    id: number;
    product_id: number;
    color: string;
    material: string;
    brand: string;
    GTIN: string;
    MPN: string;
  };
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
  subcategories?: { id: number; name: string }[];
}

export interface CategoriesDropdownProps {
  categories: Category[];
  loading?: boolean;
  error?: string | null;
}

export interface Store {
  id: number;
  store_name: string;
  store_status: string;
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
