import { useEffect } from 'react';
import apiClient from '@/services/apiClient';
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "@/store";
import {
  setCompanyFormData,
  setCompanyLoading,
  setCompanyDataLoaded,
  setCompanyAlert,
  setCompanyShowWarning,
} from "@/store/companyInfoSlice";

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
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.companyInfo.formData);
  const loading = useSelector((state: RootState) => state.companyInfo.loading);
  const dataLoaded = useSelector((state: RootState) => state.companyInfo.dataLoaded);
  const alert: AlertState = useSelector((state: RootState) => state.companyInfo.alert);
  const showWarning = useSelector((state: RootState) => state.companyInfo.showWarning);

  useEffect(() => {
    fetchCompanyInfo();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      const isComplete = formData.company_name && formData.company_phone && formData.sector;
      dispatch(setCompanyShowWarning(!isComplete));
    }
  }, [formData, dataLoaded, dispatch]);

  const fetchCompanyInfo = async () => {
    try {
      const response = await apiClient.get('/my-company');
      if (response.data && response.data.company) {
        const company = response.data.company;
        dispatch(setCompanyFormData({
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
        }));
      }
    } finally {
      dispatch(setCompanyDataLoaded(true));
    }
  };

  const handleChange = (field: keyof CompanyInfo, value: string) => {
    dispatch(setCompanyFormData({ ...formData, [field]: value }));
    if (alert.show) {
      dispatch(setCompanyAlert({ ...alert, show: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setCompanyLoading(true));
    try {
      await apiClient.post('/complete-company-info', formData);
      dispatch(setCompanyAlert({
        show: true,
        type: 'success',
        message: 'Informations de l\'entreprise mises à jour avec succès!'
      }));
      setTimeout(() => {
        dispatch(setCompanyAlert({ ...alert, show: false }));
      }, 3000);
    } finally {
      dispatch(setCompanyLoading(false));
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
