import { useParams } from 'react-router-dom';
import { useCategories } from '@/hooks/useCategories';
import CategorieImg from '@/assets/CategorieImg.png';

const ProductHeader = () => {
  const { categories, loading } = useCategories();
  const { categoryId } = useParams<{ categoryId: string }>();

  let childCategoryName = 'Tous les produits';
  if (!loading && categoryId) {
    const idNum = Number(categoryId);
    for (const parent of categories) {
      if (Array.isArray(parent.children)) {
        const found = parent.children.find((child) => child.id === idNum);
        if (found) {
          childCategoryName = found.category_name;
          break;
        }
      }
    }
  }

  if (loading) 
    return (
      <div 
      className="relative text-white p-6 rounded-2xl mb-6 w-full bg-no-repeat bg-cover bg-center h-32"
      style={{ backgroundImage: `url('${CategorieImg}')`, backgroundPosition: 'top' }}
    >
      <div className="absolute inset-0 object-cover rounded-2xl bg-gradient-to-r from-blue-600 to-blue-600/30"></div>
      
      <div className="relative max-w-full">
        <h1 className="text-md lg:text-xl font-bold uppercase tracking-wider">
          Chargement...
        </h1>
      </div>
    </div>
    );
    
  return (
    <div 
      className="relative text-white p-6 rounded-2xl mb-6 w-full bg-no-repeat bg-cover bg-center h-32"
      style={{ backgroundImage: `url('${CategorieImg}')`, backgroundPosition: 'top' }}
    >
      <div className="absolute inset-0 object-cover rounded-2xl bg-gradient-to-r from-blue-600 to-blue-600/30"></div>
      
      <div className="relative max-w-full">
        <h1 className="text-md lg:text-xl font-bold uppercase tracking-wider">
          {childCategoryName}
        </h1>
      </div>
    </div>
  );
};

export default ProductHeader;
