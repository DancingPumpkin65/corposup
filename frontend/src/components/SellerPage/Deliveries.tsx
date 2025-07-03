import { useState, useEffect } from 'react';
import { AlertCircleIcon, CheckCircle2Icon, Truck, Edit, Trash2, Plus } from 'lucide-react';
import { Alert, AlertDescription } from '../Shadcn/Alert';
import { Button } from '../Shadcn/Button';
import { Input } from '../Shadcn/Input';
import { Label } from '../Shadcn/Label';
import { Textarea } from '../Shadcn/Textarea';
import { SidebarInset, SidebarTrigger } from '../Shadcn/Sidebar/sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../Shadcn/Table/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../Shadcn/Dialog';
import apiClient from '../../services/apiClient';

interface ShippingService {
  id: number;
  shipping_name: string;
  description: string;
  shipping_cost: number | string; // Allow both types from API
  shipping_delivery_time: number | string; // Allow both types from API
  created_at: string;
}

interface ShippingFormData {
  shipping_name: string;
  description: string;
  shipping_cost: string;
  shipping_delivery_time: string;
}

const Deliveries = () => {
  const [services, setServices] = useState<ShippingService[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingService, setEditingService] = useState<ShippingService | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<ShippingService | null>(null);
  const [alert, setAlert] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: ''
  });

  const [formData, setFormData] = useState<ShippingFormData>({
    shipping_name: '',
    description: '',
    shipping_cost: '',
    shipping_delivery_time: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await apiClient.get('/shippings');
      setServices(response.data || []);
    } catch (error) {
      console.log('No services found yet', error);
    } finally {
      setLoading(false);
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
      description: '',
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
      description: service.description,
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
      setServices(prev => prev.filter(s => s.id !== serviceToDelete.id));
      setAlert({
        show: true,
        type: 'success',
        message: 'Service de livraison supprimé avec succès!'
      });
      setTimeout(() => setAlert(prev => ({ ...prev, show: false })), 3000);
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
        description: formData.description,
        shipping_cost: parseFloat(formData.shipping_cost),
        shipping_delivery_time: formData.shipping_delivery_time // Keep as string
      };

      const response = await apiClient.post('/shippings', submitData);

      setAlert({
        show: true,
        type: 'success',
        message: 'Service de livraison créé avec succès!'
      });

      setTimeout(() => {
        setServices(prev => [...prev, response.data]);
        setShowCreateForm(false);
        setAlert(prev => ({ ...prev, show: false }));
        resetForm();
      }, 2000);

    } catch (error) {
      console.error('Service creation error:', error);
      setAlert({
        show: true,
        type: 'error',
        message: 'Erreur lors de la création du service'
      });
    } finally {
      setCreating(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setCreating(true);

    try {
      const submitData = {
        shipping_name: formData.shipping_name,
        description: formData.description,
        shipping_cost: parseFloat(formData.shipping_cost),
        shipping_delivery_time: formData.shipping_delivery_time // Keep as string
      };

      const response = await apiClient.put(`/shippings/${editingService.id}`, submitData);

      setAlert({
        show: true,
        type: 'success',
        message: 'Service de livraison mis à jour avec succès!'
      });

      setTimeout(() => {
        setServices(prev => prev.map(s => s.id === editingService.id ? response.data : s));
        setShowEditForm(false);
        setEditingService(null);
        setAlert(prev => ({ ...prev, show: false }));
        resetForm();
      }, 2000);

    } catch (error) {
      console.error('Service update error:', error);
      setAlert({
        show: true,
        type: 'error',
        message: 'Erreur lors de la mise à jour du service'
      });
    } finally {
      setCreating(false);
    }
  };

  // Helper function to safely convert to number and format
  const formatCost = (cost: number | string): string => {
    const numCost = typeof cost === 'string' ? parseFloat(cost) : cost;
    return isNaN(numCost) ? '0.00' : numCost.toFixed(2);
  };

  const formatDeliveryTime = (time: number | string): number => {
    const numTime = typeof time === 'string' ? parseInt(time) : time;
    return isNaN(numTime) ? 1 : numTime;
  };

  if (loading) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Services de livraison</h1>
          </div>
        </header>
        <div className="flex justify-center items-center min-h-[300px] p-4">
          <div className="text-lg text-gray-600">Chargement...</div>
        </div>
      </SidebarInset>
    );
  }

  // No services exists and not showing create form
  if (services.length === 0 && !showCreateForm) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Services de livraison</h1>
          </div>
        </header>
        <div className="text-center w-full flex flex-col space-y-3 justify-center items-center bg-cover min-h-[400px] sm:min-h-[500px] p-4">
          <Truck className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 text-gray-400" />
          <p className="text-base sm:text-lg text-gray-600 mb-4 max-w-md mx-auto">
            Aucun service de livraison configuré.
          </p>
          <Button 
            onClick={handleCreate}
            className="bg-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-orange-700 transition duration-300 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un nouveau service de livraison
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
            <h1 className="text-lg font-semibold">Créer un service de livraison</h1>
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
                        Créer un service de livraison
                      </h1>
                      <p className="text-sm sm:text-base text-gray-600">
                        Configurez un nouveau service de livraison pour vos clients
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
                      {/* Service Name */}
                      <div>
                        <Label htmlFor="shipping_name" className="text-sm sm:text-base">
                          Nom du service *
                        </Label>
                        <Input
                          id="shipping_name"
                          value={formData.shipping_name}
                          onChange={(e) => handleInputChange('shipping_name', e.target.value)}
                          placeholder="Ex: Livraison express"
                          required
                          className="mt-1 text-sm sm:text-base"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <Label htmlFor="description" className="text-sm sm:text-base">
                          Description *
                        </Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          placeholder="Décrivez votre service de livraison..."
                          rows={4}
                          required
                          className="mt-1 text-sm sm:text-base resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {/* Cost */}
                        <div>
                          <Label htmlFor="shipping_cost" className="text-sm sm:text-base">
                            Coût de livraison (DH) *
                          </Label>
                          <Input
                            id="shipping_cost"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.shipping_cost}
                            onChange={(e) => handleInputChange('shipping_cost', e.target.value)}
                            placeholder="0.00"
                            required
                            className="mt-1 text-sm sm:text-base"
                          />
                        </div>

                        {/* Delivery Time */}
                        <div>
                          <Label htmlFor="shipping_delivery_time" className="text-sm sm:text-base">
                            Délai de livraison (jours) *
                          </Label>
                          <Input
                            id="shipping_delivery_time"
                            type="number"
                            min="1"
                            value={formData.shipping_delivery_time}
                            onChange={(e) => handleInputChange('shipping_delivery_time', e.target.value)}
                            placeholder="1"
                            required
                            className="mt-1 text-sm sm:text-base"
                          />
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowCreateForm(false);
                            resetForm();
                          }}
                          className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base order-2 sm:order-1"
                        >
                          Annuler
                        </Button>
                        <Button
                          type="submit"
                          disabled={creating || !formData.shipping_name || !formData.description || !formData.shipping_cost || !formData.shipping_delivery_time}
                          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-8 py-2 text-sm sm:text-base order-1 sm:order-2"
                        >
                          {creating ? 'Création...' : 'Créer le service'}
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
                  Aperçu du service
                </h3>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm max-w-sm mx-auto xl:max-w-none">
                  <div className="p-4">
                    {/* Service Header */}
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                        <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                          {formData.shipping_name || 'Nom du service'}
                        </h4>
                        <span className="text-xs sm:text-sm text-gray-500">Service de livraison</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                        {formData.description || 'Description du service apparaîtra ici...'}
                      </p>
                    </div>

                    {/* Pricing & Time */}
                    <div className="grid grid-cols-2 gap-4 text-center text-xs sm:text-sm">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="font-semibold text-gray-900">
                          {formData.shipping_cost ? `${formData.shipping_cost} DH` : '0.00 DH'}
                        </div>
                        <div className="text-gray-500">Coût</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="font-semibold text-gray-900">
                          {formData.shipping_delivery_time ? `${formData.shipping_delivery_time} jour${parseInt(formData.shipping_delivery_time) > 1 ? 's' : ''}` : '1 jour'}
                        </div>
                        <div className="text-gray-500">Délai</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg max-w-sm mx-auto xl:max-w-none">
                  <p className="text-xs text-blue-600">
                    💡 Cet aperçu montre comment votre service apparaîtra aux clients
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

  // Show edit form
  if (showEditForm && editingService) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Modifier le service de livraison</h1>
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
                        Modifier le service de livraison
                      </h1>
                      <p className="text-sm sm:text-base text-gray-600">
                        Mettez à jour les informations de votre service
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

                    <form onSubmit={handleUpdate} className="space-y-4 sm:space-y-6">
                      {/* Service Name */}
                      <div>
                        <Label htmlFor="shipping_name" className="text-sm sm:text-base">
                          Nom du service *
                        </Label>
                        <Input
                          id="shipping_name"
                          value={formData.shipping_name}
                          onChange={(e) => handleInputChange('shipping_name', e.target.value)}
                          placeholder="Ex: Livraison express"
                          required
                          className="mt-1 text-sm sm:text-base"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <Label htmlFor="description" className="text-sm sm:text-base">
                          Description *
                        </Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          placeholder="Décrivez votre service de livraison..."
                          rows={4}
                          required
                          className="mt-1 text-sm sm:text-base resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {/* Cost */}
                        <div>
                          <Label htmlFor="shipping_cost" className="text-sm sm:text-base">
                            Coût de livraison (DH) *
                          </Label>
                          <Input
                            id="shipping_cost"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.shipping_cost}
                            onChange={(e) => handleInputChange('shipping_cost', e.target.value)}
                            placeholder="0.00"
                            required
                            className="mt-1 text-sm sm:text-base"
                          />
                        </div>

                        {/* Delivery Time */}
                        <div>
                          <Label htmlFor="shipping_delivery_time" className="text-sm sm:text-base">
                            Délai de livraison (jours) *
                          </Label>
                          <Input
                            id="shipping_delivery_time"
                            type="number"
                            min="1"
                            value={formData.shipping_delivery_time}
                            onChange={(e) => handleInputChange('shipping_delivery_time', e.target.value)}
                            placeholder="1"
                            required
                            className="mt-1 text-sm sm:text-base"
                          />
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowEditForm(false);
                            setEditingService(null);
                            resetForm();
                          }}
                          className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base order-2 sm:order-1"
                        >
                          Annuler
                        </Button>
                        <Button
                          type="submit"
                          disabled={creating || !formData.shipping_name || !formData.description || !formData.shipping_cost || !formData.shipping_delivery_time}
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

            {/* Preview Section */}
            <div className="w-110 bg-white py-8 px-4 sm:pl-0">
              <div className="bg-white rounded-xl shadow-sm border p-6 xl:sticky top-10">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                  Aperçu du service
                </h3>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm max-w-sm mx-auto xl:max-w-none">
                  <div className="p-4">
                    {/* Service Header */}
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                        <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                          {formData.shipping_name || 'Nom du service'}
                        </h4>
                        <span className="text-xs sm:text-sm text-gray-500">Service de livraison</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                        {formData.description || 'Description du service apparaîtra ici...'}
                      </p>
                    </div>

                    {/* Pricing & Time */}
                    <div className="grid grid-cols-2 gap-4 text-center text-xs sm:text-sm">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="font-semibold text-gray-900">
                          {formData.shipping_cost ? `${formData.shipping_cost} DH` : '0.00 DH'}
                        </div>
                        <div className="text-gray-500">Coût</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="font-semibold text-gray-900">
                          {formData.shipping_delivery_time ? `${formData.shipping_delivery_time} jour${parseInt(formData.shipping_delivery_time) > 1 ? 's' : ''}` : '1 jour'}
                        </div>
                        <div className="text-gray-500">Délai</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg max-w-sm mx-auto xl:max-w-none">
                  <p className="text-xs text-blue-600">
                    💡 Cet aperçu montre comment votre service apparaîtra aux clients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    );
  }

  // Services list view
  return (
    <SidebarInset>
      <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Services de livraison</h1>
        </div>
      </header>
      <div className="py-8 px-4 sm:py-8 sm:px-4">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Mes services de livraison
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Gérez vos services de livraison proposés aux clients
              </p>
            </div>
            <Button 
              onClick={handleCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un service
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

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Coût (DH)</TableHead>
                  <TableHead>Délai (jours)</TableHead>
                  <TableHead>Date de création</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <Truck className="w-4 h-4 text-blue-600" />
                        </div>
                        {service.shipping_name}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="truncate" title={service.description}>
                        {service.description}
                      </p>
                    </TableCell>
                    <TableCell>{formatCost(service.shipping_cost)} DH</TableCell>
                    <TableCell>
                      {formatDeliveryTime(service.shipping_delivery_time)} jour{formatDeliveryTime(service.shipping_delivery_time) > 1 ? 's' : ''}
                    </TableCell>
                    <TableCell>
                      {new Date(service.created_at).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(service)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(service)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le service "{serviceToDelete?.shipping_name}" ? 
              Cette action est irréversible.
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

export default Deliveries;
