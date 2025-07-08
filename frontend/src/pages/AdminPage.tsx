import { SidebarProvider } from '@/components/Shadcn/Sidebar';
import AdminSidebar from '@/components/Admin/AdminSidebar/AdminSidebar';
import Overview from '@/components/Admin/Overview';
import Deliveries from '@/components/Seller/Deliveries/Deliveries';
import { Shops } from '@/components/Seller';
import { Routes, Route } from 'react-router-dom';
import Profile from '@/components/Seller/Profile/Profile';
import Products from '@/components/Admin/Products/Products';
import Categories from '@/components/Admin/Products/Categories';
import Users from '@/components/Admin/Users/Users';
import ConsultProduct from '@/components/Admin/Consult/ConsultProducts';
import Logs from '@/components/Admin/Consult/Logs';
import Repports from '@/components/Admin/Consult/Repports';

const AdminPage = () => {
  return (
    <SidebarProvider className="relative flex">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <Routes>
          <Route index element={<Overview />} />
          <Route path="dashboard" element={<Overview />} />
          {/* Users */}
          <Route path="users" element={<Users />} />
          {/* Products */}
          <Route path="products" element={<Products />} />
          <Route path="products/categories" element={<Categories />} />
          {/* Consulting */}
          <Route path="consult" element={<ConsultProduct />} />
          <Route path="consult/logs" element={<Logs />} />
          <Route path="consult/reports" element={<Repports />} />
          {/* Other */}
          <Route path="store" element={<Shops />} />
          <Route path="shipping" element={<Deliveries />} />
          <Route path="orders" element={<div className="p-6">Commandes - Coming Soon</div>} />
          <Route path="inbox" element={<div className="p-6">Chats - Coming Soon</div>} />
          <Route path="boost" element={<div className="p-6">Boostez votre entreprise - Coming Soon</div>} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<div className="p-6">Settings - Coming Soon</div>} />
          <Route path="logout" element={<div className="p-6">Logout - Coming Soon</div>} />
        </Routes>
      </div>
    </SidebarProvider>
  );
};

export default AdminPage;
