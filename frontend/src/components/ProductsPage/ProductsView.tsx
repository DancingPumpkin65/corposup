import ProductsHeader from '@/components/ProductsPage/ProductsHeader';
import ProductsLoadingSkeleton from '@/components/ProductsPage/ProductsLoadingSkeleton';
import EmptyProducts from '@/components/ProductsPage/EmptyProducts';
import ProductsList from '@/components/ProductsPage/ProductsList';
import { useProducts } from '@/hooks/useProducts';
import { type ProductsComponentProps } from './types';

const ProductsComponent = ({ categoryId, filters }: ProductsComponentProps) => {
  const {
    products,
    loading,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy
  } = useProducts({ 
    categoryId: categoryId || null, 
    filters: {
      ...filters,
      selectedStore: filters.selectedStore || null
    }
  });

  if (loading) {
    return <ProductsLoadingSkeleton />;
  }

  return (
    <section>
      <ProductsHeader
        productsCount={products.length}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {products.length === 0 ? (
        <EmptyProducts />
      ) : (
        <ProductsList products={products} viewMode={viewMode} />
      )}
    </section>
  );
};

export default ProductsComponent;
