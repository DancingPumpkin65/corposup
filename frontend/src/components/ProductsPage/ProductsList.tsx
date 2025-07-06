import { ProductCard } from '.';
import { type Product } from './types';

interface ProductsListProps {
  products: Product[];
  viewMode: 'grid' | 'list';
}

const ProductsList = ({ products, viewMode }: ProductsListProps) => {
  return (
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
  );
};

export default ProductsList;
