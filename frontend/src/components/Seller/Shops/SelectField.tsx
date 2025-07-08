import { Label } from '@/components/Shadcn/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Shadcn/Select';
import { type SelectFieldProps } from '@/components/Seller/Shops/types';

const SelectField = ({ 
  id, 
  name,
  label, 
  value, 
  onChange, 
  placeholder, 
  options,
  required = false
}: SelectFieldProps) => {
  return (
    <div>
      <Label htmlFor={id} className="text-sm sm:text-base">
        {label} {required && '*'}
      </Label>
      <Select name={name || id} value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="mt-1 text-sm sm:text-base">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectField;
