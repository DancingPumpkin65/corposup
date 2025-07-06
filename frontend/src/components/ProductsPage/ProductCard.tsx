import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { type ProductCardProps } from './types';

const ProductCard = ({ product, viewMode }: ProductCardProps) => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Safe getters for potentially missing data
  const getSellerName = () => {
    if (product.seller?.firstname && product.seller?.lastname) {
      return `${product.seller.firstname} ${product.seller.lastname}`;
    }
    return 'Vendeur inconnu';
  };

  const getStoreName = () => {
    return product.store?.store_name || 'Boutique';
  };

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="w-full sm:w-48 h-48 sm:h-32 bg-gray-200 flex-shrink-0">
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs">No Image</span>
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
            <div className="flex-1">
              <Link to={`/products/${product.id}`}>
                <h3 className="font-semibold text-lg text-gray-900 hover:text-blue-600 mb-2">
                  {product.product_name}
                </h3>
              </Link>
              <p className="text-gray-600 text-sm mb-2">
                {truncateText(product.product_description || '', 120)}
              </p>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(4.5)</span>
              </div>
              <p className="text-sm text-gray-500 mb-3 sm:mb-0">
                Par {getSellerName()} • {getStoreName()}
              </p>
            </div>
            <div className="flex sm:flex-col sm:text-right sm:ml-4 justify-between items-center sm:items-end mt-3 sm:mt-0">
              <div className="sm:mb-2">
                <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-1 sm:mb-2">
                  {product.product_price.toLocaleString()} DH
                </p>
                <p className="text-sm text-gray-500 mb-2 sm:mb-3">
                  Stock: {product.product_stock}
                </p>
              </div>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors flex items-center text-sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400 text-xs">No Image</span>
      </div>
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg text-gray-900 hover:text-blue-600 mb-2">
            {truncateText(product.product_name, 50)}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3">
          {truncateText(product.product_description || '', 80)}
        </p>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className="text-sm text-gray-500">(4.5)</span>
        </div>
        <p className="text-sm text-gray-500 mb-3">
          Par {getSellerName()}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-blue-600">
            {product.product_price.toLocaleString()} DH
          </p>
          <button className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition-colors text-sm">
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Stock: {product.product_stock}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
