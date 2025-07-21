import { Label } from "@/components/Shadcn/Label";
import { Button } from "@/components/Shadcn/Button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/Shadcn/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Shadcn/Popover";

const DatePickerField = ({
  label, value, setValue, formTouched
}: {
  label: string;
  value: Date | undefined;
  setValue: (d: Date | undefined) => void;
  formTouched: boolean;
}) => (
  <div className="space-y-2 col-span-1">
    <Label className="block text-lg font-medium">{label} *</Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={
            "w-full justify-between text-left font-normal " +
            (!value ? "text-muted-foreground" : "")
          }
        >
          {value ? value.toLocaleDateString() : "mm/dd/yyyy"}
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={setValue}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    {formTouched && !value && (
      <span className="text-xs text-red-500">Champ requis</span>
    )}
  </div>
);

export default DatePickerField;
