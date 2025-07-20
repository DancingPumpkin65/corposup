import { MainLayout } from '@/components/layouts/MainLayout';
import { SidebarProvider } from '@/components/Shadcn/Sidebar';
import { BuyerSidebar } from '@/components/Buyer/Sidebar';
import { Routes, Route } from 'react-router-dom';
import { 
  OrderHistory, 
  Profile, 
  OrderTracking, 
  SavedProducts, 
  Cart 
} from '@/components/Buyer';

const BuyerPage = () => {
  return (
    <MainLayout>
      <SidebarProvider className="relative max-w-[1680px] mx-auto">
        <BuyerSidebar />
        <div className="flex flex-1 flex-col">
          <Routes>
            <Route path="orders" element={<OrderHistory />} />
            <Route path="profile" element={<Profile />} />
            <Route path="tracking" element={<OrderTracking />} />
            <Route path="saved" element={<SavedProducts />} />
            <Route path="cart" element={<Cart />} />
            <Route index element={<OrderHistory />} />
          </Routes>
        </div>
      </SidebarProvider>
    </MainLayout>
  );
};

export default BuyerPage;