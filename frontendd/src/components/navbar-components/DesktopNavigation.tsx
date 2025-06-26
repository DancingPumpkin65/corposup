import { Link } from 'react-router-dom';

const DesktopNavigation = () => {
  return (
    <nav className="flex-1 flex justify-center hidden lg:flex">
      <ul className="flex space-x-20 text-lg font-medium text-black">
        <li>
          <Link 
            to="/" 
            className="group transition-all duration-300 ease-in-out"
          >
            <span className="bg-left-bottom bg-gradient-to-r hover:text-blue-600 from-blue-600 to-blue-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              Accueil
            </span>
          </Link>
        </li>
        <li>
          <Link 
            to="/blog" 
            className="group transition-all duration-300 ease-in-out"
          >
            <span className="bg-left-bottom bg-gradient-to-r hover:text-blue-600 from-blue-600 to-blue-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              Blogs
            </span>
          </Link>
        </li>
        <li>
          <Link 
            to="/abonnements" 
            className="group transition-all duration-300 ease-in-out"
          >
            <span className="bg-left-bottom bg-gradient-to-r hover:text-blue-600 from-blue-600 to-blue-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              Abonnements
            </span>
          </Link>
        </li>
        <li>
          <Link 
            to="/contact" 
            className="group transition-all duration-300 ease-in-out"
          >
            <span className="bg-left-bottom bg-gradient-to-r hover:text-blue-600 from-blue-600 to-blue-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              Contact
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNavigation;
