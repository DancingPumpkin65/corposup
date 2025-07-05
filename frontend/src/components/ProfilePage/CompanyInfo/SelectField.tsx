import { Label } from '@/components/Shadcn/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Shadcn/Select';

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
}

const SelectField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder, 
  options,
  required = false
}: SelectFieldProps) => {
  return (
    <div>
      <Label htmlFor={id}>
        {label} {required && '*'}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
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
