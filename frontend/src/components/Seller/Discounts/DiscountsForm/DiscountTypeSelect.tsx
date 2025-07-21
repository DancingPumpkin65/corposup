import { Label } from "@/components/Shadcn/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Shadcn/Select";

const DiscountTypeSelect = ({
  discountType, setDiscountType
}: {
  discountType: "percentage" | "fixed";
  setDiscountType: (v: "percentage" | "fixed") => void;
}) => (
  <div className="space-y-2 col-span-1">
    <Label className="block text-lg font-medium">Type de remise *</Label>
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
);

export default DiscountTypeSelect;
