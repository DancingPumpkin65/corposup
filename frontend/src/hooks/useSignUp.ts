import { useState } from 'react';
import authService from '@/services/authService';
import { getSignUpErrorMessage } from '@/utils/authErrors';

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
}

export const useSignUp = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'buyer' as 'buyer' | 'seller'
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    type: 'success',
    title: '',
    message: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const showAlert = (type: 'success' | 'error', title: string, message: string) => {
    setAlert({ show: true, type, title, message });
    
    if (type === 'success') {
      setTimeout(() => {
        setAlert(prev => ({ ...prev, show: false }));
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (alert.show) {
      setAlert(prev => ({ ...prev, show: false }));
    }
  };

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value as 'buyer' | 'seller'
    });
    if (alert.show) {
      setAlert(prev => ({ ...prev, show: false }));
    }
  };

  const validateForm = (): boolean => {
    if (!termsAccepted) {
      showAlert('error', 'Erreur de validation', 'Vous devez accepter les termes et conditions.');
      return false;
    }

    if (formData.password !== formData.password_confirmation) {
      showAlert('error', 'Erreur de validation', 'Les mots de passe ne correspondent pas.');
      return false;
    }

    if (formData.password.length < 8) {
      showAlert('error', 'Mot de passe trop court', 'Le mot de passe doit contenir au moins 8 caractères.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    setAlert(prev => ({ ...prev, show: false }));

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await authService.register(formData);
      
      showAlert(
        'success',
        'Compte créé avec succès!',
        `Bienvenue ${response.user.firstname} ${response.user.lastname}! Vous pouvez maintenant vous connecter.`
      );

      // Clear form data after successful registration
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'buyer'
      });
      setTermsAccepted(false);

      setTimeout(() => {
        window.location.href = '/signin';
      }, 2000);

    } catch (error: unknown) {
      console.error('Registration error:', error);
      const errorMessage = getSignUpErrorMessage(error);
      showAlert('error', 'Erreur lors de l\'inscription', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    alert,
    termsAccepted,
    setTermsAccepted,
    handleChange,
    handleRoleChange,
    handleSubmit
  };
};
