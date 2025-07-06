import { type AuthInputFieldProps } from '@/components/Auth/types';

const AuthInputField = ({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  required = false,
  autoFocus = false,
  autoComplete,
  className = "flex-1"
}: AuthInputFieldProps) => {
  return (
    <div className={className}>
      <label className="block font-medium text-sm text-gray-700" htmlFor={id}>
        {label}
      </label>
      <input 
        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default AuthInputField;
