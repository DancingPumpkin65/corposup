import { useState } from 'react';

export interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
  errors?: {
    email?: string[];
    password?: string[];
    phone?: string[];
    firstName?: string[];
    lastName?: string[];
    role?: string[];
    password_confirmation?: string[];
    // ...add other fields as needed
  };
}

export const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    type: 'success',
    message: ''
  });

  const showAlert = (type: AlertState['type'], message: string, duration = 1500) => {
    setAlert({ show: true, type, message });
    
    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }));
    }, duration);
  };

  const hideAlert = () => {
    setAlert(prev => ({ ...prev, show: false }));
  };

  return {
    alert,
    showAlert,
    hideAlert,
    setAlert
  };
};
