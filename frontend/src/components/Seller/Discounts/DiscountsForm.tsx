import React, { useState, useEffect } from "react";
import { Button } from "@/components/Shadcn/Button";
import { Label } from "@/components/Shadcn/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Shadcn/Select";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/Shadcn/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Shadcn/Popover";
import { Input } from "@/components/Shadcn/Input";
import { type Discount } from "./types";

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
  // If initialValues is provided, use them for editing
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
      {/* Appliquer à */}
      <div className="space-y-2 col-span-1">
        <Label className="block text-base font-medium">Appliquer à *</Label>
        <Select value={applyTo} onValueChange={v => setApplyTo(v as "store" | "product")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="store">Boutique</SelectItem>
            <SelectItem value="product">Produit</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Store or Product select */}
      <div className="space-y-2 col-span-1">
        {applyTo === "store" ? (
          <>
            <Label className="block text-base font-medium">Boutiques *</Label>
            <Select value={store} onValueChange={setStore}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Vos Boutiques" />
              </SelectTrigger>
              <SelectContent>
                {mockStores.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formTouched && !store && (
              <span className="text-xs text-red-500">Champ requis</span>
            )}
          </>
        ) : (
          <>
            <Label className="block text-base font-medium">Produits *</Label>
            <Select value={product} onValueChange={setProduct}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Vos Produits" />
              </SelectTrigger>
              <SelectContent>
                {mockProducts.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formTouched && !product && (
              <span className="text-xs text-red-500">Champ requis</span>
            )}
          </>
        )}
      </div>
      {/* Date de début */}
      <div className="space-y-2 col-span-1">
        <Label className="block text-base font-medium">Date de début *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={
                "w-full justify-between text-left font-normal " +
                (!startDate ? "text-muted-foreground" : "")
              }
            >
              {startDate ? startDate.toLocaleDateString() : "mm/dd/yyyy"}
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {formTouched && !startDate && (
          <span className="text-xs text-red-500">Champ requis</span>
        )}
      </div>
      {/* Date de fin */}
      <div className="space-y-2 col-span-1">
        <Label className="block text-base font-medium">Date de fin *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={
                "w-full justify-between text-left font-normal " +
                (!endDate ? "text-muted-foreground" : "")
              }
            >
              {endDate ? endDate.toLocaleDateString() : "mm/dd/yyyy"}
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {formTouched && !endDate && (
          <span className="text-xs text-red-500">Champ requis</span>
        )}
      </div>
      {/* Valeur de la remise */}
      <div className="space-y-2 col-span-1">
        <Label className="block text-base font-medium">Valeur de la remise *</Label>
        <div className="flex items-center">
          <Input
            type="number"
            className="w-full"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value === "" ? "" : Number(e.target.value))}
            required
            min={0}
          />
          <span className="ml-2 font-bold">%</span>
        </div>
        {formTouched && discountValue === "" && (
          <span className="text-xs text-red-500">Champ requis</span>
        )}
      </div>
      {/* Type de remise */}
      <div className="space-y-2 col-span-1">
        <Label className="block text-base font-medium">Type de remise *</Label>
        <Select value={discountType} onValueChange={v => setDiscountType(v as "percentage" | "fixed")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pourcentage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="percentage">Pourcentage</SelectItem>
            <SelectItem value="fixed">Fixe</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Add a cancel button */}
      <div className="col-span-full flex gap-2 mt-4">
        <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2">
          Ajouter la remise
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
}

export default DiscountsForm;