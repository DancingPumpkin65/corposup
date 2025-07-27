import { useEffect } from 'react';
import type { Store, StoreFormData } from '@/components/Seller/Shops/types';
import { fetchStores, createStore, updateStore, deleteStore } from '@/services/shopsApi';
import { createStoreFormData, getImageUrl } from '@/utils/formUtils';
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "@/store";
import {
  setStores,
  setLoading,
  setCreating,
  setShowCreateForm,
  setShowEditForm,
  setEditingStore,
  setDeleteDialogOpen,
  setStoreToDelete,
  setFormData,
  setPreviewImages,
  setAlert,
} from "@/store/shopsSlice";

export const useShops = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stores = useSelector((state: RootState) => state.shops.stores);
  const loading = useSelector((state: RootState) => state.shops.loading);
  const creating = useSelector((state: RootState) => state.shops.creating);
  const showCreateForm = useSelector((state: RootState) => state.shops.showCreateForm);
  const showEditForm = useSelector((state: RootState) => state.shops.showEditForm);
  const editingStore = useSelector((state: RootState) => state.shops.editingStore);
  const deleteDialogOpen = useSelector((state: RootState) => state.shops.deleteDialogOpen);
  const storeToDelete = useSelector((state: RootState) => state.shops.storeToDelete);
  const formData = useSelector((state: RootState) => state.shops.formData);
  const previewImages = useSelector((state: RootState) => state.shops.previewImages);
  const alert = useSelector((state: RootState) => state.shops.alert);

  useEffect(() => {
    const loadStores = async () => {
      try {
        const data = await fetchStores();
        dispatch(setStores(data));
      } catch (error) {
        console.error('No stores found yet', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadStores();
  }, [dispatch]);

  const resetForm = () => {
    dispatch(setFormData({
      store_name: '',
      store_description: '',
      store_status: 'published',
      store_image: null
    }));
    dispatch(setPreviewImages({ store_image: '' }));
  };

  const handleInputChange = (field: keyof StoreFormData, value: string) => {
    dispatch(setFormData({ ...formData, [field]: value }));
    if (alert.show) {
      dispatch(setAlert({ ...alert, show: false }));
    }
  };

  const handleFileChange = (file: File | null) => {
    dispatch(setFormData({ ...formData, store_image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(setPreviewImages({ store_image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      dispatch(setPreviewImages({ store_image: '' }));
    }
  };

  const handleSelectChange = (field: keyof StoreFormData, value: string) => {
    dispatch(setFormData({ ...formData, [field]: value }));
    if (alert.show) {
      dispatch(setAlert({ ...alert, show: false }));
    }
  };

  const handleCreate = () => {
    resetForm();
    dispatch(setShowCreateForm(true));
  };

  const handleEdit = (store: Store) => {
    dispatch(setFormData({
      store_name: store.store_name,
      store_description: store.store_description,
      store_status: store.store_status,
      store_image: null
    }));
    dispatch(setPreviewImages({
      store_image: store.store_image ? getImageUrl(store.store_image) : ''
    }));
    dispatch(setEditingStore(store));
    dispatch(setShowEditForm(true));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setCreating(true));
    try {
      const dataToSend = createStoreFormData(formData);
      const response = await createStore(dataToSend);
      toast.success('Boutique créée avec succès!');
      const newStore = response.data?.store || response.data;
      dispatch(setStores([...stores, newStore]));
      setTimeout(() => {
        dispatch(setShowCreateForm(false));
      }, 100);
    } finally {
      dispatch(setCreating(false));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStore) return;
    dispatch(setCreating(true));
    try {
      const dataToSend = createStoreFormData(formData, 'PUT');
      const response = await updateStore(editingStore.id, dataToSend);
      toast.success('Boutique mise à jour avec succès!');
      const updatedStore = response.data?.store || response.data;
      dispatch(setStores(stores.map(s => s.id === editingStore.id ? updatedStore : s)));
      setTimeout(() => {
        dispatch(setShowEditForm(false));
        dispatch(setEditingStore(null));
      }, 100);
    } finally {
      dispatch(setCreating(false));
    }
  };

  const handleDelete = (store: Store) => {
    dispatch(setStoreToDelete(store));
    dispatch(setDeleteDialogOpen(true));
  };

  const confirmDelete = async () => {
    if (!storeToDelete) return;
    try {
      await deleteStore(storeToDelete.id);
      dispatch(setStores(stores.filter(s => s.id !== storeToDelete.id)));
      toast.success('Boutique supprimée avec succès!');
    } finally {
      dispatch(setDeleteDialogOpen(false));
      dispatch(setStoreToDelete(null));
    }
  };

  return {
    stores,
    loading,
    creating,
    showCreateForm,
    setShowCreateForm: (v: boolean) => dispatch(setShowCreateForm(v)),
    showEditForm,
    setShowEditForm: (v: boolean) => dispatch(setShowEditForm(v)),
    editingStore,
    setEditingStore: (v: Store | null) => dispatch(setEditingStore(v)),
    deleteDialogOpen,
    setDeleteDialogOpen: (v: boolean) => dispatch(setDeleteDialogOpen(v)),
    storeToDelete,
    alert,
    formData,
    previewImages,
    handleInputChange,
    handleFileChange,
    handleSelectChange,
    resetForm,
    handleCreate,
    handleEdit,
    handleSubmit,
    handleUpdate,
    handleDelete,
    confirmDelete,
    getImageUrl
  };
};