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
import { useProducts } from '@/components/SellerPage/Products/useProducts';
import ProductForm from '@/components/SellerPage/Products/ProductForm';
import ProductsView from '@/components/SellerPage/Products/ProductsView';
import emptyProduct from '@/assets/EmptyProduct.svg';

const Products = () => {
  const {
    products,
    loading,
    creating,
    showCreateForm,
    setShowCreateForm,
    showEditForm,
    setShowEditForm,
    editingProduct,
    deleteDialogOpen,
    setDeleteDialogOpen,
    productToDelete,
    formData,
    categories,
    units,
    stores,
    shippings,
    handleInputChange,
    handleKeywordChange,
    handlePriceTierChange,
    addPriceTier,
    handleFileChange,
    removeImage,
    setMainImage,
    resetForm,
    handleCreate,
    handleEdit,
    handleSubmit,
    handleUpdate,
    handleDelete,
    confirmDelete,
  } = useProducts();

  const handleSelectChange = (name: string, value: string | number) => {
    const event = {
      target: { name, value },
    } as React.ChangeEvent<HTMLSelectElement>;
    handleInputChange(event);
  };

  if (loading) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Annonces de produits</h1>
          </div>
        </header>
        <div className="flex justify-center items-center min-h-[300px] p-4">
          <div className="text-lg text-gray-600">Chargement...</div>
        </div>
      </SidebarInset>
    );
  }

  if (products.length === 0 && !showCreateForm) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Annonces de produits</h1>
          </div>
        </header>
        <div className="text-center w-full flex flex-col space-y-3 justify-center items-center bg-cover min-h-[400px] sm:min-h-[500px] p-4">
          <img src={emptyProduct} alt="Aucun produit" className="w-auto h-32 sm:w-auto sm:h-48 md:w-auto md:h-64 lg:w-auto lg:h-80 text-gray-400" />
          <p className="text-base sm:text-lg text-gray-600 mb-4 max-w-md mx-auto">
            Aucun produit disponible.
          </p>
          <Button
            onClick={handleCreate}
            className="bg-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-orange-700 transition duration-300 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un nouveau produit
          </Button>
        </div>
      </SidebarInset>
    );
  }

  const formProps = {
    formData,
    onFieldChange: handleInputChange,
    onSelectChange: handleSelectChange,
    onKeywordChange: handleKeywordChange,
    onPriceTierChange: handlePriceTierChange,
    addPriceTier,
    onFileChange: handleFileChange,
    removeImage,
    setMainImage,
    onCancel: () => {
        setShowCreateForm(false);
        setShowEditForm(false);
        resetForm();
    },
    loading: creating,
    categories,
    units,
    stores,
    shippings,
  };

  if (showCreateForm) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Annonces de produits</h1>
          </div>
        </header>
        <ProductForm {...formProps} onSubmit={handleSubmit} />
      </SidebarInset>
    );
  }

  if (showEditForm && editingProduct) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Modifier le produit</h1>
          </div>
        </header>
        <ProductForm {...formProps} onSubmit={handleUpdate} isEdit={true} />
      </SidebarInset>
    );
  }

  return (
    <SidebarInset>
      <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Annonces de produits</h1>
        </div>
      </header>
      <div className="py-8 px-4 sm:py-8 sm:px-4">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Mes Produits
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Gérez vos produits et leurs informations
              </p>
            </div>
            <Button
              onClick={handleCreate}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un produit
            </Button>
          </div>

          <ProductsView
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le produit "{productToDelete?.product_name}" ?
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

export default Products;
