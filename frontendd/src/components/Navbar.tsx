import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoColored from '../assets/LogoColored.svg';
import categoriesIcon from '../assets/Categories.svg';
import {DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/DropdownMenu';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState("dh");
  const [language, setLanguage] = useState("fr");


  const categories = [
    {
      name: "Agriculture et alimentation",
      subcategories: [
        "Agriculture et élevage",
        "Alimentation"
      ]
    },
    {
      name: "Machine et outils",
      subcategories: [
        "Machine et matériel",
        "Outils et quincaillerie",
        "Composants mécaniques",
        "Instrument de mesure et d'analyse"
      ]
    },
    {
      name: "Métallurgie, chimie et plastiques",
      subcategories: [
        "Produits chimiques",
        "Plastique et caoutchouc",
        "Minéraux et métallurgie",
        "Energie"
      ]
    },
    {
      name: "Textile et cuir",
      subcategories: [
        "Textile",
        "Cuir et articles en cuir",
        "Chaussures"
      ]
    },
    {
      name: "Construction et immobilier",
      subcategories: [
        "Matériaux de construction",
        "Équipements de construction",
        "Services immobiliers"
      ]
    }
  ];

  const getCurrencyDisplay = (value: string) => {
    switch(value) {
      case 'dh': return 'Devise (MAD)';
      case 'usd': return 'Devise (US)';
      case 'eur': return 'Devise (EU)';
      default: return 'Devise (MAD)';
    }
  };

  const getLanguageDisplay = (value: string) => {
    switch(value) {
      case 'en': return 'EN';
      case 'fr': return 'FR';
      default: return 'FR';
    }
  };

  return (
    <nav className="bg-white relative z-30 shadow-navbar max-w-full mx-auto">
      {/* Top Bar */}
      <div className="bg-blue-600 w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-2 lg:px-8">
          <div className="flex w-full justify-between items-center py-2">
            <div className="flex flex-row items-center text-white text-xs sm:text-sm space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd"></path>
                </svg>
                <span className="text-[13px] leading-none font-medium tracking-wider">+212 661 368 103</span>
              </div>

              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"></path>
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"></path>
                </svg>
                <span className="text-[14px] leading-none font-medium tracking-wider">contact@corposup.com</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 ml-2 sm:ml-4">
              {/* Currency */}
              <div className="relative border-0 md:border-r-2 border-gray-300 pr-0 md:pr-6">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="relative flex items-center">
                      <span className="text-sm text-white bg-blue-600 border-0 px-1 sm:px-2 py-1 font-semibold cursor-pointer whitespace-nowrap">
                        {getCurrencyDisplay(currency)}
                      </span>
                      <div className="pointer-events-none ml-1 flex items-center text-white">
                        <svg className="md:w-4 md:h-4 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-[125px]">
                    <DropdownMenuRadioGroup value={currency} onValueChange={setCurrency}>
                      <DropdownMenuRadioItem value="dh">(MAD)</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="usd">(US)</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="eur">(EU)</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Language */}
              <div className="relative border-0 md:border-r-2 border-gray-300 pr-0 md:pr-6">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="relative flex align-center items-center w-[80px]">
                      <span className="text-sm text-white bg-blue-600 border-0 px-1 sm:px-4 py-1 font-semibold cursor-pointer whitespace-nowrap">
                        {getLanguageDisplay(language)}
                      </span>
                      <div className="pointer-events-none ml-1 flex items-center text-white">
                        <svg className="md:w-4 md:h-4 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-[70px]">
                    <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                      <DropdownMenuRadioItem value="fr">FR</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="en">EN</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Socials (hidden on mobile) */}
              <div className="hidden md:flex items-center space-x-3">
                <a href="https://web.facebook.com/share/r/1BH6bRUzNT/" className="pl-2" target="new">
                  <svg className="w-[18px] h-[18px] text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/corposup" target="new">
                  <svg className="w-[17px] h-[17px] text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M20.45 20.45h-3.4v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.691V9h3.264v1.562h.046c.455-.861 1.564-1.766 3.22-1.766 3.444 0 4.079 2.267 4.079 5.218v6.436zM5.337 7.433a1.968 1.968 0 01-1.97-1.97c0-1.087.883-1.97 1.97-1.97s1.97.883 1.97 1.97a1.97 1.97 0 01-1.97 1.97zm1.7 13.017h-3.4V9h3.4v11.45zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="https://www.instagram.com/corposup/" target="new">
                  <svg className="w-[21px] h-[21px] text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
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
              <img src={logoColored} alt="Logo" className="h-8 sm:h-8 md:h-10 w-auto" />
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
              className="w-[110px] h-[40px] lg:w-[170px] lg:h-[40px] bg-blue-600 text-white text-sm lg:text-base font-semibold flex items-center justify-center rounded-lg shadow-lg hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              Mon Compte
            </Link>
          </div>
        </div>

        {/* Second Bar: Categories + Search + Navigation */}
        <div className="flex items-center justify-between h-12 w-full bg-white px-2 lg:px-8">
          {/* Categories Button */}
          <div className="relative flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <img className="w-6 h-6" src={categoriesIcon} alt="Categories" />
                  <p className="font-montserrat font-semibold text-[16px] leading-[19.5px] text-black">Catégories</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72">
                <DropdownMenuGroup>
                  {categories.map((category, index) => (
                    <DropdownMenuSub key={index}>
                      <DropdownMenuSubTrigger>
                        {category.name}
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          {category.subcategories.map((subcategory, subIndex) => (
                            <DropdownMenuItem 
                              key={subIndex}
                              onClick={() => console.log(`Selected: ${category.name} -> ${subcategory}`)}
                            >
                              {subcategory}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Search */}
          <div className="block lg:hidden lg:flex-grow w-3/5 pl-4">
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