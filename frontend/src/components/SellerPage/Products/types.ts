export interface PriceTier {
  min_quantity: number;
  max_quantity: number;
  price: number;
}

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface CategoryOption extends SelectOption {
  group: string;
}

export interface ProductImage {
    file: File;
    is_main: boolean;
    preview: string; // URL.createObjectURL result
}

export interface Products {
  // products table
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
  sale_type: 'unit' | 'quantity' | 'negotiable';
  price_tiers: PriceTier[];
  // product_shipping table
  shipping_ids: number[];
  // product_details table
  color: string;
  material: string;
  brand: string;
  GTIN: string;
  MPN: string;
  // product_galleries table
  images: ProductImage[];
}

export interface ProductAlertsProps {
    alert: {
      type: 'success' | 'error';
      message: string;
    } | null;
  }
