import { useState, useRef } from 'react';
import apiClient from '@/services/apiClient';
import { type PasswordData, type AlertState } from '@/components/ProfilePage/PasswordUpdate/types';

export const usePasswordUpdate = () => {
  const [formData, setFormData] = useState<PasswordData>({
    current_password: '',
    password: '',
    password_confirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    type: 'success',
    message: ''
  });

  const isMountedRef = useRef(true);

  const handleChange = (field: keyof PasswordData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (alert.show) {
      setAlert(prev => ({ ...prev, show: false }));
    }
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    if (isMountedRef.current) {
      setAlert({ show: true, type, message });
      
      if (type === 'success') {
        setTimeout(() => {
          if (isMountedRef.current) {
            setAlert(prev => ({ ...prev, show: false }));
          }
        }, 3000);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      current_password: '',
      password: '',
      password_confirmation: ''
    });
  };

  const validateForm = (): boolean => {
    if (formData.password !== formData.password_confirmation) {
      showAlert('error', 'Les mots de passe ne correspondent pas');
      return false;
    }

    if (formData.password.length < 8) {
      showAlert('error', 'Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Use the updateProfile endpoint with correct field names
      await apiClient.put('/update-profile', {
        old_password: formData.current_password,
        new_password: formData.password,
        new_password_confirmation: formData.password_confirmation
      });
      
      showAlert('success', 'Mot de passe mis à jour avec succès!');
      resetForm();

    } catch (error) {
      console.error('Password update error:', error);
      showAlert('error', 'Erreur lors de la mise à jour du mot de passe. Vérifiez votre mot de passe actuel.');
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  return {
    formData,
    loading,
    alert,
    handleChange,
    handleSubmit
  };
};
