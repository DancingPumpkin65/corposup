import { useRef } from 'react';
import apiClient from '@/services/apiClient';
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "@/store";
import {
  setProfileFormData,
  setProfileLoading,
  setProfileAlert,
  setProfileSelectedImage,
} from "@/store/profileInfoSlice";

interface ProfileInfo {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  phone: string;
  city: string;
  photo_profile?: File | null;
}

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

export const useProfileInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.profileInfo.formData);
  const loading = useSelector((state: RootState) => state.profileInfo.loading);
  const alert: AlertState = useSelector((state: RootState) => state.profileInfo.alert);
  const selectedImage = useSelector((state: RootState) => state.profileInfo.selectedImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize formData if needed
  // (You may want to dispatch setProfileFormData here if user changes)

  const handleChange = (field: keyof ProfileInfo, value: string) => {
    dispatch(setProfileFormData({ ...formData, [field]: value }));
    if (alert.show) {
      dispatch(setProfileAlert({ ...alert, show: false }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(setProfileSelectedImage(file));
      if (alert.show) {
        dispatch(setProfileAlert({ ...alert, show: false }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setProfileLoading(true));
    try {
      if (selectedImage) {
        const formDataToSend = new FormData();
        formDataToSend.append('firstname', formData.firstname);
        formDataToSend.append('lastname', formData.lastname);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('role', formData.role);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('photo_profile', selectedImage);
        formDataToSend.append('_method', 'PUT');
        const response = await apiClient.post('/update-profile', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        dispatch(setProfileAlert({
          show: true,
          type: 'success',
          message: 'Profil et photo mis à jour avec succès!'
        }));
        dispatch(setProfileSelectedImage(null));
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        const dataToSend = {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          role: formData.role,
          phone: formData.phone,
          city: formData.city
        };
        const response = await apiClient.put('/update-profile', dataToSend, {
          headers: { 'Content-Type': 'application/json' },
        });
        dispatch(setProfileAlert({
          show: true,
          type: 'success',
          message: 'Profil mis à jour avec succès!'
        }));
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      setTimeout(() => {
        dispatch(setProfileAlert({ ...alert, show: false }));
      }, 5000);
    } catch (error) {
      dispatch(setProfileAlert({
        show: true,
        type: 'error',
        message: 'Erreur lors de la mise à jour du profil'
      }));
    } finally {
      dispatch(setProfileLoading(false));
    }
  };

  return {
    formData,
    loading,
    alert,
    selectedImage,
    fileInputRef,
    handleChange,
    handleFileChange,
    handleSubmit
  };
};