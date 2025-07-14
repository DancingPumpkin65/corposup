import { Label } from "@/components/Shadcn/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Shadcn/Select";

const StoreOrProductSelect = ({
  applyTo, store, setStore, product, setProduct, formTouched, mockStores, mockProducts
}: {
  applyTo: "store" | "product";
  store: string;
  setStore: (v: string) => void;
  product: string;
  setProduct: (v: string) => void;
  formTouched: boolean;
  mockStores: { value: string; label: string }[];
  mockProducts: { value: string; label: string }[];
}) => (
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
);

export default StoreOrProductSelect;
