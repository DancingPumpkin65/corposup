export interface Discount {
  id: number;
  seller_id: number;
  product_id: number;
  store_id: number;
  discount_value: number;
  discount_start: Date;
  discount_end: Date;
  discount_active: boolean;
  discount_amount: number;
  old_price: number;
  new_price: number;
  applyTo: "store" | "product";
  storeValue?: string;
  productValue?: string;
}

export interface DiscountsAlertsProps {
  alert: {
    type: 'success' | 'error';
    message: string;
  } | null;
}
