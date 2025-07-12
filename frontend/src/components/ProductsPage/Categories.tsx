import { Link } from 'react-router-dom';
import { type CategoriesDropdownProps } from './types';

const CategoriesComponent = ({ categories, loading }: CategoriesDropdownProps) => {

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
      <div className="w-full px-5 rounded-lg h-[310px] overflow-y-auto custom-scrollbar">
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="my-4">
              <span className="text-gray-700 font-bold cursor-default">{category.name}</span>
              {category.subcategories && category.subcategories.length > 0 && (
                <ul className="ml-4 mt-1">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.id}>
                      <Link
                        to={`/categories/${subcategory.id}/products`}
                        className="block text-xs text-gray-600 hover:text-blue-600 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
                      >
                        {subcategory.name}
                      </Link>
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
