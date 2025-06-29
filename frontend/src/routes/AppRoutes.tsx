import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { SignIn, SignUp, AdminPage, BuyerPage, SellerPage, LandingPage } from '../pages';
import RoleBasedRedirect from '../pages/RoleBasedRedirect';
import { USER_ROLES } from '../utils/constants';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<RoleBasedRedirect />} />
      
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
            <AdminPage />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/buyer" 
        element={
          <ProtectedRoute requiredRole={USER_ROLES.BUYER}>
            <BuyerPage />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/seller" 
        element={
          <ProtectedRoute requiredRole={USER_ROLES.SELLER}>
            <SellerPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all route */}
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};