import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import ProductsPage from './pages/ProductsPage'
import LandingPage from './pages/LandingPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import RoleBasedRedirect from './pages/RoleBasedRedirect'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<RoleBasedRedirect />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/categories/:categoryId/products" element={<ProductsPage />} />
        <Route path="/stores/:storeId/products" element={<ProductsPage />} />
        {/* Redirect /corposup to / for backward compatibility */}
        <Route path="/corposup" element={<Navigate to="/" replace />} />
        <Route path="/corposup/*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App