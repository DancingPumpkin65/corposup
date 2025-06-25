import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoColored from '../assets/LogoColored.svg';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const categories = [
    {
      name: "Agriculture et alimentation",
      subcategories: [
        "Agriculture et élevage",
        "alimentation"
      ]
    },
    {
      name: "Machine et outils",
      subcategories: [
        "Machine et matériel",
        "outils et quincaillerie",
        "composants mécaniques",
        "instrument de mesure et d'analyse"
      ]
    },
    {
      name: "Métallurgie, chimie et plastiques",
      subcategories: [
        "Produits chimiques",
        "plastique et caoutchouc",
        "minéraux et métallurgie",
        "Energie"
      ]
    },
    // ...existing code... (add other categories)
  ];

  return (
    <nav className="bg-white relative z-10 shadow-navbar max-w-full mx-auto">
      {/* Top Bar */}
      <div className="bg-blue-600 w-full px-2 sm:px-4 md:px-12 lg:px-32 flex justify-between items-center">
        <div className="flex w-full justify-between items-center py-2 overflow-x-auto">
          <div className="flex flex-row items-center text-white text-xs sm:text-sm space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd"></path>
              </svg>
              <span className="text-xs sm:text-sm md:text-base">+212 661 368 103</span>
            </div>

            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"></path>
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"></path>
              </svg>
              <span className="tracking-wider text-xs sm:text-sm">contact@corposup.com</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 ml-2 sm:ml-4">
            <div className="relative flex items-center border-r-2 border-gray-300 pr-6">
              <select className="text-xs sm:text-sm bg-blue-600 text-white border-0 px-1 sm:px-2 py-1 font-semibold">
                <option>Dirham (DH)</option>
                <option>$ Dollar (US)</option>
                <option>Euro (EU)</option>
              </select>
            </div>
            
            <div className="relative flex items-center border-0 md:border-r-2 border-gray-300">
              <select className="text-sm text-white bg-blue-600 border-0 px-1 sm:px-8 py-1 appearance-none pr-6 font-semibold">
                <option value="en">EN</option>
                <option value="fr">FR</option>
              </select>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <a href="#" className="pl-2">
                <svg className="w-[18px] h-[18px] text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd"></path>
                </svg>
              </a>
              {/* ...existing code... (other social icons) */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto w-full flex flex-col">
        <div className="flex items-center justify-between h-16 bg-white px-2 lg:px-8 w-full">
          {/* Mobile Menu Button */}
          <button 
            className="flex items-center sm:hidden p-0 rounded-md focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <span className="ml-2 text-black font-semibold">Menu</span>
          </button>

          {/* Logo */}
          <div className="flex items-center flex-grow sm:flex-grow-0 justify-center sm:justify-start">
            <Link to="/">
              <img src={logoColored} alt="Logo" className="h-8 sm:h-8 md:h-10" />
            </Link>
          </div>

          {/* Search Bar (Large screens) */}
          <div className="hidden lg:block lg:flex-grow max-w-2xl px-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Rechercher ici ..." 
                className="w-full pl-4 pr-10 py-2 text-gray-700 border-none bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-5 h-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="3" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"></path>
                </svg>
              </div>
            </div>
          </div>

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
              className="w-[110px] h-[40px] lg:w-[182px] lg:h-[47px] bg-blue-600 text-white text-sm lg:text-base font-bold flex items-center justify-center rounded-lg shadow-lg hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              Mon Compte
            </Link>
          </div>
        </div>

        {/* Second Bar: Categories + Search + Navigation */}
        <div className="flex items-center justify-between h-16 w-full bg-white px-6">
          {/* Categories Button */}
          <div 
            onClick={toggleDropdown} 
            className="relative flex items-center lg:pl-8 space-x-2 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
            </svg>
            <p className="font-montserrat font-semibold text-[16px] leading-[19.5px] text-black">Catégories</p>
            
            {dropdownOpen && (
              <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md w-48 z-50">
                <ul className="py-4">
                  {categories.map((category, index) => (
                    <li key={index} className="relative group">
                      <a className="flex items-center justify-between px-4 py-2 w-full bg-white hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out text-sm md:text-base whitespace-normal break-words">
                        <span className="font-medium">{category.name}</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </a>
                      {/* ...existing code... (subcategories) */}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Search */}
          <div className="block lg:hidden lg:flex-grow w-3/5 pl-5">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Rechercher ici ..." 
                className="w-full pl-4 pr-10 py-2 text-gray-700 border-none bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-5 h-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="3" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Central Navigation */}
          <nav className="flex-1 flex justify-center hidden lg:flex">
            <ul className="flex space-x-8 text-lg font-medium text-black">
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
        </div>
      </div>

      {/* Mobile Menu */}
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