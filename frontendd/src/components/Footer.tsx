import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoWhite from '../assets/LogoWhite.svg';

interface Category {
  id: number;
  name: string;
}

const Footer = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="w-full">
      <div className="mx-auto px-6 bg-blue-600 pt-16 pb-4 z-auto">
        <div className="grid md:grid-cols-5 grid-cols-1 gap-7">
          {/* Company Info */}
          <div>
            <img src={logoWhite} alt="CorpoSup Logo" className="w-[200px]"/>
            <ul className="mt-6 text-gray-300">
              <li className="flex justify-start items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd"></path>
                </svg>
                <p className="p-2">+212 661 368 103</p>
              </li>
              <li className="flex justify-start items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"></path>
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"></path>
                </svg>
                <p className="px-2">contact@corposup.com</p>
              </li>
              <li className="flex justify-start items-start py-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd"></path>
                </svg>
                <p className="px-2">77 RUE MOHAMED SMIHA, ETAGE 10 N°57 - CASABLANCA</p>
              </li>
            </ul>
          </div>
          
          {/* Links Section */}
          <div>
            <h1 className="text-white text-xl font-bold">Links</h1>
            <ul className="mt-6 text-gray-300 space-y-2">
              <li><Link to="/all-products" className="hover:text-blue-500 transition-colors duration-200 block py-2">Products List</Link></li>
              <li><Link to="/tracking" className="hover:text-blue-500 transition-colors duration-200 block py-2">Order Tracking</Link></li>
              <li><Link to="/guide" className="hover:text-blue-500 transition-colors duration-200 block py-2">Products Guide</Link></li>
              <li><Link to="/cart" className="hover:text-blue-500 transition-colors duration-200 block py-2">Shopping Cart</Link></li>
              <li><Link to="/blog" className="hover:text-blue-500 transition-colors duration-200 block py-2">Tech Blog</Link></li>
            </ul>
          </div>

          {/* Supports Section */}
          <div>
            <h1 className="text-white text-xl font-bold">Supports</h1>
            <ul className="mt-6 text-gray-300 space-y-2">
              <li><Link to="/about" className="hover:text-blue-500 transition-colors duration-200 block py-2">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-500 transition-colors duration-200 block py-2">Privacy Policy</Link></li>
              <li><Link to="/returns" className="hover:text-blue-500 transition-colors duration-200 block py-2">Return Policy</Link></li>
              <li><Link to="/help" className="hover:text-blue-500 transition-colors duration-200 block py-2">Help Centre</Link></li>
            </ul>
          </div>
          
          {/* Categories Section */}
          <div>
            <h1 className="text-white text-xl font-bold">Categories</h1>
            <ul className="mt-6 text-gray-300 space-y-2">
              {categories.slice(0, 8).map((category) => (
                <li key={category.id} className="relative group">
                  <Link 
                    to={`/categories/${category.id}/products`}
                    className="hover:text-blue-500 transition-colors duration-200 block py-2"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payments & Social */}
          <div>
            <h1 className="text-white text-xl font-bold">Payments</h1>
            <div className="flex justify-between items-center mt-4">
              <img src="https://corposup.pro/images/visa.png" alt="Visa"/>
              <img src="https://corposup.pro/images/mestercard.png" alt="Mastercard"/>
              <img src="https://corposup.pro/images/pay.png" alt="Pay"/>
              <img src="https://corposup.pro/images/paypal.png" alt="Paypal"/>
            </div>
            <h1 className="text-white text-xl font-bold mt-6">Follow Us</h1>
            <ul className="mt-6 text-gray-300 space-y-2">
              <li><a href="https://twitter.com/corposup" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors duration-200">Twitter</a></li>
              <li><a href="https://www.instagram.com/corposup/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors duration-200">Instagram</a></li>
              <li><a href="https://web.facebook.com/share/r/1BH6bRUzNT/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors duration-200">Facebook</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between mx-auto w-full items-center p-4 text-gray-300 text-sm bg-black font-light">
        <p>© 2024 Corposup. All Rights Reserved.</p>
        <p>Privacy Policy | Terms & Condition | Sitemap</p>
      </div>
    </footer>
  );
};

export default Footer;