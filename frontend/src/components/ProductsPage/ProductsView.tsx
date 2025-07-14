import ProductsHeader from '@/components/ProductsPage/ProductsHeader';
import ProductsLoadingSkeleton from '@/components/ProductsPage/ProductsLoadingSkeleton';
import EmptyProducts from '@/components/ProductsPage/EmptyProducts';
import ProductsList from '@/components/ProductsPage/ProductsList';
import { useProducts } from '@/hooks/useProducts';
import { type ProductsComponentProps } from './types';
import { useMemo } from 'react';

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
      selectedStore: filters.selectedStore && filters.selectedStore !== '' ? filters.selectedStore : null
    }
  });

  const filteredProducts = useMemo(() => {
    if (filters.selectedStore) {
      const storeId = String(filters.selectedStore);
      return products.filter(
        (product) => String(product.store_id) === storeId
      );
    }
    return products;
  }, [products, filters.selectedStore]);

  if (loading) {
    return <ProductsLoadingSkeleton />;
  }

  return (
    <>
      <ProductsHeader
        productsCount={filteredProducts.length}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {filteredProducts.length === 0 ? (
        <EmptyProducts />
      ) : (
        <ProductsList products={filteredProducts} viewMode={viewMode} />
      )}
    </>
  );
};

export default ProductsComponent;
