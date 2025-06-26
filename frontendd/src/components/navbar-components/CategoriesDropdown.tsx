import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import categoriesIcon from '../../assets/Categories.svg';

interface Category {
  id: number;
  name: string;
  subcategories?: string[];
}

interface CategoriesDropdownProps {
  categories: Category[];
}

const CategoriesDropdown = ({ categories }: CategoriesDropdownProps) => {
  return (
    <div className="relative flex items-center space-x-2">
      <NavigationMenu className="relative z-1">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center space-x-2 cursor-pointer bg-transparent border-0 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent p-0">
              <img className="w-5 h-5" src={categoriesIcon} alt="Categories" />
              <p className="text-xl text-black font-semibold">Catégories</p>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] p-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {categories.map((category) => (
                  <div key={category.id} className="mb-4">
                    <NavigationMenuLink asChild>
                      <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600">
                        <div className="text-sm font-medium leading-none mb-2 flex items-center justify-between">
                          <span>{category.name}</span>
                        </div>
                        {category.subcategories && (
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {category.subcategories.map((subcategory, subIndex) => (
                              <NavigationMenuLink key={subIndex} asChild>
                                <Link 
                                  to={`/categories/${category.id}/products`}
                                  className="block text-xs text-gray-600 hover:text-blue-600 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
                                  onClick={() => console.log(`Selected: ${category.name} -> ${subcategory}`)}
                                >
                                  {subcategory}
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        )}
                      </div>
                    </NavigationMenuLink>
                  </div>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default CategoriesDropdown;
