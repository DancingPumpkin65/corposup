import { Input } from '@/components/Shadcn/Input';
import { Label } from '@/components/Shadcn/Label';

interface InputFieldProps {
  id: string;
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  autocomplete?: string;
}

const InputField = ({ 
  id, 
  name,
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  type = "text",
  autocomplete
}: InputFieldProps) => {
  return (
    <div>
      <Label htmlFor={id}>
        {label} {required && '*'}
      </Label>
      <Input
        id={id}
        name={name || id}
        type={type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autocomplete}
      />
    </div>
  );
};

export default InputField;
