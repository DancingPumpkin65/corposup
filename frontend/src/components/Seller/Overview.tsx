import { SidebarInset, SidebarTrigger } from '../Shadcn/Sidebar';
import revenu from '@/assets/Revenu.svg';
import views from '@/assets/views.svg';
import Export from '@/assets/export.svg';
import transaction from '@/assets/order.svg';

const Overview = () => {
  const userName = "hdsahdj";
  const today = "vendredi, 18 juillet 2025";

  return (
    <SidebarInset>
      <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Vue d'ensemble</h1>
        </div>
      </header>
      <div className="w-full max-w-[1200px] mx-auto py-8 px-4 sm:py-8 sm:px-4">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          {/* Welcome and Actions */}
          <div className="flex flex-col md:flex-row justify-between items-center py-6">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h1 className="text-2xl font-bold">Bienvenue, {userName}</h1>
              <p className="text-gray-600">{today}</p>
            </div>
            <div className="flex flex-row items-center space-x-2 md:space-x-4 w-full md:w-auto">
              <button className="flex items-center justify-center border border-gray-300 text-gray-500 py-2 px-3 w-full md:w-36 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
                <svg width="24" height="24" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                  <path d="M22 6.5H16" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M6 6.5H2" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M22 17.5H18" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M8 17.5H2" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                Filtrer par
              </button>
              <a href="https://corposup.pro/dashboard/overview/export" className="w-full md:w-auto">
                <button className="bg-orange-500 flex items-center justify-center text-white py-2 px-3 w-full md:w-36 rounded-lg shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
                  <img src={Export} alt="" className="w-4 h-4 mr-2" />
                  Exporter
                </button>
              </a>
            </div>
          </div>

          {/* Cards and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left: Cards and Top Products */}
            <div className="space-y-6 col-span-2 sm:w-full">
              <div className="space-y-6 col-span-2 sm:w-full">
                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                  {/* Revenue Card */}
                  <div className="bg-white p-6 w-full sm:w-[216px] rounded-lg border border-gray-100 space-y-6">
                    <div className="flex items-center">
                      <span className="w-[40px] h-[40px] rounded-full bg-blue-50 flex justify-center items-center">
                        <img src={revenu} alt="Revenu icon" className="w-[24px] h-[24px] object-contain rounded-full" />
                      </span>
                      <h2 className="text-gray-600 ml-2">Revenu</h2>
                    </div>
                    <p className="text-3xl font-bold">0 DH</p>
                    <p className="text-gray-500 text-sm">depuis le début</p>
                  </div>
                  {/* Total Views Card */}
                  <div className="bg-white p-6 w-full sm:w-[216px] rounded-lg border border-gray-100 space-y-6">
                    <div className="flex items-center">
                      <span className="w-[40px] h-[40px] rounded-full bg-blue-50 flex justify-center items-center">
                        <img src={views} alt="View icon" className="w-[24px] h-[24px] object-contain rounded-full" />
                      </span>
                      <h2 className="text-gray-600 ml-2">Total des Produits</h2>
                    </div>
                    <p className="text-3xl font-bold">1</p>
                    <p className="text-gray-500 text-sm">Nombre de produits que vous avez créés dans toutes les boutiques.</p>
                  </div>
                  {/* Total Deals Card */}
                  <div className="bg-white p-6 w-full sm:w-[216px] rounded-lg border border-gray-100 space-y-6">
                    <div className="flex items-center">
                      <span className="w-[40px] h-[40px] rounded-full bg-blue-50 flex justify-center items-center">
                        <img src={transaction} alt="Order icon" className="w-[24px] h-[24px] object-contain rounded-full" />
                      </span>
                      <h2 className="text-gray-600 ml-2">Total des Transactions</h2>
                    </div>
                    <p className="text-3xl font-bold">0</p>
                    <p className="text-gray-500 text-sm"> -------- </p>
                  </div>
                </div>
                {/* Top Products Table */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <h2 className="text-xl font-bold">Meilleurs Produits</h2>
                    <div className="relative w-full sm:w-[320px]">
                      <input type="text" placeholder="Rechercher" className="border rounded-lg w-full p-2 pl-10 pr-10" />
                      <div className="absolute inset-y-0 left-2 flex items-center pr-3 pointer-events-none">
                        <svg className="w-[24px] h-[24px] text-gray-500 dark:text-white" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeWidth="3" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"></path>
                        </svg>
                      </div>
                    </div>
                    <select className="border rounded-lg p-2 px-8 w-full sm:w-auto">
                      <option>Cette Semaine</option>
                      <option>Semaine Dernière</option>
                    </select>
                  </div>
                  <div className="overflow-x-auto mt-4 rounded-md">
                    <table className="w-full min-w-[600px] text-sm text-left text-gray-700">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-2 px-4">Produit</th>
                          <th className="py-2 px-4">Note Moyenne</th>
                          <th className="py-2 px-4">Nombre de Commandes</th>
                          <th className="py-2 px-4">Date de Commande</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4">eqweqweqw</td>
                          <td className="py-2 px-4">0.00</td>
                          <td className="py-2 px-4">0</td>
                          <td className="py-2 px-4">N/A</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Right: Buyer Reviews Table */}
            <div className="space-y-6 xl:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold">Avis des Clients</h2>
                <table className="mt-4 w-full">
                  <tbody>
                    {/* Empty for now */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default Overview;
