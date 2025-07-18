import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoColored from '@/assets/LogoColored.svg';
import TopBar from '@/components/Navbar/TopBar';
import MobileMenu from '@/components/Navbar/MobileMenu';
import CategoriesDropdown from '@/components/Navbar/CategoriesDropdown';
import SearchBar from '@/components/Navbar/SearchBar';
import DesktopNavigation from '@/components/Navbar/DesktopNavigation';
import NavbarUserDropdown from '@/components/Navbar/NavbarUserDropdown';
import NavbarMobileOverlay from '@/components/Navbar/NavbarMobileOverlay';
import NavbarIcons from '@/components/Navbar/NavbarIcons';
import { useCurrentUser } from '@/hooks';
import authService from '@/services/authService';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState("dh");
  const [language, setLanguage] = useState("fr");
  const location = useLocation();
  
  const isSellerPage = location.pathname.startsWith('/seller');
  const isNotHomePage = location.pathname !== '/';

  const { user: currentUser } = useCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  return (
    <nav className={`bg-white relative z-30 border-b border-gray-200 max-w-full mx-auto ${isSellerPage ? 'top-0' : ''}`}>
      {/* Top Bar */}
      <TopBar 
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto w-full flex flex-col">
        <div className="flex items-center gap-1 justify-between h-16 bg-white px-2 my-2 lg:px-8 w-full">
          {/* Mobile Menu Button - Hidden on seller pages */}
          {!isSellerPage && !isNotHomePage && <MobileMenu />}

          {/* Logo and Categories Section */}
          <div className="flex items-center gap-4 flex-grow sm:flex-grow-0 justify-start sm:justify-start">
            <MobileMenu />
            <Link to="/">
              <img src={logoColored} alt="Logo" className="h-full sm:h-8 md:h-10 w-auto" />
            </Link>
            {/* Show CategoriesDropdown next to logo on all non-home, non-seller pages (laptop mode) */}
            {(!isSellerPage && !isNotHomePage) && (
              <div className="hidden lg:block ml-0">
                <CategoriesDropdown />
              </div>
            )}
            {/* Seller page logic unchanged */}
            {isSellerPage  && (
              <div className="hidden lg:block ml-4">
                <CategoriesDropdown />
              </div>
            )}
          </div>
          
          {/* Search Bar (Large screens) - Hidden on seller pages */}
          <SearchBar />

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {!isSellerPage && !isNotHomePage && <NavbarIcons />}

            {/* User Profile or Login Button */}
            {isAuthenticated && currentUser ? (
              <NavbarUserDropdown user={currentUser} />
            ) : (
              <Link 
                to="/signin" 
                className="w-[95px] h-[40px] lg:w-[170px] lg:h-[40px] bg-blue-600 text-white text-sm lg:text-base font-semibold flex items-center justify-center rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out"
              >
                Compte
              </Link>
            )}
          </div>
        </div>

        {/* Second Bar: Categories + Search + Navigation - Hidden on seller pages */}
        {!isSellerPage && isNotHomePage && (
          <div className="flex items-center justify-between h-12 w-full bg-white px-2 mt-2 mb-2 lg:px-8">
            <CategoriesDropdown />
            <SearchBar isMobile />
            <DesktopNavigation />
          </div>
        )}

        {/* Seller Page: Categories for mobile/tablet + Mobile Search */}
        {isSellerPage && !isNotHomePage && (
          <div className="flex items-center justify-between h-12 w-full bg-white px-2 mt-2 mb-2 lg:px-8 lg:hidden">
            <CategoriesDropdown />
            <SearchBar isMobile />
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay - Hidden on seller pages */}
      {!isSellerPage && !isNotHomePage && (
        <NavbarMobileOverlay 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
        />
      )}
    </nav>
  );
};

export default Navbar;
