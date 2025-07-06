export interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
}

export interface SignUpAlertProps {
  alert: AlertState;
}

export interface SignInAlertProps {
  alert: AlertState;
}

export interface SignInFormProps {
  formData: { email: string; password: string };
  loading: boolean;
  alert: AlertState;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export interface SignUpFormProps {
  formData: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: 'buyer' | 'seller';
  };
  loading: boolean;
  alert: AlertState;
  termsAccepted: boolean;
  setTermsAccepted: (value: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoleChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export interface AuthInputFieldProps {
  id: string;
  name: string;
  type?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  className?: string;
}

export interface FirstLastNameInputsProps {
  formData: {
    firstname: string;
    lastname: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RememberMeCheckboxProps {
  rememberMe: boolean;
  setRememberMe: (checked: boolean) => void;
}

export interface RoleSelectionProps {
  role: string;
  handleRoleChange: (value: string) => void;
}

export interface TermsAcceptanceProps {
  termsAccepted: boolean;
  setTermsAccepted: (checked: boolean) => void;
}
