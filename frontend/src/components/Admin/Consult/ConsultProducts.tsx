import { SidebarInset, SidebarTrigger } from '@/components/Shadcn/Sidebar';

const ConsultProduct = () => {
  return (
    <SidebarInset>
      <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Consulter les produits</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-8">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-white border flex items-center justify-center shadow-sm">
            <span className="text-gray-600">Mes produits</span>
          </div>
          <div className="aspect-video rounded-xl bg-white border flex items-center justify-center shadow-sm">
            <span className="text-gray-600">Commandes récentes</span>
          </div>
          <div className="aspect-video rounded-xl bg-white border flex items-center justify-center shadow-sm">
            <span className="text-gray-600">Statistiques</span>
          </div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-white border md:min-h-min flex items-center justify-center shadow-sm">
          <span className="text-gray-600">Contenu principal du tableau de bord</span>
        </div>
      </div>
    </SidebarInset>
  );
};

export default ConsultProduct;
