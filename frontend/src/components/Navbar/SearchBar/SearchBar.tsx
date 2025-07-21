import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/Shadcn/RadioGroup";


interface SearchBarProps {
  isMobile?: boolean;
}

const SearchBar = ({ isMobile = false }: SearchBarProps) => {
  const [searchType, setSearchType] = useState<"store" | "product">("store");
  const mobileClasses = "block lg:hidden lg:flex-grow w-3/5";
  const desktopClasses = "hidden lg:block lg:flex-grow max-w-2xl px-4";

  return (
    <div className={isMobile ? mobileClasses : desktopClasses}>
      <div className="relative">
        <input
          id={isMobile ? "search-mobile" : "search-desktop"}
          type="text"
          placeholder={
            searchType === "store"
              ? "Rechercher une boutique..."
              : "Rechercher un produit..."
          }
          className="w-full h-[50px] pl-4 pr-36 py-2 text-gray-700 border-none bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
        />
        {/* Inline radio group inside the search bar */}
        <div className="absolute inset-y-0 right-4 flex items-center gap-2">
          <RadioGroup
            value={searchType}
            onValueChange={(val) => setSearchType(val as "store" | "product")}
            className="flex flex-row items-center gap-2"
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem
                value="store"
                id="search-store"
                className="accent-orange-500"
              />
              <label
                htmlFor="search-store"
                className="text-xs text-gray-600 cursor-pointer"
              >
                Boutique
              </label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem
                value="product"
                id="search-product"
                className="accent-orange-500"
              />
              <label
                htmlFor="search-product"
                className="text-xs text-gray-600 cursor-pointer"
              >
                Produit
              </label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
