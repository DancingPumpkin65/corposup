export interface Store {
  id: number;
  store_name: string;
  store_description: string;
  store_status: string;
  store_image?: string;
  created_at: string;
}

export interface StoreFormData {
  store_name: string;
  store_description: string;
  store_status: string;
  store_image?: File | null;
}

export interface ShopFormProps {
  formData: StoreFormData;
  onFieldChange: (field: keyof StoreFormData, value: string) => void;
  onFileChange: (file: File | null) => void;
  onSelectChange: (field: keyof StoreFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  isEdit?: boolean;
  onCancel: () => void;
  alert: { show: boolean; type: 'success' | 'error'; message: string };
  previewImages: { store_image: string };
}

export interface InputFieldProps {
  id: string;
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  autocomplete?: string;
  isTextarea?: boolean;
  rows?: number;
}

export interface SelectFieldProps {
  id: string;
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
}
