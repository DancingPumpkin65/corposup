import { Input } from '@/components/Shadcn/Input';
import { Label } from '@/components/Shadcn/Label';
import { Textarea } from '@/components/Shadcn/Textarea';
import { type InputFieldProps } from '@/components/Seller/Shops/types';

const InputField = ({ 
  id, 
  name,
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  type = 'text',
  autocomplete,
  isTextarea = false,
  rows = 4
}: InputFieldProps) => {
  return (
    <div>
      <Label htmlFor={id} className="text-sm sm:text-base">
        {label} {required && '*'}
      </Label>
      {isTextarea ? (
        <Textarea
          id={id}
          name={name || id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          required={required}
          autoComplete={autocomplete}
          className="mt-1 text-sm sm:text-base resize-none"
        />
      ) : (
        <Input
          id={id}
          name={name || id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          autoComplete={autocomplete}
          className="mt-1 text-sm sm:text-base"
        />
      )}
    </div>
  );
};

export default InputField;
