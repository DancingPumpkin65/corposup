import { SidebarInset, SidebarTrigger } from "@/components/Shadcn/Sidebar/sidebar";
import { Loader } from "lucide-react";
import { useState } from "react";

const Cart = () => {
  const [loading] = useState(false);

  return (
    <SidebarInset>
      <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Panier</h1>
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
              <h2 className="text-3xl font-bold mb-4">Votre panier</h2>
              <p className="text-gray-600">Votre panier est vide.</p>
            </div>
          )}
        </div>
      </div>
    </SidebarInset>
  );
};

export default Cart;
