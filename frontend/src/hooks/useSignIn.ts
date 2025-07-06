import { useState } from 'react';
import authService from '@/services/authService';
import { getAuthErrorMessage } from '@/utils/authErrors';

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
}

export const useSignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    type: 'success',
    title: '',
    message: ''
  });
  const [rememberMe, setRememberMe] = useState(false);

  const showAlert = (type: 'success' | 'error', title: string, message: string) => {
    setAlert({ show: true, type, title, message });
    
    if (type === 'success') {
      setTimeout(() => {
        setAlert(prev => ({ ...prev, show: false }));
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (alert.show) {
      setAlert(prev => ({ ...prev, show: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    setAlert(prev => ({ ...prev, show: false }));

    try {
      const response = await authService.login(formData);
      
      showAlert(
        'success',
        'Connexion réussie!',
        `Bienvenue ${response.user.firstname} ${response.user.lastname}!`
      );

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } catch (error: unknown) {
      console.error('Login error:', error);
      const errorMessage = getAuthErrorMessage(error);
      showAlert('error', 'Erreur de connexion', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    alert,
    rememberMe,
    setRememberMe,
    handleChange,
    handleSubmit
  };
};
