import { SidebarInset, SidebarTrigger } from "@/components/Shadcn/Sidebar";
import { Button } from "@/components/Shadcn/Button";
import { Plus } from "lucide-react";
import { Info } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/Shadcn/Alert";
import useDiscounts from "./useDiscounts";
import DiscountsForm from "./DiscountsForm";
import DiscountsTable from "./DiscountsTable";
import emptyDiscount from "@/assets/EmptyShipping.svg"; // Add an empty state image for discounts

const Discounts = () => {
  const {
    discounts,
    showForm,
    setShowForm,
    loading,
    handleAddDiscount,
    handleDelete,
    editingDiscount,
    handleEditInit,
    handleUpdateDiscount,
    setEditingDiscount,
  } = useDiscounts();

  // Show loading state
  if (loading) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Remises</h1>
          </div>
        </header>
        <div className="flex justify-center items-center min-h-[300px] p-4">
          <div className="text-lg text-gray-600">Chargement...</div>
        </div>
      </SidebarInset>
    );
  }

  // No discounts and not showing create form
  if (discounts.length === 0 && !showForm) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Remises</h1>
          </div>
        </header>
        <div className="text-center w-full flex flex-col space-y-3 justify-center items-center bg-cover min-h-[400px] sm:min-h-[500px] p-4">
          <img
            src={emptyDiscount}
            alt="Aucune remise"
            className="w-auto h-32 sm:w-auto sm:h-48 md:w-auto md:h-64 lg:w-auto lg:h-80 text-gray-400"
          />
          <p className="text-base sm:text-lg text-gray-600 mb-4 max-w-md mx-auto">
            Aucune remise configurée.
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-orange-700 transition duration-300 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une nouvelle remise
          </Button>
        </div>
      </SidebarInset>
    );
  }

  if (showForm) {
    return (
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Remises</h1>
          </div>
        </header>
        <div className="py-8 px-4 sm:py-8 sm:px-4">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-2xl sm:text-2xl font-bold text-gray-900 mb-2">
              {editingDiscount ? "Modifier la remise" : "Créer une remise"}
            </h2>
            <p className="pb-4">Configurez une remise pour vos clients</p>
            <Alert
              variant="default"
              className="bg-blue-50 border-blue-300 text-blue-800 mb-6"
            >
              <Info className="h-4 w-4 text-blue-800" />
              <AlertTitle className="font-medium">Alerte info !</AlertTitle>
              <AlertDescription>
                Les champs marqués d'une étoile (*) sont obligatoires.
              </AlertDescription>
            </Alert>
            <DiscountsForm
              onAdd={editingDiscount ? handleUpdateDiscount : handleAddDiscount}
              onCancel={() => {
                setShowForm(false);
                setEditingDiscount(null);
              }}
              initialValues={editingDiscount ?? undefined}
            />
          </div>
        </div>
      </SidebarInset>
    );
  }

  return (
    <SidebarInset>
      <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Remises</h1>
        </div>
      </header>
      <div className="py-8 px-4 sm:py-8 sm:px-4">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Mes Remises
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Gérez vos remises et leurs informations
              </p>
            </div>
            {!showForm && (
              <Button
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2"
                onClick={() => setShowForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une remise
              </Button>
            )}
          </div>
          <DiscountsTable
            discounts={discounts}
            onDelete={handleDelete}
            onEdit={handleEditInit}
          />
        </div>
      </div>
    </SidebarInset>
  );
};

export default Discounts;