import { Input } from '@/components/Shadcn/Input';
import { Label } from '@/components/Shadcn/Label';
import { Textarea } from '@/components/Shadcn/Textarea';
import { type InputFieldProps } from '@/components/SellerPage/Deliveries/types';

const InputField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder, 
  required, 
  type = 'text',
  step,
  min,
  rows = 4,
  isTextarea = false
}: InputFieldProps) => {
  return (
    <div>
      <Label htmlFor={id} className="text-sm sm:text-base">
        {label} {required && '*'}
      </Label>
      {isTextarea ? (
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className="mt-1 text-sm sm:text-base resize-none"
        />
      ) : (
        <Input
          id={id}
          type={type}
          step={step}
          min={min}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="mt-1 text-sm sm:text-base"
        />
      )}
    </div>
  );
};

export default InputField;
