import { useState } from 'react';
import { Settings, LogOut, User as UserIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoColored from '@/assets/LogoColored.svg';
import TopBar from '@/components/Navbar/TopBar';
import MobileMenu from '@/components/Navbar/MobileMenu';
import CategoriesDropdown from '@/components/Navbar/CategoriesDropdown';
import SearchBar from '@/components/Navbar/SearchBar';
import DesktopNavigation from '@/components/Navbar/DesktopNavigation';
import { useCurrentUser } from '@/hooks';
import authService from '@/services/authService';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/Shadcn/DropdownMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Shadcn/Avatar';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  photo_profile?: string;
}

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState("dh");
  const [language, setLanguage] = useState("fr");
  const location = useLocation();
  
  // Check if user is on seller pages
  const isSellerPage = location.pathname.startsWith('/seller');
  
  // Get current user with fresh data
  const { user: currentUser } = useCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = async () => {
    try {
      await authService.logout();
      window.location.href = '/signin';
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      window.location.href = '/signin';
    }
  };

  const getUserInitials = (user: User) => {
    return `${user.firstname?.charAt(0) || ''}${user.lastname?.charAt(0) || ''}`.toUpperCase();
  };

  const getUserDisplayName = (user: User) => {
    return `${user.firstname || ''} ${user.lastname || ''}`.trim();
  };

  const getProfileImageUrl = (photo_profile?: string): string => {
    if (!photo_profile) return '';
    
    if (photo_profile.startsWith('profiles/')) {
      return `http://127.0.0.1:8000/storage/${photo_profile}`;
    }
    
    return photo_profile;
  };

  return (
    <nav className={`bg-white relative z-30 border-b border-gray-400 max-w-full mx-auto ${isSellerPage ? 'sticky top-0' : ''}`}>
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
          {!isSellerPage && <MobileMenu />}

          {/* Logo and Categories Section for Seller Pages */}
          <div className="flex items-center gap-4 flex-grow sm:flex-grow-0 justify-center sm:justify-start">
            <Link to="/">
              <img src={logoColored} alt="Logo" className="h-full sm:h-8 md:h-10 w-auto" />
            </Link>
            
            {/* Categories next to logo on seller pages (laptop mode) */}
            {isSellerPage && (
              <div className="hidden lg:block">
                <CategoriesDropdown />
              </div>
            )}
          </div>

          {/* Search Bar (Large screens) - Hidden on seller pages */}
          <SearchBar />

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {!isSellerPage && (
              <div className="hidden lg:flex gap-4">
                <Link to="/inbox" className="p-1 rounded-md text-orange-500 hover:text-gray-500">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"></path>
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"></path>
                  </svg>
                </Link>

                <Link to="/signin" className="p-1 rounded-md text-orange-500 hover:text-gray-500">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"></path>
                  </svg>
                </Link>
              </div>
            )}

            {/* User Profile or Login Button */}
            {isAuthenticated && currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                    {currentUser.photo_profile && getProfileImageUrl(currentUser.photo_profile) ? (
                      <AvatarImage 
                        src={getProfileImageUrl(currentUser.photo_profile)} 
                        alt={getUserDisplayName(currentUser)} 
                      />
                    ) : null}
                    <AvatarFallback className="bg-blue-600 text-white font-semibold text-sm">
                      {getUserInitials(currentUser)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{getUserDisplayName(currentUser)}</p>
                      <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/seller/profile" className="flex items-center cursor-pointer">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Paramètres</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
        {!isSellerPage && (
          <div className="flex items-center justify-between h-12 w-full bg-white px-2 mt-2 mb-2 lg:px-8">
            {/* Categories Button */}
            <CategoriesDropdown />

            {/* Mobile Search */}
            <SearchBar isMobile />

            {/* Central Navigation */}
            <DesktopNavigation />
          </div>
        )}

        {/* Seller Page: Categories for mobile/tablet + Mobile Search */}
        {isSellerPage && (
          <div className="flex items-center justify-between h-12 w-full bg-white px-2 mt-2 mb-2 lg:px-8 lg:hidden">
            {/* Categories Button for mobile/tablet */}
            <CategoriesDropdown />

            {/* Mobile Search */}
            <SearchBar isMobile />
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay - Hidden on seller pages */}
      {!isSellerPage && mobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
          <div className="w-64 bg-blue-50 h-full shadow-xl">
            <button 
              className="p-4 text-gray-700" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6"></path>
              </svg>
            </button>
            <nav className="p-6 space-y-4 max-w-xs mx-auto z-1">
              <Link to="/" className="block text-gray-700 hover:text-blue-600 hover:bg-blue-100 transition-all duration-300 p-2 rounded-lg border-b border-blue-300">Accueil</Link>
              <Link to="/blog" className="block text-gray-700 hover:text-blue-600 hover:bg-blue-100 transition-all duration-300 p-2 rounded-lg border-b border-blue-300">Blogs</Link>
              <Link to="/abonnements" className="block text-gray-700 hover:text-blue-600 hover:bg-blue-100 transition-all duration-300 p-2 rounded-lg border-b border-blue-300">Abonnements</Link>
              <Link to="/contact" className="block text-gray-700 hover:text-blue-600 hover:bg-blue-100 transition-all duration-300 p-2 rounded-lg border-b border-blue-300">Contact</Link>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;