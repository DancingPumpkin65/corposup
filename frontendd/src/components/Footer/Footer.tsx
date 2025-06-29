import { Link } from 'react-router-dom';
import logoWhite from '../../assets/LogoWhite.svg';

const Footer = () => {
  // Manual categories list without API
  const categories = [
    { id: 1, name: "Agriculture et alimentation" },
    { id: 2, name: "Machine et outils" },
    { id: 3, name: "Métallurgie, chimie et plastiques" },
    { id: 4, name: "Emballage, publicité et bureaux" },
    { id: 5, name: "Maison, éclairage et construction" },
    { id: 6, name: "Vêtements textiles et accessoires de mode" },
    { id: 7, name: "Électronique et appareils électroménagers" },
    { id: 8, name: "Équipement électrique, composants et télécommunication" }
  ];

  return (
    <footer className="w-full">
      <div className="mx-auto pl-10 pr-10 sm:px-6 bg-blue-600 pt-8 sm:pt-12 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Company Info - Full width on mobile, 3 columns on desktop */}
          <div className="sm:col-span-4 lg:col-span-3">
            <img src={logoWhite} alt="CorpoSup Logo" className="w-[250px] sm:w-[250px]"/>
            <ul className="mt-6 text-gray-300">
                    
                    
                    <li className="flex justify-start items-start py-2">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd"></path>
                            </svg>
                        </span>
                        <span><p className="px-2 text-sm">77 RUE MOHAMED SMIHA, ETAGE 10 N°57 - CASABLANCA</p></span>
                    </li>
                </ul>
          </div>

          {/* Categories Section - Full width on mobile, centered on desktop */}
          <div className="sm:col-span-2 lg:col-start-4 lg:col-span-6">
            <h3 className="text-white text-lg font-semibold mb-3">Catégories</h3>
            <ul className="text-gray-300 space-y-1.5 text-sm grid grid-cols-1 lg:grid-cols-2 gap-x-0">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link 
                    to={`/categories/${category.id}/products`}
                    className="hover:text-white transition-colors duration-200 leading-tight"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links and Support - Side by side on mobile, separate columns on desktop */}
          <div className="grid grid-cols-2 gap-4 sm:col-span-2 lg:contents">
            {/* Links Section */}
            <div className="lg:col-start-11 lg:col-span-1">
              <h3 className="text-white text-lg font-semibold mb-3">Liens</h3>
              <ul className="text-gray-300 space-y-1.5 text-sm">
                <li><Link to="/all-products" className="hover:text-white transition-colors duration-200">Products List</Link></li>
                <li><Link to="/tracking" className="hover:text-white transition-colors duration-200">Order Tracking</Link></li>
                <li><Link to="/guide" className="hover:text-white transition-colors duration-200">Products Guide</Link></li>
                <li><Link to="/cart" className="hover:text-white transition-colors duration-200">Shopping Cart</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors duration-200">Tech Blog</Link></li>
              </ul>
            </div>

            {/* Supports Section */}
            <div className="lg:col-start-12 lg:col-span-1">
              <h3 className="text-white text-lg font-semibold mb-3">Support</h3>
              <ul className="text-gray-300 space-y-1.5 text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors duration-200">About Us</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
                <li><Link to="/returns" className="hover:text-white transition-colors duration-200">Return Policy</Link></li>
                <li><Link to="/help" className="hover:text-white transition-colors duration-200">Help Centre</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-800 px-4 sm:px-6 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-400 text-xs sm:text-sm">
          <p>© 2024 Corposup. All Rights Reserved.</p>
          <p className="mt-1 sm:mt-0">Privacy Policy | Terms & Conditions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;