import { SidebarProvider } from '@/components/Shadcn/Sidebar';
import { SellerSidebar } from '@/components/Seller/Sidebar';
import { MainLayout } from '@/components/layouts/MainLayout';
import Overview from '@/components/Seller/Overview';
import Deliveries from '@/components/Seller/Deliveries/Deliveries';
import { Shops } from '@/components/Seller';
import Products from '@/components/Seller/Products/Products';
import { Routes, Route } from 'react-router-dom';
import Profile from '@/components/Seller/Profile/Profile';

const SellerPage = () => {
  return (
    <MainLayout>
      <SidebarProvider className="relative max-w-[1680px] mx-auto">
        <SellerSidebar />
        <div className="flex flex-1 flex-col">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="products" element={<Products />} />
            <Route path="store" element={<Shops />} />
            <Route path="shipping" element={<Deliveries />} />
            <Route path="orders" element={<div className="p-6">Commandes - Coming Soon</div>} />
            <Route path="inbox" element={<div className="p-6">Chats - Coming Soon</div>} />
            <Route path="boost" element={<div className="p-6">Boostez votre entreprise - Coming Soon</div>} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </SidebarProvider>
    </MainLayout>
  );
};

export default SellerPage;
