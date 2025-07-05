import { Input } from '@/components/Shadcn/Input';
import { Label } from '@/components/Shadcn/Label';

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

const InputField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  type = "text"
}: InputFieldProps) => {
  return (
    <div>
      <Label htmlFor={id}>
        {label} {required && '*'}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputField;
