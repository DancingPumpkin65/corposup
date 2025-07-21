export interface PasswordData {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

export interface PasswordUpdateFormProps {
  formData: PasswordData;
  onFieldChange: (field: keyof PasswordData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export interface PasswordAlertsProps {
  alert: AlertState;
}

export interface PersonalInfoAlertsProps {
  alert: AlertState;
}
