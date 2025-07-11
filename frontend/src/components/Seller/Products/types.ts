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

export interface ProductAlertsProps {
  alert: {
    type: 'success' | 'error';
    message: string;
  } | null;
}

export interface ProductFormProps {
  formData: Products;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSelectChange: (name: string, value: string | number) => void;
  onKeywordChange: (index: number, value: string) => void;
  onPriceTierChange: (index: number, field: keyof PriceTier, value: string) => void;
  addPriceTier: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  setMainImage: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  loading: boolean;
  isEdit?: boolean;
  categories: CategoryOption[];
  units: SelectOption[];
  stores: SelectOption[];
  shippings: SelectOption[];
}

export interface BasicInfoSectionProps {
    formData: Products;
    onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSelectChange: (name: string, value: string | number) => void;
    groupedCategories: Record<string, CategoryOption[]>;
}

export interface DetailsSectionProps {
    formData: Products;
    onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeywordChange: (index: number, value: string) => void;
}

export interface PricingSectionProps {
    formData: Products;
    onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectChange: (name: string, value: string | number) => void;
    onPriceTierChange: (index: number, field: keyof PriceTier, value: string) => void;
    addPriceTier: () => void;
    units: SelectOption[];
    stores: SelectOption[];
}

export interface MediaSectionProps {
    formData: Products;
    onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSelectChange: (name: string, value: string | number) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeImage: (index: number) => void;
    setMainImage: (index: number) => void;
    shippings: SelectOption[];
}

export interface FormActionsProps {
    onCancel: () => void;
    loading: boolean;
    isEdit: boolean;
}

export interface ProductPreviewProps {
    formData: Products;
    mainImage: string | undefined;
}

export interface ProductPreviewProps {
    formData: Products;
    mainImage: string | undefined;
}
