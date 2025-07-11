import { useState } from "react";

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

export const useDiscounts = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(false);

  const addDiscount = (discount: Discount) => {
    setDiscounts((prev) => [...prev, discount]);
  };

  const deleteDiscount = (id: number) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== id));
  };

  const updateDiscount = (id: number, updates: Partial<Discount>) => {
    setDiscounts((prev) =>
      prev.map((discount) =>
        discount.id === id ? { ...discount, ...updates } : discount
      )
    );
  };

  const getDiscountById = (id: number) => {
    return discounts.find((discount) => discount.id === id);
  };

  return {
    discounts,
    loading,
    setLoading,
    addDiscount,
    deleteDiscount,
    updateDiscount,
    getDiscountById,
  };
};
