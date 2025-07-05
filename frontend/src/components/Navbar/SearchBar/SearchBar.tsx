interface SearchBarProps {
  isMobile?: boolean;
}

const SearchBar = ({ isMobile = false }: SearchBarProps) => {
  const mobileClasses = "block lg:hidden lg:flex-grow w-3/5";
  const desktopClasses = "hidden lg:block lg:flex-grow max-w-2xl px-4";

  return (
    <div className={isMobile ? mobileClasses : desktopClasses}>
      <div className="relative">
        <input 
          id={isMobile ? "search-mobile" : "search-desktop"}
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
  );
};

export default SearchBar;
