import { Grid, List, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../Shadcn/DropdownMenu';
import { type ProductsHeaderProps } from './types';

const ProductsHeader = ({ 
  productsCount, 
  viewMode, 
  setViewMode, 
  sortBy, 
  setSortBy 
}: ProductsHeaderProps) => {
  const sortOptions = [
    { value: 'popularity', label: 'Popularité' },
    { value: 'price-low', label: 'Prix croissant' },
    { value: 'price-high', label: 'Prix décroissant' },
    { value: 'name', label: 'Nom A-Z' },
  ];

  const getCurrentSortLabel = () => {
    return sortOptions.find(option => option.value === sortBy)?.label || 'Popularité';
  };

  return (
    <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
      <h2 className="text-xl font-bold capitalize">
        {productsCount} produit{productsCount !== 1 ? 's' : ''} trouvé{productsCount !== 1 ? 's' : ''}
      </h2>
      <div className="flex items-center space-x-2">
        <div className="flex items-center p-2 cursor-pointer">
          <Grid 
            className={`mr-2 h-5 w-5 cursor-pointer ${viewMode === 'grid' ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={() => setViewMode('grid')}
          />
          <List 
            className={`h-5 w-5 cursor-pointer ${viewMode === 'list' ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={() => setViewMode('list')}
          />
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-500 tracking-wider">Afficher par</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-sm border-none bg-transparent hover:bg-gray-50 px-2 py-1 rounded transition-colors">
              <span>{getCurrentSortLabel()}</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`cursor-pointer ${sortBy === option.value ? 'bg-gray-100' : ''}`}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;
