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
    <SidebarProvider>
        <div className="flex flex-1">
          <AdminSidebar />
          <div className="flex flex-1 flex-col">
            <Routes>
              <Route index element={<Overview />} />
              <Route path="dashboard" element={<Overview />} />
              {/* Users */}
              <Route path="users" element={<div className="p-6">View Users - Coming Soon</div>} />
              <Route path="users/add" element={<div className="p-6">Add User - Coming Soon</div>} />
              <Route path="users/roles" element={<div className="p-6">User Roles - Coming Soon</div>} />
              {/* Products */}
              <Route path="products" element={<Products />} />
              <Route path="products/add" element={<div className="p-6">Add Product - Coming Soon</div>} />
              <Route path="products/categories" element={<div className="p-6">Categories - Coming Soon</div>} />
              {/* Consulting */}
              <Route path="consult" element={<div className="p-6">Consult Product - Coming Soon</div>} />
              <Route path="consult/logs" element={<div className="p-6">Product Logs - Coming Soon</div>} />
              <Route path="consult/reports" element={<div className="p-6">Reports - Coming Soon</div>} />
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
        </div>
    </SidebarProvider>
  );
};

export default AdminPage;
