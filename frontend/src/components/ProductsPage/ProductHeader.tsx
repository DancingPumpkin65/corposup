import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';

interface Category {
  id: number;
  category_name: string;
}

interface ProductHeaderProps {
  categoryId: string | null;
}

const ProductHeader = ({ categoryId }: ProductHeaderProps) => {
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await apiClient.get(`/categories/${categoryId}`);
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  const getCategoryImage = () => {
    // Return different images based on category
    return '/images/RCP.png'; // Default image
  };

  return (
    <div 
      className="relative text-white p-6 rounded-2xl mb-6 w-full bg-no-repeat bg-cover bg-center h-32"
      style={{ backgroundImage: `url('${getCategoryImage()}')` }}
    >
      <div className="absolute inset-0 object-cover rounded-2xl bg-gradient-to-r from-blue-600 to-blue-600/30"></div>
      
      <div className="relative max-w-full">
        <h1 className="text-md lg:text-xl font-bold uppercase tracking-wider">
          {category ? category.category_name : 'Tous les produits'}
        </h1>
      </div>
    </div>
  );
};

export default ProductHeader;
