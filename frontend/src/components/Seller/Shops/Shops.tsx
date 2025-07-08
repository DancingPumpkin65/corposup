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
import { useShops } from '@/components/Seller/Shops/useShops';
import ShopForm from '@/components/Seller/Shops/ShopForm';
import ShopView from '@/components/Seller/Shops/ShopView';
import ShopAlerts from '@/components/Seller/Shops/ShopAlerts';
import emptyStore from '@/assets/EmptyStore.svg';

const Shops = () => {
  const {
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
  } = useShops();

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

  {/* No stores exist and not showing create form */}
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
          <img src={emptyStore} className="w-auto h-32 sm:w-auto sm:h-48 md:w-auto md:h-64 lg:w-auto lg:h-80 text-gray-400" />
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

  {/* Show create form */}
  if (showCreateForm) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Créer ma boutique</h1>
          </div>
        </header>
        <ShopForm
          formData={formData}
          onFieldChange={handleInputChange}
          onFileChange={handleFileChange}
          onSelectChange={handleSelectChange}
          onSubmit={handleSubmit}
          loading={creating}
          alert={alert}
          previewImages={previewImages}
          onCancel={() => {
            setShowCreateForm(false);
            resetForm();
          }}
        />
      </SidebarInset>
    );
  }

  {/* Show edit form */}
  if (showEditForm && editingStore) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Modifier ma boutique</h1>
          </div>
        </header>
        <ShopForm
          formData={formData}
          onFieldChange={handleInputChange}
          onFileChange={handleFileChange}
          onSelectChange={handleSelectChange}
          onSubmit={handleUpdate}
          loading={creating}
          isEdit={true}
          alert={alert}
          previewImages={previewImages}
          onCancel={() => {
            setShowEditForm(false);
            setEditingStore(null);
            resetForm();
          }}
        />
      </SidebarInset>
    );
  }

  {/* Shops list view */}
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

          <ShopAlerts alert={alert} />

          <ShopView
            stores={stores}
            onEdit={handleEdit}
            onDelete={handleDelete}
            getImageUrl={getImageUrl}
          />
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
