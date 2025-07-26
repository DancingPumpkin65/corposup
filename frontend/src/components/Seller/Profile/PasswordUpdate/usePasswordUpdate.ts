import { useRef } from 'react';
import apiClient from '@/services/apiClient';
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "@/store";
import {
  setPasswordFormData,
  setPasswordLoading,
  setPasswordAlert,
  resetPasswordForm,
} from "@/store/passwordUpdateSlice";
import { type PasswordData } from '@/components/Seller/Profile/PasswordUpdate/types';

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

export const usePasswordUpdate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.passwordUpdate.formData);
  const loading = useSelector((state: RootState) => state.passwordUpdate.loading);
  const alert: AlertState = useSelector((state: RootState) => state.passwordUpdate.alert);

  const isMountedRef = useRef(true);

  const handleChange = (field: keyof PasswordData, value: string) => {
    dispatch(setPasswordFormData({ ...formData, [field]: value }));
    if (alert.show) {
      dispatch(setPasswordAlert({ ...alert, show: false }));
    }
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    if (isMountedRef.current) {
      dispatch(setPasswordAlert({ show: true, type, message }));
      if (type === 'success') {
        setTimeout(() => {
          if (isMountedRef.current) {
            dispatch(setPasswordAlert({ ...alert, show: false }));
          }
        }, 3000);
      }
    }
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
    dispatch(setPasswordLoading(true));
    try {
      await apiClient.put('/update-profile', {
        old_password: formData.current_password,
        new_password: formData.password,
        new_password_confirmation: formData.password_confirmation
      });
      showAlert('success', 'Mot de passe mis à jour avec succès!');
      dispatch(resetPasswordForm());
    } finally {
      if (isMountedRef.current) {
        dispatch(setPasswordLoading(false));
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
