import { Star, ShoppingCart } from 'lucide-react';
import type { Products } from '@/components/SellerPage/Products/types';

interface ProductCardProps {
  product: Products;
  previewImage?: string;
}

const ProductCard = ({ product, previewImage }: ProductCardProps) => {
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const {
    product_name,
    product_price,
    product_description,
    product_stock,
  } = product;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {previewImage ? (
          <img src={previewImage} alt="Aperçu du produit" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-xs">No Image</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">
          {truncateText(product_name, 50) || "Nom du produit"}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {truncateText(product_description, 80) || "Description du produit..."}
        </p>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className="text-sm text-gray-500">(Avis)</span>
        </div>
        <p className="text-sm text-gray-500 mb-3">
          Par (Vendeur)
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-blue-600">
            {(product_price || 0).toLocaleString()} DH
          </p>
          <button type="button" className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition-colors text-sm">
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Stock: {product_stock || 0}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
