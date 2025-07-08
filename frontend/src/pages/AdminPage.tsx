import { SidebarProvider } from '@/components/Shadcn/Sidebar';
import AdminSidebar from '@/components/Admin/AdminSidebar/AdminSidebar';
import Overview from '@/components/Admin/Overview';
import Deliveries from '@/components/Seller/Deliveries/Deliveries';
import { Shops } from '@/components/Seller';
import { Routes, Route } from 'react-router-dom';
import Profile from '@/components/Seller/Profile/Profile';
import Products from '@/components/Seller/Products/Products';

const AdminPage = () => {
  return (
    <SidebarProvider className="relative flex">
          <AdminSidebar />
          <div className="flex flex-1 flex-col">
            <Routes>
              <Route index element={<Overview />} />
              <Route path="admin/dashboard" element={<Overview />} />
              {/* Users */}
              <Route path="admin/users" element={<div className="p-6">View Users - Coming Soon</div>} />
              <Route path="admin/users/add" element={<div className="p-6">Add User - Coming Soon</div>} />
              <Route path="admin/users/roles" element={<div className="p-6">User Roles - Coming Soon</div>} />
              {/* Products */}
              <Route path="admin/products" element={<Products />} />
              <Route path="admin/products/add" element={<div className="p-6">Add Product - Coming Soon</div>} />
              <Route path="admin/products/categories" element={<div className="p-6">Categories - Coming Soon</div>} />
              {/* Consulting */}
              <Route path="admin/consult" element={<div className="p-6">Consult Product - Coming Soon</div>} />
              <Route path="admin/consult/logs" element={<div className="p-6">Product Logs - Coming Soon</div>} />
              <Route path="admin/consult/reports" element={<div className="p-6">Reports - Coming Soon</div>} />
              {/* Other */}
              <Route path="admin/store" element={<Shops />} />
              <Route path="admin/shipping" element={<Deliveries />} />
              <Route path="admin/orders" element={<div className="p-6">Commandes - Coming Soon</div>} />
              <Route path="admin/inbox" element={<div className="p-6">Chats - Coming Soon</div>} />
              <Route path="admin/boost" element={<div className="p-6">Boostez votre entreprise - Coming Soon</div>} />
              <Route path="admin/profile" element={<Profile />} />
              <Route path="admin/settings" element={<div className="p-6">Settings - Coming Soon</div>} />
              <Route path="admin/logout" element={<div className="p-6">Logout - Coming Soon</div>} />
            </Routes>
          </div>
    </SidebarProvider>
  );
};

export default AdminPage;
