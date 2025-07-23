import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ProtectedRoute } from '@/routes';
import { USER_ROLES } from '@/utils/constants';
import { Provider } from 'react-redux';
import store from '@/store';

const LandingPage = lazy(() => import('@/pages/LandingPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));
const BuyerPage = lazy(() => import('@/pages/BuyerPage'));
const SellerPage = lazy(() => import('@/pages/SellerPage'));
const SignIn = lazy(() => import('@/pages/SignIn'));
const SignUp = lazy(() => import('@/pages/SignUp'));
const ProductsPage = lazy(() => import('@/pages/ProductsPage'));
const RoleBasedRedirect = lazy(() => import('@/pages/RoleBasedRedirect'));
const ProductPage = lazy(() => import('@/components/ProductsPage/ProductInfos'));
import { Loader } from 'lucide-react';

export const AppRoutes = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader className="animate-spin mr-2" /> Chargement
        </div>
      }>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<RoleBasedRedirect />} />

          <Route path="/categories/:categoryId/products" element={<ProductsPage />} />
          <Route path="/categories/:categoryId/products/:productId" element={<ProductPage />} />

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                <AdminPage />
              </ProtectedRoute>
            } 
          />

          <Route
            path="/buyer/*"
            element={
              <ProtectedRoute requiredRole={USER_ROLES.BUYER}>
                <BuyerPage />
              </ProtectedRoute>
            } 
          />

          <Route
            path="/seller/*"
            element={
              <ProtectedRoute requiredRole={USER_ROLES.SELLER}>
                <SellerPage />
              </ProtectedRoute>
            } 
          />

        </Routes>
      </Suspense>
    </Provider>
  );
};