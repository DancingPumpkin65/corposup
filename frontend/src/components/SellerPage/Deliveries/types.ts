export interface ShippingService {
  id: number;
  shipping_name: string;
  shipping_description: string;
  shipping_cost: number | string;
  shipping_delivery_time: number | string;
  created_at: string;
}

export interface ShippingFormData {
  shipping_name: string;
  shipping_description: string;
  shipping_cost: string;
  shipping_delivery_time: string;
}

export interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

export interface DeliveryFormProps {
  formData: ShippingFormData;
  onFieldChange: (field: keyof ShippingFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  isEdit?: boolean;
  onCancel: () => void;
  alert: AlertState;
}

export interface DeliveryAlertsProps {
  alert: AlertState;
}

export interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  step?: string;
  min?: string;
  rows?: number;
  isTextarea?: boolean;
}

export interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
}
