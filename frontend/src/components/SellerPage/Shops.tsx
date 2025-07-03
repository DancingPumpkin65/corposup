import { useState, useEffect } from 'react';
import { AlertCircleIcon, CheckCircle2Icon, Upload, Store } from 'lucide-react';
import { Alert, AlertDescription } from '../Shadcn/Alert';
import { Button } from '../Shadcn/Button';
import { Input } from '../Shadcn/Input';
import { Label } from '../Shadcn/Label';
import { Textarea } from '../Shadcn/Textarea';
import { SidebarInset, SidebarTrigger } from '../Shadcn/Sidebar/sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Shadcn/Select';
import apiClient from '../../services/apiClient';

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
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
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
    fetchStore();
  }, []);

  const fetchStore = async () => {
    try {
      const response = await apiClient.get('/my-store');
      console.log('API Response:', response.data); // Debug log
      
      // Handle different response structures
      let storeData = null;
      
      if (Array.isArray(response.data) && response.data.length > 0) {
        // If response is an array, take the first store
        storeData = response.data[0];
      } else if (response.data && response.data.store) {
        // If response has a store property
        storeData = response.data.store;
      } else if (response.data && response.data.id) {
        // If response is directly a store object
        storeData = response.data;
      }
      
      if (storeData) {
        setStore(storeData);
      }
    } catch (error) {
      console.log('No store found yet', error);
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

      console.log('Create Response:', response.data); // Debug log

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
          setStore(createdStore);
        } else {
          // If we can't extract the store from response, refetch
          fetchStore();
        }
        setShowCreateForm(false);
        setAlert(prev => ({ ...prev, show: false }));
      }, 2000);

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

  const handleEdit = () => {
    if (store) {
      setFormData({
        store_name: store.store_name,
        store_description: store.store_description,
        store_status: store.store_status,
        store_image: null
      });
      setPreviewImages({
        store_image: store.store_image ? getImageUrl(store.store_image) : ''
      });
      setShowEditForm(true);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!store) return;
    
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

      const response = await apiClient.post(`/my-store/${store.id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Update Response:', response.data); // Debug log

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
          setStore(updatedStore);
        } else {
          // If we can't extract the store from response, refetch
          fetchStore();
        }
        setShowEditForm(false);
        setAlert(prev => ({ ...prev, show: false }));
      }, 2000);

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
            <h1 className="text-lg font-semibold">Ma Boutique</h1>
          </div>
        </header>
        <div className="flex justify-center items-center min-h-[300px] p-4">
          <div className="text-lg text-gray-600">Chargement...</div>
        </div>
      </SidebarInset>
    );
  }

  // No store exists and not showing create form
  if (!store && !showCreateForm) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Ma Boutique</h1>
          </div>
        </header>
        <div className="text-center w-full flex flex-col space-y-3 justify-center items-center bg-cover min-h-[400px] sm:min-h-[500px] p-4">
          <Store className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 text-gray-400" />
          <p className="text-base sm:text-lg text-gray-600 mb-4 max-w-md mx-auto">Il n'y a pas de boutiques.</p>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-orange-700 transition duration-300 text-sm sm:text-base"
          >
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
        <div className="min-h-screen bg-gray-50">
          <div className="flex flex-col xl:flex-row">
            {/* Form Section */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8">
              <div className="max-w-2xl mx-auto xl:mx-0">
                <div className="mb-6 sm:mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Créer ma boutique</h1>
                  <p className="text-sm sm:text-base text-gray-600">Configurez votre boutique en ligne en quelques étapes simples</p>
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
                    <Label htmlFor="store_name" className="text-sm sm:text-base">Nom de la boutique *</Label>
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
                    <Label htmlFor="store_description" className="text-sm sm:text-base">Description de la boutique *</Label>
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
                    <Label htmlFor="store_status" className="text-sm sm:text-base">Statut de la boutique *</Label>
                    <Select value={formData.store_status} onValueChange={(value) => handleSelectChange('store_status', value)}>
                      <SelectTrigger className="mt-1 text-sm sm:text-base">
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
                    <Label className="text-sm sm:text-base">Image de la boutique</Label>
                    <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        id="store_image"
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

            {/* Preview Section - Fixed/Sticky */}
            <div className="w-full xl:w-96 bg-white border-t xl:border-t-0 xl:border-l border-gray-200 p-4 sm:p-6">
              <div className="xl:sticky xl:top-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Aperçu de votre boutique</h3>
                
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
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg border-2 border-white bg-gray-100 flex items-center justify-center -mt-6 sm:-mt-8 mr-3 shadow-sm">
                        <Store className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                          {formData.store_name || 'Nom de votre boutique'}
                        </h4>
                        <span className="text-xs sm:text-sm text-gray-500">Boutique en ligne</span>
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

  // Show edit form
  if (showEditForm && store) {
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
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Modifier ma boutique</h1>
                      <p className="text-sm sm:text-base text-gray-600">Mettez à jour les informations de votre boutique</p>
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

                    <form onSubmit={handleUpdate} className="space-y-4 sm:space-y-6">
                      {/* Store Name */}
                      <div>
                        <Label htmlFor="store_name" className="text-sm sm:text-base">Nom de la boutique *</Label>
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
                        <Label htmlFor="store_description" className="text-sm sm:text-base">Description de la boutique *</Label>
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
                        <Label htmlFor="store_status" className="text-sm sm:text-base">Statut de la boutique *</Label>
                        <Select value={formData.store_status} onValueChange={(value) => handleSelectChange('store_status', value)}>
                          <SelectTrigger className="mt-1 text-sm sm:text-base">
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
                        <Label className="text-sm sm:text-base">Image de la boutique</Label>
                        <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            id="store_image"
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
              <div className="bg-white rounded-xl shadow-sm border p-6 xl:sticky top-10 xl:top-10">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Aperçu de votre boutique</h3>
                
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
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg border-2 border-white bg-gray-100 flex items-center justify-center -mt-6 sm:-mt-8 mr-3 shadow-sm">
                        <Store className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                          {formData.store_name || 'Nom de votre boutique'}
                        </h4>
                        <span className="text-xs sm:text-sm text-gray-500">Boutique en ligne</span>
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

  // Store exists - Show store details
  return (
    <SidebarInset>
      <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Ma Boutique</h1>
        </div>
      </header>
      <div className="py-8 px-4 sm:py-8 sm:px-4 ">
        <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Ma Boutique</h1>
          <p className="text-sm sm:text-base text-gray-600">Gérez les informations de votre boutique</p>
        </div>

        {store && (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {/* Store Image */}
            <div className="h-32 sm:h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
              {store.store_image && (
                <img 
                  src={getImageUrl(store.store_image)} 
                  alt="Store" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-4 sm:p-6">
              {/* Store Info */}
              <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-4">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg border-4 border-white bg-gray-100 flex items-center justify-center -mt-8 sm:-mt-12 mr-4 shadow-lg flex-shrink-0">
                    <Store className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{store.store_name}</h2>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full w-fit ${
                        store.store_status === 'published' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {store.store_status === 'published' ? 'Publié' : 'Masqué'}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">
                      Boutique créée le {new Date(store.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleEdit}
                  className="w-full sm:w-auto px-4 sm:px-6 text-sm sm:text-base"
                >
                  Modifier
                </Button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-sm sm:text-base text-gray-600">{store.store_description || 'Aucune description fournie'}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm sm:text-base text-gray-600">Produits</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm sm:text-base text-gray-600">Commandes</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm sm:text-base text-gray-600">Visiteurs</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm sm:text-base text-gray-600">Avis</div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </SidebarInset>
  );
};

export default Shops;
