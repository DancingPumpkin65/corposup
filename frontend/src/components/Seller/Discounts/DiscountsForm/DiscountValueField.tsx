import { Label } from "@/components/Shadcn/Label";
import { Input } from "@/components/Shadcn/Input";

const DiscountValueField = ({
  discountValue, setDiscountValue, formTouched
}: {
  discountValue: number | "";
  setDiscountValue: (v: number | "") => void;
  formTouched: boolean;
}) => (
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
);

export default DiscountValueField;
