import { useState, useEffect, useCallback } from 'react';
import apiClient from '../../services/apiClient';
import CategorieImg from '../../assets/CategorieImg.png';

interface Category {
  id: number;
  category_name: string;
}

interface ProductHeaderProps {
  categoryId: string | null;
}

const ProductHeader = ({ categoryId }: ProductHeaderProps) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCategory = useCallback(async () => {
    if (!categoryId) return;
    
    setLoading(true);
    try {
      const response = await apiClient.get(`/categories/${categoryId}`);
      
      let categoryData = response.data;
      if (categoryData.data) {
        categoryData = categoryData.data;
      }
      
      setCategory(categoryData);
    } catch (error) {
      console.error('Error fetching category:', error);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId, fetchCategory]);

  return (
    <div 
      className="relative text-white p-6 rounded-2xl mb-6 w-full bg-no-repeat bg-cover bg-center h-32"
      style={{ backgroundImage: `url('${CategorieImg}')`, backgroundPosition: 'top' }}
    >
      <div className="absolute inset-0 object-cover rounded-2xl bg-gradient-to-r from-blue-600 to-blue-600/30"></div>
      
      <div className="relative max-w-full">
        <h1 className="text-md lg:text-xl font-bold uppercase tracking-wider">
          {loading ? 'Chargement...' : category ? category.category_name : 'Tous les produits'}
        </h1>
      </div>
    </div>
  );
};

export default ProductHeader;
