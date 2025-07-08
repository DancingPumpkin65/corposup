export interface CompanyAlertsProps {
  showWarning: boolean;
  alert: {
    show: boolean;
    type: 'success' | 'error';
    message: string;
  };
}

export interface CompanyInfoFormProps {
  formData: CompanyInfo;
  onFieldChange: (field: keyof CompanyInfo, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

export interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
}

export interface CompanyInfo {
  company_name: string;
  company_phone: string;
  sector: string;
  website: string;
  address1: string;
  address2: string;
  ice_number: string;
  legal_form: string;
  city: string;
  country: string;
}

export interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}