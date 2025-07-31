import { Link } from 'react-router-dom';
import categoriesIcon from '@/assets/Categories.svg';
import { useCategories } from '@/hooks';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/Shadcn/DropdownMenu";
import { Button } from "@/components/Shadcn/Button";

const CategoriesDropdown = () => {
  const { categories, loading } = useCategories();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <img className="w-5 h-5" src={categoriesIcon} alt="Categories" />
          <span className="text-xl text-black font-semibold">Catégories</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start">
        <DropdownMenuLabel>Catégories principales</DropdownMenuLabel>
        <DropdownMenuGroup>
          {loading ? (
            <DropdownMenuItem disabled>
              <span className="text-gray-500">Chargement des catégories...</span>
            </DropdownMenuItem>
          ) : categories.length === 0 ? (
            <DropdownMenuItem disabled>
              <span className="text-gray-500">Aucune catégorie disponible</span>
            </DropdownMenuItem>
          ) : (
            categories.map((category) => (
              <DropdownMenuSub key={category.id}>
                <DropdownMenuSubTrigger>
                  {category.category_name}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-64">
                    {/* Children level 1 */}
                    {Array.isArray(category.children) && category.children.length > 0 ? (
                      category.children.map((child) => (
                        <DropdownMenuSub key={child.id}>
                          <DropdownMenuSubTrigger>
                            <Link to={`/categories/${child.id}/products`} className="hover:underline">
                              {child.category_name}
                            </Link>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="w-64">
                              {/* Children level 2 (grandchildren) */}
                              {Array.isArray(child.children) && child.children.length > 0 ? (
                                <>
                                  {child.children.slice(0, 4).map((grandchild) => (
                                    <DropdownMenuItem key={grandchild.id}>
                                      <Link
                                        to={`/categories/${grandchild.id}/products`}
                                        className="block w-full text-xs text-gray-700 hover:text-blue-600"
                                      >
                                        {grandchild.category_name}
                                      </Link>
                                    </DropdownMenuItem>
                                  ))}
                                  {child.children.length > 4 && (
                                    <DropdownMenuItem disabled>
                                      <span className="text-xs text-gray-400">
                                        + {child.children.length - 4} autres...
                                      </span>
                                    </DropdownMenuItem>
                                  )}
                                </>
                              ) : (
                                <DropdownMenuItem disabled>
                                  <span className="text-xs text-gray-400">Aucune sous-catégorie</span>
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      ))
                    ) : (
                      <DropdownMenuItem disabled>
                        <span className="text-xs text-gray-400">Aucune sous-catégorie</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ))
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoriesDropdown;
