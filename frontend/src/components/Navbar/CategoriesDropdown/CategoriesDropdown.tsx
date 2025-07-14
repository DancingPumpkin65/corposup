import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/Shadcn/NavigationMenu";
import categoriesIcon from '@/assets/Categories.svg';
import { useCategories } from '@/hooks';

const CategoriesDropdown = () => {
  const { categories, loading } = useCategories();
  
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
              <div className="w-[280px] sm:w-[350px] md:w-[400px] p-3 sm:p-4 max-h-[350px] sm:max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {loading ? (
                  <div className="text-center text-gray-500 py-4">
                    Chargement des catégories...
                  </div>
                ) : categories.length === 0 ? (
                  <div className="text-center text-gray-500 py-4">
                    Aucune catégorie disponible
                  </div>
                ) : (
                  categories.map((category) => {
                    return (
                      <div key={category.id} className="mb-3 sm:mb-4">
                        <NavigationMenuLink asChild>
                          <div className="block select-none space-y-1 rounded-md p-2 sm:p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600">
                            <div className="text-sm font-medium leading-none mb-2 flex items-center justify-between">
                              <span>{category.category_name}</span>
                            </div>
                            {category.children && category.children.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 mt-2">
                                {category.children.map((child, subIndex) => (
                                  <NavigationMenuLink key={subIndex} asChild>
                                    <Link
                                      to={`/categories/${child.id}/products`}
                                      className="block text-xs text-gray-600 hover:text-blue-600 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
                                    >
                                      {child.category_name}
                                    </Link>
                                  </NavigationMenuLink>
                                ))}
                              </div>
                            )}
                          </div>
                        </NavigationMenuLink>
                      </div>
                    );
                  })
                )}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default CategoriesDropdown;
