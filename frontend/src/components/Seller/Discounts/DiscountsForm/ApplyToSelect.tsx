import { Label } from "@/components/Shadcn/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Shadcn/Select";

const ApplyToSelect = ({
  value,
  onChange,
}: {
  value: "store" | "product";
  onChange: (v: "store" | "product") => void;
}) => (
  <div className="space-y-2 col-span-1">
    <Label className="block text-base font-medium">Appliquer à *</Label>
    <Select value={value} onValueChange={v => onChange(v as "store" | "product")}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Sélectionner" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="store">Boutique</SelectItem>
        <SelectItem value="product">Produit</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default ApplyToSelect;
