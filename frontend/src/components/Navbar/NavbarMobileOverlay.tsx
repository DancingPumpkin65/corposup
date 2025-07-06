import { Link } from 'react-router-dom';

interface NavbarMobileOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavbarMobileOverlay = ({ isOpen, onClose }: NavbarMobileOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
      <div className="w-64 bg-blue-50 h-full shadow-xl">
        <button 
          className="p-4 text-gray-700" 
          onClick={onClose}
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6"></path>
          </svg>
        </button>
        <nav className="p-6 space-y-4 max-w-xs mx-auto z-1">
          <Link to="/" className="block text-gray-700 hover:text-blue-600 hover:bg-blue-100 transition-all duration-300 p-2 rounded-lg border-b border-blue-300">
            Accueil
          </Link>
          <Link to="/blog" className="block text-gray-700 hover:text-blue-600 hover:bg-blue-100 transition-all duration-300 p-2 rounded-lg border-b border-blue-300">
            Blogs
          </Link>
          <Link to="/abonnements" className="block text-gray-700 hover:text-blue-600 hover:bg-blue-100 transition-all duration-300 p-2 rounded-lg border-b border-blue-300">
            Abonnements
          </Link>
          <Link to="/contact" className="block text-gray-700 hover:text-blue-600 hover:bg-blue-100 transition-all duration-300 p-2 rounded-lg border-b border-blue-300">
            Contact
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default NavbarMobileOverlay;
