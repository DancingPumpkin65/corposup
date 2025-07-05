import { Truck, Plus } from 'lucide-react';
import { Button } from '@/components/Shadcn/Button';
import { SidebarInset, SidebarTrigger } from '@/components/Shadcn/Sidebar/sidebar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/Shadcn/Dialog';
import { useDeliveries } from '@/components/SellerPage/Deliveries/useDeliveries';
import DeliveryAlerts from '@/components/SellerPage/Deliveries/DeliveryAlerts';
import DeliveryForm from '@/components/SellerPage/Deliveries/DeliveryForm';
import DeliveriesTable from '@/components/SellerPage/Deliveries/DeliveriesTable';

const Deliveries = () => {
  const {
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
  } = useDeliveries();

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
        <DeliveryAlerts alert={alert} />
        <DeliveryForm
          formData={formData}
          onFieldChange={handleInputChange}
          onSubmit={handleSubmit}
          loading={creating}
          onCancel={() => {
            setShowCreateForm(false);
            resetForm();
          }}
        />
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
        <DeliveryAlerts alert={alert} />
        <DeliveryForm
          formData={formData}
          onFieldChange={handleInputChange}
          onSubmit={handleUpdate}
          loading={creating}
          isEdit={true}
          onCancel={() => {
            setShowEditForm(false);
            setEditingService(null);
            resetForm();
          }}
        />
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

          <DeliveryAlerts alert={alert} />

          <DeliveriesTable
            services={services}
            onEdit={handleEdit}
            onDelete={handleDelete}
            formatCost={formatCost}
            formatDeliveryTime={formatDeliveryTime}
          />
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
