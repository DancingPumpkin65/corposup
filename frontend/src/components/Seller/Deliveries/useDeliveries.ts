import { useEffect, useRef, useCallback } from 'react';
import apiClient from '@/services/apiClient';
import { type ShippingService, type ShippingFormData, type AlertState } from '@/components/Seller/Deliveries/types';
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "@/store";
import {
  setServices,
  setLoading,
  setCreating,
  setShowCreateForm,
  setShowEditForm,
  setEditingService,
  setDeleteDialogOpen,
  setServiceToDelete,
  setAlert,
  setFormData,
} from "@/store/deliveriesSlice";

export const useDeliveries = () => {
  const dispatch = useDispatch<AppDispatch>();
  const services = useSelector((state: RootState) => state.deliveries.services);
  const loading = useSelector((state: RootState) => state.deliveries.loading);
  const creating = useSelector((state: RootState) => state.deliveries.creating);
  const showCreateForm = useSelector((state: RootState) => state.deliveries.showCreateForm);
  const showEditForm = useSelector((state: RootState) => state.deliveries.showEditForm);
  const editingService = useSelector((state: RootState) => state.deliveries.editingService);
  const deleteDialogOpen = useSelector((state: RootState) => state.deliveries.deleteDialogOpen);
  const serviceToDelete = useSelector((state: RootState) => state.deliveries.serviceToDelete);
  const alert = useSelector((state: RootState) => state.deliveries.alert);
  const formData = useSelector((state: RootState) => state.deliveries.formData);

  const isMountedRef = useRef(true);

  const fetchServices = useCallback(async () => {
    if (!isMountedRef.current) return;
    dispatch(setLoading(true));
    try {
      const response = await apiClient.get('/shippings');
      if (isMountedRef.current) {
        dispatch(setServices(response.data || []));
      }
    } finally {
      if (isMountedRef.current) {
        dispatch(setLoading(false));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchServices();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchServices]);

  const handleInputChange = (field: keyof ShippingFormData, value: string) => {
    dispatch(setFormData({ ...formData, [field]: value }));
    if (alert.show) {
      dispatch(setAlert({ ...alert, show: false }));
    }
  };

  const resetForm = () => {
    dispatch(setFormData({
      shipping_name: '',
      shipping_description: '',
      shipping_cost: '',
      shipping_delivery_time: ''
    }));
  };

  const handleCreate = () => {
    resetForm();
    dispatch(setShowCreateForm(true));
  };

  const handleEdit = (service: ShippingService) => {
    dispatch(setFormData({
      shipping_name: service.shipping_name,
      shipping_description: service.shipping_description,
      shipping_cost: service.shipping_cost.toString(),
      shipping_delivery_time: service.shipping_delivery_time.toString()
    }));
    dispatch(setEditingService(service));
    dispatch(setShowEditForm(true));
  };

  const handleDelete = (service: ShippingService) => {
    dispatch(setServiceToDelete(service));
    dispatch(setDeleteDialogOpen(true));
  };

  const confirmDelete = async () => {
    if (!serviceToDelete) return;
    try {
      await apiClient.delete(`/shippings/${serviceToDelete.id}`);
      if (isMountedRef.current) {
        dispatch(setServices(services.filter(s => s.id !== serviceToDelete.id)));
        toast.success('Service de livraison supprimé avec succès!');
      }
    } finally {
      dispatch(setDeleteDialogOpen(false));
      dispatch(setServiceToDelete(null));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setCreating(true));
    try {
      const submitData = {
        shipping_name: formData.shipping_name,
        shipping_description: formData.shipping_description,
        shipping_cost: parseFloat(formData.shipping_cost),
        shipping_delivery_time: formData.shipping_delivery_time
      };
      await apiClient.post('/shippings', submitData);
      if (isMountedRef.current) {
        toast.success('Service de livraison créé avec succès!');
        setTimeout(async () => {
          if (isMountedRef.current) {
            await fetchServices();
            dispatch(setShowCreateForm(false));
            resetForm();
          }
        }, 100);
      }
    } finally {
      if (isMountedRef.current) {
        dispatch(setCreating(false));
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    dispatch(setCreating(true));
    try {
      const submitData = {
        shipping_name: formData.shipping_name,
        shipping_description: formData.shipping_description,
        shipping_cost: parseFloat(formData.shipping_cost),
        shipping_delivery_time: formData.shipping_delivery_time
      };
      await apiClient.put(`/shippings/${editingService.id}`, submitData);
      if (isMountedRef.current) {
        toast.success('Service de livraison mis à jour avec succès!');
        setTimeout(async () => {
          if (isMountedRef.current) {
            await fetchServices();
            dispatch(setShowEditForm(false));
            dispatch(setEditingService(null));
            dispatch(setAlert({ ...alert, show: false }));
            resetForm();
          }
        }, 100);
      }
    } finally {
      if (isMountedRef.current) {
        dispatch(setCreating(false));
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
    setShowCreateForm: (v: boolean) => dispatch(setShowCreateForm(v)),
    showEditForm,
    setShowEditForm: (v: boolean) => dispatch(setShowEditForm(v)),
    editingService,
    setEditingService: (v: ShippingService | null) => dispatch(setEditingService(v)),
    deleteDialogOpen,
    setDeleteDialogOpen: (v: boolean) => dispatch(setDeleteDialogOpen(v)),
    serviceToDelete,
    alert,
    setAlert: (v: AlertState) => dispatch(setAlert(v)),
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
