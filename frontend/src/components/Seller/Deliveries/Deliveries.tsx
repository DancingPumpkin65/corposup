import { Plus } from 'lucide-react';
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
import { useDeliveries } from '@/components/Seller/Deliveries/useDeliveries';
import DeliveryForm from '@/components/Seller/Deliveries/DeliveryForm';
import DeliveriesTable from '@/components/Seller/Deliveries/DeliveriesTable';
import emptyShipping from '@/assets/EmptyShipping.svg';

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
          <img src={ emptyShipping } className="w-auto h-32 sm:w-auto sm:h-48 md:w-auto md:h-64 lg:w-auto lg:h-80 text-gray-400" />
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
            <h1 className="text-lg font-semibold">Services de livraison</h1>
          </div>
        </header>
        <DeliveryForm
          formData={formData}
          onFieldChange={handleInputChange}
          onSubmit={handleSubmit}
          loading={creating}
          alert={alert}
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
        <DeliveryForm
          formData={formData}
          onFieldChange={handleInputChange}
          onSubmit={handleUpdate}
          loading={creating}
          isEdit={true}
          alert={alert}
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
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un service
            </Button>
          </div>

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
