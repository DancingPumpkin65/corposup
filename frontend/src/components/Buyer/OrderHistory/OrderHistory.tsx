import { SidebarInset, SidebarTrigger } from "@/components/Shadcn/Sidebar/sidebar";
import { Loader } from "lucide-react";
import { useState } from "react";

const OrderHistory = () => {
  const [loading] = useState(false);

  return (
    <SidebarInset>
      <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Historique de commandes</h1>
        </div>
      </header>
      <div className="flex w-full max-w-[1100px] mx-auto py-8 px-4">
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader className="animate-spin mr-2" /> Chargement...
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-2xl font-bold mb-4">Vos commandes</h2>
              <p className="text-gray-600">Aucun historique de commandes pour l’instant.</p>
            </div>
          )}
        </div>
      </div>
    </SidebarInset>
  );
};

export default OrderHistory;
