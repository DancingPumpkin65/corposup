import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';

interface Category {
  id: number;
  category_name: string;
  subcategories?: Category[];
}

interface CategoriesComponentProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
}

const CategoriesComponent = ({ selectedCategory, onCategorySelect }: CategoriesComponentProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/categories');
      console.log('Categories Response:', response.data); // Debug log
      
      // Handle the response structure from your API
      let categoriesData = response.data;
      if (categoriesData.data) {
        categoriesData = categoriesData.data;
      }
      
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mb-8 border-2 border-gray-200 rounded-lg p-4">
        <h2 className="text-md font-bold text-blue-500">Show all categories</h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 border-2 border-gray-200 rounded-lg p-4">
      <h2 className="text-md font-bold text-blue-500">Show all categories</h2>
      <div className="w-full p-5 rounded-lg h-[310px] overflow-y-auto custom-scrollbar">
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="my-4">
              <a 
                href="#" 
                className="text-gray-700 font-bold hover:text-blue-500"
                onClick={(e) => {
                  e.preventDefault();
                  onCategorySelect(category.id.toString());
                }}
              >
                {category.category_name}
              </a>
              {category.subcategories && category.subcategories.length > 0 && (
                <ul className="ml-4 mt-1">
                  {category.subcategories.map((subcategory) => (
                    <li 
                      key={subcategory.id}
                      className={`text-gray-600 hover:text-blue-500 cursor-pointer ${
                        selectedCategory === subcategory.id.toString() ? 'text-blue-500 font-semibold' : ''
                      }`}
                      onClick={() => onCategorySelect(subcategory.id.toString())}
                    >
                      {subcategory.category_name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesComponent;
