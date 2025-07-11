import { SidebarInset, SidebarTrigger } from "@/components/Shadcn/Sidebar";
import { Button } from "@/components/Shadcn/Button";
import { Plus } from "lucide-react";
import useDiscounts from "./useDiscounts";
import DiscountsForm from "./DiscountsForm";
import DiscountsTable from "./DiscountsTable";
import DiscountsAlerts from "./DiscountsAlerts";

const Discounts = () => {
  const {
    discounts,
    showForm,
    setShowForm,
    loading,
    handleAddDiscount,
    handleDelete,
  } = useDiscounts();

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
              Créer une remise
            </h2>
            <p>Configurez une remise pour vos clients</p>
            <DiscountsForm
              onAdd={handleAddDiscount}
              onCancel={() => setShowForm(false)}
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
          <DiscountsAlerts />
          <DiscountsTable discounts={discounts} onDelete={handleDelete} />
        </div>
      </div>
    </SidebarInset>
  );
};

export default Discounts;