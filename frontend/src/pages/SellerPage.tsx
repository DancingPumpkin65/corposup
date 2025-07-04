import { SidebarProvider } from '../components/Shadcn/Sidebar';
import { SellerSidebar } from '../components/SellerPage/Sidebar';
import { MainLayout } from '../components/layouts/MainLayout';
import Overview from '@/components/SellerPage/Overview';
import Deliveries from '@/components/SellerPage/Deliveries'; // Updated import path
import { Shops } from '../components/SellerPage';
import ProfilePage from './ProfilePage';
import { Routes, Route } from 'react-router-dom';

const SellerPage = () => {
  return (
    <MainLayout>
      <SidebarProvider className="relative">
        <SellerSidebar />
        <div className="flex flex-1 flex-col">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="products" element={<div className="p-6">Mes produits - Coming Soon</div>} />
            <Route path="store" element={<Shops />} />
            <Route path="shipping" element={<Deliveries />} />
            <Route path="orders" element={<div className="p-6">Commandes - Coming Soon</div>} />
            <Route path="inbox" element={<div className="p-6">Chats - Coming Soon</div>} />
            <Route path="boost" element={<div className="p-6">Boostez votre entreprise - Coming Soon</div>} />
            <Route path="profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </SidebarProvider>
    </MainLayout>
  );
};

export default SellerPage;