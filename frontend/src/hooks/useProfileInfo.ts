import { useState, useRef } from 'react';
import apiClient from '@/services/apiClient';
import { type User } from './useCurrentUser';

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

export const useProfileInfo = (user: User) => {
  const [formData, setFormData] = useState<ProfileInfo>({
    firstname: user.firstname || '',
    lastname: user.lastname || '',
    email: user.email || '',
    role: user.role || 'buyer',
    phone: user.phone || '',
    city: user.city || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    type: 'success',
    message: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof ProfileInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (alert.show) {
      setAlert(prev => ({ ...prev, show: false }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      if (alert.show) {
        setAlert(prev => ({ ...prev, show: false }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setAlert({
          show: true,
          type: 'success',
          message: 'Profil et photo mis à jour avec succès!'
        });

        setSelectedImage(null);
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
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setAlert({
          show: true,
          type: 'success',
          message: 'Profil mis à jour avec succès!'
        });

        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      setTimeout(() => {
        setAlert(prev => ({ ...prev, show: false }));
      }, 5000);
    } catch (error) {
      console.error('Profile update error:', error);
      setAlert({
        show: true,
        type: 'error',
        message: 'Erreur lors de la mise à jour du profil'
      });
    } finally {
      setLoading(false);
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
