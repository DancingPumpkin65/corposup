import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoColored from '../assets/LogoColored.svg';
import TopBar from './navbar-components/TopBar';
import MobileMenu from './navbar-components/MobileMenu';
import CategoriesDropdown from './navbar-components/CategoriesDropdown';
import SearchBar from './navbar-components/SearchBar';
import DesktopNavigation from './navbar-components/DesktopNavigation';

interface Category {
  id: number;
  name: string;
  subcategories?: string[];
}

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState("dh");
  const [language, setLanguage] = useState("fr");
  const [categories] = useState<Category[]>([
    {
      id: 1,
      name: "Agriculture et alimentation",
      subcategories: ["Agriculture et élevage", "Alimentation"]
    },
    {
      id: 2,
      name: "Machine et outils",
      subcategories: ["Machine et matériel", "Outils et quincaillerie", "Composants mécaniques", "Instrument de mesure et d'analyse"]
    },
    {
      id: 3,
      name: "Métallurgie, chimie et plastiques",
      subcategories: ["Produits chimiques", "Plastique et caoutchouc", "Minéraux et métallurgie", "Energie"]
    },
    {
      id: 4,
      name: "Emballage, publicité et bureaux",
      subcategories: ["Conditionnement et stockage", "Équipement de service", "Papeterie et fourniture de bureau"]
    },
    {
      id: 5,
      name: "Maison, éclairage et construction",
      subcategories: ["Maison et jardin", "Mobilier", "Lumière et éclairage", "Bâtiment et construction"]
    },
    {
      id: 6,
      name: "Vêtements textiles et accessoires de mode",
      subcategories: ["Vêtements", "Textile et produit de cuir", "Accessoire de mode", "Horlogerie, bijouterie et optique"]
    },
    {
      id: 7,
      name: "Électronique et appareils électroménagers",
      subcategories: ["Image et son", "Informatique", "Appareils électroménagers", "Sécurité et protection"]
    },
    {
      id: 8,
      name: "Équipement électrique, composants et télécommunication",
      subcategories: ["Matériel électrique", "Composant électrique", "Télécommunication"]
    }
  ]);

  return (
    <nav className="bg-white relative z-30 shadow-navbar max-w-full mx-auto">
      {/* Top Bar */}
      <TopBar 
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto w-full flex flex-col">
        <div className="flex items-center justify-between h-16 bg-white px-2 mt-2 lg:px-8 w-full">
          {/* Mobile Menu Button */}
          <MobileMenu />

          {/* Logo */}
          <div className="flex items-center flex-grow sm:flex-grow-0 justify-center sm:justify-start">
            <Link to="/">
              <img src={logoColored} alt="Logo" className="h-7 sm:h-8 md:h-10 w-auto" />
            </Link>
          </div>

          {/* Search Bar (Large screens) */}
          <SearchBar />

          {/* Right Section */}
          <div className="flex items-center gap-6">
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

            <Link 
              to="/signin" 
              className="w-[110px] h-[40px] lg:w-[170px] lg:h-[40px] bg-blue-600 text-white text-sm lg:text-base font-semibold flex items-center justify-center rounded-lg shadow-lg hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              Mon Compte
            </Link>
          </div>
        </div>

        {/* Second Bar: Categories + Search + Navigation */}
        <div className="flex items-center justify-between h-12 w-full bg-white px-2 mt-2 mb-2 lg:px-8">
          {/* Categories Button */}
          <CategoriesDropdown categories={categories} />

          {/* Mobile Search */}
          <SearchBar isMobile />

          {/* Central Navigation */}
          <DesktopNavigation />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
          <div className="w-64 bg-blue-50 h-full shadow-lg">
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