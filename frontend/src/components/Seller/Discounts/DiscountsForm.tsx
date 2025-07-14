import React, { useState, useEffect } from "react";
import { type Discount } from "./types";
import ApplyToSelect from "@/components/Seller/Discounts/DiscountsForm/ApplyToSelect";
import StoreOrProductSelect from "@/components/Seller/Discounts/DiscountsForm/StoreOrProductSelect";
import DatePickerField from "@/components/Seller/Discounts/DiscountsForm/DatePickerField";
import DiscountValueField from "@/components/Seller/Discounts/DiscountsForm/DiscountValueField";
import DiscountTypeSelect from "@/components/Seller/Discounts/DiscountsForm/DiscountTypeSelect";
import FormButtons from "@/components/Seller/Discounts/DiscountsForm/FormButtons";

// --- mock data ---
const mockStores = [
  { value: "store1", label: "Boutique 1" },
  { value: "store2", label: "Boutique 2" },
];
const mockProducts = [
  { value: "product1", label: "Produit 1" },
  { value: "product2", label: "Produit 2" },
];

const DiscountsForm = ({
  onAdd,
  onCancel,
  initialValues,
}: {
  onAdd: (d: Discount) => void;
  onCancel: () => void;
  initialValues?: Discount;
}) => {
  const [discountValue, setDiscountValue] = useState<number | "">(initialValues ? initialValues.discount_value : "");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">(initialValues ? (initialValues.discount_amount === initialValues.discount_value ? "percentage" : "fixed") : "percentage");
  const [applyTo, setApplyTo] = useState<"store" | "product">(initialValues ? initialValues.applyTo : "store");
  const [store, setStore] = useState<string>(initialValues?.storeValue || "");
  const [product, setProduct] = useState<string>(initialValues?.productValue || "");
  const [startDate, setStartDate] = useState<Date | undefined>(initialValues?.discount_start);
  const [endDate, setEndDate] = useState<Date | undefined>(initialValues?.discount_end);
  const [formTouched, setFormTouched] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setDiscountValue(initialValues.discount_value);
      setDiscountType(initialValues.discount_amount === initialValues.discount_value ? "percentage" : "fixed");
      setApplyTo(initialValues.applyTo);
      setStore(initialValues.storeValue || "");
      setProduct(initialValues.productValue || "");
      setStartDate(initialValues.discount_start);
      setEndDate(initialValues.discount_end);
    }
  }, [initialValues]);

  const isFormValid =
    discountValue !== "" &&
    !!startDate &&
    !!endDate &&
    discountType &&
    ((applyTo === "store" && !!store) || (applyTo === "product" && !!product));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormTouched(true);
    if (!isFormValid) return;
    onAdd({
      id: initialValues?.id ?? Date.now(),
      seller_id: 1,
      product_id: applyTo === "product" ? 1 : 0,
      store_id: applyTo === "store" ? 1 : 0,
      discount_value: Number(discountValue),
      discount_start: startDate!,
      discount_end: endDate!,
      discount_active: true,
      discount_amount: Number(discountValue),
      old_price: 100,
      new_price: 100 - (discountType === "percentage" ? Number(discountValue) : 0),
      applyTo,
      storeValue: store,
      productValue: product,
    });
    // Reset form only if not editing
    if (!initialValues) {
      setDiscountValue("");
      setDiscountType("percentage");
      setStore("");
      setProduct("");
      setApplyTo("store");
      setStartDate(undefined);
      setEndDate(undefined);
      setFormTouched(false);
    }
  };

  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6 mt-10 w-full"
      onSubmit={handleSubmit}
    >
      <ApplyToSelect value={applyTo} onChange={setApplyTo} />
      <StoreOrProductSelect
        applyTo={applyTo}
        store={store}
        setStore={setStore}
        product={product}
        setProduct={setProduct}
        formTouched={formTouched}
        mockStores={mockStores}
        mockProducts={mockProducts}
      />
      <DatePickerField label="Date de début" value={startDate} setValue={setStartDate} formTouched={formTouched} />
      <DatePickerField label="Date de fin" value={endDate} setValue={setEndDate} formTouched={formTouched} />
      <DiscountValueField discountValue={discountValue} setDiscountValue={setDiscountValue} formTouched={formTouched} />
      <DiscountTypeSelect discountType={discountType} setDiscountType={setDiscountType} />
      <FormButtons onCancel={onCancel} />
    </form>
  );
};

export default DiscountsForm;