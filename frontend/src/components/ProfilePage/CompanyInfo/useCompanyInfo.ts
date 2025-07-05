import { useState, useEffect } from 'react';
import apiClient from '@/services/apiClient';

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

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

export const useCompanyInfo = () => {
  const [formData, setFormData] = useState<CompanyInfo>({
    company_name: '',
    company_phone: '',
    sector: '',
    website: '',
    address1: '',
    address2: '',
    ice_number: '',
    legal_form: '',
    city: '',
    country: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    type: 'success',
    message: ''
  });
  const [showWarning, setShowWarning] = useState(true);

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  useEffect(() => {
    // Check if all required fields are filled to hide warning
    const isComplete = formData.company_name && formData.company_phone && formData.sector;
    setShowWarning(!isComplete);
  }, [formData]);

  const fetchCompanyInfo = async () => {
    try {
      const response = await apiClient.get('/my-company');
      if (response.data && response.data.company) {
        const company = response.data.company;
        setFormData({
          company_name: company.company_name || '',
          company_phone: company.company_phone || '',
          sector: company.sector || '',
          website: company.website || '',
          address1: company.address1 || '',
          address2: company.address2 || '',
          ice_number: company.ice_number || '',
          legal_form: company.legal_form || '',
          city: company.city || '',
          country: company.country || ''
        });
      }
    } catch (error) {
      console.log('No company info found yet', error);
    }
  };

  const handleChange = (field: keyof CompanyInfo, value: string) => {
    setFormData((prev: CompanyInfo) => ({ ...prev, [field]: value }));
    if (alert.show) {
      setAlert((prev: typeof alert) => ({ ...prev, show: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient.post('/complete-company-info', formData);
      setAlert({
        show: true,
        type: 'success',
        message: 'Informations de l\'entreprise mises à jour avec succès!'
      });
      
      setTimeout(() => {
        setAlert((prev: typeof alert) => ({ ...prev, show: false }));
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    alert,
    showWarning,
    handleChange,
    handleSubmit
  };
};
