import { useState, useEffect, useCallback } from 'react';
import { Grid, List, ChevronDown } from 'lucide-react';
import apiClient from '@/services/apiClient';
import { ProductCard } from '.';
import emptyProduct from '@/assets/EmptyProduct.svg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../Shadcn/DropdownMenu';

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  product_description: string;
  product_stock: number;
  // Make these optional since they might not be included in API responses
  seller?: {
    firstname: string;
    lastname: string;
  };
  store?: {
    store_name: string;
  };
  category?: {
    category_name: string;
  };
  // These might be the actual field names from your API
  seller_id?: number;
  store_id?: number;
  category_id?: number;
}

interface ProductsComponentProps {
  categoryId: string | null;
  filters: {
    priceRange: { min: number; max: number };
    selectedStore: string;
    sortBy: string;
  };
}

const ProductsComponent = ({ categoryId, filters }: ProductsComponentProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');

  const sortOptions = [
    { value: 'popularity', label: 'Popularité' },
    { value: 'price-low', label: 'Prix croissant' },
    { value: 'price-high', label: 'Prix décroissant' },
    { value: 'name', label: 'Nom A-Z' },
  ];

  const getCurrentSortLabel = () => {
    return sortOptions.find(option => option.value === sortBy)?.label || 'Popularité';
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let url = '/all-products';
      
      if (categoryId) {
        url = `/categories/${categoryId}/products`;
      } else if (filters.selectedStore) {
        url = `/stores/${filters.selectedStore}/products`;
      }

      const response = await apiClient.get(url);
      
      // Handle your API response structure
      let fetchedProducts = response.data;
      
      // If response is wrapped in a data property
      if (fetchedProducts.data) {
        fetchedProducts = fetchedProducts.data;
      }
      
      // If response is an object with products array
      if (fetchedProducts.products) {
        fetchedProducts = fetchedProducts.products;
      }
      
      // Ensure we have an array
      if (!Array.isArray(fetchedProducts)) {
        console.error('Expected array of products, got:', fetchedProducts);
        setProducts([]);
        return;
      }

      // Apply price filter
      fetchedProducts = fetchedProducts.filter((product: Product) => 
        product.product_price >= filters.priceRange.min && 
        product.product_price <= filters.priceRange.max
      );

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          fetchedProducts.sort((a: Product, b: Product) => a.product_price - b.product_price);
          break;
        case 'price-high':
          fetchedProducts.sort((a: Product, b: Product) => b.product_price - a.product_price);
          break;
        case 'name':
          fetchedProducts.sort((a: Product, b: Product) => a.product_name.localeCompare(b.product_name));
          break;
        default:
          // Keep original order for popularity
          break;
      }

      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId, filters, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <section>
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <h2 className="text-xl font-bold capitalize">Chargement...</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h2 className="text-xl font-bold capitalize">
          {products.length} produit{products.length !== 1 ? 's' : ''} trouvé{products.length !== 1 ? 's' : ''}
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

      {products.length === 0 ? (
        <div className="flex justify-center items-center mt-10">
          <div className="text-center flex flex-col">
            <img src={ emptyProduct } alt="No products" className="mx-auto mb-4" />
            <p className="text-gray-600 text-lg mt-4 font-semibold">Aucun produit disponible</p>
          </div>
        </div>
      ) : (
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'flex flex-col space-y-4'
        }`}>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsComponent;
