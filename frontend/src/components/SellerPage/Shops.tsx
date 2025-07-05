import { useState, useEffect } from 'react';
import { AlertCircleIcon, CheckCircle2Icon, Upload, Store, Trash2, Plus, Edit } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/Shadcn/Alert';
import { Button } from '@/components/Shadcn/Button';
import { Input } from '@/components/Shadcn/Input';
import { Label } from '@/components/Shadcn/Label';
import { Textarea } from '@/components/Shadcn/Textarea';
import { SidebarInset, SidebarTrigger } from '@/components/Shadcn/Sidebar/sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Shadcn/Select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/Shadcn/Dialog';
import apiClient from '@/services/apiClient';
import emptyStore from '@/assets/EmptyStore.svg'; // Assuming you have a utility function for image URLs

interface Store {
  id: number;
  store_name: string;
  store_description: string;
  store_status: string;
  store_image?: string;
  created_at: string;
}

interface StoreFormData {
  store_name: string;
  store_description: string;
  store_status: string;
  store_image?: File | null;
}

const Shops = () => {
  const [stores, setStores] = useState<Store[]>([]); // Changed from single store to array
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null); // Added editing store
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState<Store | null>(null); // Changed to store to delete
  const [alert, setAlert] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: ''
  });

  const [formData, setFormData] = useState<StoreFormData>({
    store_name: '',
    store_description: '',
    store_status: 'published',
    store_image: null
  });

  const [previewImages, setPreviewImages] = useState({
    store_image: ''
  });

  useEffect(() => {
    fetchStores(); // Changed function name
  }, []);

  const fetchStores = async () => { // Changed to fetch multiple stores
    try {
      const response = await apiClient.get('/my-store');
      console.log('API Response:', response.data);
      
      // Handle different response structures
      let storeData = [];
      
      if (Array.isArray(response.data)) {
        storeData = response.data;
      } else if (response.data && response.data.stores) {
        storeData = response.data.stores;
      } else if (response.data && response.data.id) {
        storeData = [response.data];
      }
      
      setStores(storeData);
    } catch (error) {
      console.log('No stores found yet', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof StoreFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (alert.show) {
      setAlert(prev => ({ ...prev, show: false }));
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
      setAlert(prev => ({ ...prev, show: false }));
    }
  };

  const handleCreate = () => { // New function to handle create
    setFormData({
      store_name: '',
      store_description: '',
      store_status: 'published',
      store_image: null
    });
    setPreviewImages({ store_image: '' });
    setShowCreateForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('store_name', formData.store_name);
      formDataToSend.append('store_description', formData.store_description);
      formDataToSend.append('store_status', formData.store_status);
      
      if (formData.store_image) {
        formDataToSend.append('store_image', formData.store_image);
      }

      const response = await apiClient.post('/my-store', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAlert({
        show: true,
        type: 'success',
        message: 'Boutique créée avec succès!'
      });

      // Handle different response structures for creation
      let createdStore = null;
      if (response.data && response.data.store) {
        createdStore = response.data.store;
      } else if (response.data && response.data.id) {
        createdStore = response.data;
      }

      setTimeout(() => {
        if (createdStore) {
          setStores(prev => [...prev, createdStore]); // Add to stores array
        } else {
          fetchStores(); // Refetch all stores
        }
        setShowCreateForm(false);
        setAlert(prev => ({ ...prev, show: false }));
      }, 1500);

    } catch (error) {
      console.error('Store creation error:', error);
      setAlert({
        show: true,
        type: 'error',
        message: 'Erreur lors de la création de la boutique'
      });
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = (store: Store) => { // Modified to accept store parameter
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStore) return;
    
    setCreating(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('store_name', formData.store_name);
      formDataToSend.append('store_description', formData.store_description);
      formDataToSend.append('store_status', formData.store_status);
      formDataToSend.append('_method', 'PUT');
      
      if (formData.store_image) {
        formDataToSend.append('store_image', formData.store_image);
      }

      const response = await apiClient.post(`/my-store/${editingStore.id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAlert({
        show: true,
        type: 'success',
        message: 'Boutique mise à jour avec succès!'
      });

      // Handle different response structures for update
      let updatedStore = null;
      if (response.data && response.data.store) {
        updatedStore = response.data.store;
      } else if (response.data && response.data.id) {
        updatedStore = response.data;
      }

      setTimeout(() => {
        if (updatedStore) {
          setStores(prev => prev.map(s => s.id === editingStore.id ? updatedStore : s)); // Update in stores array
        } else {
          fetchStores();
        }
        setShowEditForm(false);
        setEditingStore(null);
        setAlert(prev => ({ ...prev, show: false }));
      }, 1500);

    } catch (error) {
      console.error('Store update error:', error);
      setAlert({
        show: true,
        type: 'error',
        message: 'Erreur lors de la mise à jour de la boutique'
      });
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = (store: Store) => { // Modified to accept store parameter
    setStoreToDelete(store);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!storeToDelete) return;

    try {
      await apiClient.delete(`/my-store/${storeToDelete.id}`);
      setStores(prev => prev.filter(s => s.id !== storeToDelete.id)); // Remove from stores array
      setAlert({
        show: true,
        type: 'success',
        message: 'Boutique supprimée avec succès!'
      });
      setTimeout(() => setAlert(prev => ({ ...prev, show: false })), 3000);
    } finally {
      setDeleteDialogOpen(false);
      setStoreToDelete(null);
    }
  };

  const getImageUrl = (imagePath?: string): string => {
    if (!imagePath) return '';
    if (imagePath.startsWith('stores/')) {
      return `http://127.0.0.1:8000/storage/${imagePath}`;
    }
    return imagePath;
  };

  if (loading) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Boutiques</h1>
          </div>
        </header>
        <div className="flex justify-center items-center min-h-[300px] p-4">
          <div className="text-lg text-gray-600">Chargement...</div>
        </div>
      </SidebarInset>
    );
  }

  // No stores exist and not showing create form
  if (stores.length === 0 && !showCreateForm) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Boutiques</h1>
          </div>
        </header>
        <div className="text-center w-full flex flex-col space-y-3 justify-center items-center bg-cover min-h-[400px] sm:min-h-[500px] p-4">
          <img src={ emptyStore } className="w-auto h-32 sm:w-auto sm:h-48 md:w-auto md:h-64 lg:w-auto lg:h-80 text-gray-400" />
          <p className="text-base sm:text-lg text-gray-600 mb-4 max-w-md mx-auto">Il n'y a pas de boutiques.</p>
          <Button 
            onClick={handleCreate}
            className="bg-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-orange-700 transition duration-300 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une Nouvelle Boutique
          </Button>
        </div>
      </SidebarInset>
    );
  }

  // Show create form
  if (showCreateForm) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Créer ma boutique</h1>
          </div>
        </header>
        <div className="min-h-screen">
          <div className="flex flex-col xl:flex-row">
            {/* Form Section */}
            <div className="flex-1 py-4 sm:py-6 lg:py-8 px-4">
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-4 sm:p-6">
                  <div className="max-w-full">
                    <div className="mb-6 sm:mb-8">
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Créer ma boutique
                      </h1>
                      <p className="text-sm sm:text-base text-gray-600">
                        Configurez votre boutique en ligne en quelques étapes simples
                      </p>
                    </div>

                    {/* Alert */}
                    {alert.show && (
                      <Alert className={`mb-6 ${alert.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
                        {alert.type === 'error' ? 
                          <AlertCircleIcon className="h-4 w-4 text-red-600" /> : 
                          <CheckCircle2Icon className="h-4 w-4 text-green-600" />
                        }
                        <AlertDescription className={alert.type === 'error' ? 'text-red-700' : 'text-green-700'}>
                          {alert.message}
                        </AlertDescription>
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      {/* Store Name */}
                      <div>
                        <Label htmlFor="store_name" className="text-sm sm:text-base">
                          Nom de la boutique *
                        </Label>
                        <Input
                          id="store_name"
                          value={formData.store_name}
                          onChange={(e) => handleInputChange('store_name', e.target.value)}
                          placeholder="Entrez le nom de votre boutique"
                          required
                          className="mt-1 text-sm sm:text-base"
                        />
                      </div>

                      {/* Store Description */}
                      <div>
                        <Label htmlFor="store_description" className="text-sm sm:text-base">
                          Description de la boutique *
                        </Label>
                        <Textarea
                          id="store_description"
                          value={formData.store_description}
                          onChange={(e) => handleInputChange('store_description', e.target.value)}
                          placeholder="Décrivez votre boutique, vos produits et services..."
                          rows={4}
                          required
                          className="mt-1 text-sm sm:text-base resize-none"
                        />
                      </div>

                      {/* Store Status */}
                      <div>
                        <Label htmlFor="store_status" className="text-sm sm:text-base">
                          Statut de la boutique *
                        </Label>
                        <Select name="store_status" value={formData.store_status} onValueChange={(value) => handleSelectChange('store_status', value)}>
                          <SelectTrigger id="store_status" className="mt-1 text-sm sm:text-base">
                            <SelectValue placeholder="Sélectionnez le statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="published">Publié</SelectItem>
                            <SelectItem value="hidden">Masqué</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Store Image Upload */}
                      <div>
                        <Label htmlFor="store_image" className="text-sm sm:text-base">Image de la boutique</Label>
                        <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            id="store_image"
                            name="store_image"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                            className="hidden"
                          />
                          <label htmlFor="store_image" className="cursor-pointer">
                            {previewImages.store_image ? (
                              <div className="flex items-center justify-center">
                                <img 
                                  src={previewImages.store_image} 
                                  alt="Store preview" 
                                  className="w-full h-24 sm:h-32 object-cover rounded-lg max-w-xs mx-auto"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mb-2" />
                                <span className="text-xs sm:text-sm text-gray-600">Cliquez pour choisir une image</span>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowCreateForm(false)}
                          className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base order-2 sm:order-1"
                        >
                          Annuler
                        </Button>
                        <Button
                          type="submit"
                          disabled={creating || !formData.store_name || !formData.store_description}
                          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-8 py-2 text-sm sm:text-base order-1 sm:order-2"
                        >
                          {creating ? 'Création...' : 'Créer la boutique'}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section - Fixed/Sticky */}
            <div className="w-110 bg-white py-8 px-4 sm:pl-0">
              <div className="bg-white rounded-xl shadow-sm border p-6 xl:sticky top-10 xl:top-10">
                <div className="xl:sticky xl:top-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                    Aperçu de votre boutique
                  </h3>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm max-w-sm mx-auto xl:max-w-none">
                    {/* Store Image */}
                    <div className="h-24 sm:h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                      {previewImages.store_image && (
                        <img 
                          src={previewImages.store_image} 
                          alt="Store" 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="p-3 sm:p-4">
                      {/* Store Name */}
                      <div className="flex items-center mb-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-1">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full w-fit ${
                              formData.store_status === 'published' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {formData.store_status === 'published' ? 'Publié' : 'Masqué'}
                            </span>
                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                              {formData.store_name || 'Nom de votre boutique'}
                            </h4>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-4">
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                          {formData.store_description || 'Description de votre boutique apparaîtra ici...'}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center text-xs sm:text-sm">
                        <div>
                          <div className="font-semibold text-gray-900">0</div>
                          <div className="text-gray-500">Produits</div>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">0</div>
                          <div className="text-gray-500">Commandes</div>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">0</div>
                          <div className="text-gray-500">Avis</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg max-w-sm mx-auto xl:max-w-none">
                    <p className="text-xs text-blue-600">
                      💡 Cet aperçu montre comment votre boutique apparaîtra aux clients
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    );
  }

  // Show edit form - Updated to match create form design
  if (showEditForm && editingStore) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Modifier ma boutique</h1>
          </div>
        </header>
        <div className="min-h-screen">
          <div className="flex flex-col xl:flex-row">
            {/* Form Section */}
            <div className="flex-1 py-4 sm:py-6 lg:py-8 px-4">
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-4 sm:p-6">
                  <div className="max-w-full">
                    <div className="mb-6 sm:mb-8">
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Modifier ma boutique
                      </h1>
                      <p className="text-sm sm:text-base text-gray-600">
                        Mettez à jour les informations de votre boutique
                      </p>
                    </div>

                    {/* Alert */}
                    {alert.show && (
                      <Alert className={`mb-6 ${alert.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
                        {alert.type === 'error' ? 
                          <AlertCircleIcon className="h-4 w-4 text-red-600" /> : 
                          <CheckCircle2Icon className="h-4 w-4 text-green-600" />
                        }
                        <AlertDescription className={alert.type === 'error' ? 'text-red-700' : 'text-green-700'}>
                          {alert.message}
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Same form as create form */}
                    <form onSubmit={handleUpdate} className="space-y-4 sm:space-y-6">
                      {/* Store Name */}
                      <div>
                        <Label htmlFor="store_name" className="text-sm sm:text-base">
                          Nom de la boutique *
                        </Label>
                        <Input
                          id="store_name"
                          value={formData.store_name}
                          onChange={(e) => handleInputChange('store_name', e.target.value)}
                          placeholder="Entrez le nom de votre boutique"
                          required
                          className="mt-1 text-sm sm:text-base"
                        />
                      </div>

                      {/* Store Description */}
                      <div>
                        <Label htmlFor="store_description" className="text-sm sm:text-base">
                          Description de la boutique *
                        </Label>
                        <Textarea
                          id="store_description"
                          value={formData.store_description}
                          onChange={(e) => handleInputChange('store_description', e.target.value)}
                          placeholder="Décrivez votre boutique, vos produits et services..."
                          rows={4}
                          required
                          className="mt-1 text-sm sm:text-base resize-none"
                        />
                      </div>

                      {/* Store Status */}
                      <div>
                        <Label htmlFor="store_status" className="text-sm sm:text-base">
                          Statut de la boutique *
                        </Label>
                        <Select name="store_status" value={formData.store_status} onValueChange={(value) => handleSelectChange('store_status', value)}>
                          <SelectTrigger id="store_status" className="mt-1 text-sm sm:text-base">
                            <SelectValue placeholder="Sélectionnez le statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="published">Publié</SelectItem>
                            <SelectItem value="hidden">Masqué</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Store Image Upload */}
                      <div>
                        <Label htmlFor="store_image_edit" className="text-sm sm:text-base">Image de la boutique</Label>
                        <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            id="store_image_edit"
                            name="store_image_edit"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                            className="hidden"
                          />
                          <label htmlFor="store_image_edit" className="cursor-pointer">
                            {previewImages.store_image ? (
                              <div className="flex items-center justify-center">
                                <img 
                                  src={previewImages.store_image} 
                                  alt="Store preview" 
                                  className="w-full h-24 sm:h-32 object-cover rounded-lg max-w-xs mx-auto"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mb-2" />
                                <span className="text-xs sm:text-sm text-gray-600">Cliquez pour choisir une image</span>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowEditForm(false)}
                          className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base order-2 sm:order-1"
                        >
                          Annuler
                        </Button>
                        <Button
                          type="submit"
                          disabled={creating || !formData.store_name || !formData.store_description}
                          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-8 py-2 text-sm sm:text-base order-1 sm:order-2"
                        >
                          {creating ? 'Mise à jour...' : 'Mettre à jour'}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section - Fixed/Sticky */}
            <div className="w-110 bg-white py-8 px-4 sm:pl-0">
              <div className="bg-white rounded-xl shadow-sm border p-6 xl:sticky top-10">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                  Aperçu de votre boutique
                </h3>
                
                {/* Same preview as create form */}
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm max-w-sm mx-auto xl:max-w-none">
                  {/* Store Image */}
                  <div className="h-24 sm:h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                    {previewImages.store_image && (
                      <img 
                        src={previewImages.store_image} 
                        alt="Store" 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="p-3 sm:p-4">
                    {/* Store Name */}
                    <div className="flex items-center mb-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full w-fit ${
                            formData.store_status === 'published' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {formData.store_status === 'published' ? 'Publié' : 'Masqué'}
                          </span>
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                            {formData.store_name || 'Nom de votre boutique'}
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                        {formData.store_description || 'Description de votre boutique apparaîtra ici...'}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center text-xs sm:text-sm">
                      <div>
                        <div className="font-semibold text-gray-900">0</div>
                        <div className="text-gray-500">Produits</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">0</div>
                        <div className="text-gray-500">Commandes</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">0</div>
                        <div className="text-gray-500">Avis</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg max-w-sm mx-auto xl:max-w-none">
                  <p className="text-xs text-blue-600">
                    💡 Cet aperçu montre comment votre boutique apparaîtra aux clients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    );
  }

  // Stores list view - New main view for multiple stores
  return (
    <SidebarInset>
      <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Boutiques</h1>
        </div>
      </header>
      <div className="py-8 px-4 sm:py-8 sm:px-4">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          {/* Header with Add Button */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Mes Boutiques</h1>
              <p className="text-sm sm:text-base text-gray-600">Gérez les informations de vos boutiques</p>
            </div>
            <Button 
              onClick={handleCreate}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une boutique
            </Button>
          </div>

          {/* Alert */}
          {alert.show && (
            <Alert className={`mb-6 ${alert.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
              {alert.type === 'error' ? 
                <AlertCircleIcon className="h-4 w-4 text-red-600" /> : 
                <CheckCircle2Icon className="h-4 w-4 text-green-600" />
              }
              <AlertDescription className={alert.type === 'error' ? 'text-red-700' : 'text-green-700'}>
                {alert.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Stores Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <div key={store.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                {/* Store Image */}
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                  {store.store_image && (
                    <img 
                      src={getImageUrl(store.store_image)} 
                      alt="Store" 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="p-4">
                  {/* Store Info */}
                  <div className="flex items-center mb-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full w-fit ${
                          store.store_status === 'published' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {store.store_status === 'published' ? 'Publié' : 'Masqué'}
                        </span>
                        <h3 className="font-semibold text-gray-900 truncate">{store.store_name}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {store.store_description || 'Aucune description fournie'}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
                    <div>
                      <div className="font-semibold text-gray-900">0</div>
                      <div className="text-gray-500">Produits</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">0</div>
                      <div className="text-gray-500">Commandes</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">0</div>
                      <div className="text-gray-500">Avis</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(store)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Modifier
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(store)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer la boutique "{storeToDelete?.store_name}" ? 
              Cette action est irréversible et supprimera également tous les produits associés.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarInset>
  );
};

export default Shops;
