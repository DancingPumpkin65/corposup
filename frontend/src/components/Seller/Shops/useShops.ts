import { useState, useEffect } from 'react';
import type { Store, StoreFormData } from '@/components/Seller/Shops/types';
import { fetchStores, createStore, updateStore, deleteStore } from '@/services/shopsApi';
import { useAlert } from '@/hooks/useAlert';
import { createStoreFormData, getImageUrl } from '@/utils/formUtils';

export const useShops = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState<Store | null>(null);

  const [formData, setFormData] = useState<StoreFormData>({
    store_name: '',
    store_description: '',
    store_status: 'published',
    store_image: null
  });

  const [previewImages, setPreviewImages] = useState({
    store_image: ''
  });

  const { alert, showAlert, hideAlert } = useAlert();

  useEffect(() => {
    const loadStores = async () => {
      try {
        const data = await fetchStores();
        setStores(data);
      } catch (error) {
        console.error('No stores found yet', error);
      } finally {
        setLoading(false);
      }
    };

    loadStores();
  }, []);

  const resetForm = () => {
    setFormData({
      store_name: '',
      store_description: '',
      store_status: 'published',
      store_image: null
    });
    setPreviewImages({ store_image: '' });
  };

  const handleInputChange = (field: keyof StoreFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (alert.show) {
      hideAlert();
    }
  };

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, store_image: file }));
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImages({
          store_image: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImages({ store_image: '' });
    }
  };

  const handleSelectChange = (field: keyof StoreFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (alert.show) {
      hideAlert();
    }
  };

  const handleCreate = () => {
    resetForm();
    setShowCreateForm(true);
  };

  const handleEdit = (store: Store) => {
    setFormData({
      store_name: store.store_name,
      store_description: store.store_description,
      store_status: store.store_status,
      store_image: null
    });
    setPreviewImages({
      store_image: store.store_image ? getImageUrl(store.store_image) : ''
    });
    setEditingStore(store);
    setShowEditForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const dataToSend = createStoreFormData(formData);
      const response = await createStore(dataToSend);

      // Show success alert immediately
      showAlert('success', 'Boutique créée avec succès!', 2000);
      
      // Handle different response structures
      const newStore = response.data?.store || response.data;
      setStores(prev => [...prev, newStore]);
      
      // Wait for user to see the success message before navigating
      setTimeout(() => {
        setShowCreateForm(false);
      }, 2000);

    } finally {
      setCreating(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStore) return;
    
    setCreating(true);

    try {
      const dataToSend = createStoreFormData(formData, 'PUT');
      const response = await updateStore(editingStore.id, dataToSend);

      // Show success alert immediately
      showAlert('success', 'Boutique mise à jour avec succès!', 2000);
      
      // Handle different response structures
      const updatedStore = response.data?.store || response.data;
      setStores(prev => prev.map(s => s.id === editingStore.id ? updatedStore : s));
      
      // Wait for user to see the success message before navigating
      setTimeout(() => {
        setShowEditForm(false);
        setEditingStore(null);
      }, 2000);

    } finally {
      setCreating(false);
    }
  };

  const handleDelete = (store: Store) => {
    setStoreToDelete(store);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!storeToDelete) return;

    try {
      await deleteStore(storeToDelete.id);
      setStores(prev => prev.filter(s => s.id !== storeToDelete.id));
      showAlert('success', 'Boutique supprimée avec succès!', 3000);
    } finally {
      setDeleteDialogOpen(false);
      setStoreToDelete(null);
    }
  };

  return {
    stores,
    loading,
    creating,
    showCreateForm,
    setShowCreateForm,
    showEditForm,
    setShowEditForm,
    editingStore,
    setEditingStore,
    deleteDialogOpen,
    setDeleteDialogOpen,
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
