import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '../components/layouts/MainLayout';
import {
    CategoriesComponent,
    FiltersComponent,
    ProductHeader,
    ProductsComponent
} from '../components/ProductsPage';

interface Filters {
  priceRange: { min: number; max: number };
  selectedStore: string;
  sortBy: string;
}

const ProductsPage = () => {
  const { categoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryId || null);
  const [filters, setFilters] = useState<Filters>({
    priceRange: { min: 0, max: 25000 },
    selectedStore: '',
    sortBy: 'popularity'
  });

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, [categoryId]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row gap-8 px-4 mx-auto py-10">
        {/* Sidebar */}
        <aside className="w-full md:w-[330px] bg-white p-6 rounded-lg">
          <CategoriesComponent 
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
          <FiltersComponent 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full">
          <ProductHeader categoryId={selectedCategory} />
          <ProductsComponent 
            categoryId={selectedCategory}
            filters={filters}
          />
        </main>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;