import { useState, useEffect, useRef, useCallback } from 'react';
import apiClient from '../../../services/apiClient';
import { type ShippingService, type ShippingFormData, type AlertState } from './types';

export const useDeliveries = () => {
  const [services, setServices] = useState<ShippingService[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingService, setEditingService] = useState<ShippingService | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<ShippingService | null>(null);
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    type: 'success',
    message: ''
  });

  const [formData, setFormData] = useState<ShippingFormData>({
    shipping_name: '',
    shipping_description: '',
    shipping_cost: '',
    shipping_delivery_time: ''
  });

  const isMountedRef = useRef(true);

  const fetchServices = useCallback(async () => {
    if (!isMountedRef.current) return;
    
    try {
      const response = await apiClient.get('/shippings');
      
      if (isMountedRef.current) {
        const servicesData = response.data || [];
        setServices(servicesData);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    fetchServices();
    
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchServices]);

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

  const handleInputChange = (field: keyof ShippingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (alert.show) {
      setAlert(prev => ({ ...prev, show: false }));
    }
  };

  const resetForm = () => {
    setFormData({
      shipping_name: '',
      shipping_description: '',
      shipping_cost: '',
      shipping_delivery_time: ''
    });
  };

  const handleCreate = () => {
    resetForm();
    setShowCreateForm(true);
  };

  const handleEdit = (service: ShippingService) => {
    setFormData({
      shipping_name: service.shipping_name,
      shipping_description: service.shipping_description,
      shipping_cost: service.shipping_cost.toString(),
      shipping_delivery_time: service.shipping_delivery_time.toString()
    });
    setEditingService(service);
    setShowEditForm(true);
  };

  const handleDelete = (service: ShippingService) => {
    setServiceToDelete(service);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!serviceToDelete) return;

    try {
      await apiClient.delete(`/shippings/${serviceToDelete.id}`);
      if (isMountedRef.current) {
        setServices(prev => prev.filter(s => s.id !== serviceToDelete.id));
        showAlert('success', 'Service de livraison supprimé avec succès!');
      }
    } finally {
      setDeleteDialogOpen(false);
      setServiceToDelete(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const submitData = {
        shipping_name: formData.shipping_name,
        shipping_description: formData.shipping_description,
        shipping_cost: parseFloat(formData.shipping_cost),
        shipping_delivery_time: formData.shipping_delivery_time
      };

      await apiClient.post('/shippings', submitData);
      
      if (isMountedRef.current) {
        showAlert('success', 'Service de livraison créé avec succès!');

        setTimeout(async () => {
          if (isMountedRef.current) {
            await fetchServices();
            setShowCreateForm(false);
            setAlert(prev => ({ ...prev, show: false }));
            resetForm();
          }
        }, 1500);
      }

    } finally {
      if (isMountedRef.current) {
        setCreating(false);
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setCreating(true);

    try {
      const submitData = {
        shipping_name: formData.shipping_name,
        shipping_description: formData.shipping_description,
        shipping_cost: parseFloat(formData.shipping_cost),
        shipping_delivery_time: formData.shipping_delivery_time
      };

      await apiClient.put(`/shippings/${editingService.id}`, submitData);
      
      if (isMountedRef.current) {
        showAlert('success', 'Service de livraison mis à jour avec succès!');

        setTimeout(async () => {
          if (isMountedRef.current) {
            await fetchServices();
            setShowEditForm(false);
            setEditingService(null);
            setAlert(prev => ({ ...prev, show: false }));
            resetForm();
          }
        }, 1500);
      }

    } finally {
      if (isMountedRef.current) {
        setCreating(false);
      }
    }
  };

  const formatCost = (cost: number | string): string => {
    const numCost = typeof cost === 'string' ? parseFloat(cost) : cost;
    return isNaN(numCost) ? '0.00' : numCost.toFixed(2);
  };

  const formatDeliveryTime = (time: number | string): number => {
    const numTime = typeof time === 'string' ? parseInt(time) : time;
    return isNaN(numTime) ? 1 : numTime;
  };

  return {
    services,
    loading,
    creating,
    showCreateForm,
    setShowCreateForm,
    showEditForm,
    setShowEditForm,
    editingService,
    setEditingService,
    deleteDialogOpen,
    setDeleteDialogOpen,
    serviceToDelete,
    alert,
    formData,
    handleInputChange,
    resetForm,
    handleCreate,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSubmit,
    handleUpdate,
    formatCost,
    formatDeliveryTime
  };
};
